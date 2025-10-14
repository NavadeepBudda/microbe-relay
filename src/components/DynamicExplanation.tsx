import { MessageCircle, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { getFoodLevelExplanation } from "@/lib/relay-state";

interface DynamicExplanationProps {
  foodLevel: number;
  className?: string;
  autoUpdate?: boolean;
}

export const DynamicExplanation = ({ foodLevel, className, autoUpdate = true }: DynamicExplanationProps) => {
  const [currentExplanation, setCurrentExplanation] = useState(() => getFoodLevelExplanation(foodLevel));
  const [previousFoodLevel, setPreviousFoodLevel] = useState(foodLevel);

  useEffect(() => {
    if (autoUpdate && foodLevel !== previousFoodLevel) {
      // Debounce updates to prevent chatter during dragging
      const timer = setTimeout(() => {
        const newExplanation = getFoodLevelExplanation(foodLevel);
        setCurrentExplanation(newExplanation);
        setPreviousFoodLevel(foodLevel);
      }, 120);

      return () => clearTimeout(timer);
    }
  }, [foodLevel, previousFoodLevel, autoUpdate]);

  const getScenarioColor = () => {
    if (foodLevel < 35) return "from-teal-glow/20 to-teal-glow/5";
    if (foodLevel < 70) return "from-omz-violet/20 to-omz-violet/5";
    return "from-coral-cta/20 to-coral-cta/5";
  };

  const getBadgeColor = () => {
    if (foodLevel < 35) return "border-teal-glow/30 text-teal-200";
    if (foodLevel < 70) return "border-omz-violet/30 text-omz-violet/90";
    return "border-coral-cta/30 text-coral-200";
  };

  return (
    <div className={`relative h-full rounded-3xl border border-white/12 bg-white/5 p-8 backdrop-blur-xl ${className || ""}`} aria-live="polite">
      <div className={`absolute inset-0 bg-gradient-to-br ${getScenarioColor()} transition-all duration-500 rounded-3xl`} aria-hidden />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/60">Live Explanation</p>
            <h3 className="text-lg font-semibold text-white">Why the relay shifts</h3>
          </div>
        </div>

        {/* Clean badge */}
        <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${getBadgeColor()}`}>
          <Lightbulb className="h-4 w-4" />
          {currentExplanation.badge}
        </div>

        {/* Main content - simplified */}
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-white mb-4">
            {currentExplanation.title}
          </h4>
          <p className="text-white/80 text-base leading-relaxed">
            {currentExplanation.description}
          </p>
        </div>

        {/* Current level indicator */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="text-center">
            <p className="text-2xl font-bold text-white mb-1">
              {Math.round(foodLevel)}%
            </p>
            <p className="text-sm text-white/60">
              Current food level
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};