import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { fetchModules, fetchProgress } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { SERIES_LABEL, type Series } from "@/lib/types";
import { Empty, Eyebrow, ModuleStatus, Spinner } from "@/components/Bits";
import { useAuth } from "@/context/Auth";

const ORDER: Series[] = ["transformation", "savvy_start_up", "itbiy", "bonus"];

export default function Dashboard() {
  const { member } = useAuth();
  const modules = useQuery({ queryKey: ["modules"], queryFn: fetchModules });
  const progress = useQuery({ queryKey: ["progress"], queryFn: fetchProgress });

  // Lesson counts per module, for the rails.
  const counts = useQuery({
    queryKey: ["lesson-counts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("lessons").select("id,module_id");
      if (error) throw error;
      const byModule = new Map<number, number[]>();
      for (const l of data ?? []) {
        const arr = byModule.get(l.module_id) ?? [];
        arr.push(l.id);
        byModule.set(l.module_id, arr);
      }
      return byModule;
    },
  });

  if (modules.isLoading || counts.isLoading) return <Spinner label="Loading your programme" />;

  if (modules.error)
    return <Empty title="We couldn't load your modules" detail={String(modules.error)} />;

  if (!modules.data?.length)
    return (
      <Empty
        title="No modules yet"
        detail="Your account is set up, but no programme material has been released to it. Christine will be in touch."
      />
    );

  const doneIds = new Set(
    (progress.data ?? []).filter((p) => p.completed_at).map((p) => p.lesson_id),
  );
  const grouped = ORDER.map((s) => ({
    series: s,
    items: (modules.data ?? []).filter((m) => m.series === s),
  })).filter((g) => g.items.length);

  const releasedLessons = (modules.data ?? []).flatMap((m) => counts.data?.get(m.id) ?? []);
  const doneCount = releasedLessons.filter((id) => doneIds.has(id)).length;

  return (
    <div className="flex flex-col gap-14">
      <div>
        <h1 className="font-serif text-[2.75rem] leading-[1.05] tracking-tight text-ink text-balance">
          {member?.first_name ? `Welcome back, ${member.first_name}` : "Your programme"}
        </h1>
        <p className="mt-4 max-w-prose text-ink-soft">
          {modules.data.length} {modules.data.length === 1 ? "module is" : "modules are"} open to
          you.{" "}
          {doneCount > 0 ? (
            <>
              You've finished{" "}
              <span className="tabular-nums text-ink">
                {doneCount} of {releasedLessons.length}
              </span>{" "}
              lessons.
            </>
          ) : (
            "Start wherever you like — nothing is locked."
          )}
        </p>
      </div>

      {grouped.map(({ series, items }) => (
        <section key={series} className="flex flex-col gap-5">
          <Eyebrow>{SERIES_LABEL[series]}</Eyebrow>
          <div className="grid gap-px overflow-hidden rounded-sm border border-paper-rule bg-paper-rule sm:grid-cols-2">
            {items.map((m) => {
              const lessonIds = counts.data?.get(m.id) ?? [];
              const done = lessonIds.filter((id) => doneIds.has(id)).length;
              const complete = lessonIds.length > 0 && done === lessonIds.length;
              return (
                <Link
                  key={m.id}
                  href={`/m/${m.slug}`}
                  className="group relative flex flex-col gap-4 bg-white px-6 py-5 no-underline transition-colors duration-200 hover:bg-paper-fill"
                >
                  {/* The binding: a gold edge that appears as the card is picked up. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-0.5 bg-gold transition-opacity duration-200 ${
                      complete ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    }`}
                  />
                  <h3 className="font-serif text-[1.4rem] leading-snug text-paper-ink text-balance">
                    {m.name}
                  </h3>
                  <div className="mt-auto">
                    <ModuleStatus done={done} total={lessonIds.length} tone="light" />
                  </div>
                </Link>
              );
            })}
            {items.length % 2 === 1 && (
              <div className="hidden bg-white sm:block" aria-hidden="true" />
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
