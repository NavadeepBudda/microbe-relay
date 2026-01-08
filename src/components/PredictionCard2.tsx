import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface PredictionCard2Props {
  value: string;
  onChange: (value: string) => void;
}

const steps = [
  { id: "step1", label: "Step 1: NO₃⁻ to NO₂⁻" },
  { id: "step1and2", label: "Step 1 and 2: NO₃⁻ to N₂O" },
  { id: "step1and2and3", label: "Step 1 and 2 and 3: NO₃⁻ to N₂" },
];

export const PredictionCard2 = ({ value, onChange }: PredictionCard2Props) => {

  return (
    <div className="glass-subtle border border-white/20 rounded-2xl p-4 h-full flex flex-col hover:glass-intense transition-all duration-300">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg tracking-tight">
          Pathway Dominance
        </h3>
      </div>

      {/* Compact Content */}
      <div className="flex-1 space-y-4">
        {/* Question */}
        <p className="text-sm text-muted-foreground">
          Which pathway steps <span className="text-primary font-semibold">dominate in low food</span> conditions?
        </p>

        {/* Compact Selection */}
        <div className="space-y-2">


          <div className="space-y-1.5">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => onChange(step.id)}
                className={`w-full p-3 rounded-xl text-sm font-medium transition-all duration-300 border text-left flex items-center justify-between ${value === step.id
                  ? "bg-primary text-background border-primary"
                  : "bg-background/50 border-white/20 hover:bg-primary/20"
                  }`}
                aria-pressed={value === step.id}
                aria-label={`Select ${step.label}`}
              >
                <div className="flex items-center gap-3">

                  <span className="font-mono">{step.label}</span>
                </div>

              </button>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};
