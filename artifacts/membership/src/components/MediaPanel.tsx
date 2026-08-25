import { useEffect, useState } from "react";
import { FileText, Music, AlertCircle } from "lucide-react";
import { signedUrl } from "@/lib/api";
import type { LessonMedia } from "@/lib/types";

/** Worksheets and audio live in a private bucket, so each needs a short-lived signed URL. */
export function MediaPanel({ media }: { media: LessonMedia[] }) {
  const [urls, setUrls] = useState<Record<number, string | null>>({});

  const files = media.filter((m) => m.media.provider === "storage" && m.role !== "image");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        files.map(async (m) => [m.media.id, await signedUrl(m.media)] as const),
      );
      if (!cancelled) setUrls(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media]);

  if (!files.length) return null;

  const worksheets = files.filter((m) => m.role === "worksheet");
  const tracks = files.filter((m) => m.role === "track");

  return (
    <aside className="flex h-fit flex-col gap-6 rounded-sm border border-rule bg-panel p-5">
      {tracks.length > 0 && (
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold">
            <Music size={13} aria-hidden="true" /> Audio
          </h3>
          <ul className="flex flex-col gap-4">
            {tracks.map((m) => (
              <li key={m.media.id}>
                <p className="mb-1.5 text-sm text-ink-soft">{m.media.title ?? "Track"}</p>
                {!m.media.available ? (
                  <Unavailable />
                ) : urls[m.media.id] ? (
                  <audio controls preload="none" src={urls[m.media.id]!} className="w-full" />
                ) : (
                  <p className="text-xs text-ink-faint">Preparing…</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {worksheets.length > 0 && (
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold">
            <FileText size={13} aria-hidden="true" /> Worksheets
          </h3>
          <ul className="flex flex-col gap-2">
            {worksheets.map((m) => (
              <li key={m.media.id}>
                {!m.media.available ? (
                  <div>
                    <p className="text-sm text-ink-faint line-through">{m.media.title ?? "Worksheet"}</p>
                    <Unavailable />
                  </div>
                ) : (
                  <a
                    href={urls[m.media.id] ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-sm border border-rule bg-panel-lift px-3 py-2 text-sm text-ink-soft no-underline transition-colors hover:border-gold hover:text-ink"
                  >
                    {m.media.title ?? "Worksheet"}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}

function Unavailable() {
  return (
    <p className="flex items-start gap-1.5 text-xs text-ink-faint">
      <AlertCircle size={13} className="mt-px shrink-0" aria-hidden="true" />
      Not yet uploaded — this file is still being moved across from the old site.
    </p>
  );
}
