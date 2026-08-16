import { useState } from 'react';
import { Link } from 'wouter';
import { Check, ChevronDown } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';
import { useCart, type PaymentType } from '@/context/CartContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// ─── Program data ────────────────────────────────────────────────────────────

const PROGRAMS = [
  {
    id: 'intensive',
    badge: '12 weeks · Private',
    name: 'Luminous Alignment Intensive',
    tagline: 'Focused private support for a change that cannot wait another year',
    description:
      'For the leader who has a specific recurring pattern, pressure point or transition and wants concentrated personal attention — not a group program or a generic course.',
    bestFor: 'A defined challenge, transition or recurring pattern you want to address with focused private support.',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
    includes: [
      '12-week personalised transformation framework',
      'Private facilitation tailored to your goals and circumstances',
      'Guided work around beliefs, habits, emotional responses and identity',
      'Practical tools for regulation, reflection and integration',
      'Personalised Australian Aromatic Mastery Essence collection',
      'Between-session resources and guidance to reinforce progress',
    ],
    fullPrice: 5997,
    planAmount: 597,
    planCount: 12,
    planPeriod: 'week',
    planTotal: 7164,
  },
  {
    id: 'circle',
    badge: '12 months · Group',
    name: 'Luminous Leadership Circle',
    tagline: 'A year of guided growth, practical integration and purpose-driven community',
    description:
      'For the leader who wants ongoing development, live facilitation and the strength of a purpose-driven community. Meaningful change is rarely a single breakthrough — it is practised over time.',
    bestFor: 'Long-term development with live group facilitation and a community of purpose-driven peers.',
    image:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80',
    includes: [
      '12 months guided transformation through the Luminous Break Free Method™',
      'Two live facilitated online sessions each month',
      'Private learning portal with video, audio and guided resources',
      'Replay access to every live session',
      'Luminous Living meditation and original ambient music collection',
      'Mindset Insight Process for ongoing reflection and application',
      'Personalised Australian Aromatic Mastery Essence collection',
      'Private community for encouragement, teaching and connection',
    ],
    fullPrice: 7997,
    planAmount: 797,
    planCount: 12,
    planPeriod: 'month',
    planTotal: 9564,
  },
  {
    id: 'signature',
    badge: '12 months · Private + Group',
    name: 'Luminous Signature Partnership',
    tagline: 'Private guidance for the leader navigating growth, responsibility and change',
    description:
      'The most personalised pathway. Combines the full 12-month group curriculum with private monthly facilitation shaped around your leadership, business, relationships and life.',
    bestFor: 'Sustained one-to-one attention and a private strategic partnership across a full year.',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
    includes: [
      'Everything included in the Luminous Leadership Circle',
      'Monthly private transformational facilitation',
      'Personalised strategy, reflection and accountability',
      'Flexible support as leadership, business and life evolve',
      'Priority between-session access for guidance',
      'Personalised Australian Aromatic Mastery Essence collection',
      'Option to enquire about a shared journey with a partner or colleague',
    ],
    fullPrice: 11997,
    planAmount: 1100,
    planCount: 12,
    planPeriod: 'month',
    planTotal: 13200,
  },
] as const;

const METHOD_PILLARS = [
  {
    label: 'Guided self-awareness',
    body: 'Reveal blind spots and recurring patterns that operate beneath conscious awareness.',
  },
  {
    label: 'Evidence-informed learning',
    body: 'Understand the science of behaviour, habits, emotional responses and sustainable change.',
  },
  {
    label: 'Faith-aligned reflection',
    body: 'Grounded in timeless biblical principles for leaders who value purpose and calling.',
  },
  {
    label: 'Facilitated integration',
    body: 'Turn insight into concrete decisions, behaviours and action — not just awareness.',
  },
  {
    label: 'Practical tools and sensory anchors',
    body: 'Reinforce new responses between sessions so change extends into everyday leadership.',
  },
];

