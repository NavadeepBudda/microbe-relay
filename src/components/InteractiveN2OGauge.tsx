import { CloudDrizzle } from "lucide-react";
import { useEffect, useState } from "react";

interface InteractiveN2OGaugeProps {
  value: number; // 0-100
  className?: string;
  foodLevel: number; // 0-100 to determine messaging
}

export const InteractiveN2OGauge = ({ value, className, foodLevel }: InteractiveN2OGaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(value);

  // Instant responsive updates
  useEffect(() => {
    setAnimatedValue(value);
  }, [value]);

  // Determine N2O level category based on food level pattern
  const getN2OLevelInfo = () => {
    if (foodLevel <= 35) {
      // Low food = Low N2O
      return {
        category: "low",
        color: "text-blue-300",
        bgColor: "from-blue-500/15",
        borderColor: "border-blue-500/20",
        message: "",
        explanation: "Low N₂O. The relay barely gets started, so little N₂O is made in the first place."
      };
    } else if (foodLevel <= 55) {
      // Medium food = High N2O
      return {
        category: "high",
        color: "text-red-300",
        bgColor: "from-red-500/15",
        borderColor: "border-red-500/20",
        message: "",
        explanation: "High N₂O. It's being made faster than it's being consumed. This is the danger zone."
      };
    } else if (foodLevel <= 85) {
      // High food = Medium N2O
      return {
        category: "medium",
        color: "text-amber-300",
        bgColor: "from-amber-500/15",
        borderColor: "border-amber-500/20",
        message: "",
        explanation: "Medium N₂O. Multi-step microbes can finish the job and convert most of it to safe nitrogen."
      };
    } else {
      // Very high food = Low N2O
      return {
        category: "low",
        color: "text-blue-300",
        bgColor: "from-blue-500/15",
        borderColor: "border-blue-500/20",
        message: "",
        explanation: "Low N₂O. Complete pathways convert N₂O to harmless N₂."
      };
    }
  };

  const levelInfo = getN2OLevelInfo();
  const gaugePercent = Math.round(animatedValue);

  // Convert food level to N2O level descriptor following the pattern
  const getLevelLabel = (): string => {
    if (foodLevel <= 35) return "Low";        // Low food = Low N2O
    if (foodLevel <= 55) return "High";       // Medium food = High N2O  
    if (foodLevel <= 85) return "Medium";     // High food = Medium N2O
    return "Low";                             // Very high food = Low N2O
  };

  return (
    <div className={`relative h-full overflow-hidden rounded-[1.75rem] border ${levelInfo.borderColor} bg-[rgba(8,20,36,0.85)] p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col justify-center ${className || ""}`}>
      {/* Subtle background gradient based on N2O level */}
      <div className={`absolute inset-0 bg-gradient-to-br ${levelInfo.bgColor} via-transparent to-transparent transition-all duration-300`} aria-hidden />

      <div className="relative z-10 flex flex-col gap-6 w-full">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">N₂O Greenhouse Gas</h3>
          <p className="mt-2 text-sm text-white/70">
            Monitor emissions as you adjust food.
          </p>
        </div>

        {/* Clean Gauge Design */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-48 h-48">
            {/* Semicircle Gauge */}
            <div className="absolute inset-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background Semicircle */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Progress Semicircle based on food level */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke={levelInfo.category === "low" ? "rgba(59,130,246,0.7)" :
                    levelInfo.category === "medium" ? "rgba(245,158,11,0.7)" :
                      "rgba(239,68,68,0.7)"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(animatedValue / 100) * 251.32} 251.32`}
                  className="transition-all duration-300"
                />
              </svg>
            </div>

            {/* Center Value Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-bold ${levelInfo.color} transition-colors duration-300`}>
                  {getLevelLabel()}
                </div>
                <div className="text-[10px] text-white/50 uppercase tracking-wider mt-0.5">
                  N₂O Level
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Message */}
        <div className="mt-6 text-center">
          <p className={`text-sm font-medium leading-relaxed ${levelInfo.color}`}>
            {levelInfo.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};