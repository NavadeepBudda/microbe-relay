import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface IntroSequenceProps {
  onComplete: () => void;
}

const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const fullText = "Developed by Sun Lab · University of Pennsylvania";
  const [typedText, setTypedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Reduced motion: show text immediately, then exit
      setTypedText(fullText);
      setIsTypingComplete(true);
      setShowSkipButton(true);
      
      const timer = setTimeout(() => {
        if (!isSkipped) {
          handleExit();
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }

    // Show skip button after 1 second
    const skipTimer = setTimeout(() => setShowSkipButton(true), 1000);

    // Typewriter effect
    let currentIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
        setIsTypingComplete(true);
        
        // Hold for a beat, then start exit sequence
        setTimeout(() => {
          if (!isSkipped) {
            handleExit();
          }
        }, 1200);
      }
    }, 60 + Math.random() * 30); // 60-90ms per character for natural typing

    return () => {
      clearInterval(typewriterInterval);
      clearTimeout(skipTimer);
    };
  }, [fullText, isSkipped]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key.toLowerCase() === 's') {
        handleSkip();
      }
    };

    const handleTouch = (e: TouchEvent | MouseEvent) => {
      if (showSkipButton) {
        const target = e.target as HTMLElement;
        if (!target.closest('button')) {
          handleSkip();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('touchstart', handleTouch, { passive: true });
    document.addEventListener('click', handleTouch);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouch);
      document.removeEventListener('click', handleTouch);
    };
  }, [showSkipButton]);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 1000); // Match CSS animation duration
  };

  const handleSkip = () => {
    setIsSkipped(true);
    handleExit();
  };

  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div 
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-1000 ease-out ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      role="dialog"
      aria-label="Introduction animation"
      aria-live="polite"
      style={{
        backgroundColor: 'hsl(var(--abyss))',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Main typewriter text */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="relative inline-block">
            <span 
              className={`text-lg sm:text-xl md:text-2xl font-semibold text-white/90 font-mono transition-all duration-1000 ease-out ${
                isExiting ? 'opacity-0 blur-sm scale-105' : 'opacity-100 blur-0 scale-100'
              } sm:duration-600`}
              style={{ 
                letterSpacing: isExiting ? (typeof window !== 'undefined' && window.innerWidth < 768 ? '0.1em' : '0.15em') : '0.02em',
                transform: isExiting ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 'translateY(-5px)' : 'translateY(-10px)') : 'translateY(0)',
              }}
            >
              {typedText}
            </span>
            
            {/* Blinking caret */}
            {(!isTypingComplete || !isExiting) && (
              <span 
                className={`inline-block w-0.5 h-6 sm:h-7 md:h-8 bg-white/70 ml-1 ${
                  prefersReducedMotion ? '' : 'animate-caret-blink'
                }`}
                style={{ 
                  animation: prefersReducedMotion ? 'none' : undefined
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Skip controls */}
      {showSkipButton && !isExiting && (
        <>
          {/* Skip button */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-white/60 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium min-h-[44px] min-w-[88px] touch-manipulation"
              aria-label="Skip introduction animation"
            >
              Skip Intro
            </Button>
          </div>
          
          {/* Mobile touch hint */}
          <div className="absolute bottom-4 left-4 sm:hidden">
            <p className="text-white/40 text-xs font-medium animate-pulse">
              Tap anywhere to skip
            </p>
          </div>
        </>
      )}

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite">
        {isTypingComplete && `Intro. ${fullText}`}
      </div>
    </div>
  );
};

export default IntroSequence;