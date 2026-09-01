import { useEffect, useState, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { prepareBody } from "@/lib/content";
import type { LessonSection } from "@/lib/types";

/**
 * The module board: section titles down the left, that section's material on the right.
 *
 * This mirrors how the programme was laid out in WordPress, and it is not a guess -- the
 * migration preserved it. Each module's "Membership Site — <name>" page carries its
 * sections in order (START HERE Induction Setup, Review and Reset, Your Virtual Studio,
 * and so on), and each section's body holds the buttons that belong under it.
 *
 * The panel is white because Christine's content sets its own colours inline, authored
 * against a white page -- hard black, a dark green, and the red she uses for emphasis.
 */
export function SectionBoard({
  sections,
  firstName,
}: {
  sections: LessonSection[];
  firstName: string;
}) {
  const [active, setActive] = useState(0);
  const [, navigate] = useLocation();

  // Reset when the caller swaps in a different lesson's sections.
  const key = sections[0]?.lesson_id;
  useEffect(() => setActive(0), [key]);

  if (sections.length === 0) return null;
  const current = sections[Math.min(active, sections.length - 1)];

  /**
   * Her buttons are plain anchors inside injected HTML, so a click would reload the whole
   * app. Catching it here keeps navigation client-side; anything external, or opened with
   * a modifier, is left to the browser.
   */
  function onContentClick(e: MouseEvent<HTMLDivElement>) {
    const link = (e.target as HTMLElement).closest("a");
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    if (!href.startsWith("/membership-site/")) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (link.target === "_blank") return;
    e.preventDefault();
    navigate(href.replace("/membership-site", ""));
  }

  return (
    <div className="overflow-hidden rounded-sm bg-white shadow-[0_18px_44px_-26px_rgba(0,0,0,0.85)]">
      <div className="grid lg:grid-cols-[19rem_1fr]">
        {/* Left: the section tabs. */}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Sections"
          className="flex flex-col gap-1.5 border-b border-[#e6e6e8] bg-[#fafafa] p-3 lg:border-b-0 lg:border-r"
        >
          {sections.map((s, i) => {
            const on = i === (active < sections.length ? active : 0);
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`rounded-sm px-4 py-3 text-left text-sm transition-colors ${
                  on
                    ? "bg-ground font-semibold text-white"
                    : "bg-[#f1f1f3] text-[#3f3f46] hover:bg-[#e8e8ea]"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        {/* Right: the selected section's material. */}
        <div
          className="min-w-0 px-6 py-7 sm:px-9 sm:py-9"
          onClick={onContentClick}
          role="tabpanel"
          aria-label={current.title}
        >
          <div
            className="lesson-body"
            /* Authored by Christine and loaded by the migration. Members have no write
               access to any content table, so this cannot carry member-supplied markup. */
            dangerouslySetInnerHTML={{ __html: prepareBody(current.body_html, firstName) }}
          />
        </div>
      </div>
    </div>
  );
}
