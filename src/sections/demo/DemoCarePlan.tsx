import { useState } from 'react';
import type { ScreenType } from '../InteractiveDemo';

interface DemoCarePlanProps {
  onNavigate: (screen: ScreenType) => void;
}

const interventions = [
  {
    icon: '😴',
    iconBg: 'var(--amber-light)',
    title: 'Sensory wind-down routine',
    effort: 'low effort',
    effortClass: 'eff-low',
    content: 'Start a 15-minute sensory de-escalation 60 minutes before bed. Dim lights to warm tones, reduce sound, avoid screens. For AuDHD brains, this helps the nervous system shift out of hyperarousal — the reason sleep feels impossible even when you\'re exhausted.',
    when: 'every evening · Takes: 15 min',
    tags: [
      { label: 'AuDHD-adapted', class: 'pill-teal' },
      { label: 'Based on: CBT-I', class: 'bg-[var(--amber-light)] text-[var(--amber)] border-transparent' }
    ]
  },
  {
    icon: '💙',
    iconBg: '#FCE7F3',
    title: 'Low-stakes social micro-dose',
    effort: 'low effort',
    effortClass: 'eff-low',
    content: 'Send one text, voice note, or meme to someone you trust. No obligation to continue the conversation. Your data shows social contact — even minimal — tends to break the withdrawal pattern within 48 hours.',
    when: 'any time this week · Takes: 2 min',
    tags: [
      { label: 'Autism-adapted', class: 'pill-teal' },
      { label: 'Based on: ACT', class: 'bg-[var(--purple-light)] text-[var(--purple)] border-transparent' }
    ]
  },
  {
    icon: '⚡',
    iconBg: 'var(--purple-light)',
    title: 'Protect one hyperfocus block',
    effort: 'medium',
    effortClass: 'eff-mid',
    content: 'Schedule one 2-hour deep work block this week and protect it like a meeting. Hyperfocus is your most underused strength right now — reactivating it builds momentum and improves next-day energy. Shut notifications, use noise-cancelling if you have them.',
    when: 'pick one day · Takes: 2 hours',
    tags: [
      { label: 'ADHD-adapted', class: 'pill-teal' },
      { label: 'Based on: DBT', class: 'bg-[var(--teal-light)] text-[var(--teal)] border-transparent' }
    ]
  }
];

export default function DemoCarePlan({ onNavigate }: DemoCarePlanProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleIntervention = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <div className="nav">
        <button className="nav-back" onClick={() => onNavigate('dashboard')}>←</button>
        <div className="nav-title">Your Plan</div>
        <button 
          className="btn-ghost ml-auto text-xs"
          style={{ color: 'var(--purple)' }}
        >
          Refresh
        </button>
      </div>

      <div className="scroll-content">
        {/* Strengths banner */}
        <div 
          className="rounded-[14px] p-4 mb-3.5"
          style={{ 
            background: 'linear-gradient(135deg, #EDE9FE 0%, #CCFBF1 100%)'
          }}
        >
          <div className="strength-row mb-2">
            <span className="strength-tag st-purple">⚡ Hyperfocus</span>
            <span className="strength-tag st-teal">🔍 Patterns</span>
            <span className="strength-tag st-rose">❤️ Empathy</span>
          </div>
          <h3 className="mb-1 text-[15px]">Your strengths are leading this plan.</h3>
          <p className="small" style={{ color: 'var(--text-mid)' }}>
            Your ability to spot patterns in your own experience is your biggest asset here. This plan builds on that.
          </p>
        </div>

        {/* Weekly focus */}
        <div className="card-soft mb-3.5 flex items-center gap-3">
          <div className="text-[28px]">🎯</div>
          <div>
            <div 
              className="text-[11px] font-medium uppercase tracking-wider mb-0.5"
              style={{ color: 'var(--teal)' }}
            >
              This week's single focus
            </div>
            <div 
              className="text-sm font-medium"
              style={{ color: 'var(--text-dark)' }}
            >
              Dim lights 1 hour before bed, just once
            </div>
            <p className="small" style={{ color: 'var(--text-muted)' }}>
              Smallest action · highest expected impact
            </p>
          </div>
        </div>

        {/* Interventions header */}
        <div 
          className="text-xs font-medium uppercase tracking-wider mb-2.5"
          style={{ color: 'var(--text-soft)' }}
        >
          Your 3 personalised actions
        </div>

        {/* Interventions */}
        {interventions.map((int, index) => (
          <div key={index} className="intervention">
            <div 
              className="int-head"
              onClick={() => toggleIntervention(index)}
            >
              <div 
                className="int-icon"
                style={{ background: int.iconBg }}
              >
                {int.icon}
              </div>
              <div className="int-title">{int.title}</div>
              <span className={`int-effort ${int.effortClass}`}>{int.effort}</span>
              <span 
                className="text-sm ml-1.5 transition-transform"
                style={{ 
                  color: 'var(--text-muted)',
                  transform: expandedIndex === index ? 'rotate(90deg)' : 'rotate(0deg)'
                }}
              >
                ›
              </span>
            </div>
            <div className={`int-body ${expandedIndex === index ? 'open' : ''}`}>
              <p className="mb-2">{int.content}</p>
              <div 
                className="text-[11px] mb-1.5"
                style={{ color: 'var(--text-muted)' }}
              >
                When: {int.when}
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {int.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className={`pill text-[10px] px-2 py-0.5 ${tag.class}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Closing message */}
        <div 
          className="card-soft my-4 text-center"
        >
          <div className="text-xl mb-1.5">✦</div>
          <p 
            className="small font-medium mb-1"
            style={{ color: 'var(--purple)' }}
          >
            Your brain isn't broken.
          </p>
          <p className="small" style={{ color: 'var(--text-muted)' }}>
            It processes the world more intensely than most. These changes reduce unnecessary load so your actual strengths can show up.
          </p>
        </div>

        <button 
          className="btn-secondary mb-4"
          onClick={() => onNavigate('chat')}
        >
          💬 Ask NeuroD to explain any of this
        </button>

        {/* Safety footer */}
        <div className="safety-footer">
          <p className="small" style={{ color: 'var(--text-muted)' }}>
            AI-generated plan · Not clinical advice · Talk to your GP about changes you'd like to make
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="tab-bar">
        <button className="tab-item" onClick={() => onNavigate('dashboard')}>
          <span className="tab-icon">🏠</span>
          <span className="tab-label">Home</span>
        </button>
        <button className="tab-item" onClick={() => onNavigate('pulse')}>
          <span className="tab-icon">📓</span>
          <span className="tab-label">Check-in</span>
        </button>
        <button className="tab-item" onClick={() => onNavigate('insights')}>
          <span className="tab-icon">📊</span>
          <span className="tab-label">Insights</span>
        </button>
        <button className="tab-item active" onClick={() => onNavigate('carePlan')}>
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
