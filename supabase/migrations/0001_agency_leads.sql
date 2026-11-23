-- Velqora Media's own contact-form submissions. This project currently shares a
-- Supabase project with Velqora (the CRM software) for deployment speed, but this
-- table is deliberately separate from that project's marketing_leads — two distinct
-- businesses' inquiries, never commingled.
--
-- RLS is enabled with zero policies (default-deny for every role, anon and
-- authenticated included), so only the service-role admin client
-- (src/app/api/public/contact/route.ts) can read or write it.

create table if not exists agency_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text,
  created_at timestamptz not null default now()
);

alter table agency_leads enable row level security;
