import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-aubergine text-warm-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif italic text-3xl text-warm-white">A New You</span>
            </Link>
            <p className="text-warm-white/80 leading-relaxed text-sm">
              Personal and professional transformation with Christine M Long. Founder-led guidance since 1989, in person in Melbourne and online across Australia.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6 text-champagne">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">Home</Link></li>
              <li><Link href="/work-with-christine" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">Work With Christine</Link></li>
              <li><Link href="/programs" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">Programs</Link></li>
              <li><Link href="/about" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">About</Link></li>
              <li><Link href="/client-stories" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">Client Stories</Link></li>
              <li><Link href="/contact" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6 text-champagne">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/work-with-christine#personal" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">Personal Transformation</Link></li>
              <li><Link href="/work-with-christine#leadership" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">Leadership & Business Clarity</Link></li>
              <li><Link href="/programs" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">Programs & Experiences</Link></li>
            </ul>

            <h3 className="font-serif text-xl mt-8 mb-6 text-champagne">Shop & Essences</h3>
            <ul className="space-y-3">
              <li><a href="#shop" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">Australian Aromatic Essences</a></li>
              <li><a href="#how-to-choose" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">How to Choose</a></li>
              <li><a href="#practitioners" className="text-sm text-warm-white/80 hover:text-champagne transition-colors">For Practitioners</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6 text-champagne">Contact</h3>
            <ul className="space-y-3 text-sm text-warm-white/80">
              <li><a href="tel:0409140173" className="hover:text-champagne transition-colors">0409 140 173</a></li>
              <li><a href="mailto:hello@anewyou.com.au" className="hover:text-champagne transition-colors">hello@anewyou.com.au</a></li>
              <li className="pt-2">Melbourne, VIC<br/>Consultations in person and online</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-xs text-warm-white/65 text-center">
          <div>
            <p>© 2026 Christine Long</p>
            <p>All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-warm-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-warm-white transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-warm-white transition-colors">Disclaimer</Link>
            <Link href="/shipping" className="hover:text-warm-white transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
