import { TrendingUp, Network, FileText } from 'lucide-react';
import type { ScreenType } from '../InteractiveDemo';

interface DemoLandingProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function DemoLanding({ onNavigate }: DemoLandingProps) {
  return (
    <div 
      className="w-full h-full overflow-y-auto"
      style={{ 
        background: 'var(--cream)',
        padding: '32px 20px 20px',
      }}
    >
      {/* Top label */}
      <div className="mb-4">
        <div 
          className="text-[14px] tracking-[0.12em] uppercase mb-3"
          style={{ color: 'var(--text-muted)' }}
        >
          For the 1 in 8
        </div>
        <h1 
          className="text-[24px] leading-tight mb-2"
          style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
        >
          Your mind,<br />
          <em style={{ color: 'var(--purple)', fontStyle: 'normal' }}>understood.</em>
        </h1>
        <p 
          className="text-[13px] leading-relaxed"
          style={{ color: 'var(--text-mid)' }}
        >
          Mental illness affects 1 in 8 people. Care is reactive, generic, and scarce. 
          NeuroD learns your patterns, finds the real causes, and builds a plan that fits your brain.
        </p>
      </div>

      {/* Feature cards */}
      <div className="flex flex-col gap-2.5 mb-5">
        <div 
          className="flex gap-3 items-start p-3 rounded-xl"
          style={{ background: 'white', border: '1px solid var(--border)' }}
        >
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--purple-light)' }}
          >
            <TrendingUp className="w-4 h-4" style={{ color: 'var(--purple)' }} />
          </div>
          <div>
            <div 
              className="text-[13px] font-medium mb-0.5"
              style={{ color: 'var(--text-dark)' }}
            >
              Spots what you can't see yet
            </div>
            <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              Watches patterns in your mood, sleep, and energy — notices shifts before they become problems.
            </div>
          </div>
        </div>

        <div 
          className="flex gap-3 items-start p-3 rounded-xl"
          style={{ background: 'white', border: '1px solid var(--border)' }}
        >
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--teal-light)' }}
          >
            <Network className="w-4 h-4" style={{ color: 'var(--teal)' }} />
          </div>
          <div>
            <div 
              className="text-[13px] font-medium mb-0.5"
              style={{ color: 'var(--text-dark)' }}
            >
              Finds the real why
            </div>
            <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              Not just "you feel low" — traces the chain. Office noise → poor sleep → social withdrawal → mood crash.
            </div>
          </div>
        </div>

        <div 
          className="flex gap-3 items-start p-3 rounded-xl"
          style={{ background: 'white', border: '1px solid var(--border)' }}
        >
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--amber-light)' }}
          >
            <FileText className="w-4 h-4" style={{ color: 'var(--amber)' }} />
          </div>
          <div>
            <div 
              className="text-[13px] font-medium mb-0.5"
              style={{ color: 'var(--text-dark)' }}
            >
              Builds a plan that fits your brain
            </div>
            <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              Every recommendation adapts to your neuro profile, your energy today, and what works for people like you.
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2">
        <button 
          className="w-full py-3.5 px-4 rounded-xl text-white font-medium text-[14px] transition-all"
          style={{ background: 'var(--purple)' }}
          onClick={() => onNavigate('profile1')}
        >
          Get started — it's free →
        </button>
        <div className="text-center py-1">
          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
          <button 
            className="text-[11px] font-medium"
            style={{ color: 'var(--purple)' }}
            onClick={() => onNavigate('dashboard')}
          >
            Sign in
          </button>
        </div>
        <div 
          className="text-[10px] text-center"
          style={{ color: 'var(--text-muted)' }}
        >
          Free forever · No ads · Your data stays on your device
        </div>
      </div>
    </div>
  );
}
