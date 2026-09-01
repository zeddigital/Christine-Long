import { useEffect, useState, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { FileText, ExternalLink, Download } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { MEDIA_MARKER, MEDIA_SPLIT, prepareBody } from "@/lib/content";

/**
 * Renders a lesson section: Christine's HTML, with her PDFs embedded in place rather than
 * linked away to another page, which is how they behaved in WordPress.
 */
export function RichBody({ html, firstName }: { html: string; firstName: string }) {
  const [, navigate] = useLocation();
  const prepared = prepareBody(html, firstName);

  // Split on the PDF markers so each one becomes a real component. Injected HTML cannot
  // hold a viewer, because the URL has to be signed and that is asynchronous.
  const parts = prepared.split(new RegExp(MEDIA_SPLIT.source, "g"));

  /**
   * Her links are plain anchors inside injected HTML, so a click would reload the whole
   * app. Catching it here keeps navigation client-side; anything external, or opened with
   * a modifier, is left to the browser.
   */
  function onClick(e: MouseEvent<HTMLDivElement>) {
    const link = (e.target as HTMLElement).closest("a");
    if (!link) return;
    const href = link.getAttribute("href") ?? "";
    if (!href.startsWith("/membership-site/")) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (link.target === "_blank") return;
    e.preventDefault();
    navigate(href.replace("/membership-site", ""));
  }

  // Without a document there is nothing to splice, so the markup goes in whole and the
  // spacing rules that key off .lesson-body's direct children keep working.
  if (parts.length === 1) {
    return (
      <div className="lesson-body" onClick={onClick} dangerouslySetInnerHTML={{ __html: prepared }} />
    );
  }

  return (
    <div className="lesson-body" onClick={onClick}>
      {parts.map((part, i) => {
        const m = MEDIA_MARKER.exec(part);
        if (m)
          return (
            <MediaItem key={i} path={m[1]} label={decodeAttr(m[2])} mode={m[3] as "embed" | "download"} />
          );
        if (!part.trim()) return null;
        // display:contents so the wrapper does not become a layout box between blocks.
        return (
          <div key={i} className="contents" dangerouslySetInnerHTML={{ __html: part }} />
        );
      })}
    </div>
  );
}

function decodeAttr(s: string): string {
  return s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&amp;/g, "&");
}

/**
 * The document itself. The media bucket is private, so the viewer needs a short-lived
 * signed URL; storage policies re-check entitlement, so a member cannot mint one for a
 * module they do not hold.
 */
function MediaItem({
  path,
  label,
  mode,
}: {
  path: string;
  label: string;
  mode: "embed" | "download";
}) {
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.storage.from("media").createSignedUrl(path, 3600);
      if (cancelled) return;
      if (error || !data?.signedUrl) setFailed(true);
      else setUrl(data.signedUrl);
    })();
    return () => {
      cancelled = true;
    };
  }, [path]);

  const name = label || path.split("/").pop() || "Document";

  // Her "click here to download" links were only ever links; showing a second copy of a
  // document already embedded above would just be noise.
  if (mode === "download") {
    return (
      <p className="media-download">
        <a href={url ?? undefined} target="_blank" rel="noreferrer" aria-disabled={!url}>
          <Download size={15} aria-hidden="true" />
          {failed ? "This document isn't available yet" : name}
        </a>
      </p>
    );
  }

  return (
    <figure className="pdf-embed">
      <figcaption>
        <FileText size={15} aria-hidden="true" />
        <span>{name}</span>
        {url && (
          <a href={url} target="_blank" rel="noreferrer">
            Open <ExternalLink size={12} aria-hidden="true" />
          </a>
        )}
      </figcaption>
      {failed ? (
        <p className="pdf-embed-note">
          This document isn't available yet — it's still being moved across from the old site.
        </p>
      ) : url ? (
        <iframe src={`${url}#view=FitH`} title={name} loading="lazy" />
      ) : (
        <p className="pdf-embed-note">Preparing document…</p>
      )}
    </figure>
  );
}
