-- ==========================================================
-- Syntra Optimizer — Supabase schema
-- Run this in: Supabase Studio -> SQL Editor
-- ==========================================================

-- 1) Public profiles table (extends the auth.users metadata)
create table if not exists public.profiles (
  id uuid references auth.users (id) on delete cascade not null primary key,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- auto-create a profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2) Software "mini updates" / changelog
create table if not exists public.updates (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  title text not null,
  body text not null,
  category text not null default 'Performance'
    check (category in ('Performance', 'New feature', 'Fix', 'UI', 'Security')),
  published_at timestamptz not null default now()
);

-- ==========================================================
-- RLS (Row Level Security)
-- ==========================================================
alter table public.profiles enable row level security;
alter table public.updates enable row level security;

-- profiles: user can read/update only their own row
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- updates: everyone (including public) can read; only service role writes
create policy "Public can view updates"
  on public.updates for select
  using (true);

-- 3) Seed changelog
insert into public.updates (version, title, body, category, published_at) values
  ('1.0.0', 'Initial release', 'Syntra Optimizer ships with one-click optimization for Windows 10/11, network tweaks and a dedicated game optimizer. Instantly boost FPS and boot times.', 'New', now() - interval '30 days'),
  ('1.1.0', 'Game Optimizer v2', 'Improved GPU priority profiles and a new per-app FPS limiter. Smoother framerates in CPU-bound titles.', 'Performance', now() - interval '20 days'),
  ('1.2.0', 'One-click fixes', 'Automatic repair of common Windows issues: disabled drivers, misconfigured services and bloated startup entries.', 'Fix', now() - interval '12 days'),
  ('1.2.5', 'Smarter network tuning', 'Updated TCP window recommendations for Windows 11 23H2. Lower ping in online games.', 'Performance', now() - interval '5 days'),
  ('1.3.0', 'New UI', 'Redesigned dashboard with live system score, per-app optimization and a cleaner detection engine.', 'UI', now() - interval '2 days');