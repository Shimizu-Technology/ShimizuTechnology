import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HafaRemoteSite from './components/HafaRemoteSite.tsx';
import './index.css';

// Hafa Remote pages load only their own code: no company site and no analytics.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HafaRemoteSite pathname={window.location.pathname} />
  </StrictMode>
);
