import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Programs() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-porcelain pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <FadeIn>
            <h1 className="mb-8">Structured pathways for deeper, supported change</h1>
            <p className="text-xl text-charcoal leading-relaxed max-w-3xl mx-auto">
              Programs offer a comprehensive, guided approach to transformation, combining one-to-one expertise with a defined framework over a set timeframe.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Program */}
      <section className="bg-aubergine text-warm-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <FadeIn>
                  <div className="text-champagne font-semibold tracking-widest text-sm uppercase mb-4">Featured Program</div>
                  <h2 className="text-warm-white text-4xl mb-6">Luminous Break Free</h2>
                  <p className="text-warm-white/80 leading-relaxed text-lg mb-8">
                    A personalised, structured transformation journey for women ready to move beyond repeating patterns and reclaim clarity and direction.
                  </p>
                  <p className="text-warm-white/80 leading-relaxed mb-10 text-sm">
                    This program is not about managing symptoms; it is about locating the source of your friction and systematically dismantling it.
                  </p>
                  <Link href="/contact">
                    <Button size="lg" className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-[11px] font-bold tracking-[0.2em] uppercase w-full sm:w-auto h-14">
                      Enquire About Availability
                    </Button>
                  </Link>
                </FadeIn>
              </div>
              <div className="bg-white/5 p-10 md:p-16 border-t md:border-t-0 md:border-l border-white/10">
                <FadeIn delay={0.2}>
                  <h3 className="font-serif text-2xl text-champagne mb-6">Program Details</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2 text-warm-white">Who it is for</h4>
                      <p className="text-sm text-warm-white/70 leading-relaxed">
                        Women experiencing a persistent feeling of being stuck despite outward success and capability. Those who feel they are running on empty.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3 text-warm-white">What it includes</h4>
                      <ul className="space-y-2">
                        {[
                          "Comprehensive initial assessment",
                          "Structured one-to-one sessions with Christine",
                          "Guided reflection and integration materials",
                          "Priority support between sessions"
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-warm-white/70">
                            <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-warm-white">Format & Delivery</h4>
                      <p className="text-sm text-warm-white/70 leading-relaxed">
                        Delivered privately, one-to-one. Available in person in Melbourne or online via Zoom across Australia.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways */}
      <section className="bg-blush py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <FadeIn>
            <h2 className="mb-10">Other ways to work with Christine</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-warm-white p-10 rounded-xl shadow-sm border border-black/[0.03]">
                <h3 className="font-serif text-2xl text-aubergine mb-4">Personal Transformation</h3>
                <p className="text-charcoal mb-8 text-sm leading-relaxed">
                  Private support tailored to your specific circumstances, focusing on confidence, direction, and overcoming personal barriers.
                </p>
                <Link href="/work-with-christine#personal">
                  <Button variant="outline" className="border-aubergine/20 text-aubergine hover:bg-aubergine/5 rounded w-full">
                    Explore Support <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="bg-warm-white p-10 rounded-xl shadow-sm border border-black/[0.03]">
                <h3 className="font-serif text-2xl text-aubergine mb-4">Leadership & Business</h3>
                <p className="text-charcoal mb-8 text-sm leading-relaxed">
                  Strategic clarity for founders and leaders dealing with decision fatigue, bottlenecks, or the personal dynamics of running a business.
                </p>
                <Link href="/work-with-christine#leadership">
                  <Button variant="outline" className="border-aubergine/20 text-aubergine hover:bg-aubergine/5 rounded w-full">
                    Explore Support <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
