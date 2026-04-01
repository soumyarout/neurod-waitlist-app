import { useEffect, useRef, useState } from 'react';

const footerLinks = [
  { label: 'How it works', href: '#demo' },
  { label: 'About', href: '#' },
  { label: 'FAQ', href: '#faq' }
];

export default function Footer() {
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
    <footer 
      ref={sectionRef}
      className="py-16 px-6"
      style={{ 
        background: 'var(--cream)',
        borderTop: '1px solid var(--border-soft)'
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div 
          className={`flex flex-col md:flex-row items-center justify-between gap-8 mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <div 
              className="text-2xl font-medium mb-2"
              style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
            >
              NeuroD
            </div>
            <p 
              className="text-sm"
              style={{ color: 'var(--text-mid)' }}
            >
              Your mind, understood.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors hover:text-[var(--purple)]"
                style={{ color: 'var(--text-mid)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Built info */}
          <div 
            className="text-sm text-center md:text-right"
            style={{ color: 'var(--text-muted)' }}
          >
            Built during<br />
            Neurodiversity Month 2026
          </div>
        </div>

        {/* Bottom line */}
        <div 
          className={`pt-8 border-t text-center transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ borderColor: 'var(--border-soft)' }}
        >
          <p 
            className="text-xs mb-4"
            style={{ color: 'var(--text-muted)' }}
          >
            Handcrafted with so much ❤️ for every kind of mind in Crawley 🇬🇧
          </p>
          <p
            className="text-sm"
            style={{ 
              fontFamily: 'Fraunces, serif',
              color: 'var(--purple)'
            }}
          >
            ♾️ Different minds change everything.
          </p>
        </div>
      </div>
    </footer>
  );
}
