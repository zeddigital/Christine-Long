import { Check } from "lucide-react";

/** Which surface a control is sitting on, so it can pick readable colours. */
type Tone = "dark" | "light";

/**
 * A module's state on the dashboard.
 *
 * An earlier version drew one mark per lesson. With the real programme -- most modules
 * run 29-36 lessons -- the marks were too fine to count, and every untouched module
 * still drew a full dashed rule, so thirty-three cards became a field of dashes with
 * the started ones no easier to find than the rest.
 *
 * So the bar is only drawn once there is progress to show. An untouched module states
 * its size and nothing else, which makes "where was I" the thing that stands out.
 */
export function ModuleStatus({
  done,
  total,
  tone = "dark",
}: {
  done: number;
  total: number;
  tone?: Tone;
}) {
  const faint = tone === "light" ? "text-paper-soft" : "text-ink-faint";
  if (total === 0) {
    // Three ITBIY modules carry no lessons at all; "0/0" reads as a fault.
    return <p className={`text-xs ${faint}`}>No lessons yet</p>;
  }

  if (done === 0) {
    return (
      <p className={`text-xs ${faint}`}>
        <span className="tabular-nums">{total}</span> {total === 1 ? "lesson" : "lessons"}
      </p>
    );
  }

  if (done === total) {
    return (
      <p
        className={`flex items-center gap-1.5 text-xs font-semibold ${
          tone === "light" ? "text-gold-deep" : "text-gold"
        }`}
      >
        <Check size={13} strokeWidth={3} aria-hidden="true" />
        All <span className="tabular-nums">{total}</span> complete
      </p>
    );
  }

  return <LessonRail done={done} total={total} tone={tone} />;
}

/** Bar plus count. Used where progress is the point of the screen. */
export function LessonRail({
  done,
  total,
  tone = "dark",
}: {
  done: number;
  total: number;
  tone?: Tone;
}) {
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-1 flex-1 overflow-hidden rounded-full ${
          tone === "light" ? "bg-paper-rule" : "bg-rule"
        }`}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${done} of ${total} lessons complete`}
      >
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span
        className={`shrink-0 text-xs tabular-nums ${
          tone === "light" ? "text-paper-soft" : "text-ink-soft"
        }`}
      >
        {done} of {total}
      </span>
    </div>
  );
}

export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-16 text-sm text-ink-faint">
      <span
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-rule border-t-gold"
        aria-hidden="true"
      />
      {label}…
    </div>
  );
}

export function Empty({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="rounded-sm border border-rule bg-panel px-6 py-14 text-center">
      <p className="font-serif text-2xl text-ink">{title}</p>
      {detail && <p className="mx-auto mt-2.5 max-w-md text-sm text-ink-soft">{detail}</p>}
    </div>
  );
}

/** Small letterspaced caps with a rule running out to the edge — used to head each series. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold">
        {children}
      </h2>
      <span className="h-px flex-1 bg-rule" aria-hidden="true" />
    </div>
  );
}
