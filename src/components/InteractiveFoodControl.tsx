import { Feather, Utensils, UtensilsCrossed, Settings } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface InteractiveFoodControlProps {
  value: number; // 0-100
  onChange: (value: number) => void;
  className?: string;
}

export const InteractiveFoodControl = ({ value, onChange, className }: InteractiveFoodControlProps) => {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
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
          description: "Scarce food favors efficient first-step specialists.",
          color: "text-teal-200/80",
          icon: Feather,
        };
      case "medium":
        return {
          label: "Medium",
          description: "Moderate food lets multiple steps share the baton.",
          color: "text-omz-violet/80",
          icon: Utensils,
        };
      case "high":
        return {
          label: "High",
          description: "Abundant food fuels complete multi-step pathways.",
          color: "text-coral-cta",
          icon: UtensilsCrossed,
        };
    }
  };

  const levelInfo = getFoodLevelInfo();
  const foodLevelCategory = getFoodLevel();
  const Icon = levelInfo.icon;

  const badgeStyles = foodLevelCategory === "low"
    ? "border-teal-300/40 bg-teal-500/10 text-teal-100"
    : foodLevelCategory === "medium"
      ? "border-omz-violet/40 bg-omz-violet/10 text-omz-violet/90"
      : "border-coral-cta/40 bg-coral-cta/10 text-coral-cta";

  return (
    <div className={`relative h-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-[rgba(8,20,36,0.82)] p-5 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col justify-center ${className || ""}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-glow/18 via-transparent to-omz-violet/15" aria-hidden />
      <div className="relative z-10 flex flex-col gap-4 w-full">

        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">Food (Organic Matter)</h3>
          <p className="mt-2 text-sm text-white/70">
            Slide dial to reshape the relay.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-xl border border-white/12 bg-white/5 px-4 py-3">
            <div className="flex items-baseline gap-3">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/60">Current</p>
              <p className="text-2xl font-bold text-white tracking-tight">{Math.round(value)}%</p>
            </div>
            <div className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold transition-colors duration-300 ${badgeStyles}`}>
              <span>{levelInfo.label}</span>
            </div>
          </div>

          <div className="py-1">
            <Slider
              value={[value]}
              onValueChange={handleSliderChange}
              max={100}
              min={0}
              step={1}
              className="w-full py-2"
              aria-label="Food (Organic Matter) level"
            />
            <div className="mt-2 flex justify-between text-[0.65rem] uppercase tracking-[0.2em] text-white/40 font-bold">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-xs leading-relaxed text-white/80">
            {levelInfo.description}
          </div>
        </div>
      </div>
    </div>
  );
};
