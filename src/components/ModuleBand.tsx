import { cn } from "@/lib/utils";

interface ModuleBandProps {
  steps: number; // number of steps this band spans
  startStep: number; // which step it starts at (1-based)
  title: string;
  subtitle: string;
  isActive?: boolean;
  isDominant?: boolean;
  className?: string;
}

export const ModuleBand = ({ 
  steps, 
  startStep, 
  title, 
  subtitle, 
  isActive = false, 
  isDominant = false,
  className 
}: ModuleBandProps) => {
  const getActivityStyles = () => {
    if (isDominant) {
      return "border-white/60 bg-white/20 opacity-100 animate-pulse";
    }
    if (isActive) {
      return "border-white/40 bg-white/15 opacity-90";
    }
    return "border-white/15 bg-white/8 opacity-40";
  };

  const getBandWidth = () => {
    // Calculate width based on number of steps
    // Each step takes roughly 240px + 80px gap, with some adjustments
    const stepWidth = 220;
    const gapWidth = 80;
    return `${steps * stepWidth + (steps - 1) * gapWidth}px`;
  };

  const getLeftOffset = () => {
    // Calculate left position based on start step
    const stepWidth = 220;
    const gapWidth = 80;
    return `${(startStep - 1) * (stepWidth + gapWidth)}px`;
  };

  return (
    <div 
      className={cn(
        "absolute top-0 h-full rounded-[1.5rem] border backdrop-blur-xl transition-all duration-700",
        "pointer-events-none select-none",
        "flex items-center justify-center",
        getActivityStyles(),
        className
      )}
      style={{
        width: getBandWidth(),
        left: getLeftOffset(),
      }}
    >
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <div className="bg-black/30 rounded-lg px-3 py-2 border border-white/20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
            {title}
          </p>
          <p className="text-[10px] text-white/70 mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Visual effects */}
      {isDominant && (
        <>
          <div className="absolute inset-0 rounded-[1.5rem] border-2 border-white/30 animate-ping" />
          <div className="absolute inset-1 rounded-[1.25rem] bg-gradient-to-r from-white/10 via-white/5 to-white/10 animate-pulse" />
        </>
      )}
      
      {isActive && !isDominant && (
        <div className="absolute inset-1 rounded-[1.25rem] bg-gradient-to-r from-white/5 via-white/3 to-white/5" />
      )}
    </div>
  );
};