import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface PredictionCard3Props {
  value: string;
  onChange: (value: string) => void;
  onPulse?: () => void;
}

export const PredictionCard3 = ({ value, onChange, onPulse }: PredictionCard3Props) => {

  return (
    <div className="glass-subtle border border-white/20 rounded-2xl p-4 h-full flex flex-col hover:glass-intense transition-all duration-300">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg tracking-tight">
          Pulse Response
        </h3>
      </div>

      {/* Compact Content */}
      <div className="flex-1 space-y-4">
        {/* Question */}
        <p className="text-sm text-muted-foreground">
          What happens to <span className="text-primary font-semibold">N₂O levels</span> after a food pulse?
        </p>

        {/* Compact Selection */}
        <div className="space-y-2">

          <div className="space-y-1.5">
            {[
              { id: "spike", label: "Spikes briefly" },
              { id: "same", label: "Stays the same" },
              { id: "drop", label: "Drops temporarily" },
            ].map((choice) => (
              <button
                key={choice.id}
                onClick={() => onChange(choice.id)}
                className={`w-full p-2.5 rounded-xl text-left transition-all duration-300 border font-mono text-sm font-bold ${value === choice.id
                  ? "bg-primary text-background border-primary"
                  : "bg-background/50 border-white/20 hover:bg-primary/20"
                  }`}
                aria-pressed={value === choice.id}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selection Display */}

      </div>
    </div>
  );
};
