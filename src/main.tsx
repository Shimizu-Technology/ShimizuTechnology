import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import HomeSite from './components/HomeSite.tsx';
import HomeSiteErrorBoundary from './components/HomeSiteErrorBoundary.tsx';
import { initAnalytics } from './lib/analytics.ts';
import './index.css';

// Netlify serves product routes from their dedicated HTML entries.
// This fallback keeps them working where that rewrite is unavailable, such as vite preview.
const HafaRemoteSite = lazy(() => import('./components/HafaRemoteSite.tsx'));

const HafaAppSite = lazy(() => import('./components/HafaAppSite.tsx'));
const isHafaAppRoute = ['/hafa-workouts', '/hafa-baby'].some((base) => window.location.pathname === base || window.location.pathname.startsWith(base + '/'));

const isHafaRemoteRoute = window.location.pathname === '/hafa-remote'
  || window.location.pathname.startsWith('/hafa-remote/');

// Product pages do not initialize the company's product analytics.
if (!isHafaRemoteRoute && !isHafaAppRoute) initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isHafaAppRoute ? (
      <Suspense fallback={null}><HafaAppSite pathname={window.location.pathname} /></Suspense>
    ) : isHafaRemoteRoute ? (
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
