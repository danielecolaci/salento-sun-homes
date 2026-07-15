import { ExternalLink, MapPin } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { Apartment } from '@/data/apartments';

export function ApartmentLocation({ apartment }: { apartment: Apartment }) {
  const { locale, t } = useI18n();
  const apartmentFullName = `${t('apartmentDetail', 'titlePrefix')} ${apartment.name}`;

  return (
    <section className='py-16 md:py-24' aria-labelledby='apartment-location-title'>
      <div className='container mx-auto px-4'>
        <h2 id='apartment-location-title' className='mb-12 text-3xl font-bold md:text-4xl'>
          <MapPin className='mr-2 inline-block h-8 w-8 align-middle text-primary' aria-hidden='true' />
          {t('apartmentDetail', 'locationTitle')}
        </h2>

        <div className='grid items-center gap-8 lg:grid-cols-2'>
          <div>
            <p className='mb-6 text-lg leading-relaxed text-muted-foreground'>{apartment.location.text[locale]}</p>
            <a
              href={apartment.location.mapsUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground'
            >
              <ExternalLink className='h-4 w-4' aria-hidden='true' />
              {t('apartmentDetail', 'openInMaps')}
              <span className='sr-only'>— {apartmentFullName}</span>
            </a>
          </div>

          <div className='overflow-hidden rounded-2xl shadow-lg'>
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
