import type { ScreenType } from '../InteractiveDemo';

interface DemoCrisisProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function DemoCrisis({ onNavigate }: DemoCrisisProps) {
  return (
    <div 
      className="scroll-content flex flex-col justify-center items-center text-center min-h-full py-8"
      style={{ 
        background: '#1C1917',
        padding: '32px 24px'
      }}
    >
      <button 
        onClick={() => onNavigate('dashboard')}
        className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-base cursor-pointer"
        style={{ 
          background: 'rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.5)'
        }}
      >
        ×
      </button>

      <div className="breath-circle mb-8">
        <span>breathe</span>
      </div>

      <p 
        className="text-lg mb-8 leading-relaxed"
        style={{ 
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'Fraunces, serif'
        }}
      >
        Right now, you're here.<br />That's enough.
      </p>

      <div 
        className="w-full max-w-[280px] flex flex-col gap-3"
      >
        <a 
          href="tel:116123" 
          className="flex items-center gap-3 p-4 rounded-xl no-underline"
          style={{ 
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ background: 'rgba(13,148,136,0.2)' }}
          >
            📞
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">Samaritans: 116 123</div>
            <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Free · 24 hours · No judgement
            </div>
          </div>
        </a>

        <a 
          href="sms:85258?body=SHOUT" 
          className="flex items-center gap-3 p-4 rounded-xl no-underline"
          style={{ 
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ background: 'rgba(139,92,246,0.2)' }}
          >
            💬
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-white">Text SHOUT to 85258</div>
            <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Free crisis text line
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
