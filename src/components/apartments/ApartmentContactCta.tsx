import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import type { Apartment } from '@/data/apartments';
import { buildApartmentAvailabilityMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

export function ApartmentContactCta({ apartment }: { apartment: Apartment }) {
  const { locale, t } = useI18n();
  const whatsappHref = buildWhatsAppUrl(buildApartmentAvailabilityMessage(locale, apartment.name));
  const phoneDisplay = t('footer', 'phone');
  const phoneHref = `tel:${phoneDisplay.replace(/\s/g, '')}`;

  return (
    <section className='py-16 md:py-20' aria-labelledby='apartment-contact-title'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col gap-8 rounded-3xl border border-border/60 bg-linear-to-br from-card to-secondary/50 p-8 shadow-md md:flex-row md:items-center md:justify-between md:p-10'>
          <div className='flex items-start gap-4'>
            <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-whatsapp/10'>
              <MessageCircle className='h-7 w-7 text-whatsapp' aria-hidden='true' />
            </div>
            <div>
              <h2 id='apartment-contact-title' className='text-xl font-bold tracking-tight text-foreground'>
                {t('apartmentDetail', 'contactTitle')}
              </h2>
              <p className='mt-1 font-semibold text-primary'>{t('apartmentDetail', 'contactSubtitle')}</p>
              <p className='mt-2 max-w-sm text-sm text-muted-foreground'>{t('apartmentDetail', 'contactText')}</p>
            </div>
          </div>

          <div className='flex flex-col items-stretch gap-3 sm:flex-row sm:items-center'>
            <Button
              asChild
              size='lg'
              className='rounded-xl bg-whatsapp text-primary-foreground shadow-sm hover:bg-whatsapp/90 hover:shadow-md'
            >
              <a href={whatsappHref} target='_blank' rel='noopener noreferrer'>
                <MessageCircle className='h-4 w-4' aria-hidden='true' />
                {t('apartmentDetail', 'contactWhatsapp')}
              </a>
            </Button>
            <a
              href={phoneHref}
              className='inline-flex flex-col items-center gap-1 rounded-xl border border-border/60 bg-card px-5 py-2.5 text-sm text-muted-foreground shadow-sm transition-colors hover:text-foreground sm:items-start'
            >
              <span className='inline-flex items-center gap-1.5 font-semibold text-foreground'>
                <Phone className='h-4 w-4 text-primary' aria-hidden='true' />
                {phoneDisplay}
              </span>
              <span>{t('apartmentDetail', 'callUs')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
