import { useState, useEffect, useRef } from 'react';
import { Menu as MenuIcon, X as CloseIcon, ArrowUpRight } from 'lucide-react';
import shimizuLogo from '../assets/ShimizuTechnologyLogo.jpg';

const navItems = [
  { href: '#projects', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef<HTMLElement>(null);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isWorkPage = window.location.pathname.replace(/\/$/, '') === '/work';
  const navHref = (hash: string) => isWorkPage && hash !== '#contact' && hash !== '#projects' ? `/${hash}` : hash;
  const currentState = (href: string) => isWorkPage && href === '#projects' ? 'page' as const : activeSection === href.slice(1) ? 'location' as const : undefined;

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      const scrollPosition = window.scrollY + 100;
      let current = '';
      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) current = section.id;
      });
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (!desktop.matches) return;
      const focusedLink = document.activeElement instanceof HTMLAnchorElement ? document.activeElement.getAttribute('href') : null;
      setMobileMenuOpen(false);
      requestAnimationFrame(() => {
        const links = Array.from(desktopNavRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
        (links.find((link) => link.getAttribute('href') === focusedLink) ?? links[0])?.focus({ preventScroll: true });
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
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = priorOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMenu = (hash?: string) => {
    setMobileMenuOpen(false);
    if (!hash) { menuButtonRef.current?.focus(); return; }
    if (isWorkPage && hash !== '#contact' && hash !== '#projects') return;
    requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>(`${hash} h2`);
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    });
  };

  return (
    <>
      <header className="site-header sticky top-0 z-50 backdrop-blur-md">
        <nav className="site-container" aria-label="Main navigation">
          <div className="flex h-[72px] items-center justify-between gap-4">
            <a href="/" aria-label="Shimizu Technology home" className="flex shrink-0 items-center gap-2.5 rounded-md">
              <img src={shimizuLogo} alt="" width="36" height="36" className="h-9 w-9 rounded-full object-contain" />
              <span className="text-sm font-bold tracking-tight sm:text-lg">Shimizu Technology</span>
            </a>
            <div ref={desktopNavRef} className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => <a key={item.href} href={navHref(item.href)} aria-current={currentState(item.href)} className="nav-link">{item.label}</a>)}
              <a href="#contact" aria-current={currentState('#contact')} className="button-primary ml-4">Let’s talk <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            </div>
            <button ref={menuButtonRef} type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-md p-2 hover:bg-slate-100 lg:hidden" aria-label="Toggle menu" aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">
              {mobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </nav>
        <nav id="mobile-navigation" aria-label="Mobile navigation" ref={menuRef} aria-hidden={!mobileMenuOpen} className={`absolute left-0 top-full z-50 max-h-[calc(100dvh-72px)] w-full overflow-y-auto border-t border-slate-200 bg-white shadow-lg lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="space-y-1 px-5 py-4">
            {navItems.map((item) => <a key={item.href} href={navHref(item.href)} aria-current={currentState(item.href)} onClick={() => closeMenu(item.href)} className="nav-link block py-3">{item.label}</a>)}
            <a href="#contact" onClick={() => closeMenu('#contact')} className="button-primary mt-3 w-full">Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="https://codeschoolofguam.com" target="_blank" rel="noopener noreferrer" onClick={() => closeMenu()} className="nav-link block py-3">Code School of Guam ↗</a>
            <button type="button" onClick={() => closeMenu()} className="nav-link w-full py-3 text-left">Close navigation</button>
          </div>
        </nav>
      </header>
      {mobileMenuOpen && <button type="button" tabIndex={-1} className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => closeMenu()} aria-label="Close menu" />}
    </>
  );
}
