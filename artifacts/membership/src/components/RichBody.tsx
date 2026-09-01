import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "wouter";
import { FileText, ExternalLink, Download } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { MEDIA_MARKER, prepareBody, type MediaMode } from "@/lib/content";

/**
 * Renders a lesson section: Christine's HTML, with her documents, recordings and pictures
 * put back where she placed them.
 *
 * Everything she embedded came out of WordPress still addressed as /media/..., which
 * resolves to nothing here -- so the PDFs became plain links, the audio players drew a
 * control with no source behind it, and the pictures drew a broken icon. The files are all
 * in the bucket; they just need a signed URL, which is asynchronous and therefore cannot be
 * done in the string pass that prepares the markup.
 *
 * The markup goes in whole and each file is rendered into its marker through a portal. An
 * earlier version split the HTML on the markers and injected the pieces separately, which
 * cut through whatever container the file was sitting in -- and 335 of the 361 sections
 * that carry a file have it nested inside one, so the wrapper was being lost.
 */
export function RichBody({ html, firstName }: { html: string; firstName: string }) {
  const [, navigate] = useLocation();
  const prepared = useMemo(() => prepareBody(html, firstName), [html, firstName]);
  const root = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<Slot[]>([]);

  // Read back the markers the browser has just parsed, so each keeps its place in the tree.
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    setSlots(
      [...el.querySelectorAll<HTMLElement>("div[data-media]")].map((node) => ({
        node,
        path: node.getAttribute("data-media") ?? "",
        label: node.getAttribute("data-label") ?? "",
        mode: (node.getAttribute("data-mode") ?? "embed") as MediaMode,
      })),
    );
  }, [prepared]);

  // One page can carry a dozen pictures, so they are signed together rather than one
  // request per element.
  const paths = useMemo(() => {
    const out = new Set<string>();
    for (const m of prepared.matchAll(new RegExp(MEDIA_MARKER.source, "g"))) {
      if (m[1]) out.add(m[1]);
    }
    return [...out];
  }, [prepared]);
  const urls = useSignedUrls(paths);

  /**
   * Her links are plain anchors inside injected HTML, so a click would reload the whole
   * app. Catching it here keeps navigation client-side; anything external, or opened with
   * a modifier, is left to the browser. It is bound to the node rather than passed as a
   * prop so that Body keeps no changing props and React leaves its markup alone.
   */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (!href.startsWith("/membership-site/")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (link.target === "_blank") return;
      e.preventDefault();
      navigate(href.replace("/membership-site", ""));
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [navigate]);

  return (
    <>
      <Body html={prepared} innerRef={root} />
      {slots.map((s, i) =>
        createPortal(
          <MediaItem
            path={s.path}
            label={decodeAttr(s.label)}
            mode={s.mode}
            // undefined while the URLs are still being minted, null once one has failed.
            url={s.path ? urls[s.path] : null}
          />,
          s.node,
          String(i),
        ),
      )}
    </>
  );
}

/**
 * The markup itself, held apart so that React renders it exactly once per body.
 *
 * React 19 re-applies dangerouslySetInnerHTML whenever the prop object's identity changes,
 * and an object literal is a new object on every render -- so each re-render rewrote the
 * HTML and detached the very nodes the portals had just been pointed at, leaving every
 * marker empty. Behind memo with only stable props, nothing re-renders and the nodes stand.
 */
const Body = memo(function Body({
  html,
  innerRef,
}: {
  html: string;
  innerRef: RefObject<HTMLDivElement | null>;
}) {
  return <div ref={innerRef} className="lesson-body" dangerouslySetInnerHTML={{ __html: html }} />;
});

interface Slot {
  node: HTMLElement;
  path: string;
  label: string;
  mode: MediaMode;
}

/**
 * The media bucket is private, so every file needs a short-lived signed URL. Storage
 * policies re-check entitlement, so a member cannot mint one for a module they do not hold.
 */
function useSignedUrls(paths: string[]): Record<string, string | null | undefined> {
  const [urls, setUrls] = useState<Record<string, string | null>>({});
  // The array is rebuilt on every render, so the effect keys off its contents.
  const key = paths.join("\n");

  useEffect(() => {
    const list = key ? key.split("\n") : [];
    if (!list.length) return;
    let cancelled = false;
    void supabase.storage
      .from("media")
      .createSignedUrls(list, 3600)
      .then(({ data }) => {
        if (cancelled) return;
        // Anything the call did not come back with is settled as failed, so the page says
        // so rather than sitting on "preparing" for good.
        const next: Record<string, string | null> = Object.fromEntries(list.map((p) => [p, null]));
        for (const row of data ?? []) {
          if (row.path && row.signedUrl) next[row.path] = row.signedUrl;
        }
        setUrls(next);
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  return urls;
}

function decodeAttr(s: string): string {
  return s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&amp;/g, "&");
}

/** One of Christine's files, in the place she put it. */
function MediaItem({
  path,
  label,
  mode,
  url,
}: {
  path: string;
  label: string;
  mode: MediaMode;
  url: string | null | undefined;
}) {
  const name = label || path.split("/").pop() || "Document";
  const failed = url === null;

  if (mode === "audio") {
    if (failed)
      return (
        <p className="media-note">
          This recording isn't available yet — it's still being moved across from the old site.
        </p>
      );
    return url ? (
      <audio className="track" controls preload="none" src={url} />
    ) : (
      <p className="media-note">Preparing audio…</p>
    );
  }

  if (mode === "image") {
    // A picture that cannot be fetched is better left out than drawn as a broken icon;
    // hers are decorative and the prose reads without them.
    if (failed || !url) return null;
    return <img src={url} alt={label} loading="lazy" />;
  }

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
