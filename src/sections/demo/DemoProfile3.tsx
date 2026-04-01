import { useState } from 'react';
import type { ScreenType } from '../InteractiveDemo';

interface DemoProfile3Props {
  onNavigate: (screen: ScreenType) => void;
}

const supportNeeds = [
  '😴 Sleep regulation', '🔊 Sensory overload', '📋 Executive function',
  '💬 Social battery', '😰 Anxiety', '💊 Medication timing',
  '📅 Routine building', '🥘 Eating patterns', '🏥 GP communication'
];

const crisisOptions = ['Yes please', 'Ask me then', 'No thanks'];

export default function DemoProfile3({ onNavigate }: DemoProfile3Props) {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([
    '😴 Sleep regulation', '🔊 Sensory overload', '😰 Anxiety'
  ]);
  const [crisisOption, setCrisisOption] = useState('Yes please');

  const toggleNeed = (need: string) => {
    setSelectedNeeds(prev => 
      prev.includes(need) 
        ? prev.filter(n => n !== need)
        : [...prev, need]
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
          onClick={() => onNavigate('profile2')}
        >
          ←
        </button>
        <div className="text-base" style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}>
          Support Needs
        </div>
        <div className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
          3 of 3
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 justify-center py-2">
        <div className="w-5 h-1.5 rounded-full" style={{ background: 'var(--purple-light)', border: '1px solid var(--purple)' }} />
        <div className="w-5 h-1.5 rounded-full" style={{ background: 'var(--purple-light)', border: '1px solid var(--purple)' }} />
        <div className="w-5 h-1.5 rounded-full" style={{ background: 'var(--purple)' }} />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Header */}
        <h2 
          className="text-[22px] leading-tight mb-2"
          style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
        >
          What does <em style={{ color: 'var(--amber)', fontStyle: 'normal' }}>support</em><br />look like for you?
        </h2>
        <p className="text-[13px] mb-5" style={{ color: 'var(--text-mid)' }}>
          This helps NeuroD adapt every recommendation. No judgement, just understanding.
        </p>

        {/* Support needs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {supportNeeds.map((need) => (
            <button
              key={need}
              className={`px-3 py-2 rounded-full text-[12px] font-medium transition-all border-[1.5px] ${
                selectedNeeds.includes(need) 
                  ? 'border-[var(--purple)] text-[var(--purple)]' 
                  : 'border-[var(--border)] text-[var(--text-mid)] bg-white'
              }`}
              style={{
                background: selectedNeeds.includes(need) ? 'var(--purple-light)' : 'white'
              }}
              onClick={() => toggleNeed(need)}
            >
              {need}
            </button>
          ))}
        </div>

        {/* Crisis support */}
        <div 
          className="p-4 rounded-xl mb-5"
          style={{ background: 'var(--border-soft)', border: '1px solid var(--border)' }}
        >
          <div 
            className="text-[11px] font-medium mb-2 uppercase tracking-wider"
            style={{ color: 'var(--text-soft)' }}
          >
            Crisis support
          </div>
          <p className="text-[12px] mb-3" style={{ color: 'var(--text-mid)' }}>
            If your wellbeing dips significantly, would you like NeuroD to show support contacts?
          </p>
          <div className="flex gap-2">
            {crisisOptions.map((opt) => (
              <button
                key={opt}
                className={`flex-1 py-2 px-2 rounded-lg text-[12px] transition-all border-[1.5px] ${
                  crisisOption === opt 
                    ? 'border-[var(--teal)] text-[var(--teal)] font-medium' 
                    : 'border-[var(--border)] text-[var(--text-soft)] bg-white'
                }`}
                style={{
                  background: crisisOption === opt ? 'var(--teal-light)' : 'white'
                }}
                onClick={() => setCrisisOption(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Create profile button */}
        <button 
          className="w-full py-4 px-5 rounded-xl text-white font-medium text-[15px] transition-all mb-3"
          style={{ background: 'var(--purple)' }}
          onClick={() => onNavigate('profileDone')}
        >
          Create my profile ✦
        </button>
        <div className="text-center">
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            Encrypted. Stored on your device. Only you can see it.
          </p>
        </div>
      </div>
    </div>
  );
}
