import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import heroPortrait from '@assets/Christine_Hero_1786696065293.webp';
import aboutPortrait from '@assets/CHRISTINE-PROGRAMS-RESIZED_1786696072425.jpg';
import article1 from '@/assets/article-1.jpg';
import article2 from '@/assets/article-2.jpg';
import article3 from '@/assets/article-3.jpg';

export default function Home() {
  return (
    <Layout>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col lg:flex-row min-h-screen -mt-20">

        {/* Photo panel — top on mobile, right on desktop */}
        <div className="relative order-1 lg:order-2 lg:w-[48%] aspect-[3/4] sm:aspect-[4/3] lg:aspect-auto flex-shrink-0">
          <img
            src={heroPortrait}
            alt="Christine M Long"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        {/* Text panel */}
        <div className="bg-aubergine flex items-center order-2 lg:order-1 lg:w-[52%]">
          <div className="px-8 sm:px-12 lg:px-16 xl:px-24 pt-28 pb-20 lg:pt-36 lg:pb-28 w-full">
            <div className="lg:max-w-xl xl:max-w-2xl ml-auto">
              <FadeIn delay={0.1}>
                <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-10 block">
                  Christine M Long · Transformation Practice
                </span>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="font-serif italic text-warm-white text-[2.8rem] sm:text-[3.5rem] lg:text-[4.2rem] xl:text-[5rem] leading-[1.05] mb-10">
                  You are not starting over. You are ready to move forward differently.
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-warm-white/65 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
                  For established women, founders and leaders who feel stuck beneath the surface. Identify the patterns, reconnect with what matters, create meaningful momentum.
                </p>
              </FadeIn>
              <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-8 h-14 w-full sm:w-auto"
                  >
                    Book a Clarity Call
                  </Button>
                </Link>
                <Link href="/work-with-christine">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-warm-white/20 text-warm-white hover:bg-warm-white/5 rounded-none text-xs font-semibold tracking-[0.15em] uppercase px-8 h-14 w-full sm:w-auto"
                  >
                    Explore Work Together
                  </Button>
                </Link>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div className="mt-12 pt-10 border-t border-white/10">
                  <p className="text-warm-white/75 text-xs tracking-[0.25em] uppercase">
                    35+ years · Melbourne & Online Australia-wide · Founder-led
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM RECOGNITION ──────────────────────────────────────────── */}
      <section className="bg-plum py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn>
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-16 block">
              Does this sound familiar?
            </span>
          </FadeIn>
          <div className="divide-y divide-white/10">
            {[
              'You know something needs to change, but cannot see the right next move.',
              'Old patterns return — even after insight, effort and time.',
              'Life or leadership asks more than your current way of operating can sustain.',
            ].map((statement, idx) => (
              <FadeIn key={idx} delay={0.1 * idx}>
                <p className="font-serif italic text-warm-white text-2xl md:text-3xl lg:text-[2.2rem] leading-relaxed py-10 md:py-12">
                  {statement}
                </p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <p className="text-warm-white/90 text-lg md:text-xl leading-relaxed mt-16 max-w-2xl">
              More information is rarely the answer. The real shift begins when you can see what is driving the pattern and work with it differently.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── WHAT BECOMES POSSIBLE ────────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-6xl">
          <FadeIn className="text-center mb-20">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase block mb-6">
              What changes
            </span>
            <h2 className="font-serif italic text-aubergine text-4xl md:text-5xl lg:text-[3.5rem] leading-tight max-w-3xl mx-auto">
              Clarity changes what becomes possible
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-blush border border-blush">
            {[
              { num: '01', text: 'See the underlying issue more clearly' },
              { num: '02', text: 'Make decisions with greater confidence' },
              { num: '03', text: 'Replace unhelpful patterns with practical responses' },
              { num: '04', text: 'Move forward with renewed direction and momentum' },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={0.1 * idx} className="bg-porcelain p-12 md:p-16">
                <span className="font-serif text-champagne text-5xl md:text-6xl block mb-5 leading-none">
                  {item.num}
                </span>
                <p className="font-serif italic text-aubergine text-2xl md:text-3xl leading-snug">
                  {item.text}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAYS TO WORK TOGETHER ────────────────────────────────────────── */}
      <section className="bg-aubergine py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn className="mb-16">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase block mb-6">
              Work with Christine
            </span>
            <h2 className="font-serif text-warm-white text-4xl md:text-5xl lg:text-[3.5rem] leading-tight">
              Choose the support that fits where you are now
            </h2>
          </FadeIn>
          <div className="divide-y divide-white/10">
            {[
              {
                title: 'Personal Transformation',
                desc: 'Private support for confidence, direction, habits and patterns that affect how you feel and live.',
                linkText: 'Explore Personal Transformation',
                linkPath: '/work-with-christine',
              },
              {
                title: 'Leadership & Business Clarity',
                desc: 'For founders and leaders ready to address the personal dynamics influencing their business.',
                linkText: 'Explore Leadership Support',
                linkPath: '/work-with-christine',
              },
              {
                title: 'Programs & Experiences',
                desc: 'Structured pathways for deeper, supported change — including Luminous Break Free.',
                linkText: 'View Current Programs',
                linkPath: '/programs',
              },
            ].map((service, idx) => (
              <FadeIn key={idx} delay={0.1 * idx}>
                <div className="group py-12 md:py-14 flex flex-col md:flex-row md:items-center gap-6 md:gap-16">
                  <span className="font-serif italic text-champagne/30 text-5xl md:text-6xl w-20 flex-shrink-0 leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-warm-white text-2xl md:text-3xl mb-3 group-hover:text-champagne transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-warm-white/70 text-lg leading-relaxed">{service.desc}</p>
                  </div>
                  <Link
                    href={service.linkPath}
                    className="text-rose font-medium text-sm hover:text-rose/70 inline-flex items-center gap-3 flex-shrink-0 transition-all duration-300 group-hover:gap-5"
                  >
                    {service.linkText} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTHORITY — ABOUT CHRISTINE ──────────────────────────────────── */}
      <section className="relative bg-porcelain overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[640px]">
          {/* Photo — left half, full bleed */}
          <div className="relative lg:w-[45%] aspect-[4/3] lg:aspect-auto flex-shrink-0">
            <img
              src={aboutPortrait}
              alt="Christine M Long"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          {/* Text — right half */}
          <div className="lg:w-[55%] bg-porcelain flex items-center">
            <div className="px-8 sm:px-12 lg:px-20 xl:px-28 py-20 max-w-2xl">
              <FadeIn>
                <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase block mb-8">
                  About Christine
                </span>
                <h2 className="font-serif italic text-aubergine text-4xl md:text-5xl leading-tight mb-8">
                  Experience helps you get beneath the surface
                </h2>
                <p className="text-charcoal text-lg leading-relaxed mb-10">
                  Christine M Long founded A New You in 1989 and has spent more than three decades working across personal transformation, wellbeing, leadership and business development. Her strength lies in listening beyond the obvious, recognising the patterns connecting different areas of a person's life, and helping clients find a clear, workable way forward.
                </p>
                <div className="space-y-5 mb-12">
                  {[
                    'Founder of A New You since 1989',
                    'Co-author of Align, Expand and Succeed',
                    'Creator of Core Issue Elimination and Inner Insight Mastery',
                    'Consultations in person, by phone and online',
                  ].map((cred, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-8 h-px bg-champagne flex-shrink-0 mt-[0.6em]" />
                      <span className="text-plum text-base">{cred}</span>
                    </div>
                  ))}
                </div>
                <Link href="/about">
                  <Button className="bg-aubergine hover:bg-aubergine/90 text-warm-white border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-8 h-12">
                    Meet Christine <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="bg-warm-white py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-6xl">
          <FadeIn className="text-center mb-20">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase block mb-6">
              How it works
            </span>
            <h2 className="font-serif italic text-aubergine text-4xl md:text-5xl lg:text-[3.5rem] leading-tight">
              A clear process, shaped around you
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-blush">
            {[
              {
                num: '1',
                title: 'Start with a conversation',
                desc: 'Discuss what is happening, what you have tried and what you want to change.',
              },
              {
                num: '2',
                title: 'Identify the priority',
                desc: 'Christine recommends the most appropriate session, program or next step.',
              },
              {
                num: '3',
                title: 'Create practical momentum',
                desc: 'Work through the pattern with personalised support and actions that fit your life.',
              },
            ].map((step, idx) => (
              <FadeIn key={idx} delay={0.1 * idx} className="px-10 md:px-14 py-12 md:py-16">
                <div aria-hidden="true" className="font-serif italic text-[5.5rem] leading-none text-champagne mb-6 select-none">
                  {step.num}
                </div>
                <h3 className="font-serif text-2xl text-aubergine mb-4">{step.title}</h3>
                <p className="text-charcoal leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL — FULL BLEED ─────────────────────────────────────── */}
      <section className="bg-plum py-24 md:py-40">
        <div className="container mx-auto px-8 md:px-12 max-w-4xl text-center">
          <FadeIn>
            <span aria-hidden="true" className="font-serif text-champagne/25 text-[8rem] leading-none block mb-0 select-none">
              "
            </span>
            <blockquote className="font-serif italic text-warm-white text-2xl md:text-3xl lg:text-[2.2rem] leading-relaxed -mt-6 mb-10">
              I had spent years in personal development and understood myself well — or so I thought. Christine helped me see a pattern I had completely missed. Within a few sessions I made a decision I had been avoiding for two years. The difference in how I approach my business now is tangible.
            </blockquote>
            <cite className="text-champagne font-sans font-semibold tracking-[0.25em] text-xs uppercase not-italic block mb-16">
              S.M. · Business Owner, Melbourne
            </cite>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/client-stories">
              <Button
                variant="outline"
                className="border-warm-white/20 text-warm-white hover:bg-warm-white/5 rounded-none text-xs font-semibold tracking-[0.2em] uppercase px-8 h-12"
              >
                Read Client Stories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── FEATURED PROGRAM ─────────────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn>
            <div className="border-l-4 border-champagne pl-10 md:pl-16 py-4">
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase block mb-8">
                Featured Program
              </span>
              <h2 className="font-serif italic text-aubergine text-4xl md:text-5xl mb-6 leading-tight">
                Luminous Break Free
              </h2>
              <p className="text-charcoal text-xl leading-relaxed mb-12 max-w-2xl">
                A personalised, structured transformation journey for women ready to move beyond repeating patterns and reclaim clarity and direction.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl">
                {[
                  {
                    label: 'Who it is for',
                    desc: '[Placeholder] Women experiencing a persistent feeling of being stuck despite outward success and capability.',
                  },
                  {
                    label: 'What it includes',
                    desc: '[Placeholder] Structured one-to-one sessions with Christine, guided reflection materials, and priority support.',
                  },
                  {
                    label: 'Format & delivery',
                    desc: '[Placeholder] Delivered one-to-one, in person in Melbourne or online across Australia.',
                  },
                ].map((detail, idx) => (
                  <div key={idx}>
                    <div className="w-6 h-px bg-champagne mb-4" />
                    <p className="text-plum font-semibold text-sm mb-2">{detail.label}</p>
                    <p className="text-charcoal text-sm leading-relaxed">{detail.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/programs">
                <Button className="bg-aubergine hover:bg-aubergine/90 text-warm-white border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-8 h-12">
                  View Programs &amp; Pricing
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── INSIGHTS ─────────────────────────────────────────────────────── */}
      <section className="bg-warm-white py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-6xl">
          <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 pb-10 border-b border-blush gap-6">
            <div>
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase block mb-4">
                Inspired Insights
              </span>
              <h2 className="font-serif italic text-aubergine text-4xl md:text-5xl leading-tight">
                Practical perspectives on change
              </h2>
            </div>
            <Link href="/client-stories" className="text-plum font-semibold text-sm hover:text-aubergine transition-colors inline-flex items-center gap-2 flex-shrink-0">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                img: article1,
                title: 'Why high-achieving people can still feel stuck',
                desc: 'Understanding the gap between capability and momentum.',
              },
              {
                img: article2,
                title: 'The difference between knowing what to do and being able to do it',
                desc: 'Why insight alone rarely creates lasting change.',
              },
              {
                img: article3,
                title: 'When a business problem is really a clarity or leadership problem',
                desc: 'Recognising the patterns beneath the strategy.',
              },
            ].map((article, idx) => (
              <FadeIn key={idx} delay={0.1 * idx} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden mb-6 bg-blush relative">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="w-6 h-px bg-champagne mb-4" />
                <h3 className="font-serif text-2xl text-aubergine mb-3 group-hover:text-plum transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-charcoal mb-4 text-base leading-relaxed">{article.desc}</p>
                <span className="text-plum font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read more <ArrowRight className="h-3 w-3" />
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-aubergine py-28 md:py-44 text-center relative">
        <div className="container mx-auto px-8 max-w-3xl">
          <FadeIn>
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase block mb-10">
              Ready to begin?
            </span>
            <h2 className="font-serif italic text-warm-white text-4xl md:text-5xl lg:text-[3.5rem] leading-tight mb-10">
              You do not need to have everything worked out before we talk.
            </h2>
            <p className="text-warm-white/70 text-xl leading-relaxed mb-14 max-w-xl mx-auto">
              If something in your life or business is asking to change, begin with a private, no-pressure conversation about where you are and what support may fit.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-12 h-16"
              >
                Book Your Complimentary Clarity Call
              </Button>
            </Link>
            <p className="text-warm-white/65 mt-10 text-sm tracking-wide">
              or call Christine on{' '}
              <a href="tel:0409140173" className="text-warm-white/70 hover:text-warm-white transition-colors">
                0409 140 173
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Divider between CTA and footer */}
      <div className="bg-aubergine"><div className="container mx-auto px-4 md:px-8 max-w-7xl border-t border-warm-white/20" /></div>

    </Layout>
  );
}
