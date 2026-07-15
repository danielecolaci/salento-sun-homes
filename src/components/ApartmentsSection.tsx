import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { apartments } from '@/data/apartments';
import { ApartmentCard } from '@/components/apartments/ApartmentCard';

export function ApartmentsSection() {
  const { t } = useI18n();

  return (
    <section id='appartamenti' className='py-20 md:py-28' aria-labelledby='appartamenti-title'>
      <div className='container mx-auto px-4'>
        <motion.h2
          id='appartamenti-title'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-3xl md:text-4xl font-bold text-center mb-4'
        >
          {t('apartmentsHome', 'title')}
        </motion.h2>
        <p className='mx-auto mb-16 max-w-2xl text-center text-muted-foreground'>{t('apartmentsHome', 'intro')}</p>

        <div className='grid items-stretch gap-6 md:grid-cols-2'>
          {apartments.map((apartment, i) => (
            <ApartmentCard key={apartment.id} apartment={apartment} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
