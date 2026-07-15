import { Link } from '@tanstack/react-router';
import { CalendarCheck, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import type { Apartment } from '@/data/apartments';
import { buildApartmentAvailabilityMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { amenityIconMap } from './amenityIcons';
import { ApartmentPhoto } from './ApartmentPhoto';

export function ApartmentHero({ apartment }: { apartment: Apartment }) {
  const { locale, t } = useI18n();
  const whatsappHref = buildWhatsAppUrl(buildApartmentAvailabilityMessage(locale, apartment.name));

  return (
    <section className='pt-6 pb-16 md:pt-10 md:pb-20' aria-labelledby='apartment-hero-title'>
      <div className='container mx-auto px-4'>
        <div className='grid gap-10 md:grid-cols-2 md:items-center'>
          <div>
            {apartment.capacityMax > 0 ? (
              <Badge variant='secondary' className='mb-4 gap-1.5 rounded-full py-1.5'>
                <Users className='h-3.5 w-3.5' aria-hidden='true' />
                {apartment.capacityMin}/{apartment.capacityMax} {t('apartmentDetail', 'guests')}
              </Badge>
            ) : (
              <Badge variant='secondary' className='mb-4 rounded-full py-1.5'>
                {t('apartmentsHome', 'comingSoon')}
              </Badge>
            )}

            <h1 id='apartment-hero-title' className='font-heading text-4xl font-bold leading-tight md:text-5xl'>
              <span className='block text-foreground'>{t('apartmentDetail', 'titlePrefix')}</span>
              <span className='block text-primary'>{apartment.name}</span>
            </h1>

            <p className='mt-6 text-lg leading-relaxed text-muted-foreground'>{apartment.shortDescription[locale]}</p>

            {apartment.highlightFeatures.length > 0 && (
              <div className='mt-8 flex flex-wrap gap-6'>
                {apartment.highlightFeatures.map((feature) => {
                  const Icon = amenityIconMap[feature.icon];
                  return (
                    <div key={`${feature.icon}-${feature.label.it}`} className='flex flex-col items-start gap-1.5'>
                      <Icon className='h-5 w-5 text-primary' aria-hidden='true' />
                      <span className='text-sm font-medium text-foreground'>{feature.label[locale]}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className='mt-8 flex flex-wrap gap-4'>
              <Button asChild size='lg'>
                <Link to='/' search={{ apartment: apartment.slug }} hash='booking'>
                  <CalendarCheck className='h-4 w-4' aria-hidden='true' />
                  {t('apartmentDetail', 'ctaAvailability')}
                </Link>
              </Button>
              <Button asChild variant='outline' size='lg'>
                <a href={whatsappHref} target='_blank' rel='noopener noreferrer'>
                  <MessageCircle className='h-4 w-4' aria-hidden='true' />
                  {t('apartmentDetail', 'ctaContact')}
                </a>
              </Button>
            </div>
          </div>

          <ApartmentPhoto image={apartment.heroImage} apartmentName={apartment.name} priority className='w-full' />
        </div>
      </div>
    </section>
  );
}
