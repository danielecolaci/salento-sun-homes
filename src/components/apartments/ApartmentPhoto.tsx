import { ImageOff } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useI18n } from '@/lib/i18n';
import type { ApartmentImage } from '@/data/apartments';
import { resolveGalleryAlt } from '@/lib/galleryImage';

/** Real intrinsic ratio (portrait) shared by every apartment photo currently in the project. */
const PHOTO_RATIO = 3 / 4;

interface ApartmentPhotoProps {
  image: ApartmentImage;
  apartmentName: string;
  className?: string;
  /** Above-the-fold hero image: load eagerly instead of lazily. */
  priority?: boolean;
}

/**
 * Renders a real apartment photo when available, otherwise an explicit
 * "photo coming soon" placeholder — never a stand-in stock photo. Both
 * branches reserve the same aspect-ratio box so there is no layout shift.
 */
export function ApartmentPhoto({ image, apartmentName, className, priority }: ApartmentPhotoProps) {
  const { t, locale } = useI18n();
  const alt = resolveGalleryAlt(t, locale, image.slug, apartmentName);

  if (!image.src) {
    return (
      <AspectRatio ratio={PHOTO_RATIO} className={className}>
        <div
          role='img'
          aria-label={alt}
          className='flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted text-muted-foreground'
        >
          <ImageOff className='h-8 w-8' aria-hidden='true' />
          <span className='px-4 text-center text-xs font-medium'>{t('apartmentDetail', 'photoPending')}</span>
        </div>
      </AspectRatio>
    );
  }

  return (
    <AspectRatio ratio={PHOTO_RATIO} className={className}>
      <img
        src={image.src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        className='h-full w-full rounded-2xl object-cover'
      />
    </AspectRatio>
  );
}
