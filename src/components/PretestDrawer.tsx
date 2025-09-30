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
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] animate-slide-up">
        <div className="container mx-auto px-4 pb-8">
          <div className="glass-intense elevation-16 rounded-t-3xl p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display font-bold text-3xl mb-2">
                  Make your predictions
                </h2>
                <p className="text-muted-foreground">
                  We'll check back after the dive. Lock in all three cards to continue.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-white/10"
                aria-label="Close drawer"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Cards */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-8">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${card1Data ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-2 h-2 rounded-full ${card2Data ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-2 h-2 rounded-full ${card3Data ? 'bg-primary' : 'bg-muted'}`} />
                <span className="text-sm text-muted-foreground ml-2">
                  {[card1Data, card2Data, card3Data].filter(Boolean).length} of 3 locked
                </span>
              </div>

              {allLocked && (
                <div className="text-primary text-sm font-semibold flex items-center gap-2 animate-fade-in">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    ✓
                  </div>
                  Predictions saved
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
