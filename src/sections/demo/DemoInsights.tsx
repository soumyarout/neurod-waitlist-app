import type { ScreenType } from '../InteractiveDemo';

interface DemoInsightsProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function DemoInsights({ onNavigate }: DemoInsightsProps) {
  return (
    <>
      <div className="nav">
        <button className="nav-back" onClick={() => onNavigate('dashboard')}>←</button>
        <div className="nav-title">Insights</div>
      </div>

      <div className="scroll-content">
        {/* What we're noticing */}
        <div className="mb-5">
          <div className="section-head">
            <div 
              className="section-icon"
              style={{ background: 'var(--purple-light)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2">
                <path d="M2 12h4l3-9 4 18 3-9h6"/>
              </svg>
            </div>
            <h3>What we're noticing</h3>
          </div>

          <div className="card mb-2.5">
            <div className="flex items-start gap-2.5 mb-2.5">
              <span className="text-lg">😴</span>
              <div className="flex-1">
                <div 
                  className="text-[13px] font-medium mb-0.5"
                  style={{ color: 'var(--text-dark)' }}
                >
                  Your sleep dropped about 1.5 hours below your usual
                </div>
                <span className="signal-chip sc-watch mt-1">Watch · 5 nights running</span>
              </div>
            </div>
            <div className="spark-bar" style={{ height: '32px' }}>
              <div className="spark-col" style={{ height: '85%', background: 'var(--teal)' }}></div>
              <div className="spark-col" style={{ height: '80%', background: 'var(--teal)' }}></div>
              <div className="spark-col" style={{ height: '60%', background: 'var(--amber)' }}></div>
              <div className="spark-col" style={{ height: '50%', background: 'var(--amber)' }}></div>
              <div className="spark-col" style={{ height: '45%', background: 'var(--orange)' }}></div>
              <div className="spark-col" style={{ height: '50%', background: 'var(--amber)' }}></div>
              <div className="spark-col" style={{ height: '55%', background: 'var(--amber)' }}></div>
            </div>
          </div>

          <div className="card mb-2.5">
            <div className="flex items-start gap-2.5">
              <span className="text-lg">💙</span>
              <div>
                <div 
                  className="text-[13px] font-medium mb-0.5"
                  style={{ color: 'var(--text-dark)' }}
                >
                  4 days without social contact
                </div>
                <span className="signal-chip sc-watch mt-1">Watch</span>
              </div>
            </div>
          </div>

          <div className="card mb-2.5">
            <div className="flex items-start gap-2.5">
              <span className="text-lg">📉</span>
              <div>
                <div 
                  className="text-[13px] font-medium mb-0.5"
                  style={{ color: 'var(--text-dark)' }}
                >
                  Mood has been gradually dipping this week
                </div>
                <span className="signal-chip sc-watch mt-1">Watch · 7-day trend</span>
              </div>
            </div>
          </div>

          <p className="small mt-1.5" style={{ color: 'var(--text-muted)' }}>
            Based on your last 7 days of check-ins.
          </p>
        </div>

        {/* What's behind it */}
        <div className="mb-5">
          <div className="section-head">
            <div 
              className="section-icon"
              style={{ background: 'var(--teal-light)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2">
                <circle cx="6" cy="6" r="3"/>
                <circle cx="18" cy="18" r="3"/>
                <path d="M8.6 8.6L15.4 15.4"/>
              </svg>
            </div>
            <h3>What's behind it</h3>
            <span 
              className="text-[10px] px-2 py-0.5 rounded ml-auto"
              style={{ 
                background: 'var(--teal-light)', 
                color: 'var(--teal)' 
              }}
            >
              Early pattern
            </span>
          </div>

          <div className="card">
            <div 
              className="text-xs font-medium mb-3"
              style={{ color: 'var(--teal)' }}
            >
              The chain your data suggests:
            </div>

            {/* Causal chain */}
            <div className="mb-3.5">
              <div className="causal-step">
                <div 
                  className="causal-node"
                  style={{ background: 'var(--amber-light)' }}
                >
                  🔊
                </div>
                <div className="causal-label">Sensory load has been high (noisy environments)</div>
              </div>
              <div className="flex items-center gap-2 py-0.5 pl-2.5">
                <div className="causal-arrow">↓</div>
                <span className="causal-lag">~2 days later</span>
              </div>

              <div className="causal-step">
                <div 
                  className="causal-node"
                  style={{ background: 'var(--amber-light)' }}
                >
                  😴
                </div>
                <div className="causal-label">Sleep quality drops (duration may stay similar)</div>
              </div>
              <div className="flex items-center gap-2 py-0.5 pl-2.5">
                <div className="causal-arrow">↓</div>
                <span className="causal-lag">next day</span>
              </div>

              <div className="causal-step">
                <div 
                  className="causal-node"
                  style={{ background: '#FCE7F3' }}
                >
                  💙
                </div>
                <div className="causal-label">Social energy drains — harder to initiate contact</div>
              </div>
              <div className="flex items-center gap-2 py-0.5 pl-2.5">
                <div className="causal-arrow">↓</div>
                <span className="causal-lag">~2 days later</span>
              </div>

              <div className="causal-step">
                <div 
                  className="causal-node"
                  style={{ background: 'var(--purple-light)' }}
                >
                  📉
                </div>
                <div 
                  className="causal-label"
                  style={{ fontWeight: 500, color: 'var(--purple)' }}
                >
                  Mood dips — but this is the outcome, not the cause
                </div>
              </div>
            </div>

            <div 
              className="card-soft"
              style={{ 
                padding: '12px',
                borderLeft: '3px solid var(--teal)',
                borderRadius: '0 8px 8px 0'
              }}
            >
              <div 
                className="text-[11px] font-medium mb-1"
                style={{ color: 'var(--teal)' }}
              >
                The insight
              </div>
              <p className="small" style={{ color: 'var(--text-mid)' }}>
                The sleep isn't the root cause — the sensory overload is. Your plan now targets that first, rather than just telling you to "sleep more."
              </p>
            </div>

            <p className="small mt-2.5" style={{ color: 'var(--text-muted)' }}>
              Early pattern · grows more accurate with more check-ins
            </p>
          </div>
        </div>

        {/* What this means */}
        <div className="mb-4">
          <div className="section-head">
            <div 
              className="section-icon"
              style={{ background: 'var(--amber-light)' }}
            >
              ✦
            </div>
            <h3>What this means for you</h3>
          </div>
          <div className="bubble-ai mb-3" style={{ maxWidth: '100%' }}>
            The data points to <strong>sensory load as your entry point</strong> — not because your mood is "bad" but because your brain processes sensory input more intensely than most. That's not a flaw, it's how AuDHD brains work.<br /><br />
            Your plan has been updated with one small change to try this week. It targets the top of the chain, not the bottom.
          </div>
          <button 
            className="btn-primary"
            onClick={() => onNavigate('carePlan')}
          >
            See your updated plan →
          </button>
        </div>

        {/* Safety footer */}
        <div className="safety-footer">
          <p className="small mb-1" style={{ color: 'var(--text-muted)' }}>
            AI-generated insight · Not clinical advice
          </p>
          <p className="small" style={{ color: 'var(--teal)' }}>
            Talk to your GP about patterns you notice. Need support now? <strong>Samaritans 116 123</strong>
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
        <button className="tab-item active" onClick={() => onNavigate('insights')}>
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
