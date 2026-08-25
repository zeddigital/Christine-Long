import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Check } from "lucide-react";
import { fetchLessonBySlug, fetchProgress, markProgress } from "@/lib/api";
import { Empty, Spinner } from "@/components/Bits";
import { MediaPanel } from "@/components/MediaPanel";
import { useAuth } from "@/context/Auth";

/**
 * WordPress filled [wlm_firstname] in before the page was served. The migration preserved
 * those as {{first_name}}; this puts the member's name back. Where we don't have a name,
 * the token and any stray punctuation around it are dropped rather than left showing.
 */
function personalise(html: string, firstName: string): string {
  if (!html.includes("{{first_name}}")) return html;
  if (firstName) return html.replaceAll("{{first_name}}", firstName);
  return html
    .replace(/,?\s*\{\{first_name\}\}\s*,/g, ",")
    .replace(/\s*\{\{first_name\}\}/g, "");
}

export default function LessonPage() {
  const [, params] = useRoute("/l/:slug");
  const slug = params?.slug ?? "";
  const { member } = useAuth();
  const qc = useQueryClient();
  const [active, setActive] = useState(0);
  const [saving, setSaving] = useState(false);

  const q = useQuery({ queryKey: ["lesson", slug], queryFn: () => fetchLessonBySlug(slug) });
  const progress = useQuery({ queryKey: ["progress"], queryFn: fetchProgress });

  // Christine's tabs often carry a heading with nothing behind it. Show only the real ones,
  // and fill in the personalisation tokens WishList used to substitute server-side.
  const firstName = member?.first_name?.trim() || "";
  const sections = useMemo(
    () =>
      (q.data?.sections ?? [])
        .filter((s) => !s.is_empty)
        .map((s) => ({ ...s, body_html: personalise(s.body_html, firstName) })),
    [q.data?.sections, firstName],
  );

  useEffect(() => setActive(0), [slug]);

  if (q.isLoading) return <Spinner label="Loading lesson" />;
  if (!q.data)
    return (
      <Empty
        title="This lesson isn't available to you"
        detail="It may belong to a module that hasn't been released to your account."
      />
    );

  const { lesson, module, media } = q.data;
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

      <div className="grid gap-8 lg:grid-cols-[1fr_19rem]">
        <div className="min-w-0">
          {sections.length > 1 && (
            <div role="tablist" aria-label="Lesson sections" className="mb-4 flex flex-wrap gap-2">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`rounded-sm border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    i === active
                      ? "border-gold bg-gold text-ground"
                      : "border-rule bg-panel text-ink-soft hover:border-ink-faint hover:text-ink"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          )}

          {/* The page. Christine's prose carries inline colours authored for a white
              background, so this surface stays light while everything around it is dark. */}
          <div className="rounded-sm bg-paper px-7 py-9 shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_18px_40px_-24px_rgba(0,0,0,0.8)] sm:px-10 sm:py-12">
            {sections.length === 0 ? (
              <div className="py-6 text-center">
                <p className="font-serif text-2xl text-paper-ink">This page has no content yet</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-paper-soft">
                  It exists in the programme but was never filled in on the old site.
                </p>
              </div>
            ) : (
              <div
                className="lesson-body"
                /* Content is authored by Christine and loaded by the migration. Members
                   have no write access to any content table, so this cannot carry
                   member-supplied markup. */
                dangerouslySetInnerHTML={{ __html: sections[active]?.body_html ?? "" }}
              />
            )}
          </div>

          <div className="mt-7">
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
        </div>

        <MediaPanel media={media} />
      </div>
    </article>
  );
}
