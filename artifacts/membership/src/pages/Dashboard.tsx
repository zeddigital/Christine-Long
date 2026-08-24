import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { fetchModules, fetchProgress } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { SERIES_LABEL, type Series } from "@/lib/types";
import { Empty, ProgressBar, Spinner } from "@/components/Bits";
import { useAuth } from "@/context/Auth";

const ORDER: Series[] = ["transformation", "savvy_start_up", "itbiy", "bonus"];

export default function Dashboard() {
  const { member } = useAuth();
  const modules = useQuery({ queryKey: ["modules"], queryFn: fetchModules });
  const progress = useQuery({ queryKey: ["progress"], queryFn: fetchProgress });

  // Lesson counts per module, for the progress bars.
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

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-serif text-4xl leading-none text-aubergine">
          {member?.first_name ? `Welcome back, ${member.first_name}` : "Your programme"}
        </h1>
        <p className="mt-3 max-w-prose text-plum">
          {modules.data.length} {modules.data.length === 1 ? "module has" : "modules have"} been
          released to you. Pick up wherever you left off.
        </p>
      </div>

      {grouped.map(({ series, items }) => (
        <section key={series} className="flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-champagne">
            {SERIES_LABEL[series]}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((m) => {
              const lessonIds = counts.data?.get(m.id) ?? [];
              const done = lessonIds.filter((id) => doneIds.has(id)).length;
              return (
                <Link
                  key={m.id}
                  href={`/m/${m.slug}`}
                  className="flex flex-col gap-3 rounded-sm border border-line bg-surface p-5 no-underline transition-all hover:border-champagne hover:shadow-[0_2px_10px_-4px_rgba(43,38,44,0.18)]"
                >
                  <h3 className="font-serif text-xl leading-snug text-aubergine">{m.name}</h3>
                  <div className="mt-auto">
                    <ProgressBar done={done} total={lessonIds.length} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
