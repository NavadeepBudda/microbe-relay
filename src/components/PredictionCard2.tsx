import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface PredictionCard2Props {
  onLock: (data: { dominantStep: string }) => void;
  isLocked: boolean;
  onUnlock: () => void;
}

const steps = [
  { id: "NO3", label: "NO₃⁻" },
  { id: "NO2", label: "NO₂⁻" },
  { id: "N2O", label: "N₂O" },
  { id: "N2", label: "N₂" },
];

export const PredictionCard2 = ({ onLock, isLocked, onUnlock }: PredictionCard2Props) => {
  const [selectedStep, setSelectedStep] = useState<string>("");

  const handleLock = () => {
    if (selectedStep) {
      onLock({ dominantStep: selectedStep });
    }
  };

  return (
    <div className="glass-intense elevation-8 rounded-3xl p-8 min-w-[320px] flex-1">
      <div className="flex items-start justify-between mb-6">
        <h3 className="font-display font-semibold text-xl">Dominant Step</h3>
        {isLocked && (
          <div className="flex items-center gap-2 text-primary text-sm">
            <Lock className="w-4 h-4" />
            <span>LOCKED IN</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Relay Nodes */}
        <div>
          <label className="block text-sm text-muted-foreground mb-4">
            Select the step's specialists that dominate in low Food:
          </label>
          <div className="flex items-center justify-between gap-2">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-2">
                <button
                  onClick={() => !isLocked && setSelectedStep(step.id)}
                  disabled={isLocked}
                  className={`w-14 h-14 rounded-full font-mono text-sm font-semibold transition-all ${
                    selectedStep === step.id
                      ? "bg-accent text-accent-foreground ring-4 ring-accent/30"
                      : "bg-white/5 hover:bg-white/10"
                  } disabled:opacity-50 focus-ring`}
                  aria-pressed={selectedStep === step.id}
                  aria-label={`Select ${step.label}`}
                >
                  {step.label}
                </button>
                {idx < steps.length - 1 && (
                  <div className="w-4 h-0.5 bg-muted" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        {isLocked ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onUnlock}
            className="w-full text-primary hover:bg-primary/10 mt-6"
          >
            Change answer
          </Button>
        ) : (
          <Button
            onClick={handleLock}
            disabled={!selectedStep}
            className="w-full bg-coral-cta hover:bg-coral-cta/90 text-white font-semibold mt-6"
          >
            Lock In
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground mt-4 italic">
        In low Food, which step's specialists dominate?
      </p>
    </div>
  );
};
