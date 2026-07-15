import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import type { Apartment } from '@/data/apartments';
import { ApartmentPhoto } from './ApartmentPhoto';
import { amenityIconMap } from './amenityIcons';

interface ApartmentCardProps {
  apartment: Apartment;
  index: number;
}

export function ApartmentCard({ apartment, index }: ApartmentCardProps) {
  const { locale, t } = useI18n();
  const highlights = apartment.highlightFeatures.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className='h-full'
    >
      {/* The whole card is a single link: no interactive elements are nested inside it. */}
      <Link
        to='/appartamenti/$slug'
        params={{ slug: apartment.slug }}
        className='group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      >
        <div className='relative'>
          <ApartmentPhoto image={apartment.heroImage} apartmentName={apartment.name} className='w-full' />
          {apartment.isPlaceholder && (
            <span className='absolute left-3 top-3 rounded-full bg-foreground/80 px-3 py-1 text-xs font-semibold text-background'>
              {t('apartmentsHome', 'comingSoon')}
            </span>
          )}
        </div>

        <div className='flex flex-1 flex-col p-6'>
          <h3 className='font-heading text-xl font-bold text-foreground'>{apartment.name}</h3>
          <p className='mt-2 flex-1 text-sm text-muted-foreground'>{apartment.shortDescription[locale]}</p>

          {apartment.capacityMax > 0 && (
            <p className='mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground'>
              <Users className='h-4 w-4 text-primary' aria-hidden='true' />
              {t('apartmentsHome', 'upTo')} {apartment.capacityMax} {t('apartmentsHome', 'guests')}
            </p>
          )}

          {highlights.length > 0 && (
            <ul className='mt-4 flex flex-wrap gap-2'>
              {highlights.map((feature) => {
                const Icon = amenityIconMap[feature.icon];
                return (
                  <li
                    key={`${feature.icon}-${feature.label.it}`}
                    className='inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground'
                  >
                    <Icon className='h-3.5 w-3.5 text-primary' aria-hidden='true' />
                    {feature.label[locale]}
                  </li>
                );
              })}
            </ul>
          )}

          <span className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary'>
            {t('apartmentsHome', 'cta')}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' aria-hidden='true' />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
