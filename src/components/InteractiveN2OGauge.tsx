import { AlertTriangle, Activity, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface InteractiveN2OGaugeProps {
  value: number; // 0-100
  className?: string;
  isAnimating?: boolean;
}

export const InteractiveN2OGauge = ({ value, className, isAnimating = false }: InteractiveN2OGaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);

  // Smooth animation for value changes
  useEffect(() => {
    if (value !== previousValue) {
      const startValue = animatedValue;
      const endValue = value;
      const startTime = Date.now();
      const duration = 800; // 800ms animation

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth transition
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        
        const currentValue = startValue + (endValue - startValue) * easedProgress;
        setAnimatedValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setPreviousValue(value);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [value, animatedValue, previousValue]);

  const pointerRotation = -120 + (animatedValue / 100) * 240;
  const gaugePercent = Math.round(animatedValue);
  
  const getRiskLevel = () => {
    if (animatedValue < 30) return { level: "Low", color: "text-teal-200", bgColor: "from-teal-glow/20" };
    if (animatedValue < 70) return { level: "Medium", color: "text-amber-200", bgColor: "from-amber-400/20" };
    return { level: "High", color: "text-coral-200", bgColor: "from-coral-cta/20" };
  };

  const riskInfo = getRiskLevel();
  const isWiggling = isAnimating || Math.abs(value - previousValue) > 5;

  return (
    <div className={`relative h-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-[rgba(12,24,44,0.82)] p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl ${className || ""}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${riskInfo.bgColor} via-transparent to-amber-400/12 transition-all duration-1000`} aria-hidden />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white">
            <AlertTriangle className={`h-5 w-5 ${riskInfo.color} ${isWiggling ? "animate-pulse" : ""}`} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">N₂O Real-time</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Greenhouse Gas Monitor</h3>
          </div>
        </div>

        <p className="mt-4 text-sm text-white/75">
          Watch nitrous oxide levels respond to food changes. 
          {isWiggling && (
            <span className="ml-1 font-medium text-coral-200 animate-pulse">
              ⚡ Live update
            </span>
          )}
        </p>

        <div className="mt-6 flex flex-1 items-center justify-center">
          <div className={`relative h-44 w-44 ${isWiggling ? "animate-pulse" : ""}`}>
            {/* Main gauge background */}
            <div className="absolute inset-0 rounded-full border border-white/10 bg-[conic-gradient(from_220deg,_rgba(26,220,178,0.35)_0deg,_rgba(121,80,255,0.45)_140deg,_rgba(245,97,69,0.65)_240deg,_rgba(245,97,69,0.05)_300deg,_rgba(26,220,178,0.1)_360deg)]" />
            
            {/* Inner gauge */}
            <div className="absolute inset-5 rounded-full border border-white/10 bg-[rgba(8,18,32,0.92)] shadow-inner" />
            
            {/* Value display */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">N₂O</p>
                <p className={`mt-1 text-4xl font-semibold transition-all duration-500 ${riskInfo.color}`}>
                  {gaugePercent}%
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/60">
                  {riskInfo.level} Risk
                </p>
              </div>
            </div>
            
            {/* Animated needle */}
            <div
              className={`absolute left-1/2 top-1/2 h-20 w-[2px] origin-bottom rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-transform duration-700 ease-out ${isWiggling ? "animate-pulse" : ""}`}
              style={{ transform: `translate(-50%, -100%) rotate(${pointerRotation}deg)` }}
            />
            
            {/* Center dot */}
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow" />
            
            {/* Wiggle effect indicators */}
            {isWiggling && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-coral-cta/50 animate-ping" />
                <div className="absolute inset-2 rounded-full border border-coral-cta/30 animate-pulse" />
              </>
            )}
          </div>
        </div>

        {/* Real-time feedback */}
        <div className="mt-4 rounded-[1.25rem] border border-white/12 bg-white/5 p-4 text-xs text-white/70">
          <div className="flex items-center gap-2 font-semibold text-white/80">
            <Activity className={`h-4 w-4 ${riskInfo.color} ${isWiggling ? "animate-bounce" : ""}`} />
            Live Connection
          </div>
          <p className="mt-2">
            N₂O rises as the relay expands, then drops when completing teams engage. 
            {gaugePercent > 70 && (
              <span className="ml-1 font-medium text-coral-200">
                ⚠️ High greenhouse gas risk!
              </span>
            )}
          </p>
        </div>

        {/* Trend indicator */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs">
          <TrendingUp className={`h-4 w-4 ${animatedValue > previousValue ? "text-coral-cta animate-bounce" : animatedValue < previousValue ? "text-teal-200 rotate-180" : "text-white/40"} transition-all duration-500`} />
          <span className="text-white/60">
            {animatedValue > previousValue ? "Rising" : animatedValue < previousValue ? "Falling" : "Stable"}
          </span>
        </div>
      </div>
    </div>
  );
};