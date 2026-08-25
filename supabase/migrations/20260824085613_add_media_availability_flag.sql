-- The media export supplied is partial. This flag lets the front end degrade gracefully
-- for files that are referenced by a lesson but not yet present in storage, and gives us a
-- precise worklist once the full wp-content/uploads directory is retrieved from the host.
alter table public.media
  add column available boolean not null default false;

comment on column public.media.available is
  'True once the file exists in the media storage bucket. YouTube-hosted video is always true.';

update public.media set available = true where provider = 'youtube';
