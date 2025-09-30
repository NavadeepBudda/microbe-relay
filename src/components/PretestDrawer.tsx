import { useState, useEffect } from "react";
import { X, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PredictionCard1 } from "./PredictionCard1";
import { PredictionCard2 } from "./PredictionCard2";
import { PredictionCard3 } from "./PredictionCard3";

interface PretestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  onPulse: () => void;
}

interface PredictionData {
  id: string;
  response: string | number;
  timestamp: Date;
}

export const PretestDrawer = ({ isOpen, onClose, onComplete, onPulse }: PretestDrawerProps) => {
  const [card1Data, setCard1Data] = useState<PredictionData | null>(null);
  const [card2Data, setCard2Data] = useState<PredictionData | null>(null);
  const [card3Data, setCard3Data] = useState<PredictionData | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const allLocked = card1Data && card2Data && card3Data;
  const completedCount = [card1Data, card2Data, card3Data].filter(Boolean).length;


  useEffect(() => {
    if (allLocked && !showSuccessAnimation) {
      setShowSuccessAnimation(true);
      // Auto-close after animation
      const timer = setTimeout(() => {
        onComplete();
        onClose();
        setShowSuccessAnimation(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [allLocked, showSuccessAnimation, onComplete, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Apple-Quality Backdrop */}
      <div
        className="fixed inset-0 bg-background/90 backdrop-blur-xl z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Compact Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl max-h-[80vh] overflow-hidden">
          
          {/* Main Modal */}
          <div className="bg-background/98 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-3xl relative animate-slide-up-smooth">
            
            {/* Compact Header */}
            <div className="relative z-10 p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl tracking-tight">
                      Make Your Predictions
                    </h2>
                    <p className="text-sm text-muted-foreground">Share your hypotheses about ocean microbe behavior</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-white/10 rounded-full h-10 w-10 transition-all duration-300"
                  aria-label="Close predictions modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Compact Content Section */}
            <div className="relative z-10 p-6 max-h-[50vh] overflow-y-auto">
              {/* Cards Grid - Responsive */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <PredictionCard1
                  onLock={setCard1Data}
                  isLocked={!!card1Data}
                  onUnlock={() => setCard1Data(null)}
                />
                <PredictionCard2
                  onLock={setCard2Data}
                  isLocked={!!card2Data}
                  onUnlock={() => setCard2Data(null)}
                />
                <PredictionCard3
                  onLock={setCard3Data}
                  isLocked={!!card3Data}
                  onUnlock={() => setCard3Data(null)}
                  onPulse={onPulse}
                />
              </div>
            </div>

            {/* Compact Footer */}
            <div className="relative z-10 p-6 border-t border-white/10 bg-background/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Progress */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          i < completedCount 
                            ? 'bg-primary shadow-sm shadow-primary/50' 
                            : 'bg-muted/50'
                        }`} 
                      />
                    ))}
                  </div>
                  
                  <span className="text-sm font-medium">
                    <span className="text-primary">{completedCount}</span>/3 completed
                  </span>
                </div>

                {/* Status Only - Auto-completion when all locked */}
                <div className="flex items-center justify-center">
                  {allLocked ? (
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">All predictions complete!</span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Complete {3 - completedCount} more prediction{3 - completedCount > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Success Overlay */}
            {showSuccessAnimation && (
              <div 
                className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl rounded-3xl flex items-center justify-center cursor-pointer animate-fade-in"
                onClick={() => {
                  setShowSuccessAnimation(false);
                  onComplete();
                  onClose();
                }}
              >
                <div className="text-center animate-scale-in-spring">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Predictions Saved!</h3>
                  <p className="text-muted-foreground mb-4">Ready to explore the lab</p>
                  <p className="text-xs text-muted-foreground/70">Tap to continue</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
