/**
 * Christine's lesson bodies came out of WordPress as raw post content, which needs a few
 * adjustments before it reads correctly here. None of this touches the database: the
 * migration is the record of what she actually wrote.
 */

/**
 * WordPress served every page at /membership-site/<slug>. This app serves lessons at
 * /membership-site/l/<slug>, so the buttons -- 2,081 of them across the programme -- all
 * landed on "Page not found".
 *
 * Links already carrying an app route, and anything the migration marked unresolvable,
 * are left alone.
 */
export function rewriteLessonLinks(html: string): string {
  return html.replace(
    /href="\/membership-site\/(?!l\/|m\/|admin\b)([^"#?]+?)\/?"/g,
    'href="/membership-site/l/$1"',
  );
}

/**
 * WordPress filled [wlm_firstname] in before the page was served. The migration preserved
 * those as {{first_name}}; this puts the member's name back. Where we don't have a name,
 * the token and any stray punctuation around it are dropped rather than left showing.
 */
export function personalise(html: string, firstName: string): string {
  if (!html.includes("{{first_name}}")) return html;
  if (firstName) return html.replaceAll("{{first_name}}", firstName);
  return html
    .replace(/,?\s*\{\{first_name\}\}\s*,/g, ",")
    .replace(/\s*\{\{first_name\}\}/g, "");
}

/** What the renderer should put in a marker's place, once it has a signed URL. */
export type MediaMode = "embed" | "download" | "audio" | "image";

/** Marks a place the renderer fills in with a file, once it has a signed URL. */
export const MEDIA_MARKER =
  /<div data-media="([^"]*)" data-label="([^"]*)" data-mode="(embed|download|audio|image)"><\/div>/;


/**
 * Her PDFs are already positioned in the text -- WordPress embedded a viewer where the
 * anchor sat, rather than sending the reader to another page. The migration kept those
 * anchors pointing at their old /media/ paths, which resolve to nothing here, so they had
 * degraded into ordinary links.
 *
 * All 381 of them match a row in the media table and all 381 are uploaded, so each can be
 * turned back into an embedded document. This leaves a marker for the renderer, which
 * needs an async signed URL and therefore cannot be done in a string pass.
 */
export function markMedia(html: string): string {
  return (
    html
      .replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (whole, attrs: string, label: string) => {
        const href = /href="\/media\/([^"]+)"/i.exec(attrs);
        if (!href) return whole;
        // data-type="pdf" is the one WordPress showed inline; the other 159 /media/ links are
        // her "click here to download" anchors, which resolve to nothing here and were dead.
        const mode = /data-type="pdf"/i.test(attrs) ? "embed" : "download";
        const text = label.replace(/<[^>]*>/g, "").trim();
        return marker(href[1], text, mode);
      })
      // The players. 96 of them across the programme, all still pointing at /media/, so the
      // control drew itself but had no source behind it -- it looked like audio and did
      // nothing when clicked, while the real track was signed separately into the sidebar at
      // the foot of the page. All 37 files are uploaded.
      .replace(/<audio\b([^>]*)>[\s\S]*?<\/audio>/gi, (whole, attrs: string) => {
        const src = /src="([^"]*)"/i.exec(attrs);
        if (!src) return whole;
        const path = /^\/media\/(.+)$/.exec(src[1]);
        // Two attunements were exported with src="undefined" and have no audio row at all.
        // They still get a marker, so the page says the recording is missing rather than
        // offering a control that cannot play.
        if (!path && src[1] !== "undefined") return whole;
        return marker(path ? path[1] : "", "", "audio");
      })
      // Her pictures, dead the same way: 98 placements of 30 uploaded files, every one of
      // them drawing a broken-image icon.
      .replace(/<img\b([^>]*)>/gi, (whole, attrs: string) => {
        const src = /src="\/media\/([^"]+)"/i.exec(attrs);
        if (!src) return whole;
        const alt = /alt="([^"]*)"/i.exec(attrs);
        return marker(src[1], alt?.[1] ?? "", "image");
      })
  );
}

function marker(path: string, label: string, mode: MediaMode): string {
  return `<div data-media="${path}" data-label="${escapeAttr(label)}" data-mode="${mode}"></div>`;
}

/**
 * Her pages end with a row of navigation buttons -- "Live Event Dates", "View all
 * Modules", "WWW Personal Planner" -- concatenated with no whitespace between them. As
 * full-width stacked bars they read as more material, and her own instruction to "click
 * the bottom right button" stops making sense.
 *
 * 529 sections carry prose followed by such a run. The other 124 are nothing but buttons:
 * those are the module board's material lists and must stay as they are.
 */
export function groupTrailingNav(html: string): string {
  const withoutButtons = html.replace(/<a class="btn"[^>]*>[\s\S]*?<\/a>/gi, "").trim();
  if (withoutButtons.length < 40) return html;

  return html.replace(
    /((?:\s*<a class="btn"[^>]*>[\s\S]*?<\/a>)+)\s*$/i,
    (run: string) => `\n\n<nav class="lesson-nav">${run.trim()}</nav>\n\n`,
  );
}

/** The storage paths shown in a body, so the sidebar can skip what is already on show. */
export function inlineMediaPaths(html: string): string[] {
  return [...html.matchAll(/(?:href|src)="\/media\/([^"]+)"/gi)].map((m) => m[1]);
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

const BLOCKS =
  "address|article|aside|blockquote|details|div|dl|fieldset|figcaption|figure|footer|form|h[1-6]|header|hr|iframe|main|menu|nav|ol|p|pre|section|table|ul|audio|video";

/**
 * WordPress never stored paragraph tags. It ran wpautop at render time, turning blank
 * lines into paragraphs, and the migration preserved the raw content -- so 478 of the 680
 * sections arrive as unbroken runs of text with no <p> to style. That is why the material
 * reads as one dense block.
 *
 * This is wpautop's approach: give block elements their own breathing space first, so a
 * list or heading is never swallowed into a paragraph, then treat what remains between
 * blank lines as paragraphs and single newlines as line breaks.
 */
export function autoParagraphs(html: string): string {
  // The sixteen sections that already carry paragraphs are left exactly as they are.
  if (/<p[\s>]/i.test(html)) return html;

  const spaced = html
    .replace(/\r\n?/g, "\n")
    .replace(new RegExp(`(<(?:${BLOCKS})\\b[^>]*>)`, "gi"), "\n\n$1")
    .replace(new RegExp(`(</(?:${BLOCKS})>)`, "gi"), "$1\n\n");

  return spaced
    .split(/\n{2,}/)
    .map((chunk) => {
      const t = chunk.trim();
      if (!t) return "";
      if (new RegExp(`^</?(?:${BLOCKS})\\b`, "i").test(t)) return t;
      return `<p>${t.replace(/\n/g, "<br />")}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

/**
 * Every fix, in the order they depend on each other. The navigation run is grouped before
 * paragraphs are added, so the <nav> is already a block and never gets wrapped in a <p>.
 */
export function prepareBody(html: string, firstName: string): string {
  const linked = rewriteLessonLinks(personalise(html, firstName));
  return autoParagraphs(groupTrailingNav(markMedia(linked)));
}
