-- ============================================================================
-- Objectif Civique — schéma backend (Supabase / Postgres)
-- À exécuter dans : Dashboard Supabase → SQL Editor → New query → Run.
-- Idempotent : peut être ré-exécuté sans casser l'existant.
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────
-- Table profiles : miroir du type `User` de l'app (snake_case).
-- 1 ligne par utilisateur, liée à auth.users.
-- ────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id                  uuid primary key references auth.users (id) on delete cascade,
  first_name          text,
  email               text,
  goal                text,             -- 'NAT' | 'CR' | 'CSP'
  deadline            text,             -- 'lt1m' | '1to3m' | '3to6m' | 'undecided'
  level               text,             -- 'debutant' | 'intermediaire' | 'avance' | 'inconnu'
  channel             text,
  companion           text,
  subscription_plan   text not null default 'free',  -- 'free' | 'monthly' | 'quarterly' | 'lifetime'
  civic_test_passed   boolean,
  language_test_status text,            -- 'passed' | 'not_yet' | 'planned'
  language_cert_level text,             -- 'A1'..'C2'
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────────────
-- Table progress : miroir du `progressStore`. 1 ligne par utilisateur.
-- Scalaires en colonnes (pour analytics/segmentation futurs) + blobs JSONB
-- qui reflètent exactement les champs du store (sync triviale).
-- ────────────────────────────────────────────────────────────────────────
create table if not exists public.progress (
  user_id              uuid primary key references auth.users (id) on delete cascade,
  questions_answered   integer not null default 0,
  correct_count        integer not null default 0,
  current_streak       integer not null default 0,
  longest_streak       integer not null default 0,
  last_active_date     date,
  best_session_score   integer not null default 0,
  simulations_completed integer not null default 0,
  theme_progress       jsonb not null default '{}'::jsonb,
  daily_stats          jsonb not null default '[]'::jsonb,
  achievements_unlocked jsonb not null default '[]'::jsonb,
  sessions_history     jsonb not null default '[]'::jsonb,
  bookmarks            jsonb not null default '[]'::jsonb,
  updated_at           timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────────────────
-- Row Level Security : chaque utilisateur n'accède qu'à SES lignes.
-- ────────────────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.progress enable row level security;

drop policy if exists "profiles_self" on public.profiles;
create policy "profiles_self" on public.profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "progress_self" on public.progress;
create policy "progress_self" on public.progress
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────────────────
-- À la création d'un compte (auth.users), créer profil + progress.
-- SECURITY DEFINER pour pouvoir insérer malgré la RLS.
-- ────────────────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'first_name', '')
  )
  on conflict (id) do nothing;

  insert into public.progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ────────────────────────────────────────────────────────────────────────
-- Maintien automatique de updated_at.
-- ────────────────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists progress_set_updated_at on public.progress;
create trigger progress_set_updated_at
  before update on public.progress
  for each row execute function public.set_updated_at();

-- ────────────────────────────────────────────────────────────────────────
-- Suppression de compte (RGPD / exigence stores Apple & Google).
-- L'utilisateur authentifié supprime SON propre compte ; la suppression de
-- auth.users cascade sur profiles + progress (ON DELETE CASCADE).
-- SECURITY DEFINER car seul le rôle admin peut toucher auth.users.
-- ────────────────────────────────────────────────────────────────────────
create or replace function public.delete_current_user()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_current_user() from public, anon;
grant execute on function public.delete_current_user() to authenticated;
