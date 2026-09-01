import { useEffect, useState } from "react";
import { RichBody } from "@/components/RichBody";
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

  // Reset when the caller swaps in a different lesson's sections.
  const key = sections[0]?.lesson_id;
  useEffect(() => setActive(0), [key]);

  if (sections.length === 0) return null;
  const current = sections[Math.min(active, sections.length - 1)];

  return (
    // Padding sits on the box rather than on each column, so the inset is the same on
    // every side. Splitting it between the columns left the tabs nearly flush to the
    // left edge while the material stopped well short of the right.
    <div className="rounded-sm bg-white p-7 shadow-[0_18px_44px_-26px_rgba(0,0,0,0.85)] sm:p-10 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-12">
        {/* Left: the section tabs. Tinted a shade cooler than the material bars on the
            right, so the two columns read as different kinds of thing. */}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Sections"
          className="flex flex-col gap-2.5"
        >
          {sections.map((s, i) => {
            const on = i === (active < sections.length ? active : 0);
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`rounded-sm px-5 py-4 text-left text-sm leading-snug transition-colors ${
                  on
                    ? "bg-ground font-semibold text-white"
                    : "bg-[#e7e3ec] text-[#3a3540] hover:bg-[#ddd8e4]"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        {/* Right: the selected section's material. */}
        <div className="min-w-0" role="tabpanel" aria-label={current.title}>
          {/* Authored by Christine and loaded by the migration. Members have no write
              access to any content table, so this cannot carry member-supplied markup. */}
          <RichBody html={current.body_html} firstName={firstName} />
        </div>
      </div>
    </div>
  );
}
