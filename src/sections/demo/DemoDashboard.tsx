import type { ScreenType } from '../InteractiveDemo';

interface DemoDashboardProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function DemoDashboard({ onNavigate }: DemoDashboardProps) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: 'var(--cream)' }}>
      {/* Celebration banner */}
      <div 
        className="py-2 px-4 flex items-center gap-2 text-[10px]"
        style={{ 
          background: 'linear-gradient(90deg, #7C3AED11, #0D948811, #D9770611, #E85D2411)',
          borderBottom: '1px solid var(--border-soft)'
        }}
      >
        <span className="text-sm">♾️</span>
        <span><strong>Neurodiversity Month</strong> · Your strengths are being celebrated</span>
      </div>

      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Good morning</div>
          <h2 className="text-base font-medium" style={{ fontFamily: 'Fraunces, serif' }}>Alex 👋</h2>
        </div>
        <div 
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer"
          style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}
          onClick={() => onNavigate('howItWorks')}
        >
          A
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Wellbeing snapshot */}
        <div 
          className="p-3 rounded-xl mb-2.5 cursor-pointer"
          style={{ background: 'white', border: '1px solid var(--border)' }}
          onClick={() => onNavigate('insights')}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--amber-light)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2">
                <path d="M2 12h4l3-9 4 18 3-9h6"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="text-[12px] font-medium" style={{ color: 'var(--text-dark)' }}>
                  What we're noticing
                </div>
                <span 
                  className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{ background: 'var(--amber-light)', color: 'var(--amber)' }}
                >
                  Watch
                </span>
              </div>
              <p className="text-[11px] mb-0.5" style={{ color: 'var(--text-mid)' }}>
                Sleep has been shorter than your usual this week. That's the main signal right now.
              </p>
              <div className="text-[10px] font-medium" style={{ color: 'var(--purple)' }}>
                See full insights →
              </div>
            </div>
          </div>
        </div>

        {/* Weekly focus */}
        <div 
          className="p-3 rounded-xl mb-2.5 cursor-pointer"
          style={{ 
            background: 'white', 
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--teal)'
          }}
          onClick={() => onNavigate('carePlan')}
        >
          <div className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--teal)' }}>
            This week's focus
          </div>
          <div className="text-[13px] font-medium mb-0.5" style={{ color: 'var(--text-dark)' }}>
            Try dimming lights 1 hour before bed
          </div>
          <p className="text-[11px]" style={{ color: 'var(--text-mid)' }}>
            Based on your patterns, this one change has the highest chance of improving your sleep and mood this week.
          </p>
          <div className="mt-1.5 text-[10px]" style={{ color: 'var(--purple)' }}>
            See full plan →
          </div>
        </div>

        {/* Check-in prompt */}
        <button 
          className="w-full py-3 px-4 rounded-xl text-[13px] font-medium mb-2.5 transition-colors"
          style={{ 
            background: 'transparent', 
            color: 'var(--purple)',
            border: '1.5px solid var(--purple-mid)'
          }}
          onClick={() => onNavigate('pulse')}
        >
          📓 How are you today?
        </button>

        {/* 7-day mood sparkline */}
        <div 
          className="p-3 rounded-xl mb-2.5"
          style={{ background: 'var(--border-soft)', border: '1px solid var(--border)' }}
        >
          <div className="text-[11px] font-medium mb-2 uppercase tracking-wider" style={{ color: 'var(--text-soft)' }}>
            Your mood · last 7 days
          </div>
          <div className="flex items-end gap-1 h-10">
            {[60, 75, 55, 45, 50, 65, 70].map((h, i) => (
              <div 
                key={i}
                className="flex-1 rounded-t transition-all"
                style={{ 
                  height: `${h}%`, 
                  background: i === 0 ? 'var(--border)' : i === 1 || i === 5 || i === 6 ? 'var(--teal)' : 'var(--amber)'
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <span key={day} className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{day}</span>
            ))}
          </div>
        </div>

        {/* Data progress */}
        <div 
          className="p-3 rounded-xl"
          style={{ background: 'var(--border-soft)', border: '1px solid var(--border)' }}
        >
          <div className="flex justify-between items-center mb-1.5">
            <div className="text-[11px] font-medium" style={{ color: 'var(--text-soft)' }}>
              Your data is building
            </div>
            <div className="text-[10px] font-medium" style={{ color: 'var(--purple)' }}>
              18 of 30 days
            </div>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: '60%', background: 'var(--purple)' }}
            />
          </div>
          <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-muted)' }}>
            At 30 days, NeuroD can start finding deeper causes behind your patterns.
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div 
        className="flex border-t py-2 px-1"
        style={{ 
          background: 'rgba(250,248,244,0.96)', 
          backdropFilter: 'blur(8px)',
          borderColor: 'var(--border)'
        }}
      >
        {[
          { icon: '🏠', label: 'Home', screen: 'dashboard' as const, active: true },
          { icon: '📓', label: 'Check-in', screen: 'pulse' as const, active: false },
          { icon: '📊', label: 'Insights', screen: 'insights' as const, active: false },
          { icon: '✦', label: 'Plan', screen: 'carePlan' as const, active: false },
          { icon: '💬', label: 'Chat', screen: 'chat' as const, active: false },
        ].map((tab) => (
          <button 
            key={tab.label}
            className="flex-1 flex flex-col items-center gap-0.5 py-1"
            onClick={() => onNavigate(tab.screen)}
          >
            <span className="text-lg">{tab.icon}</span>
            <span 
              className="text-[9px] font-medium uppercase tracking-wider"
              style={{ color: tab.active ? 'var(--purple)' : 'var(--text-muted)' }}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
