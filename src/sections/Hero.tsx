import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden"
      style={{ background: 'var(--cream)' }}
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(109,40,217,0.08) 0%, transparent 50%)'
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Top label */}
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span 
            className="inline-block text-[11px] tracking-[0.12em] uppercase mb-6"
            style={{ color: 'var(--text-muted)' }}
          >
            For the 1 in 8
          </span>
        </div>

        {/* Main heading */}
        <h1 
          className={`text-4xl sm:text-5xl lg:text-[52px] leading-[1.15] mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
        >
          Your mind,{' '}
          <em 
            className="not-italic"
            style={{ color: 'var(--purple)' }}
          >
            understood.
          </em>
          <br />
          Not fixed — supported.
        </h1>

        {/* Subheading */}
        <p 
          className={`text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ color: 'var(--text-mid)' }}
        >
          Mental illness affects 1 in 8 people globally. Care is reactive, 
          generic, and scarce. NeuroD learns your patterns, finds the real 
          causes, and builds a plan that fits your brain.
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-3 justify-center mb-8 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button 
            onClick={scrollToWaitlist}
            className="btn-primary flex items-center justify-center gap-2 max-w-xs mx-auto sm:mx-0"
          >
            Join the waitlist — it's free
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={scrollToDemo}
            className="btn-secondary flex items-center justify-center gap-2 max-w-xs mx-auto sm:mx-0"
          >
            See how it works
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom line */}
        <p 
          className={`text-xs transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ color: 'var(--text-muted)' }}
        >
          Launching 2026 · Free forever · No ads · Your data stays yours
        </p>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-6 h-10 rounded-full border-2 border-[var(--border)] flex items-start justify-center p-2">
          <div 
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ background: 'var(--purple)' }}
          />
        </div>
      </div>
    </section>
  );
}
