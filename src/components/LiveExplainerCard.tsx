import { useEffect, useState } from "react";
import { FoodLevel } from "@/pages/Relay";
import { Lightbulb, Users, Zap } from "lucide-react";

interface LiveExplainerCardProps {
  foodLevel: FoodLevel;
}

const explanations = {
  low: {
    icon: Lightbulb,
    title: "First-Step Specialists Dominate",
    message: "Low food favors first-step specialists—they carry fewer enzymes and are more efficient in lean conditions.",
    color: "hsl(var(--teal-glow))",
    bgColor: "hsl(var(--teal-glow) / 0.1)"
  },
  medium: {
    icon: Users,
    title: "Coexistence Emerges", 
    message: "With a bit more food, neighbors can share the relay—coexistence appears as multiple steps become active.",
    color: "hsl(var(--omz-violet))",
    bgColor: "hsl(var(--omz-violet) / 0.1)"
  },
  high: {
    icon: Zap,
    title: "Multi-Step Pros Lead",
    message: "When nitrogen gets tight but food is plentiful, multi-step specialists flourish and complete entire pathways.",
    color: "hsl(var(--coral-cta))",
    bgColor: "hsl(var(--coral-cta) / 0.1)"
  }
};

export const LiveExplainerCard = ({ foodLevel }: LiveExplainerCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousLevel, setPreviousLevel] = useState<FoodLevel>(foodLevel);

  // Trigger animation when food level changes
  useEffect(() => {
    if (foodLevel !== previousLevel) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPreviousLevel(foodLevel);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [foodLevel, previousLevel]);

  const explanation = explanations[foodLevel];
  const IconComponent = explanation.icon;

  return (
    <div className={`glass-intense rounded-2xl p-6 border transition-all duration-700 ${
      isAnimating ? "scale-105 shadow-2xl" : "scale-100"
    }`}
    style={{ 
      borderColor: `${explanation.color}30`,
      backgroundColor: explanation.bgColor
    }}>
      
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-4">
        <div 
          className={`p-3 rounded-xl transition-all duration-500 ${
            isAnimating ? "animate-pulse scale-110" : ""
          }`}
          style={{ backgroundColor: `${explanation.color}20` }}
        >
          <IconComponent 
            className="w-6 h-6 transition-colors duration-500"
            style={{ color: explanation.color }}
          />
        </div>
        
        <div>
          <h3 
            className="text-lg font-bold transition-colors duration-500"
            style={{ color: explanation.color }}
          >
            {explanation.title}
          </h3>
          <div className="text-sm text-muted-foreground">
            Food Level: {foodLevel.charAt(0).toUpperCase() + foodLevel.slice(1)}
          </div>
        </div>
      </div>

      {/* Main explanation */}
      <div className={`transition-all duration-500 ${
        isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      }`}>
        <p className="text-foreground leading-relaxed">
          {explanation.message}
        </p>
      </div>

      {/* Visual indicator */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((step) => {
            let isActive = false;
            if (foodLevel === "low" && step === 1) isActive = true;
            if (foodLevel === "medium" && step <= 2) isActive = true;
            if (foodLevel === "high" && step <= 4) isActive = true;

            return (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-700 ${
                  isActive ? "scale-110" : "scale-90"
                }`}
                style={{
                  backgroundColor: isActive ? explanation.color : "hsl(var(--muted))",
                  boxShadow: isActive ? `0 0 8px ${explanation.color}40` : "none",
                  animationDelay: `${step * 100}ms`
                }}
              />
            );
          })}
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          Active relay steps
        </span>
      </div>

      {/* Progress indicator for animation */}
      {isAnimating && (
        <div className="mt-3 w-full h-1 glass-subtle rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full animate-pulse"
            style={{ 
              backgroundColor: explanation.color,
              animation: "slideIn 600ms ease-out forwards"
            }}
          />
        </div>
      )}

      {/* ARIA live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {explanation.title}: {explanation.message}
      </div>
    </div>
  );
};