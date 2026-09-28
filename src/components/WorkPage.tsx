import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import Navbar from './Navbar';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

export default function WorkPage() {
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture('page_viewed', { page: 'portfolio' });
  }, [posthog]);

  useEffect(() => {
    let id: string;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-[#07101f] py-20 text-white md:py-28">
          <div className="surface-grid absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <p className="font-mono-label text-xs text-blue-300">Complete portfolio</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">Work built for real operations.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">Explore live products, private deployments, pilots, and work in progress. Each entry is labeled with its current status.</p>
            <a href="/#projects" className="mt-7 inline-flex items-center font-semibold text-blue-300 underline underline-offset-4 hover:text-white">Start with selected client stories</a>
          </div>
        </section>
        <Projects showSelected={false} showArchive />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
