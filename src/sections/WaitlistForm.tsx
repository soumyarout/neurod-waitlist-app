import { useEffect, useRef, useState } from 'react';
import { Check, Twitter, Linkedin, Link2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const neuroTypes = [
  'ADHD', 'Autistic', 'AuDHD', 'Dyslexia', 'Dyspraxia',
  "Tourette's", 'Sensory SPD', 'Not sure yet', 'Just exploring',
  'Supporting someone', 'Professional/clinician'
];

function getUtmSource(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('utm_source') || 'website';
}

export default function WaitlistForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [count, setCount] = useState<number | null>(null);
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

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const fetchCount = async () => {
    const { data } = await supabase.rpc('get_waitlist_count');
    if (typeof data === 'number') {
      setCount(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    const { error: insertError } = await supabase
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        source: getUtmSource(),
        neuro_type: selectedTypes.length > 0 ? selectedTypes.join(', ') : null,
      });

    if (insertError && insertError.code !== '23505') {
      // 23505 = unique_violation (duplicate email) — treat as success
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
      return;
    }

    await fetchCount();
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const shareText = {
    twitter: `I just joined the waitlist for @NeuroD_app — an AI-powered mental health companion that actually understands neurodiverse brains.

It spots patterns before you notice them, finds the real causes behind hard days, and builds a plan that fits your brain.

Join the waitlist: https://neurod.app

#Neurodiversity #MentalHealth #AI`,
    linkedin: `Mental illness affects 1 in 8 people globally. For neurodiverse individuals, the gap between need and care is even wider.

I just joined the waitlist for NeuroD — a new kind of mental health app that uses three types of AI (pattern recognition, causal analysis, and generative AI) to understand your mind, find the real causes behind hard days, and build a care plan that fits your brain.

No streaks. No shame. No generic advice. Strengths first.

Join the waitlist: https://neurod.app`
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.twitter)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://neurod.app')}`;
    window.open(url, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText('https://neurod.app');
  };

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="py-20 sm:py-28 px-6"
      style={{ background: 'var(--cream)' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section heading */}
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
          >
            Be the first to try NeuroD
          </h2>
          <p
            className="text-base"
            style={{ color: 'var(--text-mid)' }}
          >
            Join the waitlist. We'll let you know when it's ready.
            <br />
            No spam — just one email when we launch.
          </p>
        </div>

        {!isSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Email input */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="your@email.com"
                className="flex-1 px-5 py-4 rounded-[14px] border-[1.5px] border-[var(--border)] bg-white text-sm focus:outline-none focus:border-[var(--purple-mid)] transition-colors"
                style={{ color: 'var(--text-dark)' }}
                required
              />
              <button
                type="submit"
                disabled={isLoading || !validateEmail(email)}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Join the waitlist
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-center mb-4" style={{ color: '#DC2626' }}>
                {error}
              </p>
            )}

            {/* Optional neuro type selection */}
            <div className="text-center">
              <p
                className="text-xs mb-3"
                style={{ color: 'var(--text-soft)' }}
              >
                I identify as: <span style={{ color: 'var(--text-muted)' }}>(optional)</span>
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {neuroTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`pill ${selectedTypes.includes(type) ? 'pill-selected' : 'pill-outline'}`}
                    onClick={() => toggleType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </form>
        ) : (
          /* Success state */
          <div
            className={`text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'var(--teal-light)' }}
            >
              <Check className="w-8 h-8" style={{ color: 'var(--teal)' }} />
            </div>

            <h3
              className="text-2xl mb-3"
              style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
            >
              You're on the list.
            </h3>

            <p
              className="text-sm mb-8 max-w-md mx-auto"
              style={{ color: 'var(--text-mid)' }}
            >
              We'll email you when NeuroD launches. Thank you for caring about
              better mental health support.
            </p>

            {/* Share buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={shareOnTwitter}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  background: '#1DA1F2',
                  color: 'white'
                }}
              >
                <Twitter className="w-4 h-4" />
                Share on X
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors"
                style={{
                  background: '#0A66C2',
                  color: 'white'
                }}
              >
                <Linkedin className="w-4 h-4" />
                Share on LinkedIn
              </button>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text-mid)'
                }}
              >
                <Link2 className="w-4 h-4" />
                Copy link
              </button>
            </div>

            {/* Social proof counter */}
            {count !== null && count > 10 && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                style={{
                  background: 'var(--purple-light)',
                  color: 'var(--purple)'
                }}
              >
                <span>🎉</span>
                <span className="font-medium">{count}</span>
                <span>people have joined so far</span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
