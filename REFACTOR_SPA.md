# Conversione da SSR a SPA - Documentazione del Refactor

## Obiettivo completato ✅

Il progetto è stato convertito da **SSR (Server-Side Rendering)** con `@tanstack/react-start` a una **SPA pura (Single
Page Application)** pronta per il deployment statico su Netlify.

## Cambiamenti effettuati

### 1. **Rimozione dipendenze SSR**

- ❌ Rimosso: `@tanstack/react-start`
- ❌ Rimosso: `@cloudflare/vite-plugin`
- ❌ Rimosso: `@lovable.dev/vite-tanstack-config`
- ✅ Mantenuto: `@tanstack/react-router` (routing file-based)
- ✅ Mantenuto: `@tanstack/router-plugin` (genera routeTree.gen.ts)

### 2. **Nuovo bootstrap client-side**

#### `index.html` (nella root)

- Punto di entry HTML dell'app
- Importa il bundle JS generato da Vite
- DIV con id="root" per il rendering React

#### `src/main.tsx` (nuovo)

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

const rootElement = document.getElementById('root');
if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement!);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
```

### 3. **Configurazione Vite standard**

#### `vite.config.ts` (rigenerato)

- Rimosso: `@lovable.dev/vite-tanstack-config`
- Aggiunto: `@vitejs/plugin-react` + `TanStackRouterVite` + `tailwindcss` + `tsConfigPaths`
- Output build: `dist/index.html` (SPA singolo file)
- Code-splitting manuale dei vendor per ottimizzazione

### 4. **Aggiornamento routing**

#### `src/router.tsx`

- Router creato come istanza diretta (non più dentro funzione)
- Esportato per essere usato in `src/main.tsx`
- Rimosso il modello SSR `getRouter()`

#### `src/routes/__root.tsx`

- ❌ Rimosso: `HeadContent`, `Scripts` (SSR-specific)
- ❌ Rimosso: `head()` metadata (metadata ora in `index.html`)
- ❌ Rimosso: `shellComponent` (non serve per SPA)
- ✅ Semplificato: Solo `component` + `notFoundComponent`
- ✅ Mantenuto: Layout della route + I18nProvider

### 5. **Configurazione Netlify**

#### `public/_redirects`

```
/* /index.html 200
```

- SPA fallback: tutte le route sconosciute rimandano a `index.html`
- TanStack Router gestisce la navigazione client-side

#### `netlify.toml` (nuovo)

- Build command: `npm run build`
- Publish directory: `dist`
- Cache headers: versioned assets (1 anno), index.html (no-cache)
- Security headers: X-Frame-Options, X-Content-Type-Options

## Output build

```
dist/
├── index.html                    (entry HTML)
├── _redirects                    (Netlify SPA fallback)
├── assets/
│   ├── vendor-react-*.js        (React + ReactDOM)
│   ├── vendor-router-*.js       (TanStack Router)
│   ├── vendor-radix-*.js        (Radix UI components)
│   ├── index-*.js               (app code)
│   ├── *.css                    (Tailwind + styles)
│   └── *.webp / *.jpg           (optimized images)
```

## Come deployare su Netlify

### Metodo 1: Netlify UI (consigliato)

1. Push codice su GitHub
2. Connetti repo su netlify.com
3. Netlify legge `netlify.toml` automaticamente
4. Deploy automatico su main branch

### Metodo 2: Netlify CLI

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Metodo 3: GitHub Actions (CI/CD)

```yaml
- name: Build
  run: npm run build

- name: Deploy to Netlify
  uses: nflx-mburns/deploy-to-netlify-action@v1.2.3
  with:
    dir: dist
    prod: true
```

## Verifiche completate ✅

- ✅ Dev server: `npm run dev` (localhost:3001)
- ✅ Build: `npm run build` → `dist/index.html`
- ✅ Routing: TanStack Router file-based funzionante
- ✅ Componenti: Tailwind, Radix UI, EmailJS compatibili
- ✅ Supabase: Client-side auth middleware mantenuto
- ✅ Assets: Immagini, fonts, CSS ottimizzati

## Troubleshooting

### Errore: "Cannot find module '@tanstack/react-start'"

→ Rimosso. Se vedi errori dopo build, assicurati di aver fatto `npm install` dopo i cambiamenti al package.json.

### Errore: "HeadContent is not exported from @tanstack/react-router"

→ Rimosso perché SSR-specific. Metadata ora in `index.html`.

### SPA 404 su Netlify

→ Verifica che `_redirects` sia stato deployato:

```bash
curl https://your-site.netlify.app/_redirects
# Deve mostrare: /* /index.html 200
```

### Chunks troppo grandi

→ Normali per questo progetto. Rollup sta già dividendo in vendor chunks. Se necessario, implementare lazy loading per
route specifiche.

## Prossimi step (opzionali)

1. **Lazy loading per route**: importare route dinamicamente per ridurre initial bundle
2. **Image optimization**: convertire più immagini a WebP
3. **Service Worker**: implementare PWA per offline support
4. **Environment variables**: gestire .env per API keys (Supabase, EmailJS)
5. **Analytics**: aggiungere Netlify Analytics o Vercel Web Analytics

## File modificati

```
✅ package.json              (rimosso SSR, aggiunto SPA)
✅ vite.config.ts            (da Lovable config a standard)
✅ index.html                (creato)
✅ src/main.tsx              (creato)
✅ src/router.tsx            (router esportato)
✅ src/routes/__root.tsx    (rimosso SSR, semplificato)
✅ public/_redirects         (aggiornato fallback)
✅ netlify.toml              (creato per deploy)
```

## Note finali

- ✅ Nessun breaking change per componenti/routing esistenti
- ✅ Tailwind, EmailJS, Supabase continuano a funzionare
- ✅ i18n (I18nProvider) mantenuto intatto
- ✅ Compatibilità con Netlify form handling
- ✅ Production-ready per environment statico
