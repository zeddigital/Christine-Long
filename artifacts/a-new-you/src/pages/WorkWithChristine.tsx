import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function WorkWithChristine() {
  return (
    <Layout>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-aubergine -mt-20 pt-40 pb-28 md:pt-52 md:pb-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn>
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
              Work with Christine
            </span>
            <h1 className="font-serif italic text-warm-white text-[2.8rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[1.05] max-w-3xl mb-10">
              Personal support for meaningful change in life, leadership and business.
            </h1>
            <div className="w-10 h-px bg-champagne/50" />
          </FadeIn>
        </div>
      </section>

      {/* ── WHERE DO YOU RECOGNISE YOURSELF? ─────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn className="mb-20">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
              Which of these sounds most like you?
            </span>
            <p className="text-charcoal text-xl leading-relaxed max-w-2xl">
              You already know how to work hard, achieve goals and support others. But when the current approach stops working, trying harder is rarely the answer.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-blush">
            {[
              {
                quote: '"I feel personally stuck."',
                body: 'Navigating a life transition, feeling a loss of confidence, or noticing recurring habits that drain your energy.',
                link: '#personal',
                label: 'Personal Transformation',
              },
              {
                quote: '"My business is draining me."',
                body: 'A founder or leader where the business is amplifying your personal patterns. You need clarity without burning out.',
                link: '#leadership',
                label: 'Leadership & Business',
              },
              {
                quote: '"I want a structured process."',
                body: 'You prefer a defined framework to guide you through a period of change, with clear steps and dedicated support.',
                link: '/programs',
                label: 'View Programs',
                isRoute: true,
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 * i} className="py-10 md:px-12 first:md:pl-0 last:md:pr-0">
                <div className="font-serif italic text-aubergine text-2xl mb-6 leading-tight">{item.quote}</div>
                <p className="text-charcoal leading-relaxed mb-8 text-sm">{item.body}</p>
                {item.isRoute ? (
                  <Link href={item.link} className="inline-flex items-center text-xs font-semibold tracking-[0.15em] uppercase text-aubergine hover:text-plum transition-colors">
                    {item.label} →
                  </Link>
                ) : (
                  <a href={item.link} className="inline-flex items-center text-xs font-semibold tracking-[0.15em] uppercase text-aubergine hover:text-plum transition-colors">
                    {item.label} →
                  </a>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONAL TRANSFORMATION ──────────────────────────────────────── */}
      <section id="personal" className="bg-aubergine py-24 md:py-36 scroll-mt-20">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
                Personal Transformation
              </span>
              <h2 className="font-serif italic text-warm-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-10">
                Addressing the underlying barriers, not just the surface.
              </h2>
              <p className="text-warm-white/70 text-lg leading-relaxed mb-6">
                Designed for individuals ready to address the underlying barriers affecting their confidence, direction, or wellbeing.
              </p>
              <p className="text-warm-white/70 leading-relaxed mb-12">
                Often, we try to solve internal challenges with external solutions — changing jobs, moving house, adopting new routines. When the root pattern remains unaddressed, the same feelings eventually return.
              </p>
              <Link href="/contact">
                <Button className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-8 h-12">
                  Enquire About Sessions
                </Button>
              </Link>
            </FadeIn>

            <FadeIn delay={0.2} direction="left">
              <div className="aspect-[4/3] overflow-hidden mb-10">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                  alt="A woman in a calm, reflective moment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0">
                {[
                  'Release persistent negative beliefs and patterns',
                  'Navigate life transitions with greater ease',
                  'Rebuild confidence and self-trust',
                  'Reduce internal pressure and anxiety',
                ].map((item, i) => (
                  <div key={i} className="py-6 border-b border-white/10 last:border-0 flex items-start gap-6">
                    <span className="font-serif italic text-champagne/50 text-xl leading-none shrink-0 mt-0.5 select-none" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-warm-white/80">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-white/10">
                <h3 className="font-serif text-xl text-champagne mb-6">The Format</h3>
                <div className="space-y-4 text-warm-white/70 text-sm leading-relaxed">
                  <p><strong className="text-warm-white font-medium">Initial Consultation</strong> — A comprehensive session to uncover the core issue and determine the path forward.</p>
                  <p><strong className="text-warm-white font-medium">Ongoing Sessions</strong> — Structured to build momentum, usually spaced to allow for integration.</p>
                  <p><strong className="text-warm-white font-medium">Location</strong> — In person in Melbourne, or online via Zoom across Australia.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP & BUSINESS ────────────────────────────────────────── */}
      <section id="leadership" className="bg-porcelain py-24 md:py-36 scroll-mt-20">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn direction="right" className="order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden mb-10">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80"
                  alt="A professional in a thoughtful moment of leadership clarity"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0">
                {[
                  { title: 'Decision Fatigue', body: 'Moving from second-guessing to clear, intuitive decision-making.' },
                  { title: 'Founder Bottleneck', body: 'Identifying why you cannot let go of control or delegate effectively.' },
                  { title: 'Sustainable Pacing', body: 'Operating at a high level without the constant threat of burnout.' },
                ].map(({ title, body }, i) => (
                  <div key={i} className="py-6 border-b border-blush last:border-0">
                    <h4 className="font-serif text-xl text-aubergine mb-2">{title}</h4>
                    <p className="text-charcoal text-sm leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn className="order-1 lg:order-2">
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
                Leadership & Business Clarity
              </span>
              <h2 className="font-serif italic text-aubergine text-3xl md:text-4xl lg:text-5xl leading-tight mb-10">
                When the business hits a ceiling, the leader is usually the reason.
              </h2>
              <p className="text-charcoal text-lg leading-relaxed mb-6">
                For founders, executives and business owners whose personal patterns are directly impacting their professional outcomes.
              </p>
              <p className="text-charcoal leading-relaxed mb-12">
                Your business is a reflection of you. Christine provides a confidential, objective space to examine the dynamics at play and untangle them.
              </p>
              <Link href="/contact">
                <Button className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-8 h-12">
                  Enquire About Leadership Support
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────────────────── */}
      <section className="bg-plum py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-4xl text-center">
          <FadeIn>
            <span aria-hidden="true" className="font-serif text-champagne/20 text-[6rem] leading-none block mb-0 select-none">"</span>
            <blockquote className="font-serif italic text-warm-white text-2xl md:text-3xl lg:text-4xl leading-tight mb-10 -mt-4">
              Working with Christine is completely different from traditional coaching. She has an incredible ability to pinpoint exactly where the blockage is and help you clear it quickly.
            </blockquote>
            <cite className="block font-sans font-medium text-champagne not-italic text-xs tracking-[0.2em] uppercase">
              A.L. — Senior Executive
            </cite>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW CHRISTINE DECIDES ─────────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
                The Clarity Call
              </span>
              <h2 className="font-serif italic text-aubergine text-3xl md:text-4xl leading-tight mb-10">
                How Christine decides what support fits.
              </h2>
              <p className="text-charcoal text-lg leading-relaxed">
                Rather than forcing you into a set package, Christine begins every engagement with a complimentary 20-minute Clarity Call — to hear what is happening for you and recommend the most effective way forward.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Link href="/contact">
                <Button size="lg" className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-10 h-14 w-full sm:w-auto">
                  Book Your Clarity Call
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-aubergine py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-3xl">
          <FadeIn className="mb-16">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
              Questions
            </span>
            <h2 className="font-serif italic text-warm-white text-3xl md:text-4xl leading-tight">
              Frequently asked.
            </h2>
          </FadeIn>

          <FadeIn>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: 'Do you see clients in person or online?',
                  a: 'Both. I consult from my practice in Melbourne, and work extensively with clients across Australia and internationally via Zoom or phone. The effectiveness of the work is identical regardless of the format.',
                },
                {
                  q: 'How many sessions will I need?',
                  a: 'This depends entirely on what you wish to resolve. Some clients find clarity on a specific decision in just a few sessions, while others engage in deeper transformation over several months. We will discuss a realistic timeframe during your initial consultation.',
                },
                {
                  q: 'What is the difference between this and counselling?',
                  a: '[Placeholder] While counselling often focuses on discussing the past or managing current symptoms, my work is heavily focused on identifying and shifting the unconscious patterns that drive the issue, allowing for rapid forward momentum.',
                },
                {
                  q: 'What happens in a Clarity Call?',
                  a: 'It is a complimentary 20-minute conversation where you can briefly outline what you are experiencing. It gives me a chance to determine if my approach is the right fit for your situation, and gives you a chance to see if you feel comfortable working with me. There is no pressure to proceed.',
                },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                  <AccordionTrigger className="text-left font-serif text-xl text-warm-white hover:text-champagne transition-colors py-6">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-warm-white/70 leading-relaxed text-base pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
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
              Book a complimentary conversation.
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
