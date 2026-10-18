import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import HomeSite from './components/HomeSite.tsx';
import HomeSiteErrorBoundary from './components/HomeSiteErrorBoundary.tsx';
import { initAnalytics } from './lib/analytics.ts';
import './index.css';

// Netlify serves Hafa Remote routes from hafa-remote-app.html (src/hafa-main.tsx).
// This fallback keeps them working where that rewrite is unavailable, such as vite preview.
const HafaRemoteSite = lazy(() => import('./components/HafaRemoteSite.tsx'));

const isHafaRemoteRoute = window.location.pathname === '/hafa-remote'
  || window.location.pathname.startsWith('/hafa-remote/');

// Hafa Remote pages promise not to load the company's product analytics.
if (!isHafaRemoteRoute) initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isHafaRemoteRoute ? (
      <Suspense fallback={null}>
        <HafaRemoteSite pathname={window.location.pathname} />
      </Suspense>
    ) : (
      <HomeSiteErrorBoundary>
        <HomeSite />
      </HomeSiteErrorBoundary>
    )}
  </StrictMode>
);
