-- Modération du forum : signalement de contenu + blocage d'utilisateur.
-- Exigé par l'App Store (guideline 1.2 — contenu généré par les utilisateurs).
-- À exécuter dans Supabase → SQL Editor (ou via `supabase db push`).

-- ─────────────────────────────── Signalements ───────────────────────────────
create table if not exists public.forum_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users (id) on delete cascade,
  content_kind text not null check (content_kind in ('thread', 'reply')),
  content_id uuid not null,
  -- Auteur du contenu signalé (null si contenu système d'amorçage).
  author_id uuid references auth.users (id) on delete set null,
  reason text not null,
  status text not null default 'pending'
    check (status in ('pending', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now(),
  -- Un même utilisateur ne signale un contenu qu'une fois.
  unique (reporter_id, content_kind, content_id)
);

-- File de modération : les signalements en attente, du plus ancien au plus récent.
create index if not exists forum_reports_pending_idx
  on public.forum_reports (status, created_at);

-- ──────────────────────────────── Blocages ─────────────────────────────────
create table if not exists public.forum_blocks (
  blocker_id uuid not null references auth.users (id) on delete cascade,
  blocked_id uuid not null references auth.users (id) on delete cascade,
  -- Nom d'affichage figé au moment du blocage. Dénormalisé volontairement :
  -- `profiles` est protégé par RLS et n'est lisible que pour soi-même, on ne
  -- peut donc pas récupérer le nom des autres au moment d'afficher la liste.
  blocked_name text,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  constraint forum_blocks_not_self check (blocker_id <> blocked_id)
);

alter table public.forum_reports enable row level security;
alter table public.forum_blocks enable row level security;

-- Signalements : chacun crée et relit uniquement les siens. La modération
-- passe par le service role (bypass RLS) côté back-office.
drop policy if exists forum_reports_insert on public.forum_reports;
create policy forum_reports_insert on public.forum_reports
  for insert to authenticated with check (auth.uid() = reporter_id);
drop policy if exists forum_reports_read on public.forum_reports;
create policy forum_reports_read on public.forum_reports
  for select to authenticated using (auth.uid() = reporter_id);

-- Blocages : chacun gère intégralement sa propre liste.
drop policy if exists forum_blocks_read on public.forum_blocks;
create policy forum_blocks_read on public.forum_blocks
  for select to authenticated using (auth.uid() = blocker_id);
drop policy if exists forum_blocks_insert on public.forum_blocks;
create policy forum_blocks_insert on public.forum_blocks
  for insert to authenticated with check (auth.uid() = blocker_id);
drop policy if exists forum_blocks_delete on public.forum_blocks;
create policy forum_blocks_delete on public.forum_blocks
  for delete to authenticated using (auth.uid() = blocker_id);
