import { useState } from 'react';
import type { ScreenType } from '../InteractiveDemo';

interface DemoProfile2Props {
  onNavigate: (screen: ScreenType) => void;
}

const strengths = [
  '⚡ Hyperfocus', '🎨 Creative thinking', '🔍 Pattern recognition', 
  '💡 Innovative ideas', '❤️ Deep empathy', '🧩 Systems thinking',
  '🗣 Verbal expression', '🔮 Intuition', '🌱 Sensory awareness',
  '📐 Visual-spatial', '📚 Deep knowledge', '🤸 Adaptability'
];

export default function DemoProfile2({ onNavigate }: DemoProfile2Props) {
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([
    '⚡ Hyperfocus', '🔍 Pattern recognition', '❤️ Deep empathy', '🌱 Sensory awareness'
  ]);

  const toggleStrength = (strength: string) => {
    setSelectedStrengths(prev => 
      prev.includes(strength) 
        ? prev.filter(s => s !== strength)
        : [...prev, strength]
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
          onClick={() => onNavigate('profile1')}
        >
          ←
        </button>
        <div className="text-base" style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}>
          My Strengths
        </div>
        <div className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
          2 of 3
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 justify-center py-2">
        <div className="w-5 h-1.5 rounded-full" style={{ background: 'var(--purple-light)', border: '1px solid var(--purple)' }} />
        <div className="w-5 h-1.5 rounded-full" style={{ background: 'var(--purple)' }} />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--border)' }} />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Header */}
        <h2 
          className="text-[22px] leading-tight mb-2"
          style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
        >
          What are you<br />
          <em style={{ color: 'var(--teal)', fontStyle: 'normal' }}>brilliant</em> at?
        </h2>
        <p className="text-[13px] mb-5" style={{ color: 'var(--text-mid)' }}>
          Tap everything that feels true. Your plan will lead with these.
        </p>

        {/* Strengths pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {strengths.map((strength) => (
            <button
              key={strength}
              className={`px-3 py-2 rounded-full text-[12px] font-medium transition-all border-[1.5px] ${
                selectedStrengths.includes(strength) 
                  ? 'border-[var(--purple)] text-[var(--purple)]' 
                  : 'border-[var(--border)] text-[var(--text-mid)] bg-white'
              }`}
              style={{
                background: selectedStrengths.includes(strength) ? 'var(--purple-light)' : 'white'
              }}
              onClick={() => toggleStrength(strength)}
            >
              {strength}
            </button>
          ))}
        </div>

        {/* Strength profile card */}
        <div 
          className="p-4 rounded-xl mb-5"
          style={{ 
            background: 'white',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--teal)',
            borderRadius: '0 14px 14px 0'
          }}
        >
          <div 
            className="text-[12px] font-medium mb-2"
            style={{ color: 'var(--teal)' }}
          >
            Your strength profile
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 rounded-full text-[10px] font-medium" style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}>⚡ Hyperfocus</span>
            <span className="px-2 py-1 rounded-full text-[10px] font-medium" style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}>🔍 Patterns</span>
            <span className="px-2 py-1 rounded-full text-[10px] font-medium" style={{ background: '#FCE7F3', color: 'var(--rose)' }}>❤️ Empathy</span>
            <span className="px-2 py-1 rounded-full text-[10px] font-medium" style={{ background: 'var(--amber-light)', color: 'var(--amber)' }}>🌱 Sensory</span>
          </div>
          <div className="text-[11px] mt-2" style={{ color: 'var(--text-muted)' }}>
            Every recommendation will build on what you're already good at.
          </div>
        </div>

        {/* Next button - ALWAYS VISIBLE */}
        <button 
          className="w-full py-4 px-5 rounded-xl text-white font-medium text-[15px] transition-all"
          style={{ background: 'var(--purple)' }}
          onClick={() => onNavigate('profile3')}
        >
          Next: support needs →
        </button>
      </div>
    </div>
  );
}
