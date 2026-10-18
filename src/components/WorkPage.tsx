import { useEffect } from 'react';
import Navbar from './Navbar';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import useInitialHashScroll from '../hooks/useInitialHashScroll';
import { track } from '../lib/analytics';
import { portfolioCounts } from '../data';

export default function WorkPage() {
  useEffect(() => {
    track('page_viewed', { page: 'portfolio' });
  }, []);

  useInitialHashScroll();

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="border-b border-slate-200 bg-[var(--surface-soft)] py-10 sm:py-14">
          <div className="site-container">
            <p className="font-mono-label section-label">Portfolio</p>
            <h1 className="mt-4 hero-title">Work built for real operations.</h1>
            <p className="mt-5 section-intro">{portfolioCounts.total} products, pilots, and systems we&apos;ve built, from live products and private deployments to work in progress. Each entry is labeled with its current status.</p>
            <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold" aria-label="Portfolio status summary">
              <li className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-900">{portfolioCounts.inUse} live, seasonal, or private</li>
              <li className="rounded-full bg-amber-100 px-3 py-1.5 text-amber-900">{portfolioCounts.inProgress} in development or prototype</li>
              {portfolioCounts.paused > 0 && <li className="rounded-full bg-white px-3 py-1.5 text-slate-700">{portfolioCounts.paused} paused</li>}
            </ul>
            <a href="/#projects" className="text-link mt-4 inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">Read the selected case studies</a>
          </div>
        </section>
        <Projects showSelected={false} showArchive />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
