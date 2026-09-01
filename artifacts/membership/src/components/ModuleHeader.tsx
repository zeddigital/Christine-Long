import { useEffect, useState } from "react";
import { Link } from "wouter";
import { signedUrl } from "@/lib/api";
import { LessonRail } from "@/components/Bits";
import type { MediaItem, Module } from "@/lib/types";

/**
 * The welcome that opens every module in WordPress: Christine's portrait on the left,
 * the congratulation and the two navigation instructions on the right, sitting above
 * the section board.
 *
 * The picture comes from the data -- each hub page carries exactly one image and it is
 * her, though which shot varies by series. The words did not survive the migration
 * (they were page furniture outside the tab container), so they are set here.
 */
export function ModuleHeader({
  module,
  portrait,
  done,
  total,
}: {
  module: Module;
  portrait: MediaItem | null;
  done: number;
  total: number;
}) {
  const src = usePortrait(portrait);

  // "30-Day ... Activation Journey" is the transformation series' own phrase: every one of
  // the twenty-five places the programme uses it sits in a transformation module, and their
  // hubs open with a "30-DAY ACTIVATION FORECAST" button. Savvy Start Up never says it, so
  // those five modules are announced by name rather than given wording that is not theirs.
  const journey =
    module.series === "transformation"
      ? `30-Day ${module.name} Activation Journey`
      : module.name;

  return (
    <div>
      <Link
        href="/"
        className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold no-underline transition-colors hover:text-gold-bright"
      >
        ← All modules
      </Link>

      <div className="mt-6 flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-9">
        {src && (
          <div className="w-36 shrink-0 sm:w-44">
            {/* Height is left to the image: the three portraits are different shapes, and
                a fixed box would crop one of them. */}
            <img
              src={src}
              alt="Christine Long"
              className="w-full rounded-sm border border-rule-soft"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="font-serif text-[1.6rem] leading-none text-gold">Congratulations</p>
          <p className="mt-2.5 text-ink-soft">you're now set to commence your</p>
          <h1 className="mt-1.5 font-serif text-[2.5rem] leading-[1.08] tracking-tight text-ink text-balance">
            {journey}
          </h1>
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink-soft">
            Learning is easy! Start by clicking the button below or short cut to a module from
            the left navigation menu.
          </p>
          <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-ink-soft">
            You can easily access the next module by clicking Navigation Tabs located at bottom
            of each page.
          </p>
          <div className="mt-7 max-w-sm">
            <LessonRail done={done} total={total} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** The media bucket is private, so the portrait needs a short-lived signed URL. */
function usePortrait(item: MediaItem | null): string | null {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!item) {
      setSrc(null);
      return;
    }
    let cancelled = false;
    void signedUrl(item).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, [item?.id]);

  return src;
}
