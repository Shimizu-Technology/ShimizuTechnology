import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CaseStudyPage from './components/case-studies/CaseStudyPage.tsx';
import { resolveCaseStudySlug } from './data/caseStudies.ts';
import { initAnalytics } from './lib/analytics.ts';
import './index.css';
import './case-study.css';

initAnalytics();

const slug = resolveCaseStudySlug(
  window.location.pathname,
  document.documentElement.dataset.caseStudy,
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CaseStudyPage slug={slug} />
  </StrictMode>,
);
