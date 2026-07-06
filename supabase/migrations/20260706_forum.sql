-- Forum « Communauté des candidats » : discussions + réponses.
-- À exécuter dans Supabase → SQL Editor (ou via `supabase db push`).

create table if not exists public.forum_threads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  author text not null,
  author_initials text not null,
  author_goal text not null default 'NAT',
  topic text not null default 'general',
  title text not null,
  body text not null,
  views integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.forum_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.forum_threads (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  author text not null,
  author_initials text not null,
  author_goal text not null default 'NAT',
  body text not null,
  helpful integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists forum_replies_thread_idx
  on public.forum_replies (thread_id, created_at);

alter table public.forum_threads enable row level security;
alter table public.forum_replies enable row level security;

-- Lecture : tout utilisateur connecté voit toutes les discussions.
drop policy if exists forum_threads_read on public.forum_threads;
create policy forum_threads_read on public.forum_threads
  for select to authenticated using (true);
drop policy if exists forum_replies_read on public.forum_replies;
create policy forum_replies_read on public.forum_replies
  for select to authenticated using (true);

-- Écriture : chacun ne peut publier que sous son propre compte.
drop policy if exists forum_threads_insert on public.forum_threads;
create policy forum_threads_insert on public.forum_threads
  for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists forum_replies_insert on public.forum_replies;
create policy forum_replies_insert on public.forum_replies
  for insert to authenticated with check (auth.uid() = user_id);

-- Suppression : chacun peut retirer son propre contenu.
drop policy if exists forum_threads_delete on public.forum_threads;
create policy forum_threads_delete on public.forum_threads
  for delete to authenticated using (auth.uid() = user_id);
drop policy if exists forum_replies_delete on public.forum_replies;
create policy forum_replies_delete on public.forum_replies
  for delete to authenticated using (auth.uid() = user_id);

-- ─────────────────────────── Données d'amorçage ───────────────────────────
-- Discussions d'exemple (user_id NULL = contenu système), pour que le forum
-- ne soit pas vide au lancement. Insérées via service role (bypass RLS).
insert into public.forum_threads
  (id, user_id, author, author_initials, author_goal, topic, title, body, views, created_at)
values
  ('f0000000-0000-4000-8000-000000000001', null, 'Aminata D.', 'AD', 'NAT', 'NAT',
   'Examen civique récent : comment s''est-il passé ?',
   'Bonjour à tous, est-ce que l''un ou l''une d''entre vous a passé l''examen civique récemment dans le cadre d''une demande de naturalisation ? Je voudrais avoir vos retours sur l''ambiance, les questions, le type de centre… Merci d''avance !',
   143, '2026-04-19T14:23:00Z'),
  ('f0000000-0000-4000-8000-000000000002', null, 'Mohamed L.', 'ML', 'CSP', 'CSP',
   'CSP : quels documents préparer avant le rendez-vous ?',
   'J''ai mon rendez-vous pour la carte de séjour pluriannuelle dans 3 semaines. Quelqu''un peut me dire quels documents sont indispensables et si l''examen civique est systématiquement demandé ? Merci.',
   98, '2026-04-17T11:10:00Z'),
  ('f0000000-0000-4000-8000-000000000003', null, 'Elena R.', 'ER', 'CR', 'CR',
   'Carte de résident : délais de traitement en 2026',
   'Quelqu''un a-t-il une idée des délais actuels pour obtenir la carte de résident de 10 ans ? J''ai déposé mon dossier il y a 4 mois et toujours pas de nouvelles.',
   212, '2026-04-14T08:45:00Z'),
  ('f0000000-0000-4000-8000-000000000004', null, 'Yuki N.', 'YN', 'NAT', 'general',
   'Niveau B2 : quelles ressources recommander ?',
   'Je dois justifier du niveau B2 de français pour la naturalisation. Quelles ressources, podcasts ou livres vous recommandez pour m''améliorer en plus de l''application ?',
   176, '2026-04-10T19:30:00Z'),
  ('f0000000-0000-4000-8000-000000000005', null, 'Abdoulaye K.', 'AK', 'NAT', 'NAT',
   'Entretien d''assimilation : à quoi s''attendre ?',
   'Mon entretien est programmé en mai. Quelqu''un peut partager son expérience ? Est-ce qu''il y a des questions pièges ?',
   301, '2026-04-06T14:00:00Z')
on conflict (id) do nothing;

insert into public.forum_replies
  (thread_id, user_id, author, author_initials, author_goal, body, helpful, created_at)
values
  ('f0000000-0000-4000-8000-000000000001', null, 'Karim B.', 'KB', 'NAT',
   'Je l''ai passé la semaine dernière à Lyon, tout s''est très bien passé. 40 questions, 45 minutes, une majorité sur les institutions et la laïcité. Bien réviser la devise et la Constitution.',
   12, '2026-04-19T18:42:00Z'),
  ('f0000000-0000-4000-8000-000000000001', null, 'Sarah M.', 'SM', 'NAT',
   'Même chose pour moi à Paris. Les questions sont claires, pas de pièges. La simulation ici m''a beaucoup aidée à gérer le chrono.',
   8, '2026-04-20T09:15:00Z'),
  ('f0000000-0000-4000-8000-000000000002', null, 'Fatou C.', 'FC', 'CSP',
   'Passeport, attestation d''examen civique (si requis selon votre situation), justificatifs de ressources et de domicile. La préfecture peut demander d''autres pièces selon le motif de séjour.',
   15, '2026-04-17T15:30:00Z'),
  ('f0000000-0000-4000-8000-000000000003', null, 'Abou S.', 'AS', 'CR',
   'Chez moi ça a pris 6 mois en Île-de-France. Ça dépend beaucoup de la préfecture. Relancez par courrier si aucune nouvelle après 4 mois.',
   9, '2026-04-14T12:20:00Z'),
  ('f0000000-0000-4000-8000-000000000004', null, 'Camille F.', 'CF', 'NAT',
   'Le podcast InnerFrench est excellent pour le B2. Lire des articles régulièrement aide aussi beaucoup pour la culture générale.',
   22, '2026-04-11T08:12:00Z')
on conflict do nothing;
