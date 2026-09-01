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

/** Marks where a PDF should be embedded, for the renderer to fill in with a viewer. */
export const PDF_MARKER = /<div data-pdf="([^"]*)" data-label="([^"]*)"><\/div>/;

/**
 * The same marker for String.split. It carries exactly one capture group, because split
 * inserts every captured group into the result array -- with the two groups above, the
 * storage path and the label were being rendered as text alongside the document.
 */
export const PDF_SPLIT = /(<div data-pdf="(?:[^"]*)" data-label="(?:[^"]*)"><\/div>)/;

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
export function markPdfEmbeds(html: string): string {
  return html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (whole, attrs: string, label: string) => {
    if (!/data-type="pdf"/i.test(attrs)) return whole;
    const href = /href="\/media\/([^"]+)"/i.exec(attrs);
    if (!href) return whole;
    const text = label.replace(/<[^>]*>/g, "").trim();
    return `<div data-pdf="${href[1]}" data-label="${escapeAttr(text)}"></div>`;
  });
}

/** The storage paths embedded in a body, so the sidebar can skip what is already on show. */
export function inlinePdfPaths(html: string): string[] {
  return [...html.matchAll(/<a\b[^>]*href="\/media\/([^"]+)"[^>]*data-type="pdf"/gi)].map(
    (m) => m[1],
  );
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

/** Every fix, in the order they depend on each other. */
export function prepareBody(html: string, firstName: string): string {
  return autoParagraphs(markPdfEmbeds(rewriteLessonLinks(personalise(html, firstName))));
}
