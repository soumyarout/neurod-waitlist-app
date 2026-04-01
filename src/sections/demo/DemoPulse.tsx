import { useState } from 'react';
import type { ScreenType } from '../InteractiveDemo';

interface DemoPulseProps {
  onNavigate: (screen: ScreenType) => void;
}

const pulseOptions = [
  { emoji: '😶‍🌫️', label: 'foggy', score: 2 },
  { emoji: '😔', label: 'low', score: 2 },
  { emoji: '😰', label: 'anxious', score: 3 },
  { emoji: '😕', label: 'meh', score: 4 },
  { emoji: '😐', label: 'okay', score: 5 },
  { emoji: '🙂', label: 'alright', score: 6 },
  { emoji: '😄', label: 'good', score: 7 },
  { emoji: '⚡', label: 'energised', score: 8 },
  { emoji: '🌊', label: 'flowing', score: 9 },
];

export default function DemoPulse({ onNavigate }: DemoPulseProps) {
  const [saved, setSaved] = useState(false);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const handlePulseTap = (score: number) => {
    setSelectedScore(score);
    setTimeout(() => {
      setSaved(true);
      if (score <= 3) {
        setTimeout(() => onNavigate('crisis'), 1500);
      }
    }, 400);
  };

  return (
    <>
      <div className="nav">
        <button className="nav-back" onClick={() => onNavigate('dashboard')}>←</button>
        <div className="nav-title">Check-in</div>
      </div>

      <div className="scroll-content flex flex-col">
        <h2 className="mb-1.5" style={{ fontFamily: 'Fraunces, serif' }}>
          How are you<br />right now?
        </h2>
        <p className="mb-6 text-sm" style={{ color: 'var(--text-mid)' }}>
          One tap is enough. Or scroll down for more detail.
        </p>

        {!saved ? (
          <div className="pulse-grid mb-6">
            {pulseOptions.map((opt) => (
              <button
                key={opt.label}
                className="pulse-btn"
                onClick={() => handlePulseTap(opt.score)}
                style={{
                  opacity: selectedScore && selectedScore !== opt.score ? 0.4 : 1,
                  transform: selectedScore === opt.score ? 'scale(1.08)' : selectedScore ? 'scale(0.95)' : 'scale(1)',
                  background: selectedScore === opt.score ? 'var(--teal-light)' : 'white',
                  borderColor: selectedScore === opt.score ? 'var(--teal)' : undefined,
                }}
              >
                {opt.emoji}
                <span className="pulse-label">{opt.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="text-[32px] mb-2">✓</div>
            <div 
              className="text-sm font-medium mb-1"
              style={{ color: 'var(--teal)' }}
            >
              Saved
            </div>
            <div className="small" style={{ color: 'var(--text-muted)' }}>
              That's all you need to do today.
            </div>
          </div>
        )}

        <div 
          className="border-t mt-auto pt-4"
          style={{ borderColor: 'var(--border-soft)' }}
        >
          <button 
            className="btn-ghost w-full text-center"
            style={{ color: 'var(--purple)', fontSize: '13px' }}
            onClick={() => onNavigate('detailedCheckin')}
          >
            Want to share more detail? →
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="tab-bar">
        <button className="tab-item" onClick={() => onNavigate('dashboard')}>
          <span className="tab-icon">🏠</span>
          <span className="tab-label">Home</span>
        </button>
        <button className="tab-item active" onClick={() => onNavigate('pulse')}>
          <span className="tab-icon">📓</span>
          <span className="tab-label">Check-in</span>
        </button>
        <button className="tab-item" onClick={() => onNavigate('insights')}>
          <span className="tab-icon">📊</span>
          <span className="tab-label">Insights</span>
        </button>
        <button className="tab-item" onClick={() => onNavigate('carePlan')}>
          <span className="tab-icon">✦</span>
          <span className="tab-label">Plan</span>
        </button>
        <button className="tab-item" onClick={() => onNavigate('chat')}>
          <span className="tab-icon">💬</span>
          <span className="tab-label">Chat</span>
        </button>
      </div>
    </>
  );
}
