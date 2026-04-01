import { useEffect, useRef, useState } from 'react';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Capabilities from './sections/Capabilities';
import InteractiveDemo from './sections/InteractiveDemo';
import HowItWorks from './sections/HowItWorks';
import Principles from './sections/Principles';
import WaitlistForm from './sections/WaitlistForm';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-cream">
      {/* Celebration Banner - Fixed at top */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 celebration transition-transform duration-300 ${
          scrollY > 100 ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <span className="text-base">♾️</span>
        <span><strong>Neurodiversity Month</strong> · Celebrating different minds</span>
      </div>

      <main className="relative">
        <Hero />
        <Problem />
        <Capabilities />
        <InteractiveDemo />
        <HowItWorks />
        <Principles />
        <WaitlistForm />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}

export default App;
