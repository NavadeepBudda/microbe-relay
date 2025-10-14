import { cn } from "@/lib/utils";

interface RelayNodeProps {
  label: string;
  subscript?: string;
  className?: string;
  glowColor?: string;
  isActive?: boolean;
  isDominant?: boolean;
}

export const RelayNode = ({ 
  label, 
  subscript, 
  className, 
  glowColor = "hsl(var(--teal-glow))",
  isActive = false,
  isDominant = false 
}: RelayNodeProps) => {
  const getOpacity = () => {
    if (isDominant) return "opacity-100";
    if (isActive) return "opacity-80";
    return "opacity-40";
  };

  const getBorderStyle = () => {
    if (isDominant) return "border-white/80 border-3";
    if (isActive) return "border-white/60 border-2";
    return "border-white/30 border-2";
  };

  const getGlowIntensity = () => {
    if (isDominant) return "50";
    if (isActive) return "30";
    return "15";
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "relative rounded-full flex items-center justify-center",
          "bg-white/10 backdrop-blur-xl transition-all duration-300 ease-out",
          getOpacity(),
          getBorderStyle(),
          className
        )}
        style={{
          boxShadow: `0 0 ${getGlowIntensity()}px ${glowColor}, inset 0 0 15px rgba(255,255,255,0.1)`
        }}
      >
        <div className="text-lg md:text-xl lg:text-2xl font-bold text-white flex items-baseline">
          {label}
          {subscript && <span className="text-sm md:text-base ml-1 -mb-1">{subscript}</span>}
        </div>
        
        {/* Simple glow for dominant state - no pulsing */}
        {isDominant && (
          <div 
            className="absolute inset-0 rounded-full border border-white/20"
            style={{
              boxShadow: `0 0 20px ${glowColor}`
            }}
          />
        )}
      </div>
    </div>
  );
};
