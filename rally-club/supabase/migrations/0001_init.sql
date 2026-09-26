-- ============================================================================
-- The Rally Club — Initial Schema
-- ============================================================================
-- Run this in the Supabase SQL editor, or via `supabase db push` /
-- `supabase migration up` if you're using the Supabase CLI locally.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- profiles: one row per authenticated user (extends auth.users)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- admins: allow-list of user ids permitted to access the admin dashboard.
-- A row here is what actually grants admin rights — being in auth.users
-- alone is not enough. Add rows manually after a user first signs up.
-- ----------------------------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- locations: future-ready multi-city support (Cheshire live, others planned)
-- ----------------------------------------------------------------------------
create table if not exists public.locations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  region text not null,
  is_active boolean not null default true,
  launching_text text,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- events
-- ----------------------------------------------------------------------------
do $$ begin
  create type event_category as enum (
    'padel', 'pilates', 'running', 'social', 'wellness', 'fitness', 'special'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type event_status as enum ('draft', 'published', 'sold_out', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type booking_type as enum ('external', 'internal');
exception when duplicate_object then null; end $$;

create table if not exists public.events (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  description text not null,
  excerpt text,
  category event_category not null,
  location_id uuid references public.locations (id),
  location_name text not null,
  location_area text not null,
  address text,
  event_date date not null,
  start_time time not null,
  end_time time,
  price_pence integer not null default 0 check (price_pence >= 0),
  capacity integer check (capacity is null or capacity > 0),
  spots_taken integer not null default 0 check (spots_taken >= 0),
  image_url text,
  host_name text,
  host_bio text,
  booking_type booking_type not null default 'external',
  booking_url text,
  status event_status not null default 'draft',
  is_featured boolean not null default false,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_status_date_idx on public.events (status, event_date);
create index if not exists events_category_idx on public.events (category);
create index if not exists events_slug_idx on public.events (slug);

-- ----------------------------------------------------------------------------
-- bookings (internal booking flow, optional per-event)
-- ----------------------------------------------------------------------------
do $$ begin
  create type booking_status as enum ('pending', 'confirmed', 'cancelled');
exception when duplicate_object then null; end $$;

create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events (id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  attendees integer not null default 1 check (attendees > 0),
  status booking_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists bookings_event_idx on public.bookings (event_id);
create index if not exists bookings_email_idx on public.bookings (email);

-- ----------------------------------------------------------------------------
-- reviews / testimonials
-- ----------------------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  quote text not null,
  context text,
  rating smallint not null default 5 check (rating between 1 and 5),
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- faqs
-- ----------------------------------------------------------------------------
create table if not exists public.faqs (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  answer text not null,
  category text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- contact_messages
-- ----------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- partnership_enquiries
-- ----------------------------------------------------------------------------
do $$ begin
  create type collaboration_type as enum (
    'instructor', 'venue', 'wellness_brand', 'lifestyle_brand',
    'cafe_restaurant', 'event_partner', 'other'
  );
exception when duplicate_object then null; end $$;

create table if not exists public.partnership_enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  company text not null,
  email text not null,
  phone text,
  business_type text not null,
  collaboration_type collaboration_type not null default 'other',
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- updated_at trigger for events
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row execute procedure public.set_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

alter table public.profiles enable row level security;
alter table public.admins enable row level security;
alter table public.locations enable row level security;
alter table public.events enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.faqs enable row level security;
alter table public.contact_messages enable row level security;
alter table public.partnership_enquiries enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

-- profiles: users can read/update their own profile; admins can read all
create policy "profiles_self_select" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "profiles_self_update" on public.profiles
  for update using (auth.uid() = id);

-- admins: only admins can read the admin list; no public writes
create policy "admins_admin_select" on public.admins
  for select using (public.is_admin());

-- locations: public read for active locations; admin full access
create policy "locations_public_select" on public.locations
  for select using (is_active = true or public.is_admin());
create policy "locations_admin_write" on public.locations
  for all using (public.is_admin()) with check (public.is_admin());

-- events: public can read published (or sold_out) events; admins see everything
create policy "events_public_select" on public.events
  for select using (status in ('published', 'sold_out') or public.is_admin());
create policy "events_admin_insert" on public.events
  for insert with check (public.is_admin());
create policy "events_admin_update" on public.events
  for update using (public.is_admin());
create policy "events_admin_delete" on public.events
  for delete using (public.is_admin());

-- bookings: anyone can create a booking (public booking form); only admins
-- can read/manage the resulting list. No public select — protects attendee PII.
create policy "bookings_public_insert" on public.bookings
  for insert with check (true);
create policy "bookings_admin_select" on public.bookings
  for select using (public.is_admin());
create policy "bookings_admin_update" on public.bookings
  for update using (public.is_admin());
create policy "bookings_admin_delete" on public.bookings
  for delete using (public.is_admin());

-- reviews: public can read published reviews only; admins manage all
create policy "reviews_public_select" on public.reviews
  for select using (is_published = true or public.is_admin());
create policy "reviews_admin_write" on public.reviews
  for all using (public.is_admin()) with check (public.is_admin());

-- faqs: public can read published faqs only; admins manage all
create policy "faqs_public_select" on public.faqs
  for select using (is_published = true or public.is_admin());
create policy "faqs_admin_write" on public.faqs
  for all using (public.is_admin()) with check (public.is_admin());

-- contact_messages: anyone can submit; only admins can read/manage
create policy "contact_public_insert" on public.contact_messages
  for insert with check (true);
create policy "contact_admin_select" on public.contact_messages
  for select using (public.is_admin());
create policy "contact_admin_update" on public.contact_messages
  for update using (public.is_admin());
create policy "contact_admin_delete" on public.contact_messages
  for delete using (public.is_admin());

-- partnership_enquiries: anyone can submit; only admins can read/manage
create policy "partners_public_insert" on public.partnership_enquiries
  for insert with check (true);
create policy "partners_admin_select" on public.partnership_enquiries
  for select using (public.is_admin());
create policy "partners_admin_update" on public.partnership_enquiries
  for update using (public.is_admin());
create policy "partners_admin_delete" on public.partnership_enquiries
  for delete using (public.is_admin());

-- ============================================================================
-- Auto-create a profile row whenever a new auth user is created
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
