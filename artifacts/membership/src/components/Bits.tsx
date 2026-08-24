export function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-subtle"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${done} of ${total} lessons complete`}
      >
        <div
          className="h-full rounded-full bg-champagne transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="shrink-0 text-xs tabular-nums text-mute">
        {done}/{total}
      </span>
    </div>
  );
}

export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-16 text-sm text-mute">
      <span
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-line border-t-champagne"
        aria-hidden="true"
      />
      {label}…
    </div>
  );
}

export function Empty({ title, detail }: { title: string; detail?: string }) {
  return (
    <div className="rounded-sm border border-line bg-subtle px-6 py-12 text-center">
      <p className="font-serif text-xl text-aubergine">{title}</p>
      {detail && <p className="mx-auto mt-2 max-w-md text-sm text-plum">{detail}</p>}
    </div>
  );
}
