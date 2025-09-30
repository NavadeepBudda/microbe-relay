import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

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
    <div className="glass-subtle border border-white/20 rounded-2xl p-4 h-full flex flex-col hover:glass-intense transition-all duration-300">
      
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg tracking-tight">
          Pulse Response
        </h3>
        {isLocked && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
            <Lock className="w-3 h-3" />
            <span>Locked</span>
          </div>
        )}
      </div>

      {/* Compact Content */}
      <div className="flex-1 space-y-4">
        {/* Question */}
        <p className="text-sm text-muted-foreground">
          What happens to <span className="text-primary font-semibold">N₂O levels</span> after a food pulse?
        </p>


        {/* Compact Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-foreground/80">
            N₂O response prediction:
          </label>
          <div className="space-y-1.5">
            {[
              { id: "spike", label: "Spikes briefly" },
              { id: "same", label: "Stays the same" },
              { id: "drop", label: "Drops temporarily" },
            ].map((choice) => (
              <button
                key={choice.id}
                onClick={() => !isLocked && setPulseGuess(choice.id)}
                disabled={isLocked}
                className={`w-full p-2.5 rounded-xl text-left transition-all duration-300 border font-mono text-sm font-bold ${
                  pulseGuess === choice.id
                    ? "bg-primary text-background border-primary"
                    : "bg-background/50 border-white/20 hover:bg-primary/20"
                } disabled:opacity-50`}
                aria-pressed={pulseGuess === choice.id}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selection Display */}
        {pulseGuess && (
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 animate-scale-in">
            <p className="text-xs text-primary font-semibold">
              Prediction: {pulseGuess === "spike" ? "Spikes briefly" : 
                         pulseGuess === "same" ? "Stays the same" : "Drops temporarily"}
            </p>
          </div>
        )}
      </div>

      {/* Compact Action */}
      <div className="mt-4 pt-4 border-t border-white/10">
        {isLocked ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onUnlock}
            className="w-full text-primary hover:bg-primary/10 font-semibold border border-primary/20 rounded-xl h-8 text-xs"
          >
            Change
          </Button>
        ) : (
          <Button
            onClick={handleLock}
            disabled={!pulseGuess}
            size="sm"
            className="w-full bg-gradient-to-r from-coral-cta to-coral-cta/90 text-white font-bold rounded-xl h-8 text-xs disabled:opacity-50 transition-all duration-300 hover:scale-105"
          >
            Lock In
          </Button>
        )}
      </div>
    </div>
  );
};
