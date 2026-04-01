import { useEffect, useRef, useState } from 'react';
import { Sparkles, Shield, Moon, Lock, Heart } from 'lucide-react';

const principles = [
  {
    icon: Sparkles,
    title: 'Strengths first, always',
    description: 'Every plan starts with what you\'re good at.',
    color: 'purple'
  },
  {
    icon: Shield,
    title: 'Honest AI',
    description: 'Not enough data? We say so. No fake insights.',
    color: 'teal'
  },
  {
    icon: Moon,
    title: 'The 3am test',
    description: 'Every feature works when you have nothing left to give.',
    color: 'amber'
  },
  {
    icon: Lock,
    title: 'Your data is yours',
    description: 'Encrypted. Never sold. Delete with one button.',
    color: 'purple'
  },
  {
    icon: Heart,
    title: 'No shame mechanics',
    description: 'No streaks. No badges. No guilt.',
    color: 'rose'
  }
];

export default function Principles() {
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
      { threshold: 0.15 }
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
        {/* Section heading */}
        <div 
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 
            className="text-3xl sm:text-4xl mb-4"
            style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
          >
            Built on five promises
          </h2>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((principle, index) => (
            <div
              key={index}
              className={`card transition-all duration-600 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ 
                  background: principle.color === 'rose' 
                    ? '#FCE7F3' 
                    : `var(--${principle.color}-light)` 
                }}
              >
                <principle.icon 
                  className="w-5 h-5" 
                  style={{ 
                    color: principle.color === 'rose' 
                      ? 'var(--rose)' 
                      : `var(--${principle.color})` 
                  }}
                  strokeWidth={2}
                />
              </div>
              <h3 
                className="text-base font-medium mb-2"
                style={{ color: 'var(--text-dark)' }}
              >
                {principle.title}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-mid)' }}
              >
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
