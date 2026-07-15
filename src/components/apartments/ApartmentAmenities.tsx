import { useI18n } from '@/lib/i18n';
import type { ApartmentAmenity } from '@/data/apartments';
import { amenityIconMap } from './amenityIcons';

interface ApartmentAmenitiesProps {
  amenities: ApartmentAmenity[];
}

/** Renders only the amenities actually present in the data — never a fixed, hardcoded list. */
export function ApartmentAmenities({ amenities }: ApartmentAmenitiesProps) {
  const { locale } = useI18n();

  if (amenities.length === 0) return null;

  return (
    <div className='grid grid-cols-2 content-start gap-4'>
      {amenities.map((amenity) => {
        const Icon = amenityIconMap[amenity.icon];
        return (
          <div
            key={amenity.icon}
            className='flex flex-col items-center gap-2 rounded-2xl bg-card p-5 text-center shadow-sm'
          >
            <Icon className='h-6 w-6 text-primary' aria-hidden='true' />
            <span className='text-sm font-semibold text-foreground'>{amenity.label[locale]}</span>
            {amenity.value && <span className='text-xs text-muted-foreground'>{amenity.value}</span>}
          </div>
        );
      })}
    </div>
  );
}
