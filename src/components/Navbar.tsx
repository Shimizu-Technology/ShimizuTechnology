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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={scrollToTop}
          >
            <img
              src={shimizuLogo}
              alt="Shimizu Technology Logo"
              className="h-9 w-9 object-contain rounded-full"
            />
            <span className="text-lg font-bold">
              Shimizu Technology
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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
              className="ml-3 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-sm font-medium transition-colors"
            >
              Code School
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
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
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileMenuOpen(false)} />
          <div
            ref={menuRef}
            className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-t border-white/10 z-50"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
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
          </div>
        </>
      )}
    </header>
  );
}
