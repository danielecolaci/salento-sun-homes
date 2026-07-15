import type { Locale } from '@/lib/i18n';

/** A gallery photo tagged with its filename slug (e.g. "letto-matrimoniale"), which drives the translated alt text. */
export interface RawGalleryImage {
  src: string;
  slug: string;
}

/**
 * Splits a filename slug like "bagno-1" into its room label key ("bagno") and an
 * optional numeric suffix, so multiple photos of the same room type ("bagno-1",
 * "bagno-2") share one translation entry while still getting a distinct alt text.
 */
function parseSlug(slug: string): { labelKey: string; index?: number } {
  const match = slug.match(/^(.+)-(\d+)$/);
  if (match) return { labelKey: match[1], index: Number(match[2]) };
  return { labelKey: slug };
}

/** Builds a specific, translated, per-room alt text from an image's filename slug. */
export function resolveGalleryAlt(
  t: (section: string, key: string) => string,
  locale: Locale,
  slug: string,
  apartmentName: string
): string {
  const { labelKey, index } = parseSlug(slug);
  const room = t('galleryLabels', labelKey);
  const roomWithIndex = index ? `${room} ${index}` : room;
  const apartmentFullName = locale === 'it' ? `Appartamento ${apartmentName}` : `${apartmentName} Apartment`;
  return `${roomWithIndex} — ${apartmentFullName}`;
}
