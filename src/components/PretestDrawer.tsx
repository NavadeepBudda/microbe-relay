import { useState } from "react";
import { X } from "lucide-react";
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

export const PretestDrawer = ({ isOpen, onClose, onComplete, onPulse }: PretestDrawerProps) => {
  const [card1Data, setCard1Data] = useState<any>(null);
  const [card2Data, setCard2Data] = useState<any>(null);
  const [card3Data, setCard3Data] = useState<any>(null);

  const allLocked = card1Data && card2Data && card3Data;

  const handleComplete = () => {
    if (allLocked) {
      onComplete();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] animate-slide-up">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-8">
          <div className="backdrop-blur-2xl bg-background/95 border border-border/10 rounded-t-[32px] p-10 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-10">
              <div className="max-w-2xl">
                <h2 className="font-display font-bold text-4xl mb-3 tracking-tight">
                  Make your predictions
                </h2>
                <p className="text-muted-foreground text-lg">
                  Lock in all three before diving. We'll revisit these after the lab.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-white/5 rounded-full h-10 w-10"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Cards */}
            <div className="grid lg:grid-cols-3 gap-6 mb-10">
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

            {/* Progress */}
            <div className="flex items-center justify-between pt-6 border-t border-border/10">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full transition-colors ${card1Data ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-2 h-2 rounded-full transition-colors ${card2Data ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-2 h-2 rounded-full transition-colors ${card3Data ? 'bg-primary' : 'bg-muted'}`} />
                <span className="text-sm text-muted-foreground ml-1 font-medium">
                  {[card1Data, card2Data, card3Data].filter(Boolean).length} of 3 locked
                </span>
              </div>

              {allLocked && (
                <div className="text-primary text-sm font-semibold flex items-center gap-2 animate-fade-in">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    ✓
                  </div>
                  All predictions saved
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
