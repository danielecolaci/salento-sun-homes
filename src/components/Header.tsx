import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { useGoToApartments } from '@/lib/useGoToApartments';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

function ItalyFlag({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox='0 0 3 2' className={className}>
      <rect width='1' height='2' fill='#009246' />
      <rect x='1' width='1' height='2' fill='#ffffff' />
      <rect x='2' width='1' height='2' fill='#ce2b37' />
    </svg>
  );
}

function UKFlag({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox='0 0 60 30' className={className}>
      <rect width='60' height='30' fill='#012169' />
      <path d='M0,0 L60,30 M60,0 L0,30' stroke='#fff' strokeWidth='6' />
      <path d='M0,0 L60,30 M60,0 L0,30' stroke='#C8102E' strokeWidth='4' />
      <rect x='25' width='10' height='30' fill='#fff' />
      <rect y='10' width='60' height='10' fill='#fff' />
      <rect x='27' width='6' height='30' fill='#C8102E' />
      <rect y='12' width='60' height='6' fill='#C8102E' />
    </svg>
  );
}

export function Header() {
  const { locale, setLocale, t } = useI18n();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolledPast, setScrolledPast] = useState(false);
  const [open, setOpen] = useState(false);
  const goToApartments = useGoToApartments();

  // Off the Home page there is no hero image behind the header, so it must always render solid.
  const scrolled = scrolledPast || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: t('nav', 'features'), href: '#features' },
    { label: t('nav', 'gallery'), href: '#gallery' },
    { label: t('nav', 'location'), href: '#location' },
    { label: t('nav', 'booking'), href: '#booking' },
    { label: t('nav', 'testimonials'), href: '#testimonials' }
  ];

  const scrollTo = (href: string) => {
    setOpen(false);
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApartmentsClick = () => {
    setOpen(false);
    goToApartments();
  };

  const navLinkClass = `text-sm font-medium transition-colors cursor-pointer ${
    scrolled ? 'text-foreground hover:text-primary' : 'text-hero-foreground hover:text-hero-foreground/80'
  }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      role='banner'
    >
      <div className='container mx-auto px-4 flex items-center justify-between h-16 md:h-20'>
        <Link
          to='/'
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className={`font-heading text-xl font-bold transition-colors ${
            scrolled ? 'text-foreground' : 'text-hero-foreground'
          }`}
        >
          San Foca Vacanze
        </Link>

        <nav className='hidden md:flex items-center gap-6' aria-label='Navigazione principale'>
          <button onClick={handleApartmentsClick} className={navLinkClass}>
            {t('nav', 'apartments')}
          </button>
          {navItems.map((item) => (
            <button key={item.href} onClick={() => scrollTo(item.href)} className={navLinkClass}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className='flex items-center gap-3'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`text-sm font-semibold px-3 py-1.5 rounded-full border transition-colors cursor-pointer border-none! ${
                  scrolled ? 'text-foreground hover:bg-muted' : 'text-hero-foreground hover:bg-hero-bg-hover'
                }`}
                aria-label='Change language'
              >
                <span className='flex items-center gap-2'>{locale === 'it' ? <ItalyFlag /> : <UKFlag />}</span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
              {locale !== 'it' && <DropdownMenuItem onClick={() => setLocale('it')}>Italiano</DropdownMenuItem>}
              {locale !== 'en' && <DropdownMenuItem onClick={() => setLocale('en')}>English</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className='md:hidden'>
              <Button variant='ghost' size='icon' aria-label='Apri menu'>
                <Menu className={scrolled ? 'text-foreground' : 'text-hero-foreground'} />
              </Button>
            </SheetTrigger>
            <SheetContent side='right'>
              <nav className='flex flex-col gap-4 mt-8' aria-label='Menu mobile'>
                <button
                  onClick={handleApartmentsClick}
                  className='text-lg font-medium text-foreground hover:text-primary text-left cursor-pointer'
                >
                  {t('nav', 'apartments')}
                </button>
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className='text-lg font-medium text-foreground hover:text-primary text-left cursor-pointer'
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
