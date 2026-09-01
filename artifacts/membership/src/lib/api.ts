import { supabase } from "./supabase";
import type { Lesson, LessonMedia, LessonSection, MediaItem, Module, Progress } from "./types";

/** Modules the signed-in member holds. RLS filters this — no client-side check needed. */
export async function fetchModules(): Promise<Module[]> {
  const { data, error } = await supabase
    .from("modules")
    .select("id,name,slug,series,summary,sort_order")
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function fetchModuleBySlug(slug: string): Promise<Module | null> {
  const { data, error } = await supabase
    .from("modules")
    .select("id,name,slug,series,summary,sort_order")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchLessons(moduleId: number): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from("lessons")
    .select("id,module_id,title,slug,status,sort_order")
    .eq("module_id", moduleId)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function fetchLessonBySlug(
  slug: string,
): Promise<{ lesson: Lesson; module: Module; sections: LessonSection[]; media: LessonMedia[] } | null> {
  const { data: lesson, error } = await supabase
    .from("lessons")
    .select("id,module_id,title,slug,status,sort_order")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!lesson) return null;

  const [mod, sections, media] = await Promise.all([
    supabase
      .from("modules")
      .select("id,name,slug,series,summary,sort_order")
      .eq("id", lesson.module_id)
      .single(),
    supabase
      .from("lesson_sections")
      .select("id,lesson_id,section_key,title,body_html,is_empty,sort_order")
      .eq("lesson_id", lesson.id)
      .order("sort_order"),
    supabase
      .from("lesson_media")
      .select("role,sort_order,media(id,kind,provider,storage_path,external_id,title,available)")
      .eq("lesson_id", lesson.id)
      .order("sort_order"),
  ]);
  if (mod.error) throw mod.error;
  if (sections.error) throw sections.error;
  if (media.error) throw media.error;

  return {
    lesson,
    module: mod.data as Module,
    sections: sections.data ?? [],
    media: (media.data ?? []) as unknown as LessonMedia[],
  };
}

export async function fetchProgress(): Promise<Progress[]> {
  const { data, error } = await supabase.from("lesson_progress").select("lesson_id,completed_at");
  if (error) throw error;
  return data ?? [];
}

/** Records the visit on first open; a second call marks it finished. */
export async function markProgress(memberId: number, lessonId: number, completed: boolean) {
  const { error } = await supabase.from("lesson_progress").upsert(
    {
      member_id: memberId,
      lesson_id: lessonId,
      completed_at: completed ? new Date().toISOString() : null,
    },
    { onConflict: "member_id,lesson_id" },
  );
  if (error) throw error;
}

/**
 * The media bucket is private, so files are reached through short-lived signed URLs.
 * Storage policies re-check entitlement, so a member cannot mint a URL for a
 * worksheet belonging to a module they do not hold.
 */
export async function signedUrl(item: MediaItem, seconds = 3600): Promise<string | null> {
  if (item.provider === "youtube") {
    return item.external_id ? `https://www.youtube-nocookie.com/embed/${item.external_id}` : null;
  }
  if (!item.storage_path || !item.available) return null;
  const { data, error } = await supabase.storage
    .from("media")
    .createSignedUrl(item.storage_path, seconds);
  if (error) return null;
  return data?.signedUrl ?? null;
}

/**
 * The module's hub page — the "Membership Site — <name>" lesson carried over from
 * WordPress, whose sections are the module's tabs. Seventeen of the thirty-three modules
 * have one; the rest are single-page modules with nothing to tab between.
 */
export async function fetchModuleHub(
  moduleId: number,
): Promise<{ hub: Lesson; sections: LessonSection[] } | null> {
  const { data: hub, error } = await supabase
    .from("lessons")
    .select("id,module_id,title,slug,status,sort_order")
    .eq("module_id", moduleId)
    .ilike("title", "Membership Site%")
    .order("id")
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  if (!hub) return null;

  const { data: sections, error: sErr } = await supabase
    .from("lesson_sections")
    .select("id,lesson_id,section_key,title,body_html,is_empty,sort_order")
    .eq("lesson_id", hub.id)
    .order("sort_order");
  if (sErr) throw sErr;

  return { hub, sections: (sections ?? []).filter((s) => !s.is_empty) };
}
