import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuidedOverlayProps {
  isFirstVisit?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
}

interface GuideStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string;
  position: "top" | "bottom" | "left" | "right" | "center";
  highlightArea?: {
    selector: string;
    padding: number;
  };
}

const guideSteps: GuideStep[] = [
  {
    id: "welcome",
    title: "Welcome to the Nitrogen Relay",
    description: "You're about to explore how microbes pass nitrogen like a baton through four precise steps. Let's discover who holds the baton at different times.",
    position: "center",
  },
  {
    id: "pipeline", 
    title: "This is the nitrogen relay—four steps pass the baton",
    description: "NO₃⁻ → NO₂⁻ → N₂O → N₂. Each transformation is handled by different microbial specialists. Notice how the steps connect together.",
    targetElement: ".relay-pipeline",
    position: "bottom",
    highlightArea: {
      selector: ".relay-pipeline",
      padding: 20,
    },
  },
  {
    id: "specialists",
    title: "Most microbes do only one or two steps",
    description: "This is the key insight! Different microbes specialize in different parts of the relay. Very few can do the whole thing alone.",
    targetElement: ".educational-badge",
    position: "bottom",
    highlightArea: {
      selector: ".educational-badge",
      padding: 10,
    },
  },
  {
    id: "slider",
    title: "Drag Food to see who wins",
    description: "Now the magic happens! Slide the food level and watch which specialists take control. Try low food first, then high food.",
    targetElement: ".food-control-slider",
    position: "top",
    highlightArea: {
      selector: ".food-control-slider",
      padding: 20,
    },
  },
];

export const GuidedOverlay = ({ isFirstVisit = true, onComplete, onSkip }: GuidedOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isFirstVisit) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // Delay to let the page load
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit]);

  // Listen for slider interaction to auto-advance
  useEffect(() => {
    const handleSliderInteraction = () => {
      if (currentStep === 3 && !hasInteracted) {
        setHasInteracted(true);
        // User has interacted with slider, show a completion hint
        setTimeout(() => {
          if (currentStep === 3) {
            handleComplete();
          }
        }, 3000);
      }
    };

    const sliderElement = document.querySelector('.food-control-slider [data-radix-slider-thumb]');
    if (sliderElement) {
      sliderElement.addEventListener('pointerdown', handleSliderInteraction);
      return () => {
        sliderElement.removeEventListener('pointerdown', handleSliderInteraction);
      };
    }
  }, [currentStep, hasInteracted]);

  const handleNext = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    onSkip?.();
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete?.();
  };

  const currentGuideStep = guideSteps[currentStep];

  if (!isVisible || !isFirstVisit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Spotlight effect for highlighted areas */}
      {currentGuideStep.highlightArea && (
        <div 
          className="absolute border-4 border-white/50 rounded-lg bg-white/5 animate-pulse"
          style={{
            // This would need to be calculated based on element position
            // For now, using placeholder values
            top: "20%",
            left: "20%", 
            width: "60%",
            height: "60%",
          }}
        />
      )}

      {/* Guide content */}
      <div className="relative z-10 max-w-md mx-6">
        <div className="glass-intense rounded-3xl p-8 border border-white/20 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  Step {currentStep + 1} of {guideSteps.length}
                </span>
                <div className="h-1 w-8 bg-gradient-to-r from-teal-glow to-omz-violet rounded-full" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {currentGuideStep.title}
              </h2>
            </div>
            <Button
              onClick={handleSkip}
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white p-2 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <p className="text-white/80 text-base leading-relaxed mb-8">
            {currentGuideStep.description}
          </p>

          {/* Progress indicators */}
          <div className="flex gap-2 mb-6">
            {guideSteps.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? "bg-gradient-to-r from-teal-glow to-omz-violet" 
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="text-white/60 hover:text-white text-sm"
            >
              Skip tour
            </Button>
            
            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white"
                >
                  Back
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                className="rounded-full bg-gradient-to-r from-teal-glow to-omz-violet px-6 py-2 text-sm font-semibold text-white shadow-lg hover:scale-105 transition-transform"
              >
                {currentStep === guideSteps.length - 1 ? "Start exploring" : "Next"}
                {currentStep === 3 && !hasInteracted ? (
                  <ArrowDown className="ml-2 h-4 w-4 animate-bounce" />
                ) : (
                  <ChevronRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Special instruction for slider step */}
          {currentStep === 3 && (
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-coral-cta/20 to-coral-cta/10 border border-coral-cta/30">
              <p className="text-sm text-coral-200 font-medium">
                💡 Try adjusting the slider now to see the relay change in real-time!
              </p>
            </div>
          )}
        </div>

        {/* Pointing arrow (conditional) */}
        {currentGuideStep.targetElement && currentGuideStep.position === "top" && (
          <div className="flex justify-center mt-4">
            <ArrowDown className="h-6 w-6 text-white animate-bounce" />
          </div>
        )}
      </div>
    </div>
  );
};