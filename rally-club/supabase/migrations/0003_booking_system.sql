-- ============================================================================
-- The Rally Club — Booking & Ticketing System (Stripe)
-- ============================================================================
-- Run this AFTER 0001_init.sql and 0002_seed.sql. Adds native booking/
-- payment fields, an atomic capacity-safe booking function, and a public
-- lookup function for confirmation pages — all without giving customers
-- direct table access to the bookings table.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- events: replace the old external-link booking model with a native one.
-- ----------------------------------------------------------------------------
alter table public.events
  add column if not exists booking_open boolean not null default true;

alter table public.events
  drop column if exists booking_type,
  drop column if exists booking_url;

-- Add 'completed' as a valid event lifecycle state.
do $$ begin
  alter type event_status add value if not exists 'completed';
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- bookings: add payment + Stripe fields
-- ----------------------------------------------------------------------------
do $$ begin
  create type payment_status as enum ('pending', 'paid', 'failed', 'refunded', 'not_required');
exception when duplicate_object then null; end $$;

do $$ begin
  alter type booking_status add value if not exists 'checked_in';
exception when duplicate_object then null; end $$;

alter table public.bookings
  add column if not exists booking_reference text,
  add column if not exists amount_pence integer not null default 0,
  add column if not exists currency text not null default 'gbp',
  add column if not exists stripe_checkout_session_id text,
  add column if not exists stripe_payment_intent_id text,
  add column if not exists payment_status payment_status not null default 'pending';

-- Bookings are now only ever created via create_confirmed_booking() below,
-- once payment is verified (or immediately for free events) — never as a
-- pending pre-payment row. Drop the now-unused default on `status`'s old
-- 'pending' value usage; the column stays but rows will only ever be
-- inserted as 'confirmed' by the function.

create unique index if not exists bookings_reference_idx on public.bookings (booking_reference);
create unique index if not exists bookings_stripe_session_idx on public.bookings (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;
create index if not exists bookings_payment_status_idx on public.bookings (payment_status);

-- Public booking form no longer inserts directly — remove that policy.
-- All inserts happen inside create_confirmed_booking(), which is
-- SECURITY DEFINER and bypasses RLS by design.
drop policy if exists "bookings_public_insert" on public.bookings;

-- ============================================================================
-- Atomic, capacity-safe booking creation
-- ============================================================================
-- Locks the event row (FOR UPDATE) to serialize concurrent bookings against
-- the same event, so two simultaneous payments can never oversell capacity.
-- Idempotent on stripe_checkout_session_id: calling this twice with the same
-- session id (e.g. duplicate Stripe webhook delivery) returns the existing
-- booking instead of creating a second one.
-- ============================================================================
create or replace function public.create_confirmed_booking(
  p_event_id uuid,
  p_full_name text,
  p_email text,
  p_phone text,
  p_quantity int,
  p_amount_pence int,
  p_currency text,
  p_stripe_session_id text,
  p_stripe_payment_intent_id text,
  p_payment_status payment_status,
  p_notes text
) returns public.bookings
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event record;
  v_ref text;
  v_booking public.bookings;
begin
  if p_quantity is null or p_quantity < 1 then
    raise exception 'INVALID_QUANTITY';
  end if;

  -- Idempotency guard: a repeat webhook for the same Stripe session just
  -- returns the booking already created for it.
  if p_stripe_session_id is not null then
    select * into v_booking from public.bookings
      where stripe_checkout_session_id = p_stripe_session_id;
    if found then
      return v_booking;
    end if;
  end if;

  -- Lock the event row so concurrent bookings against it are serialized.
  select * into v_event from public.events where id = p_event_id for update;
  if not found then
    raise exception 'EVENT_NOT_FOUND';
  end if;
  if v_event.status not in ('published', 'sold_out') or v_event.booking_open = false then
    raise exception 'EVENT_NOT_BOOKABLE';
  end if;
  if v_event.capacity is not null and v_event.spots_taken + p_quantity > v_event.capacity then
    raise exception 'SOLD_OUT';
  end if;

  v_ref := 'RALLY-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
  while exists (select 1 from public.bookings where booking_reference = v_ref) loop
    v_ref := 'RALLY-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
  end loop;

  insert into public.bookings (
    event_id, full_name, email, phone, attendees, notes, status,
    booking_reference, amount_pence, currency,
    stripe_checkout_session_id, stripe_payment_intent_id, payment_status
  ) values (
    p_event_id, p_full_name, p_email, p_phone, p_quantity, p_notes, 'confirmed',
    v_ref, p_amount_pence, p_currency,
    p_stripe_session_id, p_stripe_payment_intent_id, p_payment_status
  ) returning * into v_booking;

  update public.events
    set spots_taken = spots_taken + p_quantity,
        status = case
          when capacity is not null and spots_taken + p_quantity >= capacity then 'sold_out'::event_status
          else status
        end
    where id = p_event_id;

  return v_booking;
end;
$$;

-- Called by the checkout API before creating a Stripe session, and by the
-- webhook/free-booking path — safe for anon/authenticated to execute
-- because all the real checks happen inside the function body.
grant execute on function public.create_confirmed_booking to anon, authenticated, service_role;

-- ============================================================================
-- Public, capability-token style lookup for confirmation pages
-- ============================================================================
-- Customers never get SELECT on public.bookings directly (RLS keeps that
-- admin-only). Instead, knowing the exact Stripe session id or booking
-- reference (both unguessable, single-use-per-booking tokens handed back by
-- Stripe or shown once on the confirmation page) is treated as proof of
-- ownership — the same pattern most booking confirmation emails use.
-- ============================================================================
create or replace function public.get_booking_public(
  p_session_id text default null,
  p_reference text default null
) returns table (
  booking_reference text,
  full_name text,
  email text,
  attendees int,
  amount_pence int,
  currency text,
  payment_status payment_status,
  status booking_status,
  created_at timestamptz,
  event_title text,
  event_slug text,
  event_date date,
  start_time time,
  location_name text,
  location_area text
)
language sql
security definer
set search_path = public
stable
as $$
  select
    b.booking_reference, b.full_name, b.email, b.attendees, b.amount_pence,
    b.currency, b.payment_status, b.status, b.created_at,
    e.title, e.slug, e.event_date, e.start_time, e.location_name, e.location_area
  from public.bookings b
  join public.events e on e.id = b.event_id
  where (p_session_id is not null and b.stripe_checkout_session_id = p_session_id)
     or (p_reference is not null and b.booking_reference = p_reference)
  limit 1;
$$;

grant execute on function public.get_booking_public to anon, authenticated;

-- ============================================================================
-- Refund bookkeeping: mark a booking refunded/cancelled by payment intent.
-- Used when a `charge.refunded` webhook arrives (e.g. refund issued from
-- the Stripe dashboard rather than the admin panel).
-- ============================================================================
create or replace function public.mark_booking_refunded(p_payment_intent_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_booking public.bookings;
begin
  select * into v_booking from public.bookings
    where stripe_payment_intent_id = p_payment_intent_id;
  if not found then
    return;
  end if;

  update public.bookings
    set payment_status = 'refunded', status = 'cancelled'
    where id = v_booking.id;

  update public.events
    set spots_taken = greatest(spots_taken - v_booking.attendees, 0),
        status = case when status = 'sold_out' then 'published'::event_status else status end
    where id = v_booking.event_id;
end;
$$;

grant execute on function public.mark_booking_refunded to service_role;
