import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Smartphone } from 'lucide-react';
import DemoLanding from './demo/DemoLanding';
import DemoProfile1 from './demo/DemoProfile1';
import DemoProfile2 from './demo/DemoProfile2';
import DemoProfile3 from './demo/DemoProfile3';
import DemoProfileDone from './demo/DemoProfileDone';
import DemoDashboard from './demo/DemoDashboard';
import DemoPulse from './demo/DemoPulse';
import DemoDetailedCheckin from './demo/DemoDetailedCheckin';
import DemoInsights from './demo/DemoInsights';
import DemoCarePlan from './demo/DemoCarePlan';
import DemoChat from './demo/DemoChat';
import DemoCrisis from './demo/DemoCrisis';
import DemoHowItWorks from './demo/DemoHowItWorks';

export type ScreenType = 
  | 'landing' 
  | 'profile1' 
  | 'profile2' 
  | 'profile3' 
  | 'profileDone' 
  | 'dashboard' 
  | 'pulse' 
  | 'detailedCheckin' 
  | 'insights' 
  | 'carePlan' 
  | 'chat' 
  | 'crisis'
  | 'howItWorks';

export default function InteractiveDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderScreen = () => {
    const props = { onNavigate: navigateTo };
    
    switch (currentScreen) {
      case 'landing':
        return <DemoLanding {...props} />;
      case 'profile1':
        return <DemoProfile1 {...props} />;
      case 'profile2':
        return <DemoProfile2 {...props} />;
      case 'profile3':
        return <DemoProfile3 {...props} />;
      case 'profileDone':
        return <DemoProfileDone {...props} />;
      case 'dashboard':
        return <DemoDashboard {...props} />;
      case 'pulse':
        return <DemoPulse {...props} />;
      case 'detailedCheckin':
        return <DemoDetailedCheckin {...props} />;
      case 'insights':
        return <DemoInsights {...props} />;
      case 'carePlan':
        return <DemoCarePlan {...props} />;
      case 'chat':
        return <DemoChat {...props} />;
      case 'crisis':
        return <DemoCrisis {...props} />;
      case 'howItWorks':
        return <DemoHowItWorks {...props} />;
      default:
        return <DemoLanding {...props} />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="demo"
      className="py-16 sm:py-20 px-4"
      style={{ background: 'var(--cream)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div 
          className={`text-center mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 
            className="text-3xl sm:text-4xl mb-3"
            style={{ fontFamily: 'Fraunces, serif', color: 'var(--text-dark)' }}
          >
            Try it yourself
          </h2>
          <p 
            className="text-base max-w-lg mx-auto"
            style={{ color: 'var(--text-mid)' }}
          >
            This is a working prototype. Tap through Alex's experience — 
            from check-in to insights to care plan.
          </p>
        </div>

        {/* Phone frame container - LARGER */}
        <div 
          className={`flex justify-center mb-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Phone frame with bezel - INCREASED SIZE */}
          <div 
            className="relative"
            style={{
              width: '100%',
              maxWidth: '420px',
              height: '780px',
              borderRadius: '45px',
              background: '#1a1614',
              padding: '14px',
              boxShadow: '0 30px 120px rgba(0,0,0,0.4), 0 15px 50px rgba(0,0,0,0.25)',
            }}
          >
            {/* Phone screen */}
            <div 
              className="w-full h-full overflow-hidden flex flex-col"
              style={{
                borderRadius: '32px',
                background: 'var(--cream)',
              }}
            >
              {/* Notch */}
              <div 
                className="absolute top-3 left-1/2 -translate-x-1/2 z-30"
                style={{
                  width: '140px',
                  height: '32px',
                  background: '#1a1614',
                  borderRadius: '0 0 18px 18px',
                }}
              />
              
              {/* Screen content */}
              <div className="flex-1 relative overflow-hidden">
                {renderScreen()}
              </div>
            </div>

            {/* Side buttons */}
            <div 
              className="absolute -left-1.5 top-28 w-1.5 h-10 rounded-l"
              style={{ background: '#2a2624' }}
            />
            <div 
              className="absolute -left-1.5 top-44 w-1.5 h-14 rounded-l"
              style={{ background: '#2a2624' }}
            />
            <div 
              className="absolute -right-1.5 top-32 w-1.5 h-16 rounded-r"
              style={{ background: '#2a2624' }}
            />
          </div>
        </div>

        {/* Current screen indicator */}
        <div 
          className={`flex justify-center gap-2 mb-4 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span 
            className="text-xs px-4 py-2 rounded-full font-medium flex items-center gap-2"
            style={{ 
              background: 'var(--purple-light)',
              color: 'var(--purple)'
            }}
          >
            <Smartphone className="w-4 h-4" />
            {currentScreen === 'landing' && 'Start Screen'}
            {currentScreen === 'profile1' && 'Profile: How Your Mind Works'}
            {currentScreen === 'profile2' && 'Profile: Your Strengths'}
            {currentScreen === 'profile3' && 'Profile: Support Needs'}
            {currentScreen === 'profileDone' && 'Profile Created!'}
            {currentScreen === 'dashboard' && 'Dashboard'}
            {currentScreen === 'pulse' && 'Quick Check-in'}
            {currentScreen === 'detailedCheckin' && 'Detailed Check-in'}
            {currentScreen === 'insights' && 'Insights & Patterns'}
            {currentScreen === 'carePlan' && 'Your Care Plan'}
            {currentScreen === 'chat' && 'AI Chat'}
            {currentScreen === 'crisis' && 'Crisis Support'}
            {currentScreen === 'howItWorks' && 'How NeuroD Works'}
          </span>
        </div>

        {/* Navigation hint */}
        <p 
          className={`text-center text-sm mb-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ color: 'var(--text-muted)' }}
        >
          Tap buttons inside the phone to navigate. Scroll within the phone screen to see all content.
        </p>

        {/* CTA */}
        <div 
          className={`text-center transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button 
            onClick={scrollToWaitlist}
            className="btn-primary inline-flex items-center gap-2 max-w-xs"
          >
            I want this → Join the waitlist
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
