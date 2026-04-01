import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    number: '1 in 8',
    label: 'people globally have a mental health condition',
    source: 'WHO, 2022'
  },
  {
    number: '75%',
    label: 'receive no treatment at all',
    source: 'The Lancet Commission'
  },
  {
    number: '92%',
    label: 'of mental health apps are abandoned within 2 weeks',
    source: 'ORCHA/Lancet Digital Health'
  }
];

export default function Problem() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 sm:py-28 px-6"
      style={{ 
        background: 'linear-gradient(180deg, var(--cream) 0%, rgba(250,248,244,0.98) 100%)'
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`card text-center transition-all duration-600 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div 
                className="text-4xl sm:text-5xl font-light mb-3"
                style={{ 
                  fontFamily: 'Fraunces, serif',
                  color: index === 0 ? 'var(--purple)' : index === 1 ? 'var(--teal)' : 'var(--amber)'
                }}
              >
                {stat.number}
              </div>
              <p 
                className="text-sm leading-relaxed mb-2"
                style={{ color: 'var(--text-mid)' }}
              >
                {stat.label}
              </p>
              <p 
                className="text-[11px]"
                style={{ color: 'var(--text-muted)' }}
              >
                Source: {stat.source}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div 
          className={`text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p 
            className="text-lg sm:text-xl"
            style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
          >
            NeuroD is built differently.{' '}
            <span style={{ color: 'var(--purple)' }}>Here's why people stay.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
