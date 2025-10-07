import { useEffect, useState } from "react";
import { FoodLevel } from "@/pages/Relay";

interface MicrobeAvatarProps {
  stationId: string;
  intensity: number;
  foodLevel: FoodLevel;
}

const microbeStyles = {
  no3: {
    color: "hsl(var(--teal-glow))",
    emoji: "🦠",
    name: "NO₃⁻ Reducer",
    specialistType: "First-step specialists",
    strategy: "Travel light, efficient nitrate processing"
  },
  no2: {
    color: "hsl(var(--omz-violet))", 
    emoji: "🔬",
    name: "NO₂⁻ Handler",
    specialistType: "Second-step specialists", 
    strategy: "Moderate enzyme investment, nitrite processing"
  },
  n2o: {
    color: "hsl(var(--coral-cta))",
    emoji: "⚡",
    name: "N₂O Producer",
    specialistType: "Third-step specialists",
    strategy: "Convert nitrous oxide, compete with generalists"
  },
  n2: {
    color: "hsl(var(--primary))",
    emoji: "✨", 
    name: "N₂ Finisher",
    specialistType: "Multi-step generalists",
    strategy: "Complete enzyme toolkit, full pathway"
  }
};

export const MicrobeAvatar = ({ stationId, intensity, foodLevel }: MicrobeAvatarProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);
  const style = microbeStyles[stationId as keyof typeof microbeStyles];
  
  // Trigger animation when intensity changes significantly
  useEffect(() => {
    if (intensity > 0.7) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [intensity]);

  // Continuous pulse animation for active microbes
  useEffect(() => {
    if (intensity > 0.5) {
      const interval = setInterval(() => {
        setPulsePhase(prev => (prev + 1) % 4);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [intensity]);

  const getSize = () => {
    const baseSize = 40;
    const scaleFactor = 0.6 + (intensity * 0.7); // Scale from 0.6x to 1.3x
    return baseSize * scaleFactor;
  };

  const getPopulationCount = () => {
    if (intensity < 0.3) return 1;
    if (intensity < 0.5) return 2;
    if (intensity < 0.7) return 3;
    if (intensity < 0.9) return 4;
    return 5;
  };

  const getActivityLevel = () => {
    if (intensity < 0.3) return "dormant";
    if (intensity < 0.6) return "low";
    if (intensity < 0.8) return "moderate";
    return "high";
  };

  const populationCount = getPopulationCount();
  const size = getSize();
  const activityLevel = getActivityLevel();

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Main microbe container */}
      <div
        className={`relative flex items-center justify-center rounded-full border-2 transition-all duration-1000 ${
          intensity > 0.5 
            ? "border-primary/50 shadow-lg" 
            : "border-muted/30"
        } ${isAnimating ? "animate-bounce" : ""}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: intensity > 0.3 
            ? `radial-gradient(circle, ${style.color}25 0%, ${style.color}10 50%, transparent 80%)`
            : `radial-gradient(circle, ${style.color}10 0%, transparent 60%)`,
          boxShadow: intensity > 0.5 
            ? `0 0 ${12 + intensity * 8}px ${style.color}40`
            : "none",
          transform: intensity > 0.7 ? "scale(1.1)" : "scale(1)"
        }}
      >
        {/* Pulsing background for highly active microbes */}
        {intensity > 0.7 && (
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: `${style.color}20`,
              animationDuration: "2s"
            }}
          />
        )}

        {/* Main emoji */}
        <span 
          className={`text-lg transition-all duration-1000 ${
            intensity > 0.6 ? "animate-pulse" : ""
          }`}
          style={{
            filter: intensity > 0.5 ? `drop-shadow(0 0 ${4 + intensity * 4}px ${style.color})` : "none",
            opacity: 0.4 + (intensity * 0.6),
            fontSize: `${0.8 + intensity * 0.4}em`
          }}
        >
          {style.emoji}
        </span>

        {/* Activity ring for active microbes */}
        {intensity > 0.5 && (
          <div
            className="absolute inset-0 rounded-full border-2 animate-spin"
            style={{
              borderColor: `${style.color}30`,
              borderTopColor: style.color,
              animationDuration: `${4 - intensity * 2}s`
            }}
          />
        )}
      </div>

      {/* Population indicators */}
      {populationCount > 1 && (
        <div className="absolute -top-2 -right-2 flex flex-wrap gap-1 max-w-6">
          {Array.from({ length: Math.min(populationCount - 1, 4) }, (_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full border animate-pulse"
              style={{
                backgroundColor: `${style.color}40`,
                borderColor: `${style.color}60`,
                animationDelay: `${i * 150}ms`,
                transform: `scale(${1 - i * 0.1})`
              }}
            />
          ))}
          {populationCount > 5 && (
            <div 
              className="text-xs font-bold rounded-full w-3 h-3 flex items-center justify-center"
              style={{ 
                backgroundColor: `${style.color}40`,
                color: style.color,
                fontSize: "8px"
              }}
            >
              +
            </div>
          )}
        </div>
      )}

      {/* Activity level indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        {activityLevel === "high" && (
          <div className="flex gap-1">
            <div className="w-1 h-2 rounded-full bg-primary animate-ping" />
            <div className="w-1 h-2 rounded-full bg-primary animate-ping" style={{ animationDelay: "0.2s" }} />
            <div className="w-1 h-2 rounded-full bg-primary animate-ping" style={{ animationDelay: "0.4s" }} />
          </div>
        )}
        {activityLevel === "moderate" && (
          <div className="flex gap-1">
            <div className="w-1 h-2 rounded-full bg-accent animate-pulse" />
            <div className="w-1 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
        {activityLevel === "low" && (
          <div className="w-1 h-2 rounded-full bg-muted animate-pulse" />
        )}
      </div>

      {/* Enhanced tooltip */}
      <div 
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 transition-all duration-300 z-20 ${
          showTooltip ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="glass-intense rounded-xl p-3 border border-white/20 shadow-2xl min-w-48">
          <div className="space-y-2">
            {/* Header */}
            <div className="flex items-center gap-2">
              <span className="text-lg">{style.emoji}</span>
              <div>
                <h4 className="text-sm font-semibold" style={{ color: style.color }}>
                  {style.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {style.specialistType}
                </p>
              </div>
            </div>

            {/* Strategy */}
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {style.strategy}
              </p>
            </div>

            {/* Current status */}
            <div className="border-t border-white/10 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Activity:</span>
                <span 
                  className="font-semibold capitalize"
                  style={{ color: style.color }}
                >
                  {activityLevel}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Population:</span>
                <span className="font-semibold" style={{ color: style.color }}>
                  {populationCount} {populationCount === 1 ? "cell" : "cells"}
                </span>
              </div>
            </div>

            {/* Food level context */}
            <div className="border-t border-white/10 pt-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {foodLevel === "low" && stationId === "no3" && 
                  "Dominant in low-food conditions - efficient first-step processing"
                }
                {foodLevel === "low" && stationId !== "no3" && 
                  "Dormant due to insufficient food resources"
                }
                {foodLevel === "medium" && (stationId === "no3" || stationId === "no2") && 
                  "Active in coexistence community - sharing the relay workload"
                }
                {foodLevel === "medium" && (stationId === "n2o" || stationId === "n2") && 
                  "Limited activity - not enough food for full pathway"
                }
                {foodLevel === "high" && 
                  "Highly active in abundant food conditions"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metabolic particles for highly active microbes */}
      {intensity > 0.8 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{
                backgroundColor: style.color,
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "1.5s"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};