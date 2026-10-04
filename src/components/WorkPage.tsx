import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import Navbar from './Navbar';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import useInitialHashScroll from '../hooks/useInitialHashScroll';

export default function WorkPage() {
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture('page_viewed', { page: 'portfolio' });
  }, [posthog]);

  useInitialHashScroll();

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="site-section border-b border-slate-200 bg-[var(--surface-soft)]">
          <div className="site-container">
            <p className="font-mono-label section-label">Selected portfolio</p>
            <h1 className="mt-5 max-w-4xl hero-title">Work built for real operations.</h1>
            <p className="mt-6 max-w-2xl section-intro">Explore live products, private deployments, pilots, and work in progress. Each entry is labeled with its current status.</p>
            <a href="/#projects" className="mt-7 inline-flex items-center font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-800">Start with selected client stories</a>
          </div>
        </section>
        <Projects showSelected={false} showArchive />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
