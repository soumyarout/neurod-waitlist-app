import type { ScreenType } from '../InteractiveDemo';

interface DemoProfileDoneProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function DemoProfileDone({ onNavigate }: DemoProfileDoneProps) {
  return (
    <div 
      className="w-full h-full flex flex-col justify-center items-center text-center px-5 py-8 overflow-y-auto"
      style={{ background: 'var(--cream)' }}
    >
      <div className="text-6xl mb-5">♾️</div>
      
      <h2 
        className="text-[24px] mb-3"
        style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
      >
        You're set, Alex.
      </h2>
      
      <p 
        className="text-[13px] max-w-[260px] mb-6"
        style={{ color: 'var(--text-mid)' }}
      >
        NeuroD now knows your strengths and how to adapt for your mind. Let's start understanding your patterns.
      </p>

      {/* Profile summary */}
      <div 
        className="rounded-[14px] p-4 mb-6 w-full max-w-[280px]"
        style={{ background: 'var(--purple-light)' }}
      >
        <div 
          className="text-[11px] font-medium mb-2"
          style={{ color: 'var(--purple)' }}
        >
          Your Profile
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          <span className="px-2 py-1 rounded-full text-[10px] font-medium" style={{ background: 'var(--purple-light)', color: 'var(--purple)', border: '1px solid var(--purple-mid)' }}>♾️ AuDHD</span>
          <span className="px-2 py-1 rounded-full text-[10px] font-medium" style={{ background: 'var(--teal-light)', color: 'var(--teal)' }}>⚡ Hyperfocus</span>
          <span className="px-2 py-1 rounded-full text-[10px] font-medium" style={{ background: '#FCE7F3', color: 'var(--rose)' }}>❤️ Empathy</span>
          <span className="px-2 py-1 rounded-full text-[10px] font-medium" style={{ background: 'var(--amber-light)', color: 'var(--amber)' }}>🔍 Patterns</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="w-full max-w-[280px] flex flex-col gap-2">
        <button 
          className="w-full py-4 px-5 rounded-xl text-white font-medium text-[15px] transition-all"
          style={{ background: 'var(--purple)' }}
          onClick={() => onNavigate('dashboard')}
        >
          Go to my dashboard →
        </button>
        <button 
          className="w-full py-3.5 px-5 rounded-xl text-[14px] font-medium transition-all border-[1.5px]"
          style={{ 
            background: 'transparent', 
            color: 'var(--purple)',
            borderColor: 'var(--purple-mid)'
          }}
          onClick={() => onNavigate('pulse')}
        >
          Do my first check-in
        </button>
      </div>
    </div>
  );
}
