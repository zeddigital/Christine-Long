import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';
import { Quote } from 'lucide-react';

export default function ClientStories() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-porcelain pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <FadeIn>
            <h1 className="mb-6">Stories of change</h1>
            <p className="text-xl text-charcoal leading-relaxed max-w-2xl mx-auto">
              Read how established individuals have worked with Christine to resolve underlying patterns, reclaim clarity, and create meaningful momentum.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stories */}
      <section className="bg-blush py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          
          {/* Leadership */}
          <div className="mb-20">
            <FadeIn>
              <h2 className="mb-10 text-center text-3xl">Leadership & Business</h2>
            </FadeIn>
            <div className="space-y-8">
              <FadeIn className="bg-warm-white p-10 md:p-12 rounded-xl shadow-sm border border-black/[0.02] relative">
                <Quote className="w-10 h-10 text-champagne/30 absolute top-8 left-8" />
                <blockquote className="font-serif italic text-xl md:text-2xl text-aubergine leading-relaxed mb-6 pt-6 relative z-10">
                  "I had spent years in personal development and understood myself well — or so I thought. Christine helped me see a pattern I had completely missed. Within a few sessions I made a decision I had been avoiding for two years. The difference in how I approach my business now is tangible."
                </blockquote>
                <cite className="block font-sans font-medium text-plum not-italic">
                  — S.M., Business Owner, Melbourne
                </cite>
                <div className="mt-4 text-xs font-medium text-plum uppercase tracking-widest">[Placeholder pending permission]</div>
              </FadeIn>

              <FadeIn delay={0.1} className="bg-warm-white p-10 md:p-12 rounded-xl shadow-sm border border-black/[0.02] relative">
                <blockquote className="font-serif italic text-xl text-aubergine leading-relaxed mb-6">
                  "Working with Christine is completely different from traditional coaching. She doesn't just ask questions—she has an incredible ability to pinpoint exactly where the blockage is and help you clear it quickly. It fundamentally changed how I run my team."
                </blockquote>
                <cite className="block font-sans font-medium text-plum not-italic">
                  — A.L., Senior Executive
                </cite>
                <div className="mt-4 text-xs font-medium text-plum uppercase tracking-widest">[Placeholder pending permission]</div>
              </FadeIn>
            </div>
          </div>

          {/* Personal */}
          <div className="mb-20">
            <FadeIn>
              <h2 className="mb-10 text-center text-3xl">Personal Transformation</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FadeIn className="bg-warm-white p-10 rounded-xl shadow-sm border border-black/[0.02]">
                <blockquote className="font-serif italic text-xl text-aubergine leading-relaxed mb-6">
                  "The insight I gained in our very first session completely shifted my perspective. I had been carrying a huge amount of unnecessary pressure for decades."
                </blockquote>
                <cite className="block font-sans font-medium text-plum not-italic">
                  — K.T.
                </cite>
                <div className="mt-4 text-xs font-medium text-plum uppercase tracking-widest">[Placeholder pending permission]</div>
              </FadeIn>

              <FadeIn delay={0.1} className="bg-warm-white p-10 rounded-xl shadow-sm border border-black/[0.02]">
                <blockquote className="font-serif italic text-xl text-aubergine leading-relaxed mb-6">
                  "A rare ability to cut through the noise and get straight to the heart of the issue. I feel lighter, clearer, and much more confident in my path forward."
                </blockquote>
                <cite className="block font-sans font-medium text-plum not-italic">
                  — J.R.
                </cite>
                <div className="mt-4 text-xs font-medium text-plum uppercase tracking-widest">[Placeholder pending permission]</div>
              </FadeIn>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-porcelain py-20 md:py-32 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn>
            <h2 className="mb-6">Experience the shift for yourself</h2>
            <p className="text-charcoal text-lg mb-10 leading-relaxed">
              If you resonate with these stories and are ready to address the patterns holding you back, the first step is a simple conversation.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-[11px] font-bold tracking-[0.2em] uppercase px-10 h-14">
                Book Your Clarity Call
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
