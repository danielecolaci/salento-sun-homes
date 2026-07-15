import { useRouter } from '@tanstack/react-router';

const SECTION_ID = 'appartamenti';

/**
 * Navigates to the "I nostri appartamenti" section on the Home page.
 * From the Home itself it smooth-scrolls; from any other route it navigates
 * to "/" with the section hash, letting the Home mount effect scroll into view.
 */
export function useGoToApartments() {
  const router = useRouter();

  return () => {
    if (router.state.location.pathname === '/') {
      document.querySelector(`#${SECTION_ID}`)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.navigate({ to: '/', hash: SECTION_ID });
    }
  };
}
