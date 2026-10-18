import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HafaRemoteSite from './components/HafaRemoteSite.tsx';
import HomeSite from './components/HomeSite.tsx';
import HomeSiteErrorBoundary from './components/HomeSiteErrorBoundary.tsx';
import { initAnalytics } from './lib/analytics.ts';
import './index.css';

const isHafaRemoteRoute = window.location.pathname === '/hafa-remote'
  || window.location.pathname.startsWith('/hafa-remote/');

// Hafa Remote pages promise not to load the company's product analytics.
if (!isHafaRemoteRoute) initAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isHafaRemoteRoute ? (
      <HafaRemoteSite pathname={window.location.pathname} />
    ) : (
      <HomeSiteErrorBoundary>
        <HomeSite />
      </HomeSiteErrorBoundary>
    )}
  </StrictMode>
);
