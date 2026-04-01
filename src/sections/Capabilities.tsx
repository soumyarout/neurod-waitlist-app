import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Network, FileText } from 'lucide-react';

const capabilities = [
  {
    icon: TrendingUp,
    title: 'Spots what you can\'t see yet',
    description: 'NeuroD watches patterns in your mood, sleep, and energy — and notices when something shifts before it becomes a problem.',
    tags: ['Works offline', 'Runs on your device'],
    color: 'purple',
    bgColor: 'var(--purple-light)',
    iconColor: 'var(--purple)'
  },
  {
    icon: Network,
    title: 'Finds the real why',
    description: 'Not just "you feel low" — traces the chain. Office noise → poor sleep → social withdrawal → mood crash. NeuroD finds the first domino.',
    tags: ['Gets smarter over time', 'Honest about uncertainty'],
    color: 'teal',
    bgColor: 'var(--teal-light)',
    iconColor: 'var(--teal)'
  },
  {
    icon: FileText,
    title: 'Builds a plan that fits your brain',
    description: 'Every recommendation adapts to your neuro profile, your energy today, and what actually works for people like you. Not generic advice — yours.',
    tags: ['Strength-first', 'Never pathologising'],
    color: 'amber',
    bgColor: 'var(--amber-light)',
    iconColor: 'var(--amber)'
  }
];

export default function Capabilities() {
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
      style={{ background: 'var(--cream)' }}
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
            Three things no other app does
          </h2>
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => (
            <div
              key={index}
              className={`card transition-all duration-600 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: cap.bgColor }}
              >
                <cap.icon 
                  className="w-6 h-6" 
                  style={{ color: cap.iconColor }}
                  strokeWidth={2}
                />
              </div>

              {/* Title */}
              <h3 
                className="text-lg font-medium mb-3"
                style={{ color: 'var(--text-dark)' }}
              >
                {cap.title}
              </h3>

              {/* Description */}
              <p 
                className="text-sm leading-relaxed mb-5"
                style={{ color: 'var(--text-mid)' }}
              >
                {cap.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {cap.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                      cap.color === 'purple' ? 'pill-selected' :
                      cap.color === 'teal' ? 'pill-teal' :
                      'bg-[var(--amber-light)] text-[var(--amber)] border border-[var(--amber)]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
