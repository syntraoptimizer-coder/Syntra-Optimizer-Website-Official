-- Launch pricing settings. Run once in Supabase SQL Editor.
create table if not exists public.stripe_events (
  id text primary key,
  type text not null,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.stripe_events enable row level security;
alter table public.stripe_events add column if not exists processed_at timestamptz;

create table if not exists public.launch_sale_events (
  event_id text primary key,
  created_at timestamptz not null default now()
);

alter table public.launch_sale_events enable row level security;

create table if not exists public.settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.settings enable row level security;

drop policy if exists "Public can read launch pricing" on public.settings;
create policy "Public can read launch pricing"
  on public.settings for select
  using (key = 'launch_promo');

insert into public.settings (key, value)
values (
  'launch_promo',
  '{"enabled": true, "standard_price_cents": 1500, "launch_price_cents": 1125, "label": "Launch pricing", "threshold": 100, "sales_count": 0, "show_progress": false}'::jsonb
)
on conflict (key) do nothing;

create or replace function public.increment_launch_sales(p_event_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.launch_sale_events (event_id)
  values (p_event_id)
  on conflict (event_id) do nothing;

  if found then
    update public.settings
    set value = jsonb_set(
      value,
      '{sales_count}',
      to_jsonb(coalesce((value->>'sales_count')::integer, 0) + 1),
      true
    ),
    updated_at = now()
    where key = 'launch_promo';
  end if;
end;
$$;

revoke all on function public.increment_launch_sales(text) from public;
grant execute on function public.increment_launch_sales(text) to service_role;
