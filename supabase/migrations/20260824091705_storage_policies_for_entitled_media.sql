-- The media bucket is private. A signed URL can only be minted for an object the member
-- is entitled to, so entitlement is enforced on the file itself, not just on the record
-- that points at it. Without this a member could guess a worksheet path and fetch it.

create policy "members read entitled media"
on storage.objects for select to authenticated
using (
  bucket_id = 'media'
  and exists (
    select 1
    from public.media m
    join public.lesson_media lm on lm.media_id = m.id
    join public.lessons     l  on l.id = lm.lesson_id
    where m.storage_path = storage.objects.name
      and private.has_module(l.module_id)
  )
);

-- Admins manage the library outright.
create policy "admins manage media objects"
on storage.objects for all to authenticated
using (bucket_id = 'media' and private.is_admin())
with check (bucket_id = 'media' and private.is_admin());
