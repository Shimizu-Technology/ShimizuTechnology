import { useState, useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import { ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const posthog = usePostHog();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track page view on component mount
  useEffect(() => {
    posthog.capture('page_viewed', { page: 'homepage' });
  }, [posthog]);

  // The homepage is loaded asynchronously, so the browser may try a direct
  // hash link before its target exists.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }));
  }, []);

  // Detect scroll position for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <main id="main-content" tabIndex={-1}>
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <Process />
      <About />
      <Contact />
      </main>
      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all z-50"
          aria-label="Back to top"
        >
          <ArrowRight className="w-5 h-5 -rotate-90" />
        </button>
      )}
    </div>
  );
}

export default App;
