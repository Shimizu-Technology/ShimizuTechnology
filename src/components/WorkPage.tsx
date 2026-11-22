import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import useInitialHashScroll from '../hooks/useInitialHashScroll';
import { track } from '../lib/analytics';
import { portfolioCounts, type PortfolioFilter } from '../data';

const filterOptions: { id: PortfolioFilter; label: string; count: number }[] = [
  { id: 'in-use', label: 'Live & active', count: portfolioCounts.inUse },
  { id: 'all', label: 'Show all', count: portfolioCounts.total },
  { id: 'in-progress', label: 'In development & prototypes', count: portfolioCounts.inProgress },
  { id: 'paused', label: 'Paused', count: portfolioCounts.paused },
];

const featuredCaseStudies = [
  { title: 'Cornerstone Payroll', href: '/work/cornerstone-payroll/' },
  { title: 'Hafaloha Orders', href: '/work/hafaloha-orders/' },
  { title: 'Marianas Open', href: '/work/marianas-open/' },
];

export default function WorkPage() {
  const [statusFilter, setStatusFilter] = useState<PortfolioFilter>('in-use');

  useEffect(() => {
    track('page_viewed', { page: 'portfolio' });
  }, []);

  useInitialHashScroll();

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="border-b border-[var(--border-subtle)] bg-[var(--surface-soft)] py-10 sm:py-14">
          <div className="site-container">
            <p className="font-mono-label section-label">Portfolio</p>
            <h1 className="mt-4 hero-title">Work built for real operations.</h1>
            <p className="mt-5 section-intro">
              {portfolioCounts.total} products, pilots, and systems we&apos;ve built, from live products and private deployments to work in progress. Each entry is labeled with its current status.
            </p>

            <div
              className="mt-6 flex flex-wrap gap-2"
              role="group"
              aria-label="Filter projects by status"
            >
              {filterOptions.map((option) => {
                if (option.count === 0 && option.id !== 'all') return null;
                const active = statusFilter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setStatusFilter(option.id)}
                    className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
                      active
                        ? 'border-[var(--action-primary)] bg-[var(--action-primary)] text-white'
                        : 'border-[var(--border-subtle)] bg-white text-slate-800 hover:border-[var(--accent-detail)] hover:bg-[var(--surface-page)]'
                    }`}
                  >
                    {option.label} ({option.count})
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--border-subtle)] pt-5 text-sm">
              <span className="font-mono-label text-xs text-slate-600">Case studies:</span>
              {featuredCaseStudies.map((study) => (
                <a
                  key={study.href}
                  href={study.href}
                  className="text-link inline-flex min-h-11 items-center gap-1 font-bold text-[var(--accent-detail)] underline underline-offset-4"
                >
                  {study.title} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>
        <Projects
          showSelected={false}
          showArchive
          statusFilter={statusFilter}
          onResetFilter={() => setStatusFilter('all')}
        />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
