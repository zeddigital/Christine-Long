import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';

import aboutPortrait from '@assets/Christine_Hero_1786696065293.webp';

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-porcelain py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <FadeIn>
                <h1 className="mb-8">More than three decades helping people see what others miss</h1>
                <p className="text-xl text-charcoal leading-relaxed mb-6">
                  Christine M Long is the founder of A New You. Since 1989, she has worked with intelligent, established individuals to resolve the deep patterns that restrict their potential.
                </p>
                <p className="text-charcoal leading-relaxed">
                  Her work sits at the intersection of personal transformation, leadership clarity and wellbeing.
                </p>
              </FadeIn>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <FadeIn direction="left">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl max-w-md mx-auto">
                  <img src={aboutPortrait} alt="Christine M Long" className="w-full h-full object-cover" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Distinctive Strength & Story */}
      <section className="bg-blush py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="space-y-16">
            <FadeIn>
              <h2 className="mb-6">Christine's distinctive strength</h2>
              <p className="text-charcoal text-lg leading-relaxed">
                Her strength lies in listening beyond the obvious. Christine has an uncommon ability to quickly identify the thread connecting a client's seemingly unrelated challenges. Whether you are dealing with a business bottleneck or a personal transition, she helps you locate the root pattern and work with it directly, saving months of unnecessary struggle.
              </p>
            </FadeIn>

            <FadeIn>
              <h2 className="mb-6">The founding of A New You</h2>
              <p className="text-charcoal text-lg leading-relaxed mb-6">
                Christine established A New You in 1989. Over more than 35 years in practice, she has observed firsthand why some people achieve lasting change while others find themselves continually addressing the same issues.
              </p>
              <p className="text-charcoal text-lg leading-relaxed">
                Her approach developed out of a recognition that standard coaching or therapy often addresses the symptoms without shifting the underlying driver. She sought to create a more efficient, profound way of working that creates practical momentum for her clients.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="bg-aubergine text-warm-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <FadeIn>
            <h2 className="text-warm-white mb-10 text-center">Qualifications & Methodologies</h2>
            <div className="bg-white/5 border border-white/10 p-10 rounded-xl mb-6">
              <div className="text-champagne font-medium text-sm mb-6 uppercase tracking-widest">[Placeholder - Verify Before Publication]</div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-warm-white/90">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose"></div>
                  Creator of Core Issue Elimination
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose"></div>
                  Creator of Inner Insight Mastery
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose"></div>
                  Co-author of 'Align, Expand and Succeed'
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose"></div>
                  Advanced Practitioner of Kinesiology
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experience & Locations */}
      <section className="bg-porcelain py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="mb-6">What it is like to work with her</h2>
              <p className="text-charcoal leading-relaxed mb-6">
                Clients describe Christine as an experienced, calm guide who has heard it all and can take you straight to what matters. The environment she creates is unhurried, intelligent, and completely non-judgmental.
              </p>
              <p className="text-charcoal leading-relaxed">
                She is warm but never soft. She won't waste your time with platitudes; she is there to help you create genuine, workable change.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2} className="bg-warm-white p-10 rounded-xl shadow-sm border border-black/[0.03]">
              <h3 className="font-serif text-2xl text-aubergine mb-6">Locations</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-plum mb-2">Melbourne (In Person)</h4>
                  <p className="text-charcoal text-sm leading-relaxed">
                    Consultations are available in a beautifully appointed, private consulting room. Tactile, composed, and quietly confident.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-plum mb-2">Online (Australia-wide)</h4>
                  <p className="text-charcoal text-sm leading-relaxed">
                    Christine works extensively with clients across Australia via Zoom. The methodology translates perfectly to the online environment.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blush py-20 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn>
            <h2 className="mb-8">Start with a conversation</h2>
            <Link href="/contact">
              <Button size="lg" className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-[11px] font-bold tracking-[0.2em] uppercase px-10 h-14">
                Book a Clarity Call
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
