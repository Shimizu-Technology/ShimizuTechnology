import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import DirectionSwitcher from './components/DirectionSwitcher';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import HomeWork, { ClientLogos, Statement } from './components/HomeWork';
import useHomeMotion from './hooks/useHomeMotion';
import './home-motion.css';
import './design-directions.css';
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
      <DirectionSwitcher />
      <main id="main-content" tabIndex={-1}>
      <Hero />
      <ClientLogos />
      <HomeWork />
      <Statement />
      <Services />
      <Process />
      <About />
      <Contact motion />
      </main>
      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="button-primary fixed bottom-6 right-6 z-50 !rounded-full !p-3 shadow-lg"
          aria-label="Back to top"
        >
          <ArrowRight className="w-5 h-5 -rotate-90" />
        </button>
      )}
    </div>
  );
}

export default App;
