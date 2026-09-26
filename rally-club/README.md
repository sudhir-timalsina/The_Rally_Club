# The Rally Club — Website

A production-ready Next.js website for The Rally Club, a UK women's padel,
pilates, wellness and social community based in Cheshire.

Built with Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase +
Framer Motion. See `ARCHITECTURE.md`-style notes below for the full stack.

---

## 1. Tech stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, custom design tokens, `tailwindcss-animate`
- **Animation:** Framer Motion (respects `prefers-reduced-motion`)
- **Database & Auth:** Supabase (Postgres + Row Level Security + Supabase Auth)
- **Storage:** Supabase Storage (event images)
- **Forms:** React Hook Form + Zod
- **Email:** Resend (architecture in place, safe no-op until configured)
- **Deployment:** Vercel

---

## 2. Local development

### Prerequisites
- Node.js 18.18+ (Node 20 recommended)
- A free [Supabase](https://supabase.com) project
- npm (or pnpm/yarn if you prefer — adjust commands accordingly)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment template
cp .env.example .env.local

# 3. Fill in .env.local with your Supabase project values (see section 3)

# 4. Run the dev server
npm run dev
```

Visit `http://localhost:3000`. Without Supabase configured, the site still
runs and renders correctly — events/FAQs/reviews will show their empty
states, and forms will fail gracefully with a friendly error, until you
complete the Supabase setup below.

### Other useful commands

```bash
npm run build       # production build
npm run start        # run the production build locally
npm run lint          # ESLint
npm run typecheck   # TypeScript check with no emit
```

---

## 3. Supabase setup

1. Create a new project at [supabase.com](https://supabase.com).
2. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret, server-only)
3. Go to the **SQL Editor** and run the migration files in order:
   - `supabase/migrations/0001_init.sql` — tables, enums, RLS policies
   - `supabase/migrations/0002_seed.sql` — starter locations + FAQ content
   - `supabase/migrations/0003_booking_system.sql` — Stripe-backed booking
     fields, the atomic capacity-safe `create_confirmed_booking()` function,
     and the public `get_booking_public()` lookup used by confirmation pages
4. Create a **Storage bucket** named `event-images`:
   - Storage → New bucket → name it exactly `event-images` → make it **Public**
   - This is what the admin dashboard's event image upload uses.
5. **Create your first admin user:**
   - Go to Authentication → Users → Add user (set an email + password).
   - Copy that user's UUID.
   - In the SQL Editor, run:
     ```sql
     insert into public.admins (user_id) values ('paste-the-uuid-here');
     ```
   - You can now sign in at `/admin/login` with that email/password.

RLS is enabled on every table. Public visitors can only read published
content and submit forms; only rows in `public.admins` can read/write
everything else. Review `supabase/migrations/0001_init.sql` for the full
policy set before going live.

---

## 4. Email notifications (Resend)

Forms save to Supabase regardless of whether email is configured. To also
get an email notification when someone submits a form:

1. Create an account at [resend.com](https://resend.com) and verify a
   sending domain.
2. Create an API key and set `RESEND_API_KEY`.
3. Set `NOTIFICATION_EMAIL_FROM` (must be on your verified domain) and
   `NOTIFICATION_EMAIL_TO` (where you want to receive notifications).

Until these are set, `lib/email.ts` logs to the console instead of sending —
nothing breaks.

---

## 5. Booking & payment system (Stripe)

Rally now has its own native booking and ticketing system — no third-party
ticketing platform is used. The flow is:

```
Rally Website → Booking Widget → Stripe Checkout → Stripe Webhook → Supabase → Confirmation Email
```

- **Free events** (price = £0) confirm instantly with no Stripe involved.
- **Paid events** redirect to Stripe Checkout. The booking is only ever
  created in Supabase once Stripe's webhook confirms payment — the
  browser's "success" redirect is never trusted on its own. If the webhook
  hasn't landed yet when the customer reaches the confirmation page, it
  polls for a few seconds before falling back to "check your email."
- **Capacity is enforced atomically** in Postgres (`create_confirmed_booking`
  in `supabase/migrations/0003_booking_system.sql`), which locks the event
  row before checking/incrementing capacity — two simultaneous bookings for
  the last spot can never both succeed. In the rare case Stripe captures a
  payment a split-second after the event sold out, the webhook automatically
  refunds that payment.
- **Price is always server-calculated.** The checkout server action
  (`lib/actions/checkout.ts`) re-fetches the event's price and capacity from
  Supabase before creating the Stripe session — the browser cannot influence
  the amount charged.
- **Idempotent webhook.** Stripe may deliver the same event more than once;
  `create_confirmed_booking` checks for an existing row by
  `stripe_checkout_session_id` first, so duplicate deliveries never create
  duplicate bookings.

### Setting up Stripe

1. Create a Stripe account (or use the client's own — see "Client setup
   checklist" below) at [dashboard.stripe.com](https://dashboard.stripe.com).
2. Start in **Test mode** (toggle in the Stripe Dashboard).
3. Go to **Developers → API keys** and copy:
   - `Secret key` → `STRIPE_SECRET_KEY`
   - `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Set up the webhook (see below) and copy its signing secret →
   `STRIPE_WEBHOOK_SECRET`.

### Local webhook testing (Stripe CLI)

Stripe needs to reach your local machine to deliver webhooks during
development. Use the [Stripe CLI](https://stripe.com/docs/stripe-cli):

```bash
# Install (macOS example — see Stripe's docs for other platforms)
brew install stripe/stripe-cli/stripe

# Log in (opens a browser to link your Stripe account)
stripe login

# Forward webhook events to your local dev server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The `stripe listen` command prints a webhook signing secret starting with
`whsec_` — copy that into `STRIPE_WEBHOOK_SECRET` in `.env.local` while
testing locally (it's different from the production one you'll create
below). Keep this command running in a separate terminal while you test
bookings locally.

Then trigger a test event any time with:

```bash
stripe trigger checkout.session.completed
```

Or just complete a real test-mode checkout by booking a paid event locally
with [Stripe's test card](https://stripe.com/docs/testing) `4242 4242 4242
4242`, any future expiry, any CVC, any postcode.

### Production webhook

1. In the Stripe Dashboard → **Developers → Webhooks → Add endpoint**.
2. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
3. Select these events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `charge.refunded` (optional — keeps refunds issued from the Stripe
     dashboard in sync with Supabase)
4. Copy the endpoint's **Signing secret** → `STRIPE_WEBHOOK_SECRET` in your
   Vercel production environment variables.

### Going live

Once ready to accept real payments: switch the Stripe Dashboard out of Test
mode, generate live-mode API keys, create a **second** webhook endpoint
against the same URL in live mode, and swap all three `STRIPE_*` env vars in
Vercel to their live-mode values. Test and live mode are entirely separate —
nothing is shared between them, so nothing "switches over" automatically.

### Refunds & cancellations (V1 scope)

Admins can mark a booking `confirmed`, `checked_in`, or `cancelled` from
`/admin/dashboard/bookings`. Actually refunding money is done from the
Stripe Dashboard directly for now (find the payment by the booking's
`stripe_payment_intent_id`, shown in Supabase); the `charge.refunded`
webhook then automatically syncs that back to Supabase and frees up the
capacity. A fully in-app refund button is a natural next step but was kept
out of V1 to avoid over-building this before it's needed.

---

## 6. Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, **Add New Project** → import the repo.
3. Add all variables from `.env.example` under **Environment Variables**
   (for Production, and Preview if you want preview deploys to work fully).
4. Deploy. Vercel will detect Next.js automatically.

### Custom domain

In Vercel → Project → Settings → Domains, add `therallyclubuk.com` (or your
chosen domain) and follow the DNS instructions Vercel provides (usually an
`A`/`ALIAS` record or `CNAME`, depending on your DNS provider). Once verified,
update `NEXT_PUBLIC_SITE_URL` to match and redeploy.

---

## 7. Replacing placeholder content

Search the codebase for `[Placeholder]` and `PLACEHOLDER` to find every spot
that needs real client content before launch:

- `app/why-we-started/page.tsx` — founder's personal story (currently placeholder copy)
- `app/founder/page.tsx` — founder biography and quotes
- `lib/site-config.ts` — `contact.whatsappUrl` (**replace with the real WhatsApp community invite link**)
- `app/legal/privacy/page.tsx`, `cookies/page.tsx`, `terms/page.tsx` — final legal copy (recommend solicitor review)
- Events, reviews and FAQs — add real content via `/admin/dashboard` rather than editing code

No events, testimonials, or founder credentials were invented — these are
either left as clearly-marked placeholders or built as empty admin tables
ready for real content.

---

## 8. Admin dashboard

Visit `/admin/dashboard` (redirects to `/admin/login` if not signed in).

From the dashboard you can:
- Create/edit/publish/unpublish/mark sold out/delete **events**, with image upload
- View live **capacity, tickets sold, revenue** per event with a progress bar
- View, search, filter (by event/payment status/booking status), and update
  **bookings** — plus export the full list as CSV
- View, mark read/unread, and delete **contact messages** and **partnership enquiries**
- Add/edit/publish/delete **FAQs**
- Add/publish/delete **reviews & testimonials**
- See an overview of upcoming events, bookings, revenue, and new enquiries

Admin access is controlled by the `public.admins` table (see section 3,
step 5) — being a Supabase auth user alone does not grant access.

---

## 9. Project structure

```
app/                     Next.js App Router pages
  admin/                 Admin login + dashboard (protected)
    dashboard/bookings/    Bookings management + CSV export
  api/                   Route handlers (contact, partners, Stripe webhook)
    stripe/webhook/         The single source of truth for payment confirmation
    admin/bookings/export/   Admin-only CSV export
  events/[slug]/         Dynamic event detail pages
    confirmation/            Post-booking confirmation (polls for webhook)
  legal/                 Privacy / cookies / terms placeholders
components/
  ui/                    Low-level primitives (button, field, accordion)
  admin/                 Admin-only components (incl. bookings table, event stats)
  booking-widget.tsx       Native quantity + price + Stripe/free booking form
  ...                    Shared site components (navbar, footer, cards)
lib/
  actions/                Server Actions (forms, checkout, admin mutations)
  supabase/                Supabase client factories (browser/server/admin)
  stripe.ts                 Server-only Stripe client
  data.ts                  Public data-fetching (fail-soft)
  admin-data.ts             Admin data-fetching (incl. booking stats)
  validations.ts             Zod schemas
  site-config.ts               Central brand/contact config
supabase/migrations/          SQL schema, seed data, booking system
types/                          Shared TypeScript types
public/images/                  Brand photography and logo assets
```

---

## 10. Before you launch — checklist

- [ ] Run all three SQL migrations in your production Supabase project
- [ ] Create the `event-images` storage bucket (public)
- [ ] Create your admin user and add it to `public.admins`
- [ ] Set every variable in `.env.example` in Vercel (including live-mode Stripe keys)
- [ ] Create the production Stripe webhook endpoint and test a real test-mode booking end to end
- [ ] Replace the WhatsApp community link in `lib/site-config.ts`
- [ ] Replace `[Placeholder]` founder story/bio copy
- [ ] Add real events, FAQs and reviews via the admin dashboard
- [ ] Finalise legal pages (Privacy, Cookies, Terms) — ideally with a solicitor, including booking/cancellation terms
- [ ] Configure Resend for booking confirmation + enquiry notification emails
- [ ] Connect your custom domain and update `NEXT_PUBLIC_SITE_URL`
- [ ] Switch Stripe from test mode to live mode when ready to take real payments

---

## 11. Client setup checklist

Everything The Rally Club needs to provide or set up before this can go live
and take real payments:

### Required
- [ ] A Supabase project (free tier is fine to start)
- [ ] A Stripe account for The Rally Club (not a developer/agency account —
      payouts go directly to the client's own bank account)
- [ ] Stripe API keys (test mode to start, live mode before launch)
- [ ] Stripe webhook configured against the production URL
- [ ] A Resend account + API key, and a domain to send confirmation emails from
- [ ] The production domain name (e.g. therallyclubuk.com) and DNS access to connect it in Vercel
- [ ] The real WhatsApp community invite link
- [ ] Founder's personal story/biography copy
- [ ] Real upcoming events, reviews, and final legal copy (see section 10)

None of the above requires deep technical knowledge — the README sections
above walk through each one step by step.

---

## 12. Remaining information needed from the client

This is the full list of things Codeallo cannot invent and needs from The
Rally Club before launch:

1. Real WhatsApp community invite link
2. Founder's personal story and biography copy
3. Real upcoming events (dates, venues, prices — entered via the admin dashboard)
4. Real member testimonials/reviews (with permission to publish)
5. Final legal copy for Privacy Policy, Cookie Policy and Terms & Conditions
   (now including booking/cancellation/refund terms)
6. A Stripe account owned by The Rally Club, plus its API keys
7. A Resend account and verified sending domain for confirmation emails
8. Final domain name for `NEXT_PUBLIC_SITE_URL` and DNS access to connect it
