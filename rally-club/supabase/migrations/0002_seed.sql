-- ============================================================================
-- The Rally Club — Seed data
-- ============================================================================
-- Safe, structural seed data only. No invented events, testimonials, or
-- founder claims — those must come from the client and be added via the
-- admin dashboard before launch.
-- ============================================================================

insert into public.locations (name, slug, region, is_active, launching_text)
values
  ('Cheshire', 'cheshire', 'North West England', true, null),
  ('Manchester', 'manchester', 'North West England', false, 'Coming soon'),
  ('London', 'london', 'Greater London', false, 'Coming soon')
on conflict (slug) do nothing;

insert into public.faqs (question, answer, category, sort_order, is_published)
values
  (
    'Who is Rally for?',
    'Rally is for any woman who wants to move more, meet new people, and feel part of a community — whatever your fitness level or experience. Many of our members come alone and leave with new friends.',
    'general', 1, true
  ),
  (
    'Can I come alone?',
    'Yes — most of our members do! Coming alone is completely normal at Rally, and it''s genuinely one of the best ways to meet people. You''ll be introduced and looked after from the moment you arrive.',
    'general', 2, true
  ),
  (
    'Do I need to be fit to join?',
    'Not at all. Rally events are designed to be welcoming for all fitness levels. Whether you play sport every week or are trying something brand new, you''ll find a pace that works for you.',
    'events', 3, true
  ),
  (
    'Do I need experience with padel, pilates, or the other activities?',
    'No experience needed. Our sessions are beginner-friendly, and instructors are on hand to help. Rally is about trying something new in a supportive environment, not performing.',
    'events', 4, true
  ),
  (
    'Where are events held?',
    'Our events currently run across Cheshire, at a range of partner venues — padel courts, pilates studios, cafés, and outdoor spaces. Each event page lists the exact venue and address.',
    'events', 5, true
  ),
  (
    'What happens at an event?',
    'It depends on the event — from a padel social to a pilates class to a sunset walk. Every event includes time to properly connect with other members, not just the activity itself.',
    'events', 6, true
  ),
  (
    'How do I book onto an event?',
    'Browse upcoming events on the Events page, open the one you fancy, and follow the booking link or form. Spaces are limited, so we''d recommend booking ahead.',
    'booking', 7, true
  ),
  (
    'How do I join the Rally community?',
    'Head to the Community page and tap the WhatsApp link to join. It''s where we share event announcements, community chat, and get to know each other between events.',
    'community', 8, true
  )
on conflict do nothing;
