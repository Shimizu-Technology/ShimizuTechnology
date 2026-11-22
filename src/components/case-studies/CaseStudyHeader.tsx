import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import shimizuLogo from '../../assets/ShimizuTechnologyLogo.jpg';

const navItems = [
  { href: '/work/', label: 'Work', isCurrent: true },
  { href: '/#services', label: 'Services', isCurrent: false },
  { href: '/#process', label: 'Process', isCurrent: false },
  { href: '/#about', label: 'About', isCurrent: false },
] as const;

export default function CaseStudyHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (!desktop.matches) return;
      setMobileMenuOpen(false);
      requestAnimationFrame(() => {
        desktopNavRef.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
      });
    };
    closeOnDesktop();
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key !== 'Tab') return;
      const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = priorOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header className="cs-header">
        <nav className="site-container" aria-label="Main navigation">
          <div className="cs-header-inner">
            <a href="/" aria-label="Shimizu Technology home" className="cs-brand">
              <img
                src={shimizuLogo}
                alt=""
                width="36"
                height="36"
                className="h-9 w-9 rounded-full object-contain"
              />
              <span className="truncate text-sm font-bold tracking-tight sm:text-lg">
                Shimizu Technology
              </span>
            </a>

            <div ref={desktopNavRef} className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={item.isCurrent ? 'page' : undefined}
                  className="cs-nav-link"
                >
                  {item.label}
                </a>
              ))}
              <a href="/#contact" className="cs-btn cs-btn-primary ml-4">
                Let’s talk <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <a href="/#contact" className="cs-btn cs-btn-primary cs-btn-compact">
                Let’s talk
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-white text-[var(--text-primary)]"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="case-study-mobile-nav"
              >
                {mobileMenuOpen ? <CloseIcon className="h-5 w-5" aria-hidden="true" /> : <MenuIcon className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </nav>

        <nav
          id="case-study-mobile-nav"
          aria-label="Mobile navigation"
          ref={menuRef}
          aria-hidden={!mobileMenuOpen}
          className={`absolute left-0 top-full z-50 max-h-[calc(100dvh-72px)] w-full overflow-y-auto border-t border-[var(--border-subtle)] bg-white shadow-lg lg:hidden ${
            mobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="space-y-1 px-5 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={item.isCurrent ? 'page' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="cs-nav-link flex min-h-12 w-full items-center py-3"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="cs-btn cs-btn-primary mt-3 w-full"
            >
              Start a conversation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="https://codeschoolofguam.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="cs-nav-link flex min-h-12 w-full items-center py-3"
            >
              Code School of Guam ↗
            </a>
            <button
              type="button"
              onClick={closeMenu}
              className="cs-nav-link flex min-h-12 w-full items-center py-3 text-left"
            >
              Close navigation
            </button>
          </div>
        </nav>
      </header>
      {mobileMenuOpen && (
        <button
          type="button"
          tabIndex={-1}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={closeMenu}
          aria-label="Close menu"
        />
      )}
    </>
  );
}
