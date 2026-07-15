import type { RawGalleryImage } from '@/lib/galleryImage';

import levanteSoggiornoCucina from '@/assets/gallery/levante/soggiorno-cucina.jpeg';
import levanteLettoMatrimoniale from '@/assets/gallery/levante/letto-matrimoniale.jpeg';
import levanteBagno1 from '@/assets/gallery/levante/bagno-1.jpeg';
import levanteBalcone from '@/assets/gallery/levante/balcone.jpeg';
import ponenteSoggiornoDivano from '@/assets/gallery/ponente/soggiorno-divano.jpeg';
import ponenteLetto from '@/assets/gallery/ponente/letto.jpeg';
import ponenteCucina from '@/assets/gallery/ponente/cucina.jpeg';
import ponenteGiardino1 from '@/assets/gallery/ponente/giardino-1.jpeg';

/**
 * Curated mix for the Home "I nostri ambienti" gallery — 4 photos per apartment.
 * Swap the imports/slugs above to change which photos appear here.
 */
export const homeGalleryImages: Array<RawGalleryImage & { apartmentName: string }> = [
  { src: levanteSoggiornoCucina, slug: 'soggiorno-cucina', apartmentName: 'Levante' },
  { src: ponenteSoggiornoDivano, slug: 'soggiorno-divano', apartmentName: 'Ponente' },
  { src: levanteLettoMatrimoniale, slug: 'letto-matrimoniale', apartmentName: 'Levante' },
  { src: ponenteLetto, slug: 'letto', apartmentName: 'Ponente' },
  { src: levanteBagno1, slug: 'bagno-1', apartmentName: 'Levante' },
  { src: ponenteCucina, slug: 'cucina', apartmentName: 'Ponente' },
  { src: levanteBalcone, slug: 'balcone', apartmentName: 'Levante' },
  { src: ponenteGiardino1, slug: 'giardino-1', apartmentName: 'Ponente' }
];
