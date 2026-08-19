import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';

import heroPortrait from '@assets/Christine_Hero_1786696065293.webp';
import programsPortrait from '@assets/CHRISTINE-PROGRAMS-RESIZED_1786696072425.jpg';
import bookCover from '@assets/Align_Expand_Succeed_Cover_1787114955752.jpg';

export default function About() {
  return (
    <Layout>

      {/* ── HERO — split aubergine / photo ───────────────────────────────── */}
      <section className="relative flex flex-col lg:flex-row -mt-20">
        <div className="relative order-1 lg:order-2 lg:w-[45%] aspect-[3/4] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[80vh] flex-shrink-0">
          <img
            src={heroPortrait}
            alt="Christine M Long"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>
        <div className="bg-aubergine flex items-center order-2 lg:order-1 lg:w-[55%]">
          <div className="px-8 sm:px-12 lg:px-16 xl:px-24 pt-28 pb-20 lg:pt-40 lg:pb-32 w-full">
            <div className="lg:max-w-xl xl:max-w-2xl ml-auto">
              <FadeIn delay={0.1}>
                <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
                  About Christine
                </span>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="font-serif italic text-warm-white text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.2rem] leading-[1.08] mb-10">
                  More than three decades helping people see what others miss.
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="w-10 h-px bg-champagne/50 mb-10" />
                <p className="text-warm-white/70 text-lg leading-relaxed">
                  Christine M Long is the founder of A New You. Since 1989, she has worked with intelligent, established individuals to resolve the deep patterns that restrict their potential.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISTINCTIVE STRENGTH ─────────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn className="mb-20">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
              Her approach
            </span>
            <h2 className="font-serif italic text-aubergine text-3xl md:text-4xl lg:text-5xl leading-tight max-w-3xl">
              Listening beyond the obvious.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn>
              <p className="text-charcoal text-xl leading-relaxed mb-8">
                Christine has an uncommon ability to quickly identify the thread connecting a client's seemingly unrelated challenges.
              </p>
              <p className="text-charcoal leading-relaxed">
                Whether you are dealing with a business bottleneck or a personal transition, she helps you locate the root pattern and work with it directly — saving months of unnecessary struggle.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="w-8 h-px bg-champagne mb-8" />
              <h3 className="font-serif text-2xl text-aubergine mb-6">Her work sits at the intersection of</h3>
              <ul className="space-y-4 text-charcoal">
                {['Personal transformation', 'Leadership clarity', 'Wellbeing & sustained performance'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── THE FOUNDING ─────────────────────────────────────────────────── */}
      <section className="bg-aubergine py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
                Founded 1989
              </span>
              <h2 className="font-serif italic text-warm-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-10">
                The founding of A New You.
              </h2>
              <p className="text-warm-white/70 text-lg leading-relaxed mb-6">
                Over more than 35 years in practice, Christine has observed firsthand why some people achieve lasting change while others find themselves continually addressing the same issues.
              </p>
              <p className="text-warm-white/70 leading-relaxed">
                Her approach developed out of a recognition that standard coaching or therapy often addresses the symptoms without shifting the underlying driver. She sought to create a more efficient, profound way of working.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="left">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={programsPortrait}
                    alt="Christine M Long — programs"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── AUTHOR ────────────────────────────────────────────────────────── */}
      <section className="bg-plum py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-14 lg:gap-24 items-center">
            <FadeIn direction="right" className="mx-auto lg:mx-0 w-full max-w-[280px]">
              <a
                href="https://www.amazon.com/Align-Expand-Succeed-Shifting-entrepreneurial/dp/1934509310"
                target="_blank"
                rel="noreferrer"
                aria-label="View Align, Expand and Succeed on Amazon"
                className="block shadow-2xl transition-transform duration-300 hover:-translate-y-2"
              >
                <img
                  src={bookCover}
                  alt="Align, Expand and Succeed: Shifting the Paradigm of Entrepreneurial Success"
                  className="w-full h-auto"
                />
              </a>
            </FadeIn>

            <FadeIn>
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
                Author & conscious entrepreneurship
              </span>
              <h2 className="font-serif italic text-warm-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
                Business can be a force for a new world.
              </h2>
              <p className="text-warm-white/75 text-lg leading-relaxed mb-6">
                Christine is a contributing author in <em>Align, Expand and Succeed</em>, a collection of personal stories, practical tools and strategies from conscious entrepreneurs creating meaningful change through business.
              </p>
              <p className="text-warm-white/70 leading-relaxed mb-8">
                The book explores the inner shifts that support outer success, from transforming challenges into opportunities to leading with purpose, making peace with money and releasing what stands between you and your potential.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                {[
                  'Transform challenge into success',
                  'Thrive as a purposeful leader',
                  'Make peace with money',
                  'Release what holds you back',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne shrink-0 mt-2" />
                    <span className="text-warm-white/75 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <blockquote className="border-l border-champagne/60 pl-5 mb-10">
                <p className="font-serif italic text-warm-white/85 text-xl leading-relaxed">
                  “If you want to make a difference in the world through your business, you need to read this book.”
                </p>
                <cite className="not-italic text-champagne text-xs tracking-[0.2em] uppercase mt-3 block">
                  Dr. Ivan Misner, Founder of BNI
                </cite>
              </blockquote>

              <a
                href="https://www.amazon.com/Align-Expand-Succeed-Shifting-entrepreneurial/dp/1934509310"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-champagne text-aubergine hover:bg-champagne/90 rounded-none text-xs font-bold tracking-[0.2em] uppercase px-8 h-12 transition-colors"
              >
                Find the book on Amazon
                <span aria-hidden="true">↗</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── QUALIFICATIONS ───────────────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn className="mb-16">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
              Qualifications & methodologies
            </span>
            <h2 className="font-serif italic text-aubergine text-3xl md:text-4xl leading-tight max-w-2xl">
              35+ years of expertise, formally and independently developed.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-blush">
            {[
              'Creator of Core Issue Elimination',
              'Creator of Inner Insight Mastery',
              'Contributing author in Align, Expand and Succeed',
              'Advanced Practitioner of Kinesiology',
            ].map((item, i) => (
              <FadeIn key={i} delay={0.08 * i} className="py-8 md:px-10 first:md:pl-0 last:md:pr-0">
                <div className="font-serif italic text-[3rem] leading-none text-champagne mb-4 select-none" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-charcoal">{item}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10">
            <p className="text-xs text-charcoal tracking-[0.2em] uppercase">[Verify all credentials before publication]</p>
          </FadeIn>
        </div>
      </section>

      {/* ── WHAT IT'S LIKE ───────────────────────────────────────────────── */}
      <section className="bg-plum py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn>
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
                The experience
              </span>
              <h2 className="font-serif italic text-warm-white text-3xl md:text-4xl leading-tight mb-10">
                What it is like to work with her.
              </h2>
              <p className="text-warm-white/70 text-lg leading-relaxed mb-6">
                Clients describe Christine as an experienced, calm guide who has heard it all and can take you straight to what matters.
              </p>
              <p className="text-warm-white/70 leading-relaxed">
                She is warm but never soft. She won't waste your time with platitudes — she is there to help you create genuine, workable change.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="w-8 h-px bg-champagne/50 mb-10" />
              <div className="space-y-10">
                <div>
                  <h3 className="font-serif text-xl text-champagne mb-3">Melbourne — In Person</h3>
                  <p className="text-warm-white/70 leading-relaxed text-sm">
                    Consultations are available in a beautifully appointed, private consulting room. Tactile, composed, and quietly confident.
                  </p>
                </div>
                <div className="w-8 h-px bg-white/10" />
                <div>
                  <h3 className="font-serif text-xl text-champagne mb-3">Online — Australia-wide</h3>
                  <p className="text-warm-white/70 leading-relaxed text-sm">
                    Christine works extensively with clients across Australia via Zoom. The methodology translates perfectly to the online environment.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-32 text-center">
        <div className="container mx-auto px-8 max-w-3xl">
          <FadeIn>
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
              Begin here
            </span>
            <h2 className="font-serif italic text-aubergine text-4xl md:text-5xl leading-tight mb-10">
              Start with a conversation.
            </h2>
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
