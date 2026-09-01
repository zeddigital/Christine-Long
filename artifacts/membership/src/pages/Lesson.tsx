import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Check } from "lucide-react";
import { fetchLessonBySlug, fetchProgress, markProgress } from "@/lib/api";
import { Empty, Spinner } from "@/components/Bits";
import { MediaPanel } from "@/components/MediaPanel";
import { SectionBoard } from "@/components/SectionBoard";
import { RichBody } from "@/components/RichBody";
import { inlineMediaPaths } from "@/lib/content";
import { useAuth } from "@/context/Auth";

export default function LessonPage() {
  const [, params] = useRoute("/l/:slug");
  const slug = params?.slug ?? "";
  const { member } = useAuth();
  const qc = useQueryClient();
  const [saving, setSaving] = useState(false);

  const q = useQuery({ queryKey: ["lesson", slug], queryFn: () => fetchLessonBySlug(slug) });
  const progress = useQuery({ queryKey: ["progress"], queryFn: fetchProgress });

  // Christine's tabs often carry a heading with nothing behind it; show only the real ones.
  const firstName = member?.first_name?.trim() || "";
  const sections = useMemo(
    () => (q.data?.sections ?? []).filter((s) => !s.is_empty),
    [q.data?.sections],
  );

  if (q.isLoading) return <Spinner label="Loading lesson" />;
  if (!q.data)
    return (
      <Empty
        title="This lesson isn't available to you"
        detail="It may belong to a module that hasn't been released to your account."
      />
    );

  const { lesson, module, media } = q.data;
  // A file already shown in the text does not also need a copy beside it. This is why the
  // sidebar used to carry the very tracks whose players sit in the body.
  const embedded = new Set(sections.flatMap((s) => inlineMediaPaths(s.body_html)));
  const done = (progress.data ?? []).find((p) => p.lesson_id === lesson.id)?.completed_at;

  async function toggle() {
    if (!member) return;
    setSaving(true);
    try {
      await markProgress(member.id, lesson.id, !done);
      await qc.invalidateQueries({ queryKey: ["progress"] });
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="flex flex-col gap-8">
      <div>
        <Link
          href={`/m/${module.slug}`}
          className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold no-underline transition-colors hover:text-gold-bright"
        >
          ← {module.name}
        </Link>
        <h1 className="mt-5 font-serif text-[2.5rem] leading-[1.08] tracking-tight text-ink text-balance">
          {lesson.title}
        </h1>
      </div>

      {sections.length === 0 ? (
        <div className="rounded-sm bg-white px-7 py-12 text-center">
          <p className="font-serif text-2xl text-[#1c1c1e]">This page has no content yet</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#5b5b63]">
            It exists in the programme but was never filled in on the old site.
          </p>
        </div>
      ) : sections.length > 1 ? (
        <SectionBoard sections={sections} firstName={firstName} />
      ) : (
        <div className="rounded-sm bg-white px-7 py-9 shadow-[0_18px_44px_-26px_rgba(0,0,0,0.85)] sm:px-10 sm:py-11">
          {/* Authored by Christine and loaded by the migration. Members have no write
              access to any content table, so this cannot carry member-supplied markup. */}
          <RichBody html={sections[0].body_html} firstName={firstName} />
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_19rem]">
        <div>
          <button
            onClick={() => void toggle()}
            disabled={saving || !member}
            className={`flex items-center gap-2 rounded-sm px-5 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.2em] transition-colors disabled:opacity-60 ${
              done
                ? "border border-gold bg-transparent text-gold hover:bg-gold/10"
                : "bg-gold text-ground hover:bg-gold-bright"
            }`}
          >
            {done && <Check size={14} aria-hidden="true" />}
            {saving ? "Saving…" : done ? "Completed" : "Mark as complete"}
          </button>
        </div>

        <MediaPanel media={media} hidePaths={embedded} />
      </div>
    </article>
  );
}
