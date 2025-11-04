import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Lock } from "lucide-react";

interface PredictionCard1Props {
  onLock: (data: { foodLevel: number; n2oGuess: string }) => void | Promise<void>;
  isLocked: boolean;
  onUnlock: () => void;
}

export const PredictionCard1 = ({ onLock, isLocked, onUnlock }: PredictionCard1Props) => {
  const foodLevel = 50; // Fixed at 50, no longer state
  const [n2oGuess, setN2oGuess] = useState<string>("");

  const handleLock = async () => {
    if (n2oGuess) {
      try {
        await onLock({ foodLevel, n2oGuess });
      } catch (error) {
        console.error('Error locking card 1:', error);
      }
    }
  };

  return (
    <div className="glass-subtle border border-white/20 rounded-2xl p-4 h-full flex flex-col hover:glass-intense transition-all duration-300">
      
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg tracking-tight">
          N₂O Response
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
          Food level is fixed at medium. Predict <span className="text-primary font-semibold">N₂O output</span>
        </p>

        {/* Fixed Food Level Display */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-foreground/80">
            Food Level: <span className="text-primary font-bold">{foodLevel}</span> (Fixed)
          </label>
          <div className="p-3 bg-background/30 rounded-xl border border-white/10">
            <div className="relative w-full h-2 bg-muted/30 rounded-full">
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-primary rounded-full"
                aria-label="Food level indicator at 50"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Low</span>
              <span className="text-primary font-semibold">Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* N₂O Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-foreground/80">
            Predicted N₂O Level:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["low", "medium", "high"].map((level) => (
              <button
                key={level}
                onClick={() => !isLocked && setN2oGuess(level)}
                disabled={isLocked}
                className={`p-2 rounded-xl font-semibold text-xs transition-all duration-300 border ${
                  n2oGuess === level
                    ? "bg-primary text-background border-primary"
                    : "bg-background/50 border-white/20 hover:bg-primary/20"
                } disabled:opacity-50`}
                aria-pressed={n2oGuess === level}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Selection Display */}
        {n2oGuess && (
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 animate-scale-in">
            <p className="text-xs text-primary font-semibold">
              Food {foodLevel} → {n2oGuess.toUpperCase()} N₂O
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
            disabled={!n2oGuess}
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
