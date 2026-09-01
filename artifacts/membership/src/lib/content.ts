/**
 * Christine's lesson bodies came out of WordPress with their original link targets, and
 * those need two adjustments before they work here.
 */

/**
 * WordPress served every page at /membership-site/<slug>. This app serves lessons at
 * /membership-site/l/<slug>, so the buttons -- 2,081 of them across the programme -- all
 * landed on "Page not found". Rewriting at render time keeps her HTML untouched in the
 * database, which matters because the migration is the record of what she wrote.
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

/** Both fixes, in the order they need to happen. */
export function prepareBody(html: string, firstName: string): string {
  return rewriteLessonLinks(personalise(html, firstName));
}
