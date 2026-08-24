import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Check } from "lucide-react";
import { fetchLessons, fetchModuleBySlug, fetchProgress } from "@/lib/api";
import { Empty, ProgressBar, Spinner } from "@/components/Bits";

export default function ModulePage() {
  const [, params] = useRoute("/m/:slug");
  const slug = params?.slug ?? "";

  const mod = useQuery({ queryKey: ["module", slug], queryFn: () => fetchModuleBySlug(slug) });
  const lessons = useQuery({
    queryKey: ["lessons", mod.data?.id],
    queryFn: () => fetchLessons(mod.data!.id),
    enabled: !!mod.data?.id,
  });
  const progress = useQuery({ queryKey: ["progress"], queryFn: fetchProgress });

  if (mod.isLoading) return <Spinner />;
  if (!mod.data)
    return (
      <Empty
        title="This module isn't available to you"
        detail="Either it hasn't been released to your account yet, or the link is wrong. Head back to your dashboard."
      />
    );

  const done = new Set((progress.data ?? []).filter((p) => p.completed_at).map((p) => p.lesson_id));
  const items = lessons.data ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/" className="text-xs uppercase tracking-[0.14em] text-champagne no-underline">
          ← All modules
        </Link>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-aubergine">{mod.data.name}</h1>
        {mod.data.summary && <p className="mt-3 max-w-prose text-plum">{mod.data.summary}</p>}
        <div className="mt-5 max-w-sm">
          <ProgressBar done={items.filter((l) => done.has(l.id)).length} total={items.length} />
        </div>
      </div>

      {lessons.isLoading ? (
        <Spinner label="Loading lessons" />
      ) : (
        <ul className="flex flex-col overflow-hidden rounded-sm border border-line">
          {items.map((l) => (
            <li key={l.id}>
              <Link
                href={`/l/${l.slug}`}
                className="flex items-center gap-3 border-b border-line bg-surface px-5 py-4 no-underline last:border-0 hover:bg-subtle"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    done.has(l.id)
                      ? "border-champagne bg-champagne text-white"
                      : "border-line bg-subtle"
                  }`}
                  aria-hidden="true"
                >
                  {done.has(l.id) && <Check size={12} strokeWidth={3} />}
                </span>
                <span className="flex-1 text-sm text-charcoal">{l.title}</span>
                {l.status === "draft" && (
                  <span className="rounded-sm bg-subtle px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mute">
                    Draft
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
