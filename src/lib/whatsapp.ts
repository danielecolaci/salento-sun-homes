import type { Locale } from '@/lib/i18n';

export const WHATSAPP_NUMBER = '393281853887';

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function buildApartmentAvailabilityMessage(locale: Locale, apartmentName: string): string {
  return locale === 'it'
    ? `Ciao, vorrei ricevere informazioni sulla disponibilità dell'Appartamento ${apartmentName}.`
    : `Hi, I would like information about the availability of the ${apartmentName} Apartment.`;
}
