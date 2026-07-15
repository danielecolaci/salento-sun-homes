import { createFileRoute, notFound, Link } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { ApartmentHero } from '@/components/apartments/ApartmentHero';
import { ApartmentOverview } from '@/components/apartments/ApartmentOverview';
import { ApartmentGallery } from '@/components/apartments/ApartmentGallery';
import { ApartmentLocation } from '@/components/apartments/ApartmentLocation';
import { ApartmentContactCta } from '@/components/apartments/ApartmentContactCta';
import { getApartmentBySlug, SITE_URL } from '@/data/apartments';
import { useI18n } from '@/lib/i18n';
import { useGoToApartments } from '@/lib/useGoToApartments';

export const Route = createFileRoute('/appartamenti/$slug')({
  loader: ({ params }) => {
    const apartment = getApartmentBySlug(params.slug);
    if (!apartment) throw notFound();
    return apartment;
  },
  head: ({ params }) => {
    const apartment = getApartmentBySlug(params.slug);
    if (!apartment) return {};

    const canonical = `${SITE_URL}/appartamenti/${apartment.slug}`;

    return {
      meta: [
        { title: apartment.seo.title.it },
        { name: 'description', content: apartment.seo.description.it },
        { property: 'og:title', content: apartment.seo.title.it },
        { property: 'og:description', content: apartment.seo.description.it },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: canonical },
        { property: 'og:image', content: apartment.seo.ogImage },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: apartment.seo.title.it },
        { name: 'twitter:description', content: apartment.seo.description.it }
      ],
      links: [{ rel: 'canonical', href: canonical }]
    };
  },
  component: ApartmentDetailPage
});

function ApartmentDetailPage() {
  const apartment = Route.useLoaderData();
  const { t } = useI18n();
  const goToApartments = useGoToApartments();

  return (
    <>
      <Header />
      <main id='main-content'>
        <div className='container mx-auto px-4 pt-24 md:pt-28'>
          <Breadcrumb aria-label={t('apartmentDetail', 'breadcrumbAriaLabel')}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to='/'>{t('apartmentDetail', 'breadcrumbHome')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <button type='button' onClick={goToApartments}>
                    {t('apartmentDetail', 'breadcrumbApartments')}
                  </button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{apartment.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {apartment.isPlaceholder && (
          <div className='container mx-auto px-4 mt-4' role='status'>
            <p className='rounded-xl border border-dashed border-border bg-muted px-4 py-3 text-sm text-muted-foreground'>
              {t('apartmentDetail', 'placeholderNotice')}
            </p>
          </div>
        )}

        <ApartmentHero apartment={apartment} />
        <ApartmentOverview apartment={apartment} />
        <ApartmentGallery apartment={apartment} />
        <ApartmentLocation apartment={apartment} />
        <ApartmentContactCta apartment={apartment} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
