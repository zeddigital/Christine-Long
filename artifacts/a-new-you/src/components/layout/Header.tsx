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
      setIsScrolled(window.scrollY > 40);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-aubergine/96 backdrop-blur-md shadow-sm py-4'
          : 'bg-aubergine py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif italic text-xl text-warm-white tracking-wide">
              A New You
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-200 hover:text-champagne ${
                  location === link.path ? 'text-champagne' : 'text-warm-white/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:inline-flex">
              <Button className="bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase px-6 h-10">
                Book a Clarity Call
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-warm-white/80 hover:text-warm-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-aubergine border-t border-white/10 shadow-xl py-6 px-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-[11px] font-semibold tracking-[0.15em] uppercase p-3 transition-colors ${
                location === link.path
                  ? 'text-champagne'
                  : 'text-warm-white/70 hover:text-warm-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-white/10">
            <Link href="/contact" className="block sm:hidden">
              <Button className="w-full bg-champagne hover:bg-champagne/90 text-aubergine border-none rounded-none text-xs font-bold tracking-[0.2em] uppercase h-12">
                Book a Clarity Call
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
