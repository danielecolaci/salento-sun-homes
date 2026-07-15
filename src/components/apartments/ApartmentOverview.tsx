import { Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { Apartment } from '@/data/apartments';
import { ApartmentAmenities } from './ApartmentAmenities';
import { getApartmentAccent } from './accent';

export function ApartmentOverview({ apartment }: { apartment: Apartment }) {
  const { locale, t } = useI18n();
  const accent = getApartmentAccent(apartment.id);

  if (apartment.isPlaceholder) {
    return (
      <section className='py-16 md:py-24' aria-labelledby='apartment-overview-title'>
        <div className='container mx-auto max-w-2xl px-4 text-center'>
          <h2 id='apartment-overview-title' className='mb-6 text-3xl font-bold tracking-tight md:text-4xl'>
            {t('apartmentDetail', 'overviewTitle')}
          </h2>
          <p className='text-lg leading-relaxed text-muted-foreground'>{apartment.description[locale]}</p>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 md:py-24' aria-labelledby='apartment-overview-title'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 max-w-2xl'>
          <span className={`text-sm font-semibold tracking-wide uppercase ${accent.text}`}>{apartment.name}</span>
          <h2 id='apartment-overview-title' className='mt-2 text-3xl font-bold tracking-tight md:text-4xl'>
            {t('apartmentDetail', 'overviewTitle')}
          </h2>
        </div>

        <div className='grid gap-12 lg:grid-cols-2'>
          <div>
            <p className='mb-8 text-lg leading-relaxed text-muted-foreground'>{apartment.description[locale]}</p>

            {apartment.featuresChecklist.length > 0 && (
              <ul className='space-y-3.5'>
                {apartment.featuresChecklist.map((item) => (
                  <li key={item.it} className='flex items-center gap-3 text-foreground'>
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.bg}`}>
                      <Check className={`h-3 w-3 ${accent.text}`} aria-hidden='true' strokeWidth={3} />
                    </span>
                    <span className='leading-snug'>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ApartmentAmenities amenities={apartment.amenities} accent={accent} />
        </div>
      </div>
    </section>
  );
}
