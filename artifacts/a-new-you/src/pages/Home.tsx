import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';
import { ArrowRight, Quote } from 'lucide-react';

import heroPortrait from '@assets/Christine_Hero_1786696065293.webp';
import aboutPortrait from '@assets/CHRISTINE-PROGRAMS-RESIZED_1786696072425.jpg';
import article1 from '@/assets/article-1.jpg';
import article2 from '@/assets/article-2.jpg';
import article3 from '@/assets/article-3.jpg';

export default function Home() {
  return (
    <Layout>
      {/* Section 2 — Hero */}
      <section className="bg-porcelain relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col-reverse md:flex-row items-center py-12 md:py-24 lg:py-32 gap-12 lg:gap-24">
            <div className="w-full md:w-1/2 flex flex-col items-start z-10">
              <FadeIn delay={0.1}>
                <span className="text-sm font-semibold tracking-[0.2em] uppercase text-plum mb-6 block">
                  Personal & Professional Transformation with Christine M Long
                </span>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-aubergine leading-[1.1] mb-8">
                  You are not starting over. You are ready to move forward differently.
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-charcoal text-[18px] leading-relaxed mb-10 max-w-xl">
                  For established women, business owners and leaders who feel stuck beneath the surface. Identify the patterns holding you back, reconnect with what matters and create meaningful momentum in life and business.
                </p>
              </FadeIn>
              <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-rose hover:bg-rose/90 text-warm-white border-none rounded text-base px-8 h-14">
                    Book a Complimentary Clarity Call
                  </Button>
                </Link>
                <Link href="/work-with-christine" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full border-aubergine/20 text-aubergine hover:bg-aubergine/5 rounded text-base px-8 h-14">
                    Explore Ways to Work Together <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </FadeIn>
              <FadeIn delay={0.5} className="mt-8">
                <p className="text-sm text-plum font-medium tracking-wide">
                  Founder-led guidance · 35+ years' experience · In person in Melbourne and online Australia-wide
                </p>
              </FadeIn>
            </div>
            <div className="w-full md:w-1/2 relative">
              <FadeIn direction="left" delay={0.3}>
                <div className="aspect-[4/5] w-full max-w-md mx-auto md:ml-auto md:mr-0 rounded-lg overflow-hidden relative shadow-xl">
                  <img 
                    src={heroPortrait} 
                    alt="Christine M Long" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 border border-black/5 rounded-lg"></div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Recognition / Problem Framing */}
      <section className="bg-blush py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <FadeIn>
              <h2 className="mb-6">When success on the outside no longer matches how you feel inside</h2>
              <p className="text-charcoal text-[18px] leading-relaxed">
                You may be capable, experienced and deeply committed — yet still find yourself repeating the same patterns, second-guessing important decisions or carrying a level of pressure that is no longer sustainable. More information is rarely the answer. The real shift begins when you can see what is driving the pattern and work with it differently.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "You feel stuck",
                desc: "You know something needs to change, but cannot see the right next move."
              },
              {
                title: "Old patterns keep returning",
                desc: "Motivation and insight have helped temporarily, but the same barrier reappears."
              },
              {
                title: "Your energy is divided",
                desc: "Life, leadership or business asks more of you than your current way of operating can sustain."
              }
            ].map((card, idx) => (
              <FadeIn key={idx} delay={0.1 * idx} direction="up" className="bg-warm-white p-10 rounded-lg shadow-sm border border-black/[0.03]">
                <div className="w-8 h-px bg-rose mb-6"></div>
                <h3 className="font-serif text-2xl text-aubergine mb-4">{card.title}</h3>
                <p className="text-charcoal leading-relaxed">{card.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — The Outcome */}
      <section className="bg-porcelain py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <FadeIn>
              <h2 className="mb-6">Clarity changes what becomes possible</h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {[
              "See the underlying issue more clearly",
              "Make decisions with greater confidence",
              "Replace unhelpful patterns with practical responses",
              "Move forward with renewed direction and momentum"
            ].map((benefit, idx) => (
              <FadeIn key={idx} delay={0.1 * idx} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-champagne mt-2.5 flex-shrink-0"></div>
                <p className="text-xl md:text-2xl font-serif text-aubergine">{benefit}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Ways to Work Together */}
      <section className="bg-aubergine text-warm-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="mb-16">
            <FadeIn>
              <h2 className="text-warm-white text-center">Choose the support that fits where you are now</h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {[
              {
                title: "Personal Transformation",
                desc: "Private support for confidence, direction, habits and patterns that affect how you feel and live.",
                linkText: "Explore Personal Transformation",
                linkPath: "/work-with-christine"
              },
              {
                title: "Leadership & Business Clarity",
                desc: "For founders and leaders ready to address the personal dynamics influencing their business.",
                linkText: "Explore Leadership Support",
                linkPath: "/work-with-christine"
              },
              {
                title: "Programs & Experiences",
                desc: "Structured pathways for deeper, supported change.",
                linkText: "View Current Programs",
                linkPath: "/programs"
              }
            ].map((service, idx) => (
              <FadeIn key={idx} delay={0.1 * idx} className="bg-white/5 border border-white/10 p-10 rounded-lg hover:bg-white/10 transition-colors flex flex-col h-full">
                <div className="w-8 h-px bg-rose mb-6"></div>
                <h3 className="font-serif text-2xl mb-4 text-champagne">{service.title}</h3>
                <p className="text-warm-white/80 leading-relaxed mb-8 flex-grow">{service.desc}</p>
                <Link href={service.linkPath} className="text-rose font-medium hover:text-rose/80 inline-flex items-center group">
                  {service.linkText} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center">
              <a href="#shop" className="text-rose text-sm font-medium tracking-wide uppercase hover:text-rose/80 transition-colors">
                Looking for Australian Aromatic Essences? Visit the shop →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 6 — Christine / Authority */}
      <section className="bg-porcelain py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
              <FadeIn direction="right">
                <div className="aspect-square w-full max-w-md mx-auto lg:ml-0 lg:mr-auto rounded-lg overflow-hidden relative shadow-xl">
                  <img 
                    src={aboutPortrait} 
                    alt="Christine M Long in consulting room" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </FadeIn>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <FadeIn>
                <h2 className="mb-6">Experience helps you get beneath the surface</h2>
                <p className="text-charcoal text-[18px] leading-relaxed mb-10">
                  Christine M Long founded A New You in 1989 and has spent more than three decades working across personal transformation, wellbeing, leadership and business development. Her strength lies in listening beyond the obvious, recognising the patterns connecting different areas of a person's life, and helping clients find a clear, workable way forward.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    "Founder of A New You since 1989",
                    "Co-author of Align, Expand and Succeed",
                    "Creator of Core Issue Elimination and Inner Insight Mastery",
                    "Consultations in person, by phone and online"
                  ].map((cred, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-champagne flex-shrink-0"></div>
                      <span className="text-plum font-medium">{cred}</span>
                    </div>
                  ))}
                </div>

                <Link href="/about">
                  <Button variant="outline" className="border-aubergine/20 text-aubergine hover:bg-aubergine/5 rounded text-base px-8 h-12">
                    Meet Christine <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — How It Works */}
      <section className="bg-blush py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <FadeIn>
              <h2>A clear process, shaped around you</h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-px bg-rose/30"></div>

            {[
              {
                num: "1",
                title: "Start with a conversation",
                desc: "Discuss what is happening, what you have tried and what you want to change."
              },
              {
                num: "2",
                title: "Identify the priority",
                desc: "Christine recommends the most appropriate session, program or next step."
              },
              {
                num: "3",
                title: "Create practical momentum",
                desc: "Work through the pattern with personalised support and actions that fit your circumstances."
              }
            ].map((step, idx) => (
              <FadeIn key={idx} delay={0.1 * idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-aubergine text-warm-white flex items-center justify-center font-serif text-2xl mb-6 shadow-md border-4 border-blush">
                  {step.num}
                </div>
                <h3 className="font-serif text-xl text-aubergine mb-3">{step.title}</h3>
                <p className="text-charcoal leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8 — Testimonials */}
      <section className="bg-porcelain py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <FadeIn>
              <h2>What clients say</h2>
            </FadeIn>
          </div>

          <div className="max-w-4xl mx-auto">
            <FadeIn className="bg-warm-white p-10 md:p-16 rounded-xl shadow-sm border border-black/[0.02] mb-10 text-center relative">
              <Quote className="w-12 h-12 text-champagne/40 absolute top-8 left-8 md:top-12 md:left-12" />
              <blockquote className="font-serif italic text-2xl md:text-3xl text-aubergine leading-relaxed mb-8 relative z-10 pt-4">
                "I had spent years in personal development and understood myself well — or so I thought. Christine helped me see a pattern I had completely missed. Within a few sessions I made a decision I had been avoiding for two years. The difference in how I approach my business now is tangible."
              </blockquote>
              <cite className="block font-sans font-medium text-plum not-italic">
                — S.M., Business Owner, Melbourne
              </cite>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <FadeIn delay={0.1} className="bg-warm-white p-8 rounded-xl shadow-sm border border-black/[0.02]">
                <blockquote className="text-charcoal leading-relaxed mb-6 font-serif italic text-xl">
                  "[Placeholder] The insight I gained in our very first session completely shifted my perspective. Highly recommended."
                </blockquote>
                <cite className="block font-sans font-medium text-plum text-sm not-italic">
                  — K.T., Executive Leader
                </cite>
              </FadeIn>
              <FadeIn delay={0.2} className="bg-warm-white p-8 rounded-xl shadow-sm border border-black/[0.02]">
                <blockquote className="text-charcoal leading-relaxed mb-6 font-serif italic text-xl">
                  "[Placeholder] A rare ability to cut through the noise and get straight to the heart of the issue."
                </blockquote>
                <cite className="block font-sans font-medium text-plum text-sm not-italic">
                  — J.R., Founder
                </cite>
              </FadeIn>
            </div>

            <FadeIn className="text-center">
              <Link href="/client-stories">
                <Button variant="outline" className="border-aubergine/20 text-aubergine hover:bg-aubergine/5 rounded text-base px-8 h-12">
                  Read More Client Stories <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 9 — Featured Program */}
      <section className="bg-aubergine py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-warm-white">Ready for a more structured transformation experience?</h2>
            </FadeIn>
          </div>

          <FadeIn className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-8 md:p-12 lg:p-16">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <span className="text-champagne text-sm font-semibold tracking-widest uppercase mb-4 block">Featured Program</span>
                <h3 className="font-serif text-3xl md:text-4xl text-warm-white mb-6">Luminous Break Free</h3>
                <p className="text-warm-white/80 leading-relaxed text-lg mb-8">
                  A personalised, structured transformation journey for women ready to move beyond repeating patterns and reclaim clarity and direction.
                </p>
                <Link href="/contact">
                  <Button className="bg-rose hover:bg-rose/90 text-warm-white border-none rounded text-base px-8 h-12">
                    Enquire about availability
                  </Button>
                </Link>
              </div>
              <div className="flex-1 space-y-6 md:border-l border-white/10 md:pl-10">
                <div>
                  <h4 className="font-medium text-warm-white mb-2">Who it is for</h4>
                  <p className="text-warm-white/70 text-sm leading-relaxed">[Placeholder] Women experiencing a persistent feeling of being stuck despite outward success and capability.</p>
                </div>
                <div>
                  <h4 className="font-medium text-warm-white mb-2">What it includes</h4>
                  <p className="text-warm-white/70 text-sm leading-relaxed">[Placeholder] Structured one-to-one sessions with Christine, guided reflection materials, and priority support.</p>
                </div>
                <div>
                  <h4 className="font-medium text-warm-white mb-2">Format & delivery</h4>
                  <p className="text-warm-white/70 text-sm leading-relaxed">[Placeholder] Delivered one-to-one, available in person in Melbourne or online across Australia.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 10 — Insights */}
      <section className="bg-porcelain py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <FadeIn>
              <h2>Practical perspectives on change</h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: article1,
                title: "Why high-achieving people can still feel stuck",
                desc: "Understanding the gap between capability and momentum.",
              },
              {
                img: article2,
                title: "The difference between knowing what to do and being able to do it",
                desc: "Why insight alone rarely creates lasting change.",
              },
              {
                img: article3,
                title: "When a business problem is really a clarity or leadership problem",
                desc: "Recognising the patterns beneath the strategy.",
              }
            ].map((article, idx) => (
              <FadeIn key={idx} delay={0.1 * idx} className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6 bg-blush relative">
                  <img 
                    src={article.img} 
                    alt={article.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <h3 className="font-serif text-2xl text-aubergine mb-3 group-hover:text-rose transition-colors">{article.title}</h3>
                <p className="text-charcoal mb-4">{article.desc}</p>
                <span className="text-plum font-medium text-sm inline-flex items-center">
                  Read more <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11 — Final Conversion CTA */}
      <section className="bg-blush py-24 md:py-32 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-serif text-aubergine mb-8 leading-tight">
              You do not need to have everything worked out before we talk.
            </h2>
            <p className="text-lg md:text-xl text-charcoal mb-10 leading-relaxed">
              If something in your life or business is asking to change, begin with a private, no-pressure conversation about where you are and what support may fit.
            </p>
            <div className="flex flex-col items-center gap-6">
              <Link href="/contact">
                <Button size="lg" className="bg-rose hover:bg-rose/90 text-warm-white border-none rounded text-lg px-10 h-16 w-full sm:w-auto shadow-lg shadow-rose/20">
                  Book Your Complimentary Clarity Call
                </Button>
              </Link>
              <span className="text-plum font-medium">or call Christine on <a href="tel:0409140173" className="hover:text-aubergine transition-colors">0409 140 173</a></span>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