const PILLARS = [
  {
    n: '01',
    title: 'Wellbeing and capacity',
    body: 'Strengthen self-care, personal rhythm, resilience, priorities and use of time so you can lead without continually running on empty.',
    focus: 'Life and business alignment · Sustainable momentum · Time stewardship',
  },
  {
    n: '02',
    title: 'Identity and relationships',
    body: 'Recognise the beliefs and relationship patterns influencing your confidence, communication, boundaries and trust.',
    focus: 'Self-belief · Relationship dynamics · Connection and trust',
  },
  {
    n: '03',
    title: 'Purpose and direction',
    body: 'Clarify your strengths, calling and next steps so decisions become less reactive and more intentional.',
    focus: 'Innate gifts · Purpose and calling · Values-aligned strategy',
  },
  {
    n: '04',
    title: 'Prosperity and impact',
    body: 'Explore the internal ceiling that may be limiting how fully you receive, contribute and create meaningful impact.',
    focus: 'Limiting stories · Worthiness · Sustainable growth',
  },
];

const FAQS = [
  {
    q: 'Is this business coaching, counselling or a course?',
    a: 'It is a facilitated leadership and personal-development program. It combines guided reflection, practical learning, faith-aligned principles and tools for integrating change. It is not medical treatment, psychotherapy or crisis support, and it does not replace care from an appropriately qualified health professional.',
  },
  {
    q: 'Do I need to be a Christian?',
    a: 'The program openly draws on biblical principles and is designed to resonate strongly with Christian and spiritually grounded leaders. You should be comfortable with faith being part of the conversation. Please contact Christine to clarify whether participation is suitable for your circumstances.',
  },
  {
    q: 'What is the difference between the three pathways?',
    a: 'The 12-week Intensive offers concentrated private work around a defined challenge. The 12-month Circle offers ongoing facilitated group development. The 12-month Signature Partnership includes the annual group journey plus private monthly facilitation and priority support.',
  },
  {
    q: 'Are sessions online?',
    a: 'Group sessions are delivered live online. Private facilitation is available in person in Melbourne or via Zoom and phone across Australia. The precise mix will be confirmed before enrolment.',
  },
  {
    q: 'What happens after I apply?',
    a: 'After submitting the short application, you will be invited to a private Clarity Call with Christine. You will discuss what you want to change, the kind of support you need and whether one of the three pathways is a suitable fit. There is no obligation to enrol.',
  },
  {
    q: 'Are payment plans available?',
    a: 'Yes. Each pathway has a one-time payment and an instalment option. Payment-plan totals are higher than the pay-in-full rate. All prices are in Australian dollars.',
  },
  {
    q: 'Can I claim the program as a business expense?',
    a: 'Professional-development expenses may be deductible depending on your circumstances. Please seek advice from your accountant — A New You does not provide tax advice.',
  },
  {
    q: 'What results can I expect?',
    a: 'Every participant and situation is different. The program provides facilitation, tools, structure and support, but no specific personal, health or business result can be guaranteed. Your engagement and application are an important part of the process.',
  },
];

// ─── Format helpers ──────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(n);
}

// ─── Program card ─────────────────────────────────────────────────────────────

