import { createContext, useContext, useState, type ReactNode } from 'react';

export type Locale = 'it' | 'en';

interface TranslationSection {
  [key: string]: string | Array<Record<string, string>>;
}

const translations: Record<Locale, Record<string, TranslationSection>> = {
  it: {
    nav: {
      features: 'Caratteristiche',
      gallery: 'Gallery',
      location: 'Posizione',
      booking: 'Disponibilità',
      testimonials: 'Recensioni'
    },
    hero: {
      title: 'Le tue vacanze a 150 metri dal mare di San Foca',
      subtitle:
        '2 accoglienti case vacanze nel cuore del Salento, perfette per famiglie, gruppi, ospiti con animali e soggiorni accessibili',
      cta1: 'Verifica disponibilità',
      cta2: 'Scopri le soluzioni',
      badgeBeach: '🏖️ A 150m dal mare',
      badgePet: '🐾 Pet Friendly',
      badgeAccessible: '♿ Accessibile'
    },
    features: {
      title: 'Perché scegliere noi',
      items: [
        { icon: 'waves', title: '150 metri dal mare', desc: 'A pochi passi dalla splendida spiaggia di San Foca' },
        { icon: 'users', title: 'Fino a 9 posti letto', desc: 'Spazi ampi per tutta la famiglia e gli amici' },
        { icon: 'car', title: 'Parcheggio gratuito', desc: 'Posto auto dedicato incluso nel soggiorno' },
        { icon: 'paw', title: 'Pet friendly', desc: 'I tuoi amici a quattro zampe sono i benvenuti' },
        { icon: 'accessible', title: 'Accessibilità', desc: 'Soluzioni conformi alle normative per la disabilità' },
        {
          icon: 'shield',
          title: 'Conformi alle normative',
          desc: 'Appartamenti a norma per accessibilità e sicurezza'
        },
        { icon: 'store', title: 'Vicino a tutto', desc: 'Negozi, ristoranti e servizi a portata di mano' },
        { icon: 'baby', title: 'Perfetto per famiglie', desc: 'Ambienti sicuri e confortevoli per i più piccoli' },
        { icon: 'footprints', title: 'Tutto a piedi', desc: 'Mare, centro e servizi raggiungibili a piedi' },
        { icon: 'tree', title: 'Zona tranquilla', desc: 'Relax e tranquillità in un contesto residenziale' }
      ] as unknown as string
    },
    gallery: {
      title: 'I nostri ambienti'
    },
    description: {
      title: 'La tua esperienza a San Foca',
      text: 'Le nostre case vacanze a San Foca offrono ambienti spaziosi, luminosi e confortevoli, a pochi passi dal mare. Sono ideali per famiglie, gruppi, ospiti con animali domestici e per chi necessita di soluzioni accessibili e conformi alle normative per la disabilità.'
    },
    location: {
      title: 'San Foca, Salento',
      description:
        'San Foca è una perla del Salento adriatico, con un mare cristallino e un lungomare vivace. La posizione strategica permette di raggiungere facilmente Otranto, Lecce e le più belle località del Salento. A pochi passi troverai ristoranti, bar, negozi e tutti i servizi per una vacanza perfetta.'
    },
    form: {
      title: 'Verifica disponibilità',
      subtitle: 'Compila il form e ti risponderemo entro 24 ore',
      nome: 'Nome e Cognome',
      email: 'Email',
      persone: 'Numero di persone',
      checkin: 'Check-in (sabato)',
      settimane: 'Numero settimane',
      checkout: 'Check-out (sabato)',
      pets: 'Animali domestici al seguito',
      accessibility: 'Richiesta appartamento accessibile per disabilità',
      messaggio: 'Messaggio (opzionale)',
      submit: 'Invia richiesta',
      success: 'Richiesta inviata con successo! Ti contatteremo presto.',
      error: 'Si è verificato un errore. Riprova più tardi.',
      selectDate: 'Seleziona un sabato',
      week: 'settimana',
      weeks: 'settimane',
      personeLabel: 'persone'
    },
    testimonials: {
      title: 'Cosa dicono i nostri ospiti',
      items: [
        {
          name: 'Famiglia Rossi',
          type: 'family',
          text: 'Vacanza perfetta! I bambini hanno adorato la spiaggia a due passi. Appartamento spazioso e pulitissimo.'
        },
        {
          name: 'Marco e Luna 🐾',
          type: 'pet',
          text: 'Finalmente un posto dove il nostro cane è davvero benvenuto. Spiaggia, passeggiate e relax per tutti.'
        },
        {
          name: 'Giovanni B.',
          type: 'accessible',
          text: 'Appartamento accessibile e curato nei dettagli. Abbiamo potuto goderci la vacanza senza preoccupazioni.'
        },
        {
          name: 'Sarah & James',
          type: 'couple',
          text: "A wonderful holiday in Salento! Beautiful apartment, crystal clear sea and very kind hosts. We'll be back!"
        }
      ] as unknown as string
    },
    finalCta: {
      title: 'Prenota la tua estate nel Salento',
      button: 'Richiedi disponibilità ora'
    },
    footer: {
      contact: 'Contatti',
      email: 'renatadonateo@gmail.com',
      phone: '+39 328 185 3887',
      social: 'Seguici',
      privacy: 'Privacy Policy',
      rights: 'Tutti i diritti riservati',
      badgePet: 'Pet Friendly',
      badgeAccessible: 'Accessibile',
      badgeBeach: 'A 150m dal mare'
    }
  },
  en: {
    nav: {
      features: 'Features',
      gallery: 'Gallery',
      location: 'Location',
      booking: 'Availability',
      testimonials: 'Reviews'
    },
    hero: {
      title: 'Your holiday 150 meters from the sea in San Foca',
      subtitle:
        '2 welcoming vacation homes in the heart of Salento, perfect for families, groups, pet owners and accessible stays',
      cta1: 'Check availability',
      cta2: 'Explore our homes',
      badgeBeach: '🏖️ 150m from the sea',
      badgePet: '🐾 Pet Friendly',
      badgeAccessible: '♿ Accessible'
    },
    features: {
      title: 'Why choose us',
      items: [
        { icon: 'waves', title: '150m from the sea', desc: 'Just steps from the beautiful San Foca beach' },
        { icon: 'users', title: 'Up to 9 beds', desc: 'Spacious for the whole family and friends' },
        { icon: 'car', title: 'Free parking', desc: 'Dedicated parking included with your stay' },
        { icon: 'paw', title: 'Pet friendly', desc: 'Your four-legged friends are welcome' },
        { icon: 'accessible', title: 'Accessibility', desc: 'Solutions compliant with disability regulations' },
        { icon: 'shield', title: 'Fully compliant', desc: 'Apartments meeting accessibility and safety standards' },
        { icon: 'store', title: 'Close to everything', desc: 'Shops, restaurants and services within reach' },
        { icon: 'baby', title: 'Family friendly', desc: 'Safe and comfortable for the little ones' },
        { icon: 'footprints', title: 'Everything on foot', desc: 'Sea, town center and services all walkable' },
        { icon: 'tree', title: 'Quiet area', desc: 'Relaxation in a peaceful residential setting' }
      ] as unknown as string
    },
    gallery: {
      title: 'Our spaces'
    },
    description: {
      title: 'Your experience in San Foca',
      text: 'Our vacation homes in San Foca offer spacious, bright and comfortable environments, just steps from the sea. They are ideal for families, groups, guests with pets and for those who need accessible solutions compliant with disability regulations.'
    },
    location: {
      title: 'San Foca, Salento',
      description:
        "San Foca is a gem of the Adriatic Salento, with crystal clear sea and a lively promenade. Its strategic location makes it easy to reach Otranto, Lecce and the most beautiful spots in Salento. Nearby you'll find restaurants, bars, shops and all the services for a perfect holiday."
    },
    form: {
      title: 'Check availability',
      subtitle: "Fill out the form and we'll reply within 24 hours",
      nome: 'Full Name',
      email: 'Email',
      persone: 'Number of guests',
      checkin: 'Check-in (Saturday)',
      settimane: 'Number of weeks',
      checkout: 'Check-out (Saturday)',
      pets: 'Bringing pets',
      accessibility: 'Accessible apartment request for disability needs',
      messaggio: 'Message (optional)',
      submit: 'Send request',
      success: "Request sent successfully! We'll contact you soon.",
      error: 'An error occurred. Please try again later.',
      selectDate: 'Select a Saturday',
      week: 'week',
      weeks: 'weeks',
      personeLabel: 'guests'
    },
    testimonials: {
      title: 'What our guests say',
      items: [
        {
          name: 'The Rossi Family',
          type: 'family',
          text: 'Perfect holiday! The kids loved the beach just steps away. Spacious and spotless apartment.'
        },
        {
          name: 'Marco & Luna 🐾',
          type: 'pet',
          text: 'Finally a place where our dog is truly welcome. Beach, walks and relaxation for everyone.'
        },
        {
          name: 'Giovanni B.',
          type: 'accessible',
          text: 'Accessible apartment with great attention to detail. We enjoyed our holiday worry-free.'
        },
        {
          name: 'Sarah & James',
          type: 'couple',
          text: "A wonderful holiday in Salento! Beautiful apartment, crystal clear sea and very kind hosts. We'll be back!"
        }
      ] as unknown as string
    },
    finalCta: {
      title: 'Book your summer in Salento',
      button: 'Request availability now'
    },
    footer: {
      contact: 'Contact',
      email: 'renatadonateo@gmail.com',
      phone: '+39 328 185 3887',
      social: 'Follow us',
      privacy: 'Privacy Policy',
      rights: 'All rights reserved',
      badgePet: 'Pet Friendly',
      badgeAccessible: 'Accessible',
      badgeBeach: '150m from the sea'
    }
  }
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (section: string, key: string) => string;
  tArray: (section: string, key: string) => Array<Record<string, string>>;
}

const I18nContext = createContext<I18nContextType | null>(null);

const getInitialLocale = (): Locale => {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('it')) return 'it';
  if (lang.startsWith('en')) return 'en';
  return 'en';
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale());

  const t = (section: string, key: string): string => {
    const sectionData = translations[locale]?.[section];
    if (!sectionData) return key;
    const value = sectionData[key];
    if (typeof value === 'string') return value;
    return key;
  };

  const tArray = (section: string, key: string): Array<Record<string, string>> => {
    const sectionData = translations[locale]?.[section];
    if (!sectionData) return [];
    const value = sectionData[key];
    if (Array.isArray(value)) return value as Array<Record<string, string>>;
    return [];
  };

  return <I18nContext.Provider value={{ locale, setLocale, t, tArray }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
