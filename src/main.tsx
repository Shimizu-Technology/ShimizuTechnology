import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import HafaRemoteSite from './components/HafaRemoteSite.tsx';
import HomeSiteErrorBoundary from './components/HomeSiteErrorBoundary.tsx';
import HomeSite from './components/HomeSiteLoader.tsx';
import './index.css';

const isHafaRemoteRoute = window.location.pathname === '/hafa-remote'
  || window.location.pathname.startsWith('/hafa-remote/');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isHafaRemoteRoute ? (
      <HafaRemoteSite pathname={window.location.pathname} />
    ) : (
      <HomeSiteErrorBoundary>
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          <HomeSite />
        </Suspense>
      </HomeSiteErrorBoundary>
    )}
  </StrictMode>
);
