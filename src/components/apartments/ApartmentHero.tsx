import { Link } from '@tanstack/react-router';
import { CalendarCheck, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import type { Apartment } from '@/data/apartments';
import { buildApartmentAvailabilityMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { amenityIconMap } from './amenityIcons';
import { ApartmentPhoto } from './ApartmentPhoto';
import { getApartmentAccent } from './accent';

export function ApartmentHero({ apartment }: { apartment: Apartment }) {
  const { locale, t } = useI18n();
  const whatsappHref = buildWhatsAppUrl(buildApartmentAvailabilityMessage(locale, apartment.name));
  const accent = getApartmentAccent(apartment.id);

  return (
    <section className='relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-28' aria-labelledby='apartment-hero-title'>
      {/* Soft decorative backdrop — purely presentational, no motion. */}
      <div
        className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-linear-to-b from-secondary/60 via-secondary/10 to-transparent'
        aria-hidden='true'
      />

      <div className='container mx-auto px-4'>
        <div className='grid gap-12 md:grid-cols-2 md:items-center md:gap-10 lg:gap-16'>
          <div>
            {apartment.capacityMax > 0 ? (
              <Badge
                variant='secondary'
                className='mb-5 gap-1.5 rounded-full border border-border/60 bg-card py-1.5 pl-2.5 pr-3.5 shadow-sm'
              >
                <Users className={`h-3.5 w-3.5 ${accent.text}`} aria-hidden='true' />
                {apartment.capacityMin}/{apartment.capacityMax} {t('apartmentDetail', 'guests')}
              </Badge>
            ) : (
              <Badge variant='secondary' className='mb-5 rounded-full border border-border/60 bg-card py-1.5 shadow-sm'>
                {t('apartmentsHome', 'comingSoon')}
              </Badge>
            )}

            <h1
              id='apartment-hero-title'
              className='font-heading text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl'
            >
              <span className='block text-foreground'>{t('apartmentDetail', 'titlePrefix')}</span>
              <span className={`relative mt-1 block ${accent.text}`}>
                {apartment.name}
                <span
                  className={`mt-3 block h-1 w-16 rounded-full ${accent.bg.replace('/10', '/60')}`}
                  aria-hidden='true'
                />
              </span>
            </h1>

            <p className='mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>
              {apartment.shortDescription[locale]}
            </p>

            {apartment.highlightFeatures.length > 0 && (
              <ul className='mt-8 flex flex-wrap gap-3'>
                {apartment.highlightFeatures.map((feature) => {
                  const Icon = amenityIconMap[feature.icon];
                  return (
                    <li
                      key={`${feature.icon}-${feature.label.it}`}
                      className='flex items-center gap-2.5 rounded-2xl border border-border/60 bg-card/80 py-2 pl-2.5 pr-4 shadow-sm backdrop-blur-sm'
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${accent.bg}`}>
                        <Icon className={`h-4 w-4 ${accent.text}`} aria-hidden='true' />
                      </span>
                      <span className='text-sm font-medium text-foreground'>{feature.label[locale]}</span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className='mt-9 flex flex-wrap gap-4'>
              <Button asChild variant='hero' size='lg'>
                <Link to='/' search={{ apartment: apartment.slug }} hash='booking'>
                  <CalendarCheck className='h-4 w-4' aria-hidden='true' />
                  {t('apartmentDetail', 'ctaAvailability')}
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='rounded-xl border-2 px-8 py-3 h-auto text-base font-semibold shadow-sm hover:shadow-md'
              >
                <a href={whatsappHref} target='_blank' rel='noopener noreferrer'>
                  <MessageCircle className='h-4 w-4' aria-hidden='true' />
                  {t('apartmentDetail', 'ctaContact')}
                </a>
              </Button>
            </div>
          </div>

          <div className='relative'>
            <div
              className={`pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] blur-2xl ${accent.bg.replace('/10', '/25')}`}
              aria-hidden='true'
            />
            <ApartmentPhoto
              image={apartment.heroImage}
              apartmentName={apartment.name}
              priority
              className='w-full shadow-xl ring-1 ring-black/5'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
