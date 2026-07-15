import type { RawGalleryImage } from '@/lib/galleryImage';

import levanteSoggiornoCucina from '@/assets/gallery/levante/soggiorno-cucina.jpeg';
import levanteLettoMatrimoniale from '@/assets/gallery/levante/letto-matrimoniale.jpeg';
import levanteLettoDoppia from '@/assets/gallery/levante/letto-doppia.jpeg';
import levanteBagno1 from '@/assets/gallery/levante/bagno-1.jpeg';
import levanteBagno2 from '@/assets/gallery/levante/bagno-2.jpeg';
import levanteBalcone from '@/assets/gallery/levante/balcone.jpeg';
import levanteGiardino1 from '@/assets/gallery/levante/giardino-1.jpeg';
import levanteGiardino2 from '@/assets/gallery/levante/giardino-2.jpeg';

import ponenteCucina from '@/assets/gallery/ponente/cucina.jpeg';
import ponenteSoggiornoCucina from '@/assets/gallery/ponente/soggiorno-cucina.jpeg';
import ponenteSoggiornoDivano from '@/assets/gallery/ponente/soggiorno-divano.jpeg';
import ponenteBagno from '@/assets/gallery/ponente/bagno.jpeg';
import ponenteLetto from '@/assets/gallery/ponente/letto.jpeg';
import ponenteLetto2 from '@/assets/gallery/ponente/letto-2.jpeg';
import ponenteGiardino1 from '@/assets/gallery/ponente/giardino-1.jpeg';
import ponenteGiardino2 from '@/assets/gallery/ponente/giardino-2.jpeg';

export const SITE_URL = 'https://sanfocasalentoholiday.netlify.app';

export type AmenityIcon =
  | 'capacity'
  | 'wifi'
  | 'ac'
  | 'balcony'
  | 'terrace'
  | 'kitchen'
  | 'parking'
  | 'pets'
  | 'accessibility'
  | 'washer';

export interface LocalizedText {
  it: string;
  en: string;
}

export interface ApartmentAmenity {
  icon: AmenityIcon;
  label: LocalizedText;
  value?: string;
}

export interface ApartmentImage {
  /** When null, no real photo is available yet: render an explicit placeholder instead of a fake photo. */
  src: string | null;
  /** Filename slug (e.g. "soggiorno-cucina"), used to derive a translated, room-specific alt text. */
  slug: string;
}

export interface Apartment {
  id: string;
  slug: string;
  /** Bare name, e.g. "Levante" — used to compose "Appartamento Levante" / "Levante Apartment". */
  name: string;
  capacityMin: number;
  capacityMax: number;
  shortDescription: LocalizedText;
  description: LocalizedText;
  floor: LocalizedText;
  bedrooms: number;
  bathrooms: number;
  /** Ordered bed configuration, one entry per sleeping area. */
  bedConfiguration: LocalizedText[];
  /** The 3 highlight features shown in the hero badges (icon + short label). */
  highlightFeatures: { icon: AmenityIcon; label: LocalizedText }[];
  /** Full checklist shown in the "Panoramica" left column. */
  featuresChecklist: LocalizedText[];
  /** Amenities grid shown in the "Panoramica" right column — only real, confirmed amenities for this unit. */
  amenities: ApartmentAmenity[];
  heroImage: ApartmentImage;
  /** Always the same 8 real photos used by the shared Gallery component. */
  gallery: RawGalleryImage[];
  location: {
    text: LocalizedText;
    distanceFromSeaMeters?: number;
    mapsUrl: string;
    mapEmbedUrl: string;
  };
  seo: {
    title: LocalizedText;
    description: LocalizedText;
    ogImage: string;
  };
  /**
   * True while real content (name, photos, amenities) has not yet been supplied by the client.
   * Every screen reading this flag must surface it clearly instead of presenting the data as final.
   */
  isPlaceholder?: boolean;
}

