import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Work With Christine', path: '/work-with-christine' },
    { label: 'Programs', path: '/programs' },
    { label: 'About', path: '/about' },
    { label: 'Client Stories', path: '/client-stories' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-aubergine/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-aubergine py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif italic text-2xl text-warm-white tracking-wide">A New You</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-champagne ${
                  location === link.path ? 'text-champagne' : 'text-warm-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a 
              href="#shop" 
              className="text-sm font-medium text-warm-white/50 hover:text-warm-white/70 transition-colors"
            >
              Shop
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:inline-flex">
              <Button className="bg-rose hover:bg-rose/90 text-warm-white border-none rounded">
                Book a Clarity Call
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-warm-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-aubergine border-t border-white/10 shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-base font-medium p-2 rounded ${
                location === link.path ? 'bg-white/10 text-champagne' : 'text-warm-white/90'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a 
            href="#shop" 
            className="text-base font-medium p-2 text-warm-white/50"
          >
            Shop
          </a>
          <Link href="/contact" className="mt-2 block sm:hidden">
            <Button className="w-full bg-rose hover:bg-rose/90 text-warm-white border-none rounded">
              Book a Clarity Call
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
