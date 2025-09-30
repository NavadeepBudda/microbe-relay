import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Lock } from "lucide-react";

interface PredictionCard1Props {
  onLock: (data: { foodLevel: number; n2oGuess: string }) => void;
  isLocked: boolean;
  onUnlock: () => void;
}

export const PredictionCard1 = ({ onLock, isLocked, onUnlock }: PredictionCard1Props) => {
  const [foodLevel, setFoodLevel] = useState(50);
  const [n2oGuess, setN2oGuess] = useState<string>("");

  const handleLock = () => {
    if (n2oGuess) {
      onLock({ foodLevel, n2oGuess });
    }
  };

  return (
    <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 min-w-[320px] flex-1 hover:bg-white/[0.04] transition-colors">
      <div className="flex items-start justify-between mb-8">
        <h3 className="font-display font-semibold text-xl tracking-tight">N₂O Guess Meter</h3>
        {isLocked && (
          <div className="flex items-center gap-1.5 text-primary text-xs font-medium uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Locked</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Food Slider */}
        <div>
          <label className="block text-sm text-muted-foreground mb-3">
            Food Level: {foodLevel}
          </label>
          <Slider
            value={[foodLevel]}
            onValueChange={(v) => !isLocked && setFoodLevel(v[0])}
            min={0}
            max={100}
            step={50}
            disabled={isLocked}
            className="w-full"
            aria-label="Food level slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* N₂O Choice */}
        <div>
          <label className="block text-sm text-muted-foreground mb-3">
            Predicted N₂O Level:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["low", "medium", "high"].map((level) => (
              <button
                key={level}
                onClick={() => !isLocked && setN2oGuess(level)}
                disabled={isLocked}
                className={`py-3 rounded-xl font-medium text-sm transition-all ${
                  n2oGuess === level
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 hover:bg-white/10"
                } disabled:opacity-50 focus-ring`}
                aria-pressed={n2oGuess === level}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
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
            disabled={!n2oGuess}
            className="w-full bg-coral-cta hover:bg-coral-cta/90 text-white font-semibold"
          >
            Lock In
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-4 italic">
        Pick a Food level and predict the meter.
      </p>
    </div>
  );
};
