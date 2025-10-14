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
    <div className={`relative h-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-[rgba(8,20,36,0.82)] p-6 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl ${className || ""}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-glow/18 via-transparent to-omz-violet/15" aria-hidden />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/60">Interactive Control</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Food (Organic Matter)</h3>
          </div>
        </div>

        <p className="mt-3 text-sm text-white/70">
          Slide the food dial to watch the relay reshuffle in real time.
        </p>

        <div className="mt-5 flex flex-1 flex-col gap-5">
          <div className="flex items-center justify-between rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">Current</p>
              <p className="text-2xl font-semibold text-white">{Math.round(value)}%</p>
            </div>
            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${badgeStyles}`}>
              <Icon className="h-4 w-4" />
              <span>{levelInfo.label} food</span>
            </div>
          </div>

          <div>
            <Slider
              value={[value]}
              onValueChange={handleSliderChange}
              max={100}
              min={0}
              step={1}
              className="w-full"
              aria-label="Food (Organic Matter) level from 0 to 100 percent"
            />
            <div className="mt-4 flex justify-between text-[0.7rem] uppercase tracking-[0.2em] text-white/50">
              <span className={foodLevelCategory === "low" ? "text-teal-200" : ""}>Low</span>
              <span className={foodLevelCategory === "medium" ? "text-omz-violet" : ""}>Medium</span>
              <span className={foodLevelCategory === "high" ? "text-coral-200" : ""}>High</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-xs text-white/70">
            {levelInfo.description}
          </div>
        </div>
      </div>
    </div>
  );
};
