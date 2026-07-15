import { useI18n } from '@/lib/i18n';
import { Gallery } from '@/components/Gallery';
import { homeGalleryImages } from '@/data/homeGallery';
import { resolveGalleryAlt } from '@/lib/galleryImage';

export function HomeGallery() {
  const { t, locale } = useI18n();

  const images = homeGalleryImages.map((img) => ({
    src: img.src,
    alt: resolveGalleryAlt(t, locale, img.slug, img.apartmentName)
  }));

  return <Gallery id='gallery' title={t('gallery', 'title')} images={images} />;
}
