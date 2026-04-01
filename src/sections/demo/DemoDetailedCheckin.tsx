import { useState } from 'react';
import type { ScreenType } from '../InteractiveDemo';

interface DemoDetailedCheckinProps {
  onNavigate: (screen: ScreenType) => void;
}

const sleepOptions = ['< 5h', '5–6h', '6–7h', '7–8h', '8h+'];
const energyOptions = [
  { emoji: '🪫', label: 'empty' },
  { emoji: '😮‍💨', label: 'low' },
  { emoji: '😐', label: 'mid' },
  { emoji: '🙂', label: 'good' },
  { emoji: '⚡', label: 'high' },
];
const socialOptions = ['None', 'A little', 'Plenty'];

export default function DemoDetailedCheckin({ onNavigate }: DemoDetailedCheckinProps) {
  const [selectedSleep, setSelectedSleep] = useState('6–7h');
  const [selectedEnergy, setSelectedEnergy] = useState(2);
  const [selectedSocial, setSelectedSocial] = useState('A little');

  return (
    <>
      <div className="nav">
        <button className="nav-back" onClick={() => onNavigate('pulse')}>←</button>
        <div className="nav-title">Detailed Check-in</div>
      </div>

      <div className="scroll-content">
        {/* Sleep */}
        <div className="mb-5">
          <div 
            className="text-xs font-medium mb-2 uppercase tracking-wider"
            style={{ color: 'var(--text-soft)' }}
          >
            Sleep last night
          </div>
          <div className="sleep-track">
            {sleepOptions.map((opt) => (
              <button
                key={opt}
                className={`sleep-btn ${selectedSleep === opt ? 'selected' : ''}`}
                onClick={() => setSelectedSleep(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Energy */}
        <div className="mb-5">
          <div 
            className="text-xs font-medium mb-2 uppercase tracking-wider"
            style={{ color: 'var(--text-soft)' }}
          >
            Energy today
          </div>
          <div className="mood-grid">
            {energyOptions.map((opt, idx) => (
              <button
                key={opt.label}
                className={`mood-btn ${selectedEnergy === idx ? 'selected' : ''}`}
                onClick={() => setSelectedEnergy(idx)}
              >
                {opt.emoji}
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Social contact */}
        <div className="mb-5">
          <div 
            className="text-xs font-medium mb-2 uppercase tracking-wider"
            style={{ color: 'var(--text-soft)' }}
          >
            Social contact today
          </div>
          <div className="toggle-row">
            {socialOptions.map((opt) => (
              <button
                key={opt}
                className={`toggle-btn ${selectedSocial === opt ? 'selected' : ''}`}
                onClick={() => setSelectedSocial(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-5">
          <div 
            className="text-xs font-medium mb-2 uppercase tracking-wider"
            style={{ color: 'var(--text-soft)' }}
          >
            Anything on your mind?{' '}
            <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(optional)</span>
          </div>
          <textarea 
            rows={3} 
            placeholder="Write anything — or leave blank. Both are fine."
            className="w-full border-[1.5px] border-[var(--border)] rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-[var(--purple-mid)]"
            style={{ color: 'var(--text-dark)' }}
          />
        </div>

        <button 
          className="btn-primary"
          onClick={() => onNavigate('dashboard')}
        >
          Save check-in
        </button>
        <div 
          className="small text-center mt-2.5"
          style={{ color: 'var(--text-muted)' }}
        >
          NeuroD analyses your patterns in the background. No extra effort needed.
        </div>
      </div>
    </>
  );
}
