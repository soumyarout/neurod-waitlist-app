import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Network, FileText, ChevronDown } from 'lucide-react';

const aiTypes = [
  {
    icon: TrendingUp,
    title: 'Pattern Recognition AI',
    subtitle: 'Powers "Early Signals"',
    content: 'Every check-in feeds into pattern detection — trend analysis across 7, 14, or 30 days. It spots your sleep drifting or social contact dropping before you\'re consciously aware.',
    badge: 'Runs on your device · Works offline',
    color: 'purple',
    timeline: null
  },
  {
    icon: Network,
    title: 'Causal Analysis AI',
    subtitle: 'Powers "Root Causes"',
    content: 'Most apps tell you what happened. NeuroD tells you why. It analyses temporal sequences — what changes first, what follows, with what delay — to find genuine causes, not just correlations.',
    badge: 'Progressive · Honest · No fake insights',
    color: 'teal',
    timeline: [
      { label: 'Days 1–14', desc: 'Building baseline', color: 'var(--border)' },
      { label: 'Days 14–30', desc: 'Correlations found', color: 'var(--amber)' },
      { label: 'Days 30–60', desc: 'Early causal links', color: 'var(--purple-mid)' },
      { label: 'Days 60+', desc: 'Confident personal causal model', color: 'var(--teal)' }
    ]
  },
  {
    icon: FileText,
    title: 'Generative AI',
    subtitle: 'Powers "Your Plan" & Chat',
    content: 'Translates signals and causes into a plan you can act on — in your language, at your energy level, for your brain type. Adapts to your neuro profile, strengths, and reading preference.',
    badge: 'Powered by Claude (Anthropic)',
    color: 'amber',
    timeline: null
  }
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 sm:py-28 px-6"
      style={{ background: 'var(--cream)' }}
    >
      <div className="max-w-4xl mx-auto">
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
            Three kinds of AI.{' '}
            <span style={{ color: 'var(--purple)' }}>One goal:</span>{' '}
            understanding you.
          </h2>
        </div>

        {/* AI type cards */}
        <div className="space-y-4">
          {aiTypes.map((ai, index) => (
            <div
              key={index}
              className={`card transition-all duration-600 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ 
                transitionDelay: `${(index + 1) * 150}ms`,
                borderLeft: `3px solid var(--${ai.color})`,
                borderRadius: '0 14px 14px 0'
              }}
            >
              {/* Header */}
              <button
                className="w-full flex items-center gap-4 p-1 text-left"
                onClick={() => toggleExpand(index)}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `var(--${ai.color}-light)` }}
                >
                  <ai.icon 
                    className="w-6 h-6" 
                    style={{ color: `var(--${ai.color})` }}
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1">
                  <h3 
                    className="text-lg font-medium"
                    style={{ color: 'var(--text-dark)' }}
                  >
                    {ai.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: `var(--${ai.color})` }}
                  >
                    {ai.subtitle}
                  </p>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                  style={{ color: 'var(--text-muted)' }}
                />
              </button>

              {/* Content */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  expandedIndex === index ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <p 
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: 'var(--text-mid)' }}
                >
                  {ai.content}
                </p>

                {/* Timeline for Causal Analysis */}
                {ai.timeline && (
                  <div className="flex flex-col gap-2 mb-4">
                    {ai.timeline.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: item.color }}
                        />
                        <span className="text-sm" style={{ color: 'var(--text-soft)' }}>
                          {item.label}: {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium"
                  style={{ 
                    background: `var(--${ai.color}-light)`,
                    color: `var(--${ai.color})`
                  }}
                >
                  ✓ {ai.badge}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div 
          className={`card-soft text-center mt-8 p-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-2xl mb-3">✦</div>
          <p 
            className="text-base mb-2"
            style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
          >
            Together, these three do something none can do alone.
          </p>
          <p className="text-sm" style={{ color: 'var(--text-mid)' }}>
            Pattern recognition spots the signal. Causal analysis finds the lever. 
            Generative AI puts it in your hands.
          </p>
        </div>
      </div>
    </section>
  );
}
