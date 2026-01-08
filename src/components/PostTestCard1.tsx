import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Lock } from "lucide-react";

interface PostTestCard1Props {
  value: string;
  onChange: (value: string) => void;
}

export const PostTestCard1 = ({ value, onChange }: PostTestCard1Props) => {
  const foodLevel = 50;

  return (
    <div className="glass-subtle border border-white/20 rounded-2xl p-4 h-full flex flex-col hover:glass-intense transition-all duration-300">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg tracking-tight">
          N₂O Response
        </h3>
      </div>

      {/* Compact Content */}
      <div className="flex-1 space-y-4">
        {/* Question */}
        <p className="text-sm text-muted-foreground">
          Food level is fixed at medium. Predict <span className="text-primary font-semibold">N₂O output</span>
        </p>



        {/* N₂O Selection */}
        <div className="space-y-2">

          <div className="grid grid-cols-3 gap-2">
            {["low", "medium", "high"].map((level) => (
              <button
                key={level}
                onClick={() => onChange(level)}
                className={`p-2 rounded-xl font-semibold text-xs transition-all duration-300 border ${value === level
                  ? "bg-primary text-background border-primary"
                  : "bg-background/50 border-white/20 hover:bg-primary/20"
                  }`}
                aria-pressed={value === level}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Selection Display */}

      </div>
    </div>
  );
};