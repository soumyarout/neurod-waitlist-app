import type { ScreenType } from '../InteractiveDemo';

interface DemoHowItWorksProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function DemoHowItWorks({ onNavigate }: DemoHowItWorksProps) {
  return (
    <>
      <div className="nav">
        <button className="nav-back" onClick={() => onNavigate('dashboard')}>←</button>
        <div className="nav-title">How NeuroD Works</div>
      </div>

      <div className="scroll-content">
        <h2 className="mb-1" style={{ fontFamily: 'Fraunces, serif' }}>
          Three kinds of AI.<br />
          <em style={{ color: 'var(--purple)', fontStyle: 'normal' }}>One goal.</em>
        </h2>
        <p className="mb-6 text-sm" style={{ color: 'var(--text-mid)' }}>
          Here's what's actually happening behind the scenes.
        </p>

        {/* Pattern Recognition */}
        <div 
          className="card mb-3.5"
          style={{ 
            borderLeft: '3px solid var(--purple)',
            borderRadius: '0 14px 14px 0'
          }}
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--purple-light)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2">
                <path d="M2 12h4l3-9 4 18 3-9h6"/>
              </svg>
            </div>
            <div>
              <div 
                className="text-sm font-semibold"
                style={{ color: 'var(--text-dark)' }}
              >
                Pattern Recognition AI
              </div>
              <div className="text-[11px]" style={{ color: 'var(--purple)' }}>
                Powers "Early Signals"
              </div>
            </div>
          </div>
          <p className="small mb-2.5" style={{ color: 'var(--text-mid)' }}>
            Every check-in feeds into pattern detection — trend analysis across 7, 14, or 30 days. It spots your sleep drifting or social contact dropping before you're consciously aware.
          </p>
          <div className="card-soft p-2.5">
            <div className="text-[11px] font-medium" style={{ color: 'var(--teal)' }}>
              ✓ Runs on your device · Works offline · Data never leaves your phone
            </div>
          </div>
        </div>

        {/* Causal Analysis */}
        <div 
          className="card mb-3.5"
          style={{ 
            borderLeft: '3px solid var(--teal)',
            borderRadius: '0 14px 14px 0'
          }}
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--teal-light)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2">
                <circle cx="6" cy="6" r="3"/>
                <circle cx="18" cy="18" r="3"/>
                <path d="M8.6 8.6L15.4 15.4"/>
              </svg>
            </div>
            <div>
              <div 
                className="text-sm font-semibold"
                style={{ color: 'var(--text-dark)' }}
              >
                Causal Analysis AI
              </div>
              <div className="text-[11px]" style={{ color: 'var(--teal)' }}>
                Powers "Root Causes"
              </div>
            </div>
          </div>
          <p className="small mb-2.5" style={{ color: 'var(--text-mid)' }}>
            Most apps tell you what happened. NeuroD tells you <em>why</em>. It analyses temporal sequences — what changes first, what follows, with what delay — to find genuine causes, not just correlations.
          </p>
          <div className="flex flex-col gap-1 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--border)' }}></div>
              <span className="small" style={{ color: 'var(--text-soft)' }}>Days 1–14: Building baseline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--amber)' }}></div>
              <span className="small" style={{ color: 'var(--text-soft)' }}>Days 14–30: Correlations found</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--purple-mid)' }}></div>
              <span className="small" style={{ color: 'var(--text-soft)' }}>Days 30–60: Early causal links</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--teal)' }}></div>
              <span className="small" style={{ color: 'var(--text-soft)' }}>Days 60+: Confident personal causal model</span>
            </div>
          </div>
          <div className="card-soft p-2.5">
            <div className="text-[11px] font-medium" style={{ color: 'var(--teal)' }}>
              ✓ Progressive · Honest · No fake insights to fill a screen
            </div>
          </div>
        </div>

        {/* Generative AI */}
        <div 
          className="card mb-3.5"
          style={{ 
            borderLeft: '3px solid var(--amber)',
            borderRadius: '0 14px 14px 0'
          }}
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--amber-light)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div>
              <div 
                className="text-sm font-semibold"
                style={{ color: 'var(--text-dark)' }}
              >
                Generative AI
              </div>
              <div className="text-[11px]" style={{ color: 'var(--amber)' }}>
                Powers "Your Plan" & Chat
              </div>
            </div>
          </div>
          <p className="small mb-2.5" style={{ color: 'var(--text-mid)' }}>
            Translates signals and causes into a plan you can act on — in your language, at your energy level, for your brain type. Adapts to your neuro profile, strengths, and reading preference.
          </p>
          <div className="card-soft p-2.5">
            <div className="text-[11px] font-medium" style={{ color: 'var(--teal)' }}>
              ✓ Every output labelled AI-generated · Not a therapist
            </div>
            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              Powered by Claude (Anthropic). Data never used for AI training.
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="card-soft text-center p-5">
          <div className="text-xl mb-2">✦</div>
          <p className="small font-medium mb-1" style={{ color: 'var(--text-dark)' }}>
            Together, these three do something none can do alone.
          </p>
          <p className="small" style={{ color: 'var(--text-mid)' }}>
            Pattern recognition spots the signal. Causal analysis finds the lever. Generative AI puts it in your hands.
          </p>
        </div>
      </div>
    </>
  );
}
