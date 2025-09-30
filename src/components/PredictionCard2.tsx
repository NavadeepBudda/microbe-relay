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
    <div className="glass-subtle border border-white/20 rounded-2xl p-4 h-full flex flex-col hover:glass-intense transition-all duration-300">
      
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg tracking-tight">
          Pathway Dominance
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
          Which step <span className="text-primary font-semibold">dominates in low food</span> conditions?
        </p>
        
        {/* Compact Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-foreground/80">
            Select pathway step:
          </label>
          
          <div className="space-y-1.5">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => !isLocked && setSelectedStep(step.id)}
                disabled={isLocked}
                className={`w-full p-2.5 rounded-xl font-mono text-sm font-bold transition-all duration-300 border text-left flex items-center justify-between ${
                  selectedStep === step.id
                    ? "bg-primary text-background border-primary"
                    : "bg-background/50 border-white/20 hover:bg-primary/20"
                } disabled:opacity-50`}
                aria-pressed={selectedStep === step.id}
                aria-label={`Select ${step.label}`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    selectedStep === step.id ? "bg-background/20" : "bg-primary/20"
                  }`}>
                    {idx + 1}
                  </div>
                  <span>{step.label}</span>
                </div>
                {selectedStep === step.id && (
                  <div className="w-4 h-4 rounded-full bg-background/20 flex items-center justify-center text-xs">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selection Display */}
        {selectedStep && (
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 animate-scale-in">
            <p className="text-xs text-primary font-semibold">
              Selected: {steps.find(s => s.id === selectedStep)?.label}
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
            disabled={!selectedStep}
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
