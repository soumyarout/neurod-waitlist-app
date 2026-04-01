import { useState, useRef, useEffect } from 'react';
import type { ScreenType } from '../InteractiveDemo';

interface DemoChatProps {
  onNavigate: (screen: ScreenType) => void;
}

const suggestedPrompts = [
  'Why is sleep harder for AuDHD brains?',
  'Help me talk to my GP about this',
  'I feel overwhelmed right now',
  'Explain my care plan simply'
];

const chatResponses: Record<string, string> = {
  'Why is sleep harder for AuDHD brains?': `AuDHD brains have a few specific reasons sleep is harder:

<strong>Sensory hypersensitivity</strong> — sounds, light, temperature, textures that others filter out stay distracting for you.

<strong>Delayed circadian rhythm</strong> — many ADHD brains naturally run 1–2 hours later than average.

<strong>Hyperarousal</strong> — the brain struggles to switch off the day's thoughts.

For your profile specifically, the sensory wind-down in your plan targets the first one — which your check-in data suggests is the biggest factor right now.`,

  'Help me talk to my GP about this': `Here's what tends to work:

<strong>Bring numbers, not feelings.</strong> "My sleep has averaged under 6 hours for 5 nights" lands differently to "I haven't been sleeping well."

<strong>Lead with impact.</strong> "It's affecting my ability to work and my social life" gets more attention.

<strong>Name your neurodivergence early.</strong> "As someone with ADHD and Autism, sleep dysregulation affects me differently..." signals you understand your own profile.

Would you like me to draft a brief note you could show your GP?`,

  'I feel overwhelmed right now': `I hear you. Your nervous system is at capacity right now — that's not failure, that's information.

Try this:

<strong>Box breathing — 4 counts each:</strong>
In... 2... 3... 4
Hold... 2... 3... 4
Out... 2... 3... 4
Hold... 2... 3... 4

This activates your parasympathetic system — it works regardless of brain type.

If you're in distress, please reach out:
<strong>Samaritans: 116 123</strong> (free, 24/7)

When you're ready, tell me what's piling up and we can look at it together.`,

  'Explain my care plan simply': `Your plan has 3 things. Here they are, as simple as possible:

<strong>1. Dim lights before bed.</strong> Your brain is extra sensitive to light. Dimming it an hour before bed helps it wind down. Try it once this week.

<strong>2. Text one person.</strong> Send a message — a meme counts. Your data shows even tiny social contact helps your mood within 2 days.

<strong>3. Block 2 hours for deep work.</strong> Your hyperfocus is a superpower that hasn't been used recently. One session can shift your energy for the next day.

That's it. One of these, once. Not all three every day.`
};

interface Message {
  type: 'ai' | 'user';
  content: string;
}

export default function DemoChat({ onNavigate }: DemoChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'ai', 
      content: "Hi Alex. I know your profile, your recent check-ins, and what's been showing up in your patterns. Ask me anything — explain your plan, talk through what's hard, or think out loud."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: text }]);
    setInputValue('');
    setShowPrompts(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = chatResponses[text] || `Based on your AuDHD profile and recent check-ins, here's what I'm seeing:

This connects to what we've been tracking — your sensory load has been high this week, and that's rippling through your sleep and social energy. Let's look at this together.

What part feels most pressing right now?

<em style="color:var(--text-muted);font-size:11px;">AI-generated · Not clinical advice</em>`;
      
      setMessages(prev => [...prev, { type: 'ai', content: response }]);
    }, 1200);
  };

  const handleSend = () => {
    sendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="nav" style={{ flexShrink: 0 }}>
        <button className="nav-back" onClick={() => onNavigate('dashboard')}>←</button>
        <div 
          className="w-7 h-7 rounded-full flex items-center justify-center text-sm mr-1.5"
          style={{ background: 'var(--teal-light)' }}
        >
          ✦
        </div>
        <div>
          <div className="nav-title text-sm">NeuroD</div>
          <div className="text-[10px]" style={{ color: 'var(--teal)' }}>
            Knows your profile · AuDHD adapted
          </div>
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5"
        style={{ minHeight: 0 }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.type === 'ai' ? 'bubble-ai' : 'bubble-user'}
            dangerouslySetInnerHTML={{ 
              __html: msg.content.replace(/\n/g, '<br>') 
            }}
          />
        ))}

        {showPrompts && (
          <div className="flex flex-col gap-1.5 mt-1">
            <div 
              className="text-[11px] font-medium uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Based on your data:
            </div>
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                className="pill pill-outline text-left"
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {isTyping && (
          <div className="bubble-ai" style={{ display: 'flex' }}>
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div 
        className="p-3 border-t flex gap-2 items-end"
        style={{ 
          borderColor: 'var(--border)',
          background: 'var(--cream)',
          flexShrink: 0
        }}
      >
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask anything…"
          className="flex-1 resize-none max-h-20 border-[1.5px] border-[var(--border)] rounded-lg p-3 text-sm focus:outline-none focus:border-[var(--purple-mid)]"
          style={{ 
            color: 'var(--text-dark)',
            minHeight: '44px'
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
        />
        <button
          onClick={handleSend}
          className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0 transition-colors"
          style={{ 
            background: 'var(--purple)',
            color: 'white'
          }}
        >
          ↑
        </button>
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
        <button className="tab-item" onClick={() => onNavigate('carePlan')}>
          <span className="tab-icon">✦</span>
          <span className="tab-label">Plan</span>
        </button>
        <button className="tab-item active" onClick={() => onNavigate('chat')}>
          <span className="tab-icon">💬</span>
          <span className="tab-label">Chat</span>
        </button>
      </div>
    </>
  );
}
