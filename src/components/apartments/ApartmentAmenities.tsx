import { useI18n } from '@/lib/i18n';
import type { ApartmentAmenity } from '@/data/apartments';
import { amenityIconMap } from './amenityIcons';
import type { ApartmentAccent } from './accent';

interface ApartmentAmenitiesProps {
  amenities: ApartmentAmenity[];
  accent: ApartmentAccent;
}

/** Renders only the amenities actually present in the data — never a fixed, hardcoded list. */
export function ApartmentAmenities({ amenities, accent }: ApartmentAmenitiesProps) {
  const { locale } = useI18n();

  if (amenities.length === 0) return null;

  return (
    <div className='grid grid-cols-2 content-start gap-3.5 sm:gap-4'>
      {amenities.map((amenity) => {
        const Icon = amenityIconMap[amenity.icon];
        return (
          <div
            key={amenity.icon}
            className='flex flex-col items-center gap-2.5 rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm transition-shadow hover:shadow-md'
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent.bg}`}>
              <Icon className={`h-5 w-5 ${accent.text}`} aria-hidden='true' />
            </span>
            <span className='text-sm font-semibold text-foreground'>{amenity.label[locale]}</span>
            {amenity.value && <span className='text-xs text-muted-foreground'>{amenity.value}</span>}
          </div>
        );
      })}
    </div>
  );
}
