import { ExternalLink, MapPin, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import type { Apartment } from '@/data/apartments';
import { getApartmentAccent } from './accent';

export function ApartmentLocation({ apartment }: { apartment: Apartment }) {
  const { locale, t } = useI18n();
  const apartmentFullName = `${t('apartmentDetail', 'titlePrefix')} ${apartment.name}`;
  const accent = getApartmentAccent(apartment.id);

  return (
    <section className='bg-secondary/40 py-16 md:py-24' aria-labelledby='apartment-location-title'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 flex items-center gap-3'>
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.bg}`}>
            <MapPin className={`h-5 w-5 ${accent.text}`} aria-hidden='true' />
          </span>
          <h2 id='apartment-location-title' className='text-3xl font-bold tracking-tight md:text-4xl'>
            {t('apartmentDetail', 'locationTitle')}
          </h2>
        </div>

        <div className='grid items-center gap-10 lg:grid-cols-2'>
          <div>
            <p className='text-lg leading-relaxed text-muted-foreground'>{apartment.location.text[locale]}</p>

            {apartment.location.distanceFromSeaMeters !== undefined && (
              <div className='mt-6 inline-flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-5 py-3.5 shadow-sm'>
                <Waves className={`h-5 w-5 ${accent.text}`} aria-hidden='true' />
                <span className='text-sm text-foreground'>
                  <span className='font-bold'>{apartment.location.distanceFromSeaMeters}m</span>{' '}
                  <span className='text-muted-foreground'>{t('apartmentDetail', 'fromTheSea')}</span>
                </span>
              </div>
            )}

            <Button asChild variant='outline' className='mt-8 rounded-xl border-2 shadow-sm hover:shadow-md'>
              <a href={apartment.location.mapsUrl} target='_blank' rel='noopener noreferrer'>
                <ExternalLink className='h-4 w-4' aria-hidden='true' />
                {t('apartmentDetail', 'openInMaps')}
                <span className='sr-only'>— {apartmentFullName}</span>
              </a>
            </Button>
          </div>

          <div className='overflow-hidden rounded-2xl border border-border/60 shadow-lg'>
            <iframe
              src={apartment.location.mapEmbedUrl}
              width='100%'
              height='360'
              style={{ border: 0 }}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title={apartmentFullName}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
