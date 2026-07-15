import { useI18n } from '@/lib/i18n';
import type { Apartment } from '@/data/apartments';
import { Gallery } from '@/components/Gallery';
import { resolveGalleryAlt } from '@/lib/galleryImage';

export function ApartmentGallery({ apartment }: { apartment: Apartment }) {
  const { t, locale } = useI18n();

  const images = apartment.gallery.map((img) => ({
    src: img.src,
    alt: resolveGalleryAlt(t, locale, img.slug, apartment.name)
  }));

  return <Gallery id='galleria' title={t('apartmentDetail', 'galleryTitle')} images={images} />;
}
