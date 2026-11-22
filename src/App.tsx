import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import HomeWork, { ClientLogos, Statement } from './components/HomeWork';
import Testimonials from './components/Testimonials';
import useHomeMotion from './hooks/useHomeMotion';
import './home-motion.css';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useInitialHashScroll from './hooks/useInitialHashScroll';
import { track } from './lib/analytics';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track page view on component mount
  useEffect(() => {
    track('page_viewed', { page: 'homepage' });
  }, []);

  useInitialHashScroll();
  useHomeMotion();

  // Detect scroll position for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <div className="motion-home min-h-screen">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ClientLogos />
        <HomeWork />
        <Testimonials />
        <Statement />
        <Services />
        <Process />
        <About />
        <Contact motion />
      </main>
      <Footer />

      {/* Back to Top Button (desktop/tablet only so it never covers content on phones) */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="button-primary fixed bottom-6 right-6 z-40 hidden !min-h-11 !min-w-11 !rounded-full !p-3 shadow-lg md:inline-flex"
          aria-label="Back to top"
        >
          <ArrowRight className="w-5 h-5 -rotate-90" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default App;