const SAN_FOCA_MAPS_QUERY = 'San Foca, Lecce, Italy';
const SAN_FOCA_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SAN_FOCA_MAPS_QUERY)}`;
const SAN_FOCA_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(SAN_FOCA_MAPS_QUERY)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

const levanteGallery: RawGalleryImage[] = [
  { src: levanteSoggiornoCucina, slug: 'soggiorno-cucina' },
  { src: levanteLettoMatrimoniale, slug: 'letto-matrimoniale' },
  { src: levanteLettoDoppia, slug: 'letto-doppia' },
  { src: levanteBagno1, slug: 'bagno-1' },
  { src: levanteBagno2, slug: 'bagno-2' },
  { src: levanteBalcone, slug: 'balcone' },
  { src: levanteGiardino1, slug: 'giardino-1' },
  { src: levanteGiardino2, slug: 'giardino-2' }
];

const ponenteGallery: RawGalleryImage[] = [
  { src: ponenteCucina, slug: 'cucina' },
  { src: ponenteSoggiornoCucina, slug: 'soggiorno-cucina' },
  { src: ponenteSoggiornoDivano, slug: 'soggiorno-divano' },
  { src: ponenteBagno, slug: 'bagno' },
  { src: ponenteLetto, slug: 'letto' },
  { src: ponenteLetto2, slug: 'letto-2' },
  { src: ponenteGiardino1, slug: 'giardino-1' },
  { src: ponenteGiardino2, slug: 'giardino-2' }
];

export const apartments: Apartment[] = [
  {
    id: 'levante',
    slug: 'levante',
    name: 'Levante',
    capacityMin: 4,
    capacityMax: 6,
    shortDescription: {
      it: 'Luminoso e accogliente, perfetto per famiglie e coppie che cercano relax a pochi passi dal mare di San Foca.',
      en: 'Bright and welcoming, perfect for families and couples looking for relaxation just steps from the sea in San Foca.'
    },
    description: {
      it: "L'Appartamento Levante si trova al primo piano di una casa indipendente a soli 150 metri dal mare. Dispone di ambienti spaziosi e funzionali, ideali per ospitare fino a 6 persone.",
      en: 'The Levante Apartment is located on the first floor of a detached house just 150 metres from the sea. It offers spacious, functional rooms, ideal for hosting up to 6 guests.'
    },
    floor: { it: 'Primo piano', en: 'First floor' },
    bedrooms: 2,
    bathrooms: 1,
    bedConfiguration: [
      { it: '1 camera matrimoniale', en: '1 double bedroom' },
      { it: '1 camera con due letti singoli', en: '1 twin bedroom (two single beds)' },
      { it: 'Soggiorno con divano letto', en: 'Living room with sofa bed' }
    ],
    highlightFeatures: [
      { icon: 'wifi', label: { it: 'Wi-Fi gratuito', en: 'Free Wi-Fi' } },
      { icon: 'balcony', label: { it: 'Balcone attrezzato', en: 'Equipped balcony' } },
      { icon: 'ac', label: { it: 'Aria condizionata', en: 'Air conditioning' } }
    ],
    featuresChecklist: [
      { it: '4/6 posti letto', en: '4/6 guests' },
      { it: '1 camera matrimoniale', en: '1 double bedroom' },
      { it: '1 camera con due letti singoli', en: '1 twin bedroom (two single beds)' },
      { it: 'Soggiorno con divano letto', en: 'Living room with sofa bed' },
      { it: 'Cucina attrezzata', en: 'Equipped kitchen' },
      { it: '1 bagno con doccia', en: '1 bathroom with shower' },
      { it: 'Lavatrice', en: 'Washing machine' },
      { it: 'Balcone attrezzato', en: 'Equipped balcony' },
      { it: 'Aria condizionata', en: 'Air conditioning' },
      { it: 'Wi-Fi gratuito', en: 'Free Wi-Fi' }
    ],
    amenities: [
      { icon: 'capacity', label: { it: 'Posti letto', en: 'Guests' }, value: 'Fino a 6' },
      { icon: 'wifi', label: { it: 'Wi-Fi gratuito', en: 'Free Wi-Fi' } },
      { icon: 'ac', label: { it: 'Aria condizionata', en: 'Air conditioning' } },
      { icon: 'balcony', label: { it: 'Balcone attrezzato', en: 'Equipped balcony' } },
      { icon: 'kitchen', label: { it: 'Cucina attrezzata', en: 'Equipped kitchen' } },
      { icon: 'washer', label: { it: 'Lavatrice', en: 'Washing machine' } },
      { icon: 'parking', label: { it: 'Parcheggio gratuito', en: 'Free parking' } },
      { icon: 'pets', label: { it: 'Animali ammessi', en: 'Pets allowed' } }
    ],
    heroImage: { src: levanteGallery[0].src, slug: levanteGallery[0].slug },
    gallery: levanteGallery,
    location: {
      text: {
        it: "L'appartamento Levante si trova a soli 150 metri dal mare, in una zona tranquilla e ben servita.",
        en: 'The Levante apartment is just 150 metres from the sea, in a quiet and well-served area.'
      },
      distanceFromSeaMeters: 150,
      mapsUrl: SAN_FOCA_MAPS_URL,
      mapEmbedUrl: SAN_FOCA_MAPS_EMBED_URL
    },
    seo: {
      title: {
        it: 'Appartamento Levante a San Foca | San Foca Vacanze',
        en: 'Levante Apartment in San Foca | San Foca Vacanze'
      },
      description: {
        it: 'Appartamento Levante: luminoso e accogliente, fino a 6 posti letto, balcone attrezzato e aria condizionata, a soli 150 metri dal mare di San Foca nel Salento.',
        en: 'Levante Apartment: bright and welcoming, up to 6 guests, equipped balcony and air conditioning, just 150 metres from the sea in San Foca, Salento.'
      },
      ogImage: levanteGallery[0].src
    }
  },
  {
    id: 'ponente',
    slug: 'ponente',
    name: 'Ponente',
    capacityMin: 2,
    capacityMax: 4,
    shortDescription: {
      it: 'Accogliente e curato nei dettagli, con una terrazza privata: ideale per coppie o piccoli gruppi che cercano comfort e tranquillità a due passi dal mare di San Foca.',
      en: 'Cozy and thoughtfully finished, with a private terrace: ideal for couples or small groups looking for comfort and quiet just steps from the sea in San Foca.'
    },
    description: {
      it: "L'Appartamento Ponente si trova al piano terra di una casa indipendente, a soli 150 metri dal mare, con accesso diretto a una terrazza privata. Un ambiente compatto e funzionale, pensato per offrire tutti i comfort a coppie e piccoli gruppi fino a 4 persone.",
      en: 'The Ponente Apartment is located on the ground floor of a detached house, just 150 metres from the sea, with direct access to a private terrace. A compact, functional space designed to offer every comfort to couples and small groups of up to 4 guests.'
    },
    floor: { it: 'Piano terra', en: 'Ground floor' },
    bedrooms: 2,
    bathrooms: 1,
    bedConfiguration: [
      { it: '2 camere matrimoniali', en: '2 double bedrooms' },
      { it: 'Soggiorno con divano', en: 'Living room with sofa' }
    ],
    highlightFeatures: [
      { icon: 'kitchen', label: { it: 'Cucina attrezzata', en: 'Equipped kitchen' } },
      { icon: 'terrace', label: { it: 'Terrazza privata', en: 'Private terrace' } },
      { icon: 'washer', label: { it: 'Lavatrice', en: 'Washing machine' } }
    ],
    featuresChecklist: [
      { it: '2/4 posti letto', en: '2/4 guests' },
      { it: '2 camere matrimoniali', en: '2 double bedrooms' },
      { it: 'Soggiorno con divano', en: 'Living room with sofa' },
      { it: 'Cucina attrezzata', en: 'Equipped kitchen' },
      { it: '1 bagno con lavatrice', en: '1 bathroom with washing machine' },
      { it: 'Terrazza privata', en: 'Private terrace' },
      { it: 'Aria condizionata', en: 'Air conditioning' },
      { it: 'Wi-Fi gratuito', en: 'Free Wi-Fi' }
    ],
    amenities: [
      { icon: 'capacity', label: { it: 'Posti letto', en: 'Guests' }, value: 'Fino a 4' },
      { icon: 'wifi', label: { it: 'Wi-Fi gratuito', en: 'Free Wi-Fi' } },
      { icon: 'ac', label: { it: 'Aria condizionata', en: 'Air conditioning' } },
      { icon: 'kitchen', label: { it: 'Cucina attrezzata', en: 'Equipped kitchen' } },
      { icon: 'washer', label: { it: 'Lavatrice', en: 'Washing machine' } },
      { icon: 'terrace', label: { it: 'Terrazza privata', en: 'Private terrace' } },
      { icon: 'parking', label: { it: 'Parcheggio gratuito', en: 'Free parking' } }
    ],
    heroImage: { src: ponenteGallery[0].src, slug: ponenteGallery[0].slug },
    gallery: ponenteGallery,
    location: {
      text: {
        it: "L'appartamento Ponente si trova a soli 150 metri dal mare, in una zona tranquilla e ben servita.",
        en: 'The Ponente apartment is just 150 metres from the sea, in a quiet and well-served area.'
      },
      distanceFromSeaMeters: 150,
      mapsUrl: SAN_FOCA_MAPS_URL,
      mapEmbedUrl: SAN_FOCA_MAPS_EMBED_URL
    },
    seo: {
      title: {
        it: 'Appartamento Ponente a San Foca | San Foca Vacanze',
        en: 'Ponente Apartment in San Foca | San Foca Vacanze'
      },
      description: {
        it: 'Appartamento Ponente: accogliente e curato, fino a 4 posti letto, cucina attrezzata e terrazza privata, a soli 150 metri dal mare di San Foca nel Salento.',
        en: 'Ponente Apartment: cozy and thoughtfully finished, up to 4 guests, equipped kitchen and private terrace, just 150 metres from the sea in San Foca, Salento.'
      },
      ogImage: ponenteGallery[0].src
    }
  }
];

export function getApartmentBySlug(slug: string): Apartment | undefined {
  return apartments.find((a) => a.slug === slug);
}
