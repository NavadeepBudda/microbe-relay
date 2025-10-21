import { CloudDrizzle } from "lucide-react";
import { useEffect, useState } from "react";

interface InteractiveN2OGaugeProps {
  value: number; // 0-100
  className?: string;
  foodLevel: number; // 0-100 to determine messaging
}

export const InteractiveN2OGauge = ({ value, className, foodLevel }: InteractiveN2OGaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(value);

  // Smooth animation for value changes
  useEffect(() => {
    const startValue = animatedValue;
    const endValue = value;
    const startTime = Date.now();
    const duration = 600; // Shorter, smoother animation

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);
      
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  // Determine food level category and corresponding colors/messages
  const getFoodLevelInfo = () => {
    if (foodLevel <= 35) {
      return {
        category: "low",
        color: "text-teal-200",
        bgColor: "from-teal-glow/15",
        borderColor: "border-teal-glow/20",
        message: "Little N₂O—short-step specialists dominate",
        explanation: "Not enough downstream activity to generate much N₂O"
      };
    } else if (foodLevel <= 70) {
      return {
        category: "medium", 
        color: "text-omz-violet",
        bgColor: "from-omz-violet/15",
        borderColor: "border-omz-violet/20",
        message: "N₂O peaks—multiple specialists create handoff bottlenecks",
        explanation: "The classic N₂O 'hot zone' where relay expansion occurs"
      };
    } else {
      return {
        category: "high",
        color: "text-coral-200", 
        bgColor: "from-coral-cta/15",
        borderColor: "border-coral-cta/20",
        message: "N₂O falls—complete pathways convert N₂O to harmless N₂",
        explanation: "Multi-step specialists push the relay to completion"
      };
    }
  };

  const levelInfo = getFoodLevelInfo();
  const gaugePercent = Math.round(animatedValue);

  return (
    <div className={`relative h-full overflow-hidden rounded-[1.75rem] border ${levelInfo.borderColor} bg-[rgba(8,20,36,0.85)] p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl ${className || ""}`}>
      {/* Subtle background gradient based on food level */}
      <div className={`absolute inset-0 bg-gradient-to-br ${levelInfo.bgColor} via-transparent to-transparent transition-all duration-1000`} aria-hidden />
      
      <div className="relative z-10 flex h-full flex-col">
        {/* Clean Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <CloudDrizzle className={`h-5 w-5 ${levelInfo.color}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">N₂O Greenhouse Gas</h3>
            <p className="text-xs text-white/60 uppercase tracking-[0.3em]">Real-time Monitor</p>
          </div>
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
                  stroke={levelInfo.category === "low" ? "rgba(20,184,166,0.6)" : 
                          levelInfo.category === "medium" ? "rgba(139,92,246,0.6)" : 
                          "rgba(245,97,69,0.6)"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(animatedValue / 100) * 251.32} 251.32`}
                  className="transition-all duration-600"
                />
              </svg>
            </div>

            {/* Center Value Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-bold ${levelInfo.color} transition-colors duration-500`}>
                  {gaugePercent}%
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
                  N₂O Level
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Message */}
        <div className="mt-6 text-center">
          <p className={`text-sm font-medium ${levelInfo.color} mb-2`}>
            {levelInfo.message}
          </p>
          <p className="text-xs text-white/60 leading-relaxed">
            {levelInfo.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};