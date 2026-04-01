import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Do I need a diagnosis to use NeuroD?',
    answer: 'No. "Not sure yet" and "Just exploring" are valid options. Full access from day one.'
  },
  {
    question: 'Is this a replacement for therapy?',
    answer: 'No. NeuroD is the layer between you and your next appointment — it watches patterns, finds causes, and helps you prepare for conversations with your care team.'
  },
  {
    question: 'How is this different from a mood tracker?',
    answer: 'Mood trackers show what happened. NeuroD shows why — and where to intervene. That\'s the difference between "your mood is low" and "sensory overload 2 days ago is why your mood dropped today."'
  },
  {
    question: 'Is my data safe?',
    answer: 'Encrypted on your device. Never sold. Never used to train AI. Delete everything with one button. UK GDPR compliant.'
  },
  {
    question: 'When does it launch?',
    answer: '2026. Join the waitlist and we\'ll email you when it\'s ready.'
  },
  {
    question: 'Will it be free?',
    answer: 'The core experience will be free forever. No ads.'
  }
];

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 sm:py-28 px-6"
      style={{ 
        background: 'linear-gradient(180deg, rgba(250,248,244,0.98) 0%, var(--cream) 100%)'
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Section heading */}
        <div 
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 
            className="text-3xl sm:text-4xl mb-4"
            style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
          >
            Questions you might have
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`card p-0 overflow-hidden transition-all duration-600 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${(index + 1) * 80}ms` }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => toggleFaq(index)}
              >
                <span 
                  className="text-sm font-medium pr-4"
                  style={{ color: 'var(--text-dark)' }}
                >
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  style={{ color: 'var(--text-muted)' }}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p 
                  className="px-5 pb-5 text-sm leading-relaxed"
                  style={{ color: 'var(--text-mid)' }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
