import { useState } from 'react';
import type { ScreenType } from '../InteractiveDemo';

interface DemoProfile1Props {
  onNavigate: (screen: ScreenType) => void;
}

const neuroTypes = [
  '🧠 ADHD', '✦ Autistic', '📖 Dyslexia', '🎯 Dyspraxia', 
  '🔢 Dyscalculia', '⚡ Tourette\'s', '🌊 Sensory SPD', '♾️ AuDHD',
  '🤷 Not sure yet', '💡 Just exploring'
];

const pronouns = ['they/them', 'she/her', 'he/him', 'other'];
const tones = ['Simple & clear', 'Friendly', 'Clinical'];

export default function DemoProfile1({ onNavigate }: DemoProfile1Props) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['🧠 ADHD', '♾️ AuDHD']);
  const [selectedPronoun, setSelectedPronoun] = useState('they/them');
  const [selectedTone, setSelectedTone] = useState('Friendly');

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ background: 'var(--cream)' }}>
      {/* Nav */}
      <div 
        className="flex items-center gap-2 px-4 py-3 sticky top-0 z-10"
        style={{ 
          background: 'rgba(250,248,244,0.95)', 
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-soft)'
        }}
      >
        <button 
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors"
          style={{ background: 'var(--border-soft)', color: 'var(--text-mid)' }}
          onClick={() => onNavigate('landing')}
        >
          ←
        </button>
        <div className="text-base" style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}>
          Your Profile
        </div>
        <div className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
          1 of 3
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 justify-center py-2">
        <div className="w-5 h-1.5 rounded-full" style={{ background: 'var(--purple)' }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border)' }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border)' }} />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Header */}
        <h2 
          className="text-[22px] leading-tight mb-2"
          style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
        >
          How does your<br />mind work?
        </h2>
        <p className="text-[13px] mb-5" style={{ color: 'var(--text-mid)' }}>
          Select everything that resonates. No diagnosis needed — you can always change this later.
        </p>

        {/* Neuro types */}
        <div className="flex flex-wrap gap-2 mb-5">
          {neuroTypes.map((type) => (
            <button
              key={type}
              className={`px-3 py-2 rounded-full text-[12px] font-medium transition-all border-[1.5px] ${
                selectedTypes.includes(type) 
                  ? 'border-[var(--purple)] text-[var(--purple)]' 
                  : 'border-[var(--border)] text-[var(--text-mid)] bg-white'
              }`}
              style={{
                background: selectedTypes.includes(type) ? 'var(--purple-light)' : 'white'
              }}
              onClick={() => toggleType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Pronouns */}
        <div 
          className="p-4 rounded-xl mb-5"
          style={{ background: 'var(--border-soft)', border: '1px solid var(--border)' }}
        >
          <div 
            className="text-[11px] font-medium mb-2 uppercase tracking-wider"
            style={{ color: 'var(--text-soft)' }}
          >
            Your pronouns
          </div>
          <div className="flex gap-2">
            {pronouns.map((p) => (
              <button
                key={p}
                className={`flex-1 py-2 px-2 rounded-lg text-[12px] transition-all border-[1.5px] ${
                  selectedPronoun === p 
                    ? 'border-[var(--teal)] text-[var(--teal)] font-medium' 
                    : 'border-[var(--border)] text-[var(--text-soft)] bg-white'
                }`}
                style={{
                  background: selectedPronoun === p ? 'var(--teal-light)' : 'white'
                }}
                onClick={() => setSelectedPronoun(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Tone */}
        <div className="mb-5">
          <div 
            className="text-[11px] font-medium mb-2 uppercase tracking-wider"
            style={{ color: 'var(--text-soft)' }}
          >
            How would you like NeuroD to talk to you?
          </div>
          <div className="flex gap-2">
            {tones.map((t) => (
              <button
                key={t}
                className={`flex-1 py-2 px-2 rounded-lg text-[12px] transition-all border-[1.5px] ${
                  selectedTone === t 
                    ? 'border-[var(--teal)] text-[var(--teal)] font-medium' 
                    : 'border-[var(--border)] text-[var(--text-soft)] bg-white'
                }`}
                style={{
                  background: selectedTone === t ? 'var(--teal-light)' : 'white'
                }}
                onClick={() => setSelectedTone(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Next button */}
        <button 
          className="w-full py-4 px-5 rounded-xl text-white font-medium text-[15px] transition-all mb-3"
          style={{ background: 'var(--purple)' }}
          onClick={() => onNavigate('profile2')}
        >
          Next: my strengths →
        </button>
        <div className="text-center">
          <button 
            className="text-[12px]"
            style={{ color: 'var(--text-soft)' }}
            onClick={() => onNavigate('profile2')}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
