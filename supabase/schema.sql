-- Supabase schema for LeadFlow

create extension if not exists "pgcrypto";

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'free',
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid not null unique,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text,
  company text,
  phone text,
  email text,
  socials jsonb,
  source text,
  status text not null default 'novo',
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.scraping_jobs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  apify_actor_id text not null,
  apify_run_id text,
  input_config jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  leads_imported int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.apify_credentials (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  api_key_encrypted text not null,
  created_at timestamptz not null default now()
);

alter table public.organizations enable row level security;
alter table public.users enable row level security;
alter table public.leads enable row level security;
alter table public.scraping_jobs enable row level security;
alter table public.apify_credentials enable row level security;

-- Policies for organizations
create policy "organization members can select organizations" on public.organizations for select using (
  exists (
    select 1
    from public.users u
    where u.auth_id::text = auth.uid()
      and u.organization_id = public.organizations.id
  )
);

-- Policies for users
create policy "authenticated users can select organization members" on public.users for select using (
  auth.uid() is not null
  and organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

create policy "authenticated user can insert own profile" on public.users for insert with check (
  auth.uid() = auth_id::text
);

create policy "authenticated users can update own profile" on public.users for update using (
  auth.uid() = auth_id::text
) with check (
  auth.uid() = auth_id::text
);

-- Policies for leads
create policy "organization members can select leads" on public.leads for select using (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

create policy "organization members can insert leads" on public.leads for insert with check (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

create policy "organization members can update leads" on public.leads for update using (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
) with check (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

create policy "organization members can delete leads" on public.leads for delete using (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

-- Policies for scraping_jobs
create policy "organization members can select scraping jobs" on public.scraping_jobs for select using (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

create policy "organization members can insert scraping jobs" on public.scraping_jobs for insert with check (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

create policy "organization members can update scraping jobs" on public.scraping_jobs for update using (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
) with check (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

create policy "organization members can delete scraping jobs" on public.scraping_jobs for delete using (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

-- Policies for apify_credentials
create policy "organization members can select apify credentials" on public.apify_credentials for select using (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

create policy "organization members can insert apify credentials" on public.apify_credentials for insert with check (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

create policy "organization members can update apify credentials" on public.apify_credentials for update using (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
) with check (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);

create policy "organization members can delete apify credentials" on public.apify_credentials for delete using (
  organization_id = (
    select organization_id from public.users where auth_id::text = auth.uid()
  )
);
