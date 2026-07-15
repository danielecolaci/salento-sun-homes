import { Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { Apartment } from '@/data/apartments';
import { ApartmentAmenities } from './ApartmentAmenities';

export function ApartmentOverview({ apartment }: { apartment: Apartment }) {
  const { locale, t } = useI18n();

  if (apartment.isPlaceholder) {
    return (
      <section className='py-16 md:py-24' aria-labelledby='apartment-overview-title'>
        <div className='container mx-auto max-w-2xl px-4 text-center'>
          <h2 id='apartment-overview-title' className='mb-6 text-3xl font-bold md:text-4xl'>
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
        <h2 id='apartment-overview-title' className='mb-12 text-3xl font-bold md:text-4xl'>
          {t('apartmentDetail', 'overviewTitle')}
        </h2>

        <div className='grid gap-12 lg:grid-cols-2'>
          <div>
            <p className='mb-8 text-lg leading-relaxed text-muted-foreground'>{apartment.description[locale]}</p>

            {apartment.featuresChecklist.length > 0 && (
              <ul className='space-y-3'>
                {apartment.featuresChecklist.map((item) => (
                  <li key={item.it} className='flex items-start gap-2.5 text-foreground'>
                    <Check className='mt-0.5 h-4 w-4 shrink-0 text-primary' aria-hidden='true' />
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ApartmentAmenities amenities={apartment.amenities} />
        </div>
      </div>
    </section>
  );
}
