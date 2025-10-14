import { Feather, Utensils, UtensilsCrossed, Settings } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface InteractiveFoodControlProps {
  value: number; // 0-100
  onChange: (value: number) => void;
  className?: string;
}

export const InteractiveFoodControl = ({ value, onChange, className }: InteractiveFoodControlProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const getFoodLevel = () => {
    if (value < 35) return "low";
    if (value < 70) return "medium";
    return "high";
  };

  const getFoodLevelInfo = () => {
    const level = getFoodLevel();
    switch (level) {
      case "low":
        return {
          label: "Low",
          description: "Twilight zone conditions",
          color: "text-teal-200/80",
          icon: Feather,
        };
      case "medium":
        return {
          label: "Medium",
          description: "Coastal waters",
          color: "text-omz-violet/80",
          icon: Utensils,
        };
      case "high":
        return {
          label: "High",
          description: "Fresh bloom fallout",
          color: "text-coral-cta",
          icon: UtensilsCrossed,
        };
    }
  };

  const levelInfo = getFoodLevelInfo();
  const Icon = levelInfo.icon;

  return (
    <div className={`relative h-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-[rgba(8,20,36,0.82)] p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl ${className || ""}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-glow/18 via-transparent to-omz-violet/15" aria-hidden />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Interactive Control</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Food (Organic Matter)</h3>
          </div>
        </div>

        <p className="mt-4 text-sm text-white/75">
          Slide to see which microbe specialists take each step as food availability changes.
        </p>

        <div className="mt-6 space-y-6">
          {/* Value display */}
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {Math.round(value)}%
            </div>
            <div className={`text-sm transition-colors duration-300 ${
              getFoodLevel() === "low" ? "text-teal-200" :
              getFoodLevel() === "medium" ? "text-omz-violet" : "text-coral-200"
            }`}>
              {getFoodLevel().charAt(0).toUpperCase() + getFoodLevel().slice(1)} Food Level
            </div>
          </div>

          {/* Clean slider */}
          <div className="px-4">
            <Slider
              value={[value]}
              onValueChange={handleSliderChange}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              max={100}
              min={0}
              step={1}
              className="w-full"
              aria-label="Food (Organic Matter) level from 0 to 100 percent"
            />
          </div>

          {/* Clean level indicators */}
          <div className="flex justify-between text-sm text-white/60 px-2">
            <div className={`flex items-center gap-2 transition-colors duration-300 ${
              getFoodLevel() === "low" ? "text-teal-200 font-medium" : ""
            }`}>
              <Feather className="h-4 w-4" />
              <span>Low</span>
            </div>
            <div className={`flex items-center gap-2 transition-colors duration-300 ${
              getFoodLevel() === "medium" ? "text-omz-violet font-medium" : ""
            }`}>
              <Utensils className="h-4 w-4" />
              <span>Medium</span>
            </div>
            <div className={`flex items-center gap-2 transition-colors duration-300 ${
              getFoodLevel() === "high" ? "text-coral-200 font-medium" : ""
            }`}>
              <UtensilsCrossed className="h-4 w-4" />
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Simple description */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            {getFoodLevel() === "low" && "Scarce food favors efficient first-step specialists"}
            {getFoodLevel() === "medium" && "Moderate food allows multiple specialists to coexist"}  
            {getFoodLevel() === "high" && "Abundant food supports complete multi-step pathways"}
          </p>
        </div>
      </div>
    </div>
  );
};