import { Outlet, Link, createRootRoute, HeadContent } from '@tanstack/react-router';
import { MotionConfig } from 'framer-motion';
import { I18nProvider } from '@/lib/i18n';

function NotFoundComponent() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-background px-4'>
      <div className='max-w-md text-center'>
        <h1 className='text-7xl font-bold text-foreground'>404</h1>
        <h2 className='mt-4 text-xl font-semibold text-foreground'>Pagina non trovata</h2>
        <p className='mt-2 text-sm text-muted-foreground'>La pagina che cerchi non esiste o è stata spostata.</p>
        <div className='mt-6'>
          <Link
            to='/'
            className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});

function RootComponent() {
  return (
    <MotionConfig reducedMotion='user'>
      <HeadContent />
      <I18nProvider>
        <Outlet />
      </I18nProvider>
    </MotionConfig>
  );
}
