import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

import texture from '@/assets/texture.webp';

export function Description() {
  const { t } = useI18n();

  return (
    <section className='relative py-20 md:py-28 overflow-hidden' aria-labelledby='description-title'>
      {/* BACKGROUND IMAGE */}
      <div className='absolute inset-0 bg-cover bg-center md:bg-fixed' style={{ backgroundImage: `url(${texture})` }} />
      {/* OVERLAY (per leggibilità) */}
      <div className='absolute inset-0 bg-stone-50/80' />

      {/* CONTENT */}
      <div className='relative container mx-auto px-4 max-w-3xl text-center'>
        <motion.h2
          id='description-title'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-3xl md:text-4xl font-bold text-black mb-8'
        >
          {t('description', 'title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className='text-lg md:text-xl text-stone-950 leading-relaxed'
        >
          {t('description', 'text')}
        </motion.p>
      </div>
    </section>
  );
}
