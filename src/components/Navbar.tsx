import { useState, useEffect, useRef } from 'react';
import {
  Menu as MenuIcon,
  X as CloseIcon,
} from 'lucide-react';
import shimizuLogo from '../assets/ShimizuTechnologyLogo.jpg';

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isWorkPage = window.location.pathname.replace(/\/$/, '') === '/work';
  const navHref = (hash: string) => isWorkPage && hash !== '#contact' && hash !== '#projects' ? `/${hash}` : hash;

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;
      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (sectionTop <= scrollPosition && sectionBottom > scrollPosition) {
            setActiveSection(section.id);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      const links = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
      if (!links.length) return;
      const first = links[0];
      const last = links[links.length - 1];
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

  const closeMenu = (hash?: string) => {
    setMobileMenuOpen(false);
    if (!hash || (isWorkPage && hash !== '#contact' && hash !== '#projects')) return;
    requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>(`${hash} h2`);
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07101f]/95 text-white backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex h-[72px] items-center justify-between">
          <a
            href="/"
            aria-label="Shimizu Technology home"
            className="flex items-center space-x-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07101f]"
          >
            <img
              src={shimizuLogo}
              alt="Shimizu Technology Logo"
              className="h-9 w-9 rounded-full border border-white/10 object-contain"
            />
            <span className="whitespace-nowrap text-base font-bold tracking-tight sm:text-lg">
              Shimizu Technology
            </span>
          </a>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={navHref(item.href)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://codeschoolofguam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Code School
            </a>
          </div>

          <div className="lg:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <button type="button" tabIndex={-1} className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => { setMobileMenuOpen(false); menuButtonRef.current?.focus(); }} aria-label="Close menu" />
      )}
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        ref={menuRef}
        aria-hidden={!mobileMenuOpen}
        className={`absolute left-0 top-full z-50 max-h-[calc(100dvh-72px)] w-full overflow-y-auto border-t border-white/10 bg-[#07101f] lg:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
      >
        <div className="px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={navHref(item.href)}
              onClick={() => closeMenu(item.href)}
              className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                activeSection === item.href.slice(1)
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://codeschoolofguam.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 bg-red-500 rounded-md text-base font-medium text-white text-center mt-2"
          >
            Code School of Guam
          </a>
        </div>
      </nav>
    </header>
  );
}
