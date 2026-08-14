import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function WorkWithChristine() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-porcelain pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <FadeIn>
            <h1 className="mb-8">Personal support for meaningful change in life, leadership and business</h1>
            <p className="text-xl text-charcoal leading-relaxed max-w-3xl mx-auto">
              You already know how to work hard, achieve goals and support others. But when the current approach stops working, trying harder is rarely the answer.
            </p>
            <p className="text-lg text-charcoal leading-relaxed max-w-2xl mx-auto mt-6">
              Working with Christine is about identifying the specific patterns keeping you stuck, so you can move forward with less friction and more clarity.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Pathways */}
      <section className="bg-blush py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <FadeIn className="text-center mb-16">
            <h2>Which of these sounds most like you?</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1} className="bg-warm-white p-8 rounded-lg shadow-sm">
              <div className="text-champagne font-serif text-xl mb-4 italic">"I feel personally stuck"</div>
              <p className="text-charcoal mb-6 text-sm leading-relaxed">
                You might be navigating a life transition, feeling a loss of confidence, or noticing recurring habits that drain your energy and prevent you from living fully.
              </p>
              <a href="#personal" className="text-rose font-medium text-sm flex items-center hover:text-rose/80">
                Personal Transformation <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </FadeIn>

            <FadeIn delay={0.2} className="bg-warm-white p-8 rounded-lg shadow-sm">
              <div className="text-champagne font-serif text-xl mb-4 italic">"My business is draining me"</div>
              <p className="text-charcoal mb-6 text-sm leading-relaxed">
                You are a founder or leader and the business is amplifying your personal patterns. You need clarity to make better decisions without burning out.
              </p>
              <a href="#leadership" className="text-rose font-medium text-sm flex items-center hover:text-rose/80">
                Leadership & Business <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </FadeIn>

            <FadeIn delay={0.3} className="bg-warm-white p-8 rounded-lg shadow-sm">
              <div className="text-champagne font-serif text-xl mb-4 italic">"I want a structured process"</div>
              <p className="text-charcoal mb-6 text-sm leading-relaxed">
                You prefer a defined framework to guide you through a period of change, with clear steps and dedicated support over several weeks.
              </p>
              <Link href="/programs" className="text-rose font-medium text-sm flex items-center hover:text-rose/80">
                View Programs <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Personal Transformation */}
      <section id="personal" className="bg-porcelain py-20 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="mb-6">Personal Transformation</h2>
              <p className="text-charcoal text-lg mb-6 leading-relaxed">
                Designed for individuals who are ready to address the underlying barriers affecting their confidence, direction, or wellbeing.
              </p>
              <p className="text-charcoal mb-8 leading-relaxed">
                Often, we try to solve internal challenges with external solutions—changing jobs, moving house, or adopting new routines. When the root pattern remains unaddressed, the same feelings eventually return. Christine helps you locate the source of the friction and release it.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Release persistent negative beliefs and patterns",
                  "Navigate life transitions with greater ease",
                  "Rebuild confidence and self-trust",
                  "Reduce internal pressure and anxiety"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-charcoal">
                    <CheckCircle2 className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/contact">
                <Button className="bg-rose hover:bg-rose/90 text-warm-white border-none rounded px-8">
                  Enquire About Sessions
                </Button>
              </Link>
            </FadeIn>
            <FadeIn direction="left" className="bg-aubergine text-warm-white p-10 md:p-12 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
              <h3 className="font-serif text-2xl mb-4 relative z-10 text-champagne">The Format</h3>
              <ul className="space-y-4 relative z-10 text-warm-white/90">
                <li className="pb-4 border-b border-white/10">
                  <strong className="block text-warm-white mb-1">Initial Consultation</strong>
                  A comprehensive session to uncover the core issue and determine the path forward.
                </li>
                <li className="pb-4 border-b border-white/10">
                  <strong className="block text-warm-white mb-1">Ongoing Sessions</strong>
                  Structured to build momentum, usually spaced to allow for integration.
                </li>
                <li>
                  <strong className="block text-warm-white mb-1">Location</strong>
                  In person in Melbourne, or online via Zoom across Australia.
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Leadership & Business */}
      <section id="leadership" className="bg-aubergine text-warm-white py-20 md:py-32 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" className="order-2 md:order-1 bg-white/5 border border-white/10 p-10 md:p-12 rounded-xl">
              <h3 className="font-serif text-2xl mb-4 text-champagne">Common Focus Areas</h3>
              <ul className="space-y-4 text-warm-white/90">
                <li className="pb-4 border-b border-white/10">
                  <strong className="block text-warm-white mb-1">Decision Fatigue</strong>
                  Moving from second-guessing to clear, intuitive decision-making.
                </li>
                <li className="pb-4 border-b border-white/10">
                  <strong className="block text-warm-white mb-1">Founder Bottleneck</strong>
                  Identifying why you cannot let go of control or delegate effectively.
                </li>
                <li>
                  <strong className="block text-warm-white mb-1">Sustainable Pacing</strong>
                  Operating at a high level without the constant threat of burnout.
                </li>
              </ul>
            </FadeIn>
            <FadeIn className="order-1 md:order-2">
              <h2 className="mb-6 text-warm-white">Leadership & Business Clarity</h2>
              <p className="text-warm-white/80 text-lg mb-6 leading-relaxed">
                For founders, executives and business owners whose personal patterns are directly impacting their professional outcomes.
              </p>
              <p className="text-warm-white/80 mb-8 leading-relaxed">
                Your business is a reflection of you. When you hit a ceiling in your business, the solution is rarely just a new strategy; it requires a shift in the leader. Christine provides a confidential, objective space to examine the dynamics at play and untangle them.
              </p>
              
              <Link href="/contact">
                <Button className="bg-rose hover:bg-rose/90 text-warm-white border-none rounded px-8">
                  Enquire About Leadership Support
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process / Decision */}
      <section className="bg-porcelain py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <FadeIn>
            <h2 className="mb-6">How Christine decides what support fits</h2>
            <p className="text-charcoal text-lg leading-relaxed mb-10">
              There is no one-size-fits-all approach. Rather than forcing you into a set package, Christine begins every engagement with a Clarity Call. This allows her to hear what is happening for you and recommend the most effective way forward—whether that is a single consultation, an ongoing series, or a specific program.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="border-aubergine/20 text-aubergine hover:bg-aubergine/5 rounded px-8">
                Book Your Clarity Call
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-blush py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeIn className="text-center">
            <Quote className="w-12 h-12 text-champagne/40 mx-auto mb-6" />
            <blockquote className="font-serif italic text-2xl md:text-3xl text-aubergine leading-relaxed mb-8">
              "Working with Christine is completely different from traditional coaching. She doesn't just ask questions—she has an incredible ability to pinpoint exactly where the blockage is and help you clear it quickly."
            </blockquote>
            <cite className="block font-sans font-medium text-plum not-italic">
              — A.L., Senior Executive
            </cite>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-porcelain py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn className="text-center mb-12">
            <h2>Frequently asked questions</h2>
          </FadeIn>

          <FadeIn>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-aubergine/10">
                <AccordionTrigger className="text-left font-serif text-xl text-aubergine hover:text-rose transition-colors">
                  Do you see clients in person or online?
                </AccordionTrigger>
                <AccordionContent className="text-charcoal leading-relaxed text-base">
                  Both. I consult from my practice in Melbourne, and work extensively with clients across Australia and internationally via Zoom or phone. The effectiveness of the work is identical regardless of the format.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b-aubergine/10">
                <AccordionTrigger className="text-left font-serif text-xl text-aubergine hover:text-rose transition-colors">
                  How many sessions will I need?
                </AccordionTrigger>
                <AccordionContent className="text-charcoal leading-relaxed text-base">
                  This depends entirely on what you wish to resolve. Some clients find clarity on a specific decision in just a few sessions, while others engage in deeper transformation over several months. We will discuss a realistic timeframe during your initial consultation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-aubergine/10">
                <AccordionTrigger className="text-left font-serif text-xl text-aubergine hover:text-rose transition-colors">
                  What is the difference between this and counselling?
                </AccordionTrigger>
                <AccordionContent className="text-charcoal leading-relaxed text-base">
                  [Placeholder] While counselling often focuses on discussing the past or managing current symptoms, my work is heavily focused on identifying and shifting the unconscious patterns that drive the issue, allowing for rapid forward momentum.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-b-aubergine/10 border-none">
                <AccordionTrigger className="text-left font-serif text-xl text-aubergine hover:text-rose transition-colors">
                  What happens in a Clarity Call?
                </AccordionTrigger>
                <AccordionContent className="text-charcoal leading-relaxed text-base">
                  It is a complimentary 20-minute conversation where you can briefly outline what you are experiencing. It gives me a chance to determine if my approach is the right fit for your situation, and gives you a chance to see if you feel comfortable working with me. There is no pressure to proceed.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-aubergine text-warm-white py-20 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn>
            <h2 className="text-warm-white mb-6">Ready to begin?</h2>
            <p className="text-warm-white/80 mb-8 text-lg">
              Book a complimentary conversation to discuss your circumstances.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-rose hover:bg-rose/90 text-warm-white border-none rounded text-lg px-10 h-14">
                Book a Clarity Call
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
