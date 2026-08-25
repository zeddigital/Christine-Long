import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Check } from "lucide-react";
import { fetchLessons, fetchModuleBySlug, fetchProgress } from "@/lib/api";
import { Empty, LessonRail, Spinner } from "@/components/Bits";

export default function ModulePage() {
  const [, params] = useRoute("/m/:slug");
  const slug = params?.slug ?? "";

  const mod = useQuery({ queryKey: ["module", slug], queryFn: () => fetchModuleBySlug(slug) });
  const lessons = useQuery({
    queryKey: ["lessons", mod.data?.id],
    queryFn: () => fetchLessons(mod.data!.id),
    enabled: !!mod.data?.id,
  });
  const progress = useQuery({ queryKey: ["progress"], queryFn: fetchProgress });

  if (mod.isLoading) return <Spinner />;
  if (!mod.data)
    return (
      <Empty
        title="This module isn't available to you"
        detail="Either it hasn't been released to your account yet, or the link is wrong. Head back to your dashboard."
      />
    );

  const done = new Set((progress.data ?? []).filter((p) => p.completed_at).map((p) => p.lesson_id));
  const items = lessons.data ?? [];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Link
          href="/"
          className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold no-underline transition-colors hover:text-gold-bright"
        >
          ← All modules
        </Link>
        <h1 className="mt-5 font-serif text-[2.5rem] leading-[1.08] tracking-tight text-ink text-balance">
          {mod.data.name}
        </h1>
        {mod.data.summary && (
          <p className="mt-4 max-w-prose text-ink-soft">{mod.data.summary}</p>
        )}
        <div className="mt-6 max-w-sm">
          <LessonRail done={items.filter((l) => done.has(l.id)).length} total={items.length} />
        </div>
      </div>

      {lessons.isLoading ? (
        <Spinner label="Loading lessons" />
      ) : (
        <ul className="flex flex-col overflow-hidden rounded-sm border border-rule">
          {items.map((l) => {
            const isDone = done.has(l.id);
            return (
              <li key={l.id}>
                <Link
                  href={`/l/${l.slug}`}
                  className="group flex items-center gap-4 border-b border-rule-soft bg-panel px-5 py-4 no-underline transition-colors last:border-0 hover:bg-panel-lift"
                >
                  <span
                    className={`flex h-[1.375rem] w-[1.375rem] shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isDone
                        ? "border-gold bg-gold text-ground"
                        : "border-rule bg-transparent group-hover:border-ink-faint"
                    }`}
                    aria-hidden="true"
                  >
                    {isDone && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span
                    className={`flex-1 text-sm transition-colors ${
                      isDone ? "text-ink-faint" : "text-ink-soft group-hover:text-ink"
                    }`}
                  >
                    {l.title}
                  </span>
                  {l.status === "draft" && (
                    <span className="rounded-sm border border-rule px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                      Draft
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
