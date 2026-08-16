import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';

export default function ClientStories() {
  return (
    <Layout>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-aubergine -mt-20 pt-40 pb-28 md:pt-52 md:pb-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn>
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
              Client Stories
            </span>
            <h1 className="font-serif italic text-warm-white text-[2.8rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[1.05] max-w-3xl mb-10">
              Words from the people who have done the work.
            </h1>
            <div className="w-10 h-px bg-champagne/50" />
          </FadeIn>
        </div>
      </section>

      {/* ── LEADERSHIP & BUSINESS ────────────────────────────────────────── */}
      <section className="bg-plum py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn className="mb-20">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
              Leadership & Business
            </span>
            <div className="w-8 h-px bg-champagne/40" />
          </FadeIn>

          <div className="space-y-20">
            <FadeIn>
              <blockquote className="font-serif italic text-warm-white text-2xl md:text-3xl lg:text-4xl leading-tight max-w-4xl mb-8">
                "I had spent years in personal development and understood myself well — or so I thought. Christine helped me see a pattern I had completely missed. Within a few sessions I made a decision I had been avoiding for two years."
              </blockquote>
              <cite className="block font-sans font-medium text-champagne not-italic text-sm tracking-[0.15em] uppercase">
                S.M. — Business Owner, Melbourne
              </cite>
              <p className="text-warm-white/40 text-xs tracking-[0.2em] uppercase mt-3">[Placeholder pending permission]</p>
            </FadeIn>

            <div className="w-full h-px bg-white/10" />

            <FadeIn>
              <blockquote className="font-serif italic text-warm-white text-2xl md:text-3xl lg:text-4xl leading-tight max-w-4xl mb-8">
                "Working with Christine is completely different from traditional coaching. She doesn't just ask questions — she has an incredible ability to pinpoint exactly where the blockage is and help you clear it quickly."
              </blockquote>
              <cite className="block font-sans font-medium text-champagne not-italic text-sm tracking-[0.15em] uppercase">
                A.L. — Senior Executive
              </cite>
              <p className="text-warm-white/40 text-xs tracking-[0.2em] uppercase mt-3">[Placeholder pending permission]</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PERSONAL TRANSFORMATION ──────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn className="mb-20">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
              Personal Transformation
            </span>
            <div className="w-8 h-px bg-champagne" />
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn>
              <blockquote className="font-serif italic text-aubergine text-2xl md:text-3xl leading-tight mb-8">
                "The insight I gained in our very first session completely shifted my perspective. I had been carrying a huge amount of unnecessary pressure for decades."
              </blockquote>
              <cite className="block font-sans font-medium text-plum not-italic text-sm tracking-[0.15em] uppercase">
                K.T.
              </cite>
              <p className="text-charcoal/50 text-xs tracking-[0.2em] uppercase mt-3">[Placeholder pending permission]</p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <blockquote className="font-serif italic text-aubergine text-2xl md:text-3xl leading-tight mb-8">
                "A rare ability to cut through the noise and get straight to the heart of the issue. I feel lighter, clearer, and much more confident in my path forward."
              </blockquote>
              <cite className="block font-sans font-medium text-plum not-italic text-sm tracking-[0.15em] uppercase">
                J.R.
              </cite>
              <p className="text-charcoal/50 text-xs tracking-[0.2em] uppercase mt-3">[Placeholder pending permission]</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-aubergine py-24 md:py-36 text-center">
        <div className="container mx-auto px-8 max-w-3xl">
          <FadeIn>
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
              Begin here
            </span>
            <h2 className="font-serif italic text-warm-white text-4xl md:text-5xl leading-tight mb-10">
              Experience the shift for yourself.
            </h2>
            <p className="text-warm-white/70 text-xl leading-relaxed mb-12 max-w-xl mx-auto">
              If you resonate with these stories, the first step is a simple conversation.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-12 h-14">
                Book Your Clarity Call
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

    </Layout>
  );
}