function ProgramCard({
  program,
  featured = false,
}: {
  program: (typeof PROGRAMS)[number];
  featured?: boolean;
}) {
  const [paymentType, setPaymentType] = useState<PaymentType>('full');
  const [showAll, setShowAll] = useState(false);
  const { addProgram, program: cartProgram } = useCart();

  const isSelected = cartProgram?.id === program.id;
  const periodAbbr = program.planPeriod === 'week' ? 'wk' : 'mo';
  const visibleIncludes = showAll ? program.includes : program.includes.slice(0, 4);
  const saving = program.planTotal - program.fullPrice;

  function handleSelect() {
    addProgram({
      id: program.id,
      name: program.name,
      duration: program.badge,
      paymentType,
      fullPrice: program.fullPrice,
      planAmount: program.planAmount,
      planCount: program.planCount,
      planPeriod: program.planPeriod,
      planTotal: program.planTotal,
    });
  }

  return (
    <div
      className={`flex flex-col h-full bg-aubergine transition-all duration-300 ${
        isSelected
          ? 'ring-2 ring-champagne ring-offset-0'
          : featured
          ? 'ring-1 ring-white/20'
          : ''
      }`}
    >
      {/* Top strip — every card has one so images always start at the same Y.
          Featured card shows the "Most comprehensive" ribbon; others get an
          invisible spacer of identical line-height so the image top edges align. */}
      <div
        className={`text-[9px] font-bold tracking-[0.25em] uppercase text-center py-2 ${
          featured ? 'bg-champagne text-aubergine' : 'bg-aubergine text-transparent select-none'
        }`}
        aria-hidden={!featured}
      >
        {featured ? 'Most comprehensive' : '·'}
      </div>

      {/* Image — pure photo, no overlay text, no face-covering badge */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-8">
        {/* Badge — duration/format label, now in the body not the image */}
        <span className="text-champagne text-[9px] font-bold tracking-[0.28em] uppercase mb-3 block">
          {program.badge}
        </span>
        {/* Title */}
        <h3 className="font-serif italic text-warm-white text-[1.6rem] leading-tight mb-3">
          {program.name}
        </h3>
        <p className="text-warm-white/55 text-sm leading-relaxed mb-7">
          {program.description}
        </p>

        {/* Best for */}
        <div className="border-t border-white/10 pt-5 mb-5">
          <p className="text-[9px] font-semibold tracking-[0.28em] uppercase text-champagne mb-2">
            Choose this if
          </p>
          <p className="text-warm-white/70 text-sm leading-relaxed">{program.bestFor}</p>
        </div>

        {/* Includes */}
        <div className="border-t border-white/10 pt-5 mb-7 flex-1">
          <p className="text-[9px] font-semibold tracking-[0.28em] uppercase text-champagne mb-4">
            What's included
          </p>
          <ul className="space-y-3">
            {visibleIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-warm-white/70 leading-relaxed">
                <Check className="w-3.5 h-3.5 text-champagne mt-[0.2em] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          {program.includes.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-4 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase text-warm-white/40 hover:text-champagne transition-colors"
            >
              {showAll ? 'Show less' : `+${program.includes.length - 4} more included`}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* ── Payment block ── */}
        <div className="border-t border-white/10 pt-6">
          {/* Segmented toggle */}
          <div className="flex bg-plum/50 mb-6">
            {(['full', 'plan'] as PaymentType[]).map((type) => {
              const active = paymentType === type;
              return (
                <button
                  key={type}
                  onClick={() => setPaymentType(type)}
                  className={`flex-1 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${
                    active
                      ? 'bg-champagne text-aubergine'
                      : 'text-warm-white/40 hover:text-warm-white/70'
                  }`}
                >
                  {type === 'full' ? 'Pay in full' : 'Payment plan'}
                </button>
              );
            })}
          </div>

          {/* Price display */}
          <div className="flex items-end gap-2 mb-4">
            <span className="font-serif italic text-warm-white text-[2.4rem] leading-none">
              {paymentType === 'full'
                ? fmt(program.fullPrice)
                : fmt(program.planAmount)}
            </span>
            {paymentType === 'plan' && (
              <span className="text-warm-white/40 text-sm mb-1.5">/{periodAbbr}</span>
            )}
          </div>
          <p className="text-warm-white/35 text-xs mb-12 leading-relaxed">
            {paymentType === 'full'
              ? `Save ${fmt(saving)} compared with the payment plan · AUD`
              : `${program.planCount} payments · Total ${fmt(program.planTotal)} AUD`}
          </p>

          {/* CTA */}
          <button
            onClick={handleSelect}
            className={`w-full py-4 text-xs font-bold tracking-[0.22em] uppercase transition-all ${
              isSelected
                ? 'bg-plum text-warm-white hover:bg-plum/80'
                : 'bg-champagne text-aubergine hover:bg-champagne/90'
            }`}
          >
            {isSelected ? '✓ Selected — View in cart' : 'Select this program'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Programs() {
  const { openCart, program: cartProgram } = useCart();

  return (
    <Layout>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-aubergine -mt-20 pt-40 pb-28 md:pt-52 md:pb-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn>
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
              Luminous Leadership Transformation
            </span>
            <h1 className="font-serif italic text-warm-white text-[2.8rem] sm:text-[3.5rem] lg:text-[4.5rem] leading-[1.05] max-w-3xl mb-10">
              Become the leader your calling requires.
            </h1>
            <p className="text-warm-white/70 text-xl leading-relaxed max-w-2xl mb-14">
              Resolve the unseen patterns affecting how you lead, decide and live so you can move forward with greater clarity, confidence and freedom.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#programs">
                <Button className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-8 h-12">
                  Explore the three pathways
                </Button>
              </a>
              <Link href="/contact">
                <Button className="bg-transparent border border-warm-white/30 hover:border-warm-white/60 text-warm-white rounded-none text-xs font-semibold tracking-[0.2em] uppercase px-8 h-12">
                  Book a clarity conversation
                </Button>
              </Link>
            </div>
            <p className="text-warm-white/40 text-sm mt-10">
              Private and group programs facilitated by Christine M Long · 30+ years of leadership and personal-development experience.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── RECOGNITION ──────────────────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
                You may recognise this
              </span>
              <h2 className="font-serif italic text-aubergine text-3xl md:text-4xl leading-tight mb-8">
                You do not need more pressure. You need clarity about what is really driving the pattern.
              </h2>
              <p className="text-charcoal text-lg leading-relaxed">
                You may be capable, experienced and deeply committed to what you have been called to build. Yet even strong leaders can find themselves repeating patterns they cannot solve with willpower alone.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="space-y-1">
                {[
                  'Overthink important decisions or second-guess yourself',
                  'Carry too much because delegating or trusting others feels difficult',
                  'Keep people happy at the expense of your own boundaries',
                  'Move between intense momentum and exhaustion',
                  'Know what to do, but struggle to act consistently',
                  'Feel successful on the outside but unsettled or disconnected within',
                  'Sense a new season calling, but cannot see the next step clearly',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 py-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-champagne flex-shrink-0 mt-[0.45em]" aria-hidden="true" />
                    <p className="text-charcoal leading-relaxed text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-8 bg-aubergine">
                <p className="font-serif italic text-warm-white text-xl leading-relaxed">
                  "Your business can only grow sustainably as far as the leader within you is prepared to grow."
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── METHOD ───────────────────────────────────────────────────────── */}
      <section className="bg-aubergine py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn className="mb-20">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
              The approach
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              <h2 className="font-serif italic text-warm-white text-3xl md:text-4xl leading-tight">
                Change the source, not just the symptom.
              </h2>
              <p className="text-warm-white/70 text-lg leading-relaxed">
                Most development programs add more information. Christine's <strong className="text-warm-white font-medium">Luminous Break Free Method™</strong> helps you identify what is operating beneath the surface, then supports you to practise a healthier, more aligned response.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {METHOD_PILLARS.map((pillar, i) => (
              <FadeIn key={i} delay={0.08 * i} className="bg-aubergine p-8">
                <span className="font-serif italic text-champagne/30 text-4xl leading-none block mb-6 select-none" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-warm-white text-lg mb-3">{pillar.label}</h3>
                <p className="text-warm-white/60 text-sm leading-relaxed">{pillar.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ─────────────────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <FadeIn className="mb-20">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
              Transformation areas
            </span>
            <h2 className="font-serif italic text-aubergine text-3xl md:text-4xl leading-tight max-w-2xl">
              Four areas that shape how you lead and live.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-blush">
            {PILLARS.map((pillar) => (
              <FadeIn key={pillar.n} className="bg-porcelain p-10 md:p-12">
                <span className="font-serif italic text-champagne text-5xl leading-none block mb-6 select-none" aria-hidden="true">
                  {pillar.n}
                </span>
                <h3 className="font-serif text-aubergine text-xl mb-3">{pillar.title}</h3>
                <p className="text-charcoal leading-relaxed mb-4 text-sm">{pillar.body}</p>
                <p className="text-charcoal/50 text-xs">{pillar.focus}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PROGRAMS ───────────────────────────────────────────────── */}
      <section id="programs" className="bg-warm-white py-24 md:py-36 scroll-mt-20">
        <div className="container mx-auto px-8 md:px-12 max-w-7xl">
          <FadeIn className="max-w-5xl mx-auto mb-20">
            <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-6 block">
              Choose your pathway
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
              <h2 className="font-serif italic text-aubergine text-3xl md:text-4xl leading-tight">
                One method. Three levels of support.
              </h2>
              <p className="text-charcoal leading-relaxed">
                Choose according to the depth, pace and level of personal access you need. Select a program below to add it to your application, then proceed when you are ready.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {PROGRAMS.map((program) => (
              <FadeIn key={program.id} className="h-full">
                <ProgramCard program={program} featured={program.id === 'signature'} />
              </FadeIn>
            ))}
          </div>

          {/* Sticky apply bar when program selected */}
          {cartProgram && (
            <FadeIn className="mt-12 max-w-5xl mx-auto">
              <div className="bg-aubergine px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-champagne text-[10px] font-semibold tracking-[0.3em] uppercase mb-1">Selected program</p>
                  <p className="font-serif italic text-warm-white text-lg">{cartProgram.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={openCart}
                    className="text-xs font-semibold tracking-[0.15em] uppercase text-warm-white/70 hover:text-champagne transition-colors"
                  >
                    View cart →
                  </button>
                  <Link href="/contact">
                    <Button className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-8 h-11">
                      Proceed to application
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Pricing note */}
          <FadeIn className="mt-4 max-w-2xl mx-auto">
            <p className="text-xs text-charcoal/40 text-center leading-relaxed">
              All prices AUD. Payment-plan totals are higher than the one-time rate — totals are shown in each card. 
              Professional-development expenses may be deductible; please seek advice from your accountant.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── AROMATIC ESSENCES ────────────────────────────────────────────── */}
      <section className="bg-aubergine py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn>
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
                Included in every pathway
              </span>
              <h2 className="font-serif italic text-warm-white text-3xl md:text-4xl leading-tight mb-8">
                Support for integration between sessions.
              </h2>
              <p className="text-warm-white/70 text-lg leading-relaxed mb-6">
                Every pathway includes a personalised selection from Christine's Australian Aromatic Mastery Essence collection.
              </p>
              <p className="text-warm-white/60 leading-relaxed">
                These botanical aromatic products are used as sensory and reflective anchors between sessions — helping participants pause, reconnect with the focus of their work and practise new responses in everyday life.
              </p>
              <p className="text-warm-white/40 text-xs mt-6 leading-relaxed">
                They complement the facilitation process and are not presented as a substitute for medical or psychological care.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} direction="left">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80"
                  alt="Australian botanical aromatic essences"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-plum py-24 md:py-36">
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
              {FAQS.map((item, i) => (
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

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="bg-porcelain py-24 md:py-36">
        <div className="container mx-auto px-8 md:px-12 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="text-champagne text-xs font-semibold tracking-[0.3em] uppercase mb-8 block">
                Ready to begin?
              </span>
              <h2 className="font-serif italic text-aubergine text-3xl md:text-4xl leading-tight mb-8">
                Your next level does not begin with doing more. It begins with seeing clearly.
              </h2>
              <p className="text-charcoal text-lg leading-relaxed">
                If you are ready to understand the pattern, make a different decision and lead your next season with greater alignment, begin with a private conversation.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-4">
                <Link href="/contact">
                  <Button size="lg" className="w-full bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-10 h-14">
                    Apply for a clarity conversation
                  </Button>
                </Link>
                <a href="#programs" className="flex items-center justify-center w-full h-12 text-xs font-semibold tracking-[0.15em] uppercase text-aubergine hover:text-plum transition-colors border border-blush hover:border-aubergine/30">
                  Compare the three pathways
                </a>
              </div>
              <p className="text-xs text-charcoal/40 mt-6 leading-relaxed text-center">
                Your application is confidential. Christine will review it personally and contact you with the next step. Applying does not commit you to purchase.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

    </Layout>
  );
}
