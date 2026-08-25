-- A New You membership schema.
-- Migrated from WordPress + WishList Member; provenance columns (wp_*, wlm_*) are kept
-- so every row can be traced back to the source site and the migration re-run if needed.

create table public.members (
  id            serial primary key,
  auth_user_id  uuid unique references auth.users(id) on delete set null,
  email         text not null,
  first_name    text,
  last_name     text,
  phone         text,
  status        text not null default 'invited'
                check (status in ('invited','active','inactive')),
  is_admin      boolean not null default false,
  wp_user_id    integer,
  notes         text,
  last_seen_at  timestamptz,
  created_at    timestamptz not null default now()
);
create unique index members_email_idx on public.members (lower(email));

create table public.modules (
  id            serial primary key,
  wlm_level_id  text unique,
  name          text not null,
  slug          text not null unique,
  series        text not null default 'transformation'
                check (series in ('transformation','savvy_start_up','itbiy','bonus')),
  summary       text,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);
create index modules_series_order_idx on public.modules (series, sort_order);

create table public.lessons (
  id          serial primary key,
  module_id   integer not null references public.modules(id) on delete cascade,
  wp_post_id  integer unique,
  title       text not null,
  slug        text not null unique,
  status      text not null default 'published' check (status in ('published','draft')),
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index lessons_module_order_idx on public.lessons (module_id, sort_order);

create table public.lesson_sections (
  id           serial primary key,
  lesson_id    integer not null references public.lessons(id) on delete cascade,
  section_key  text not null,
  title        text not null,
  body_html    text not null default '',
  is_empty     boolean not null default false,
  sort_order   integer not null default 0
);
create index lesson_sections_lesson_order_idx on public.lesson_sections (lesson_id, sort_order);

create table public.media (
  id                serial primary key,
  kind              text not null check (kind in ('pdf','audio','image','video','other')),
  provider          text not null default 'storage' check (provider in ('storage','youtube')),
  storage_path      text unique,
  external_id       text,
  title             text,
  mime_type         text,
  bytes             integer,
  wp_attachment_id  integer,
  constraint media_location_ck check (
    (provider = 'storage' and storage_path is not null) or
    (provider = 'youtube' and external_id  is not null)
  )
);
create index media_kind_idx on public.media (kind);

create table public.lesson_media (
  id          serial primary key,
  lesson_id   integer not null references public.lessons(id) on delete cascade,
  media_id    integer not null references public.media(id) on delete cascade,
  role        text not null default 'worksheet'
              check (role in ('worksheet','track','video','image')),
  sort_order  integer not null default 0,
  unique (lesson_id, media_id, role)
);

create table public.entitlements (
  id                serial primary key,
  member_id         integer not null references public.members(id) on delete cascade,
  module_id         integer not null references public.modules(id) on delete cascade,
  granted_at        timestamptz not null default now(),
  cancelled_at      timestamptz,
  source            text not null default 'manual'
                    check (source in ('wishlist','manual','stripe')),
  source_reference  text,
  unique (member_id, module_id)
);
create index entitlements_member_idx on public.entitlements (member_id);

create table public.lesson_progress (
  id               serial primary key,
  member_id        integer not null references public.members(id) on delete cascade,
  lesson_id        integer not null references public.lessons(id) on delete cascade,
  first_viewed_at  timestamptz not null default now(),
  completed_at     timestamptz,
  unique (member_id, lesson_id)
);
create index lesson_progress_member_idx on public.lesson_progress (member_id);
