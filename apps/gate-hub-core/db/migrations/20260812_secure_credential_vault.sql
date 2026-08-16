-- GATE HUB secure credential vault foundation
-- Secret ciphertext is intentionally not selectable from the browser.

create extension if not exists pgcrypto;

alter table public.providers add column if not exists kind text not null default 'Other';
alter table public.providers add column if not exists website text;
alter table public.providers add column if not exists purpose text not null default 'Provider capability.';

create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  provider_id uuid references public.providers(id) on delete restrict,
  secret_ciphertext text not null,
  secret_last4 text,
  metadata jsonb not null default '{}'::jsonb,
  status text not null default 'connected' check (status in ('connected','disabled','error','revoked')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists credentials_provider_id_idx on public.credentials(provider_id);
alter table public.credentials enable row level security;

drop policy if exists "founder admin can read credential metadata" on public.credentials;
create policy "founder admin can insert credentials" on public.credentials for insert with check (public.is_founder_or_admin());
create policy "founder admin can update credentials" on public.credentials for update using (public.is_founder_or_admin()) with check (public.is_founder_or_admin());
create policy "founder admin can delete credentials" on public.credentials for delete using (public.is_founder_or_admin());

-- IMPORTANT: normal browser clients must never have SELECT access to this table.
-- The protected Supabase Edge Function returns metadata only and writes encrypted ciphertext.
