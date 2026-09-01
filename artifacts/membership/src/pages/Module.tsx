import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Check, ChevronDown } from "lucide-react";
import { fetchLessons, fetchModuleBySlug, fetchModuleHub, fetchProgress } from "@/lib/api";
import { Empty, LessonRail, Spinner } from "@/components/Bits";
import { ModuleHeader } from "@/components/ModuleHeader";
import { SectionBoard } from "@/components/SectionBoard";
import { useAuth } from "@/context/Auth";

export default function ModulePage() {
  const [, params] = useRoute("/m/:slug");
  const slug = params?.slug ?? "";
  const { member } = useAuth();
  const [showAll, setShowAll] = useState(false);

  const mod = useQuery({ queryKey: ["module", slug], queryFn: () => fetchModuleBySlug(slug) });
  const hub = useQuery({
    queryKey: ["module-hub", mod.data?.id],
    queryFn: () => fetchModuleHub(mod.data!.id),
    enabled: !!mod.data?.id,
  });
  const lessons = useQuery({
    queryKey: ["lessons", mod.data?.id],
    queryFn: () => fetchLessons(mod.data!.id),
    enabled: !!mod.data?.id,
  });
  const progress = useQuery({ queryKey: ["progress"], queryFn: fetchProgress });

  // The hub query cannot start until the module id is known, so waiting for both keeps
  // the page from drawing a header and then swapping it for the welcome.
  if (mod.isLoading || hub.isLoading) return <Spinner label="Loading module" />;
  if (!mod.data)
    return (
      <Empty
        title="This module isn't available to you"
        detail="Either it hasn't been released to your account yet, or the link is wrong. Head back to your dashboard."
      />
    );

  const done = new Set((progress.data ?? []).filter((p) => p.completed_at).map((p) => p.lesson_id));
  const items = lessons.data ?? [];
  const board = hub.data;

  const doneCount = items.filter((l) => done.has(l.id)).length;

  return (
    <div className="flex flex-col gap-9">
      {board ? (
        <ModuleHeader
          module={mod.data}
          portrait={board.portrait}
          done={doneCount}
          total={items.length}
        />
      ) : (
        // No board means no left navigation and no button below, so the welcome would be
        // giving directions to things that are not on the page.
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
          {mod.data.summary && <p className="mt-4 max-w-prose text-ink-soft">{mod.data.summary}</p>}
          <div className="mt-6 max-w-sm">
            <LessonRail done={doneCount} total={items.length} />
          </div>
        </div>
      )}

      {board ? (
        <>
          <SectionBoard sections={board.sections} firstName={member?.first_name?.trim() || ""} />

          {/* The board covers the module as Christine arranged it. The flat list stays
              available for finding a page by name, but it is not the way in. */}
          <div>
            <button
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-ink-faint transition-colors hover:text-ink"
            >
              <ChevronDown
                size={14}
                className={`transition-transform ${showAll ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
              {showAll ? "Hide" : "Show"} all {items.length} pages
            </button>
            {showAll && <LessonList items={items} done={done} />}
          </div>
        </>
      ) : lessons.isLoading ? (
        <Spinner label="Loading lessons" />
      ) : (
        // Single-page modules (the ITBIY and bonus material) have no sections to tab between.
        <LessonList items={items} done={done} />
      )}
    </div>
  );
}

function LessonList({
  items,
  done,
}: {
  items: { id: number; title: string; slug: string; status: string }[];
  done: Set<number>;
}) {
  if (items.length === 0)
    return (
      <Empty
        title="No pages yet"
        detail="This module has been released to you, but Christine hasn't added material to it."
      />
    );

  return (
    <ul className="mt-4 flex flex-col overflow-hidden rounded-sm border border-rule">
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
  );
}
