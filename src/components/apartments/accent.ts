import { apartments } from '@/data/apartments';

export interface ApartmentAccent {
  text: string;
  bg: string;
  ring: string;
}

const ACCENTS: ApartmentAccent[] = [
  { text: 'text-primary', bg: 'bg-primary/10', ring: 'ring-primary/15' },
  { text: 'text-accent', bg: 'bg-accent/10', ring: 'ring-accent/15' }
];

/**
 * Alternates a distinct (but design-system) accent color per apartment, purely for
 * presentation — Levante gets the site's primary teal, the next apartment the navy
 * accent token, and so on, without hardcoding any apartment name.
 */
export function getApartmentAccent(apartmentId: string): ApartmentAccent {
  const index = apartments.findIndex((a) => a.id === apartmentId);
  return ACCENTS[Math.max(index, 0) % ACCENTS.length];
}
