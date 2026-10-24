import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HafaAppSite from './components/HafaAppSite.tsx';
import './index.css';

// Dedicated product entry: no company site or product analytics.
createRoot(document.getElementById('root')!).render(
  <StrictMode><HafaAppSite pathname={window.location.pathname} /></StrictMode>,
);
