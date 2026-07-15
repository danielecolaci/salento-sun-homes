import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ApartmentsSection } from '@/components/ApartmentsSection';
import { Features } from '@/components/Features';
import { HomeGallery } from '@/components/HomeGallery';
import { Description } from '@/components/Description';
import { Location } from '@/components/Location';
import { BookingForm } from '@/components/BookingForm';
import { Testimonials } from '@/components/Testimonials';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const indexSearchSchema = z.object({
  apartment: z.string().optional()
});

export const Route = createFileRoute('/')({
  validateSearch: indexSearchSchema,
  head: () => ({
    meta: [
      { title: 'San Foca Vacanze — Case Vacanze a 150m dal Mare nel Salento' },
      {
        name: 'description',
        content:
          '4 accoglienti case vacanze a San Foca, nel Salento, a 150 metri dal mare. Pet friendly, accessibili, perfette per famiglie e gruppi. Prenota la tua estate!'
      },
      { property: 'og:title', content: 'San Foca Vacanze — Case Vacanze nel Salento' },
      {
        property: 'og:description',
        content: '4 case vacanze a 150m dal mare di San Foca. Pet friendly, accessibili, perfette per famiglie.'
      }
    ]
  }),
  component: Index
});

function Index() {
  const search = Route.useSearch();

  // Coming from a detail page with `#appartamenti` in the URL: scroll to the section
  // once the page has laid out, instead of relying solely on the router's own hash handling.
  useEffect(() => {
    if (window.location.hash === '#appartamenti') {
      const target = document.querySelector('#appartamenti');
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth' }));
      }
    }
  }, []);

  return (
    <>
      <Header />
      <main id='main-content'>
        <Hero />
        <ApartmentsSection />
        <Features />
        <HomeGallery />
        <Description />
        <Location />
        <BookingForm preselectedApartment={search.apartment} />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
