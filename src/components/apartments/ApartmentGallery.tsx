import { useI18n } from '@/lib/i18n';
import type { Apartment } from '@/data/apartments';
import { Gallery } from '@/components/Gallery';
import { resolveGalleryAlt } from '@/lib/galleryImage';
import { getApartmentAccent } from './accent';

export function ApartmentGallery({ apartment }: { apartment: Apartment }) {
  const { t, locale } = useI18n();
  const accent = getApartmentAccent(apartment.id);

  const images = apartment.gallery.map((img) => ({
    src: img.src,
    alt: resolveGalleryAlt(t, locale, img.slug, apartment.name)
  }));

  return (
    <Gallery
      id='galleria'
      eyebrow={apartment.name}
      eyebrowClassName={accent.text}
      title={t('apartmentDetail', 'galleryTitle')}
      images={images}
    />
  );
}
