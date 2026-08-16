import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import programsPortrait from '@assets/CHRISTINE-PROGRAMS-RESIZED_1786696072425.jpg';

export default function Programs() {
  return (
    <Layout>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-aubergine -mt-20 pt-40 pb-28 md:pt-52 md:pb-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn>
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
              Programs
            </span>
            <h1 className="font-serif italic text-warm-white text-[2.8rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[1.05] max-w-3xl mb-10">
              Structured pathways for deeper, supported change.
            </h1>
            <p className="text-warm-white/70 text-xl leading-relaxed max-w-2xl">
              Programs combine one-to-one expertise with a defined framework — a comprehensive, guided approach over a set timeframe.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── LUMINOUS BREAK FREE — FEATURED ───────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn className="mb-16">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
              Featured Program
            </span>
            <h2 className="font-serif italic text-aubergine text-4xl md:text-5xl lg:text-[3.5rem] leading-tight">
              Luminous Break Free
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <p className="text-charcoal text-xl leading-relaxed mb-8">
                A personalised, structured transformation journey for women ready to move beyond repeating patterns and reclaim clarity and direction.
              </p>
              <p className="text-charcoal leading-relaxed mb-12">
                This program is not about managing symptoms — it is about locating the source of your friction and systematically dismantling it so you can move forward with genuine momentum.
              </p>

              <div className="space-y-6 mb-12">
                <div className="w-8 h-px bg-champagne" />
                <div>
                  <h3 className="font-serif text-xl text-aubergine mb-3">Who it is for</h3>
                  <p className="text-charcoal leading-relaxed">
                    Women experiencing a persistent feeling of being stuck despite outward success and capability — those who feel they are running on empty.
                  </p>
                </div>
                <div className="w-8 h-px bg-champagne/30" />
                <div>
                  <h3 className="font-serif text-xl text-aubergine mb-3">Format & Delivery</h3>
                  <p className="text-charcoal leading-relaxed">
                    Delivered privately, one-to-one. Available in person in Melbourne or online via Zoom across Australia.
                  </p>
                </div>
              </div>

              <Link href="/contact">
                <Button size="lg" className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-10 h-14">
                  Enquire About Availability
                </Button>
              </Link>
            </FadeIn>

            <FadeIn delay={0.2} direction="left">
              <div className="bg-aubergine p-10 md:p-12">
                <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
                  What it includes
                </span>
                <div className="space-y-6">
                  {[
                    { n: '01', label: 'Comprehensive initial assessment' },
                    { n: '02', label: 'Structured one-to-one sessions with Christine' },
                    { n: '03', label: 'Guided reflection and integration materials' },
                    { n: '04', label: 'Priority support between sessions' },
                  ].map(({ n, label }) => (
                    <div key={n} className="flex items-start gap-6 pb-6 border-b border-white/10 last:border-0 last:pb-0">
                      <span className="font-serif italic text-champagne/60 text-2xl leading-none shrink-0 mt-0.5" aria-hidden="true">{n}</span>
                      <p className="text-warm-white/80 leading-relaxed">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <img
                  src={programsPortrait}
                  alt="Christine M Long"
                  className="w-full aspect-[4/3] object-cover object-top"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── OTHER WAYS ───────────────────────────────────────────────────── */}
      <section className="bg-plum py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn className="mb-20">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
              Other ways to work together
            </span>
            <h2 className="font-serif italic text-warm-white text-3xl md:text-4xl leading-tight max-w-2xl">
              Not every engagement needs to be a program.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <FadeIn className="py-8 md:pr-16">
              <div className="font-serif italic text-[4rem] leading-none text-champagne mb-6 select-none" aria-hidden="true">01</div>
              <h3 className="font-serif text-2xl text-warm-white mb-4">Personal Transformation</h3>
              <p className="text-warm-white/70 leading-relaxed mb-8 text-sm">
                Private support tailored to your specific circumstances, focusing on confidence, direction, and overcoming personal barriers.
              </p>
              <Link href="/work-with-christine#personal" className="inline-flex items-center text-champagne text-xs font-semibold tracking-[0.15em] uppercase hover:text-champagne/80 transition-colors">
                Explore Support <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </FadeIn>

            <FadeIn delay={0.15} className="py-8 md:pl-16">
              <div className="font-serif italic text-[4rem] leading-none text-champagne mb-6 select-none" aria-hidden="true">02</div>
              <h3 className="font-serif text-2xl text-warm-white mb-4">Leadership & Business</h3>
              <p className="text-warm-white/70 leading-relaxed mb-8 text-sm">
                Strategic clarity for founders and leaders dealing with decision fatigue, bottlenecks, or the personal dynamics of running a business.
              </p>
              <Link href="/work-with-christine#leadership" className="inline-flex items-center text-champagne text-xs font-semibold tracking-[0.15em] uppercase hover:text-champagne/80 transition-colors">
                Explore Support <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-32 text-center">
        <div className="container mx-auto px-8 max-w-3xl">
          <FadeIn>
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
              Ready to begin?
            </span>
            <h2 className="font-serif italic text-aubergine text-4xl md:text-5xl leading-tight mb-10">
              Find the right path forward.
            </h2>
            <p className="text-charcoal text-xl leading-relaxed mb-12 max-w-xl mx-auto">
              Book a complimentary Clarity Call. Christine will listen and recommend the approach best suited to your circumstances.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-12 h-14">
                Book a Clarity Call
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
}
