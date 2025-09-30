import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Zap } from "lucide-react";

interface PredictionCard3Props {
  onLock: (data: { pulseGuess: string }) => void;
  isLocked: boolean;
  onUnlock: () => void;
  onPulse: () => void;
}

export const PredictionCard3 = ({ onLock, isLocked, onUnlock, onPulse }: PredictionCard3Props) => {
  const [pulseGuess, setPulseGuess] = useState<string>("");

  const handleLock = () => {
    if (pulseGuess) {
      onLock({ pulseGuess });
    }
  };

  return (
    <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 min-w-[320px] flex-1 hover:bg-white/[0.04] transition-colors">
      <div className="flex items-start justify-between mb-8">
        <h3 className="font-display font-semibold text-xl tracking-tight">Pulse Moment</h3>
        {isLocked && (
          <div className="flex items-center gap-1.5 text-primary text-xs font-medium uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Locked</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Pulse Button */}
        <div>
          <Button
            onClick={onPulse}
            className="w-full h-20 bg-gradient-to-r from-accent/80 to-primary/80 hover:from-accent hover:to-primary text-white font-display font-bold text-lg"
            aria-label="Send food pulse"
          >
            <Zap className="w-6 h-6 mr-2" />
            PULSE
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Send a shimmering food plume
          </p>
        </div>

        {/* Prediction Choices */}
        <div>
          <label className="block text-sm text-muted-foreground mb-3">
            Right after a pulse, what happens to N₂O?
          </label>
          <div className="space-y-2">
            {[
              { id: "spike", label: "Spikes briefly" },
              { id: "same", label: "Stays the same" },
              { id: "drop", label: "Drops" },
            ].map((choice) => (
              <button
                key={choice.id}
                onClick={() => !isLocked && setPulseGuess(choice.id)}
                disabled={isLocked}
                className={`w-full py-3 px-4 rounded-xl font-medium text-sm text-left transition-all ${
                  pulseGuess === choice.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 hover:bg-white/10"
                } disabled:opacity-50 focus-ring`}
                aria-pressed={pulseGuess === choice.id}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action */}
        {isLocked ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onUnlock}
            className="w-full text-primary hover:bg-primary/10"
          >
            Change answer
          </Button>
        ) : (
          <Button
            onClick={handleLock}
            disabled={!pulseGuess}
            className="w-full bg-coral-cta hover:bg-coral-cta/90 text-white font-semibold"
          >
            Lock In
          </Button>
        )}
      </div>
    </div>
  );
};
