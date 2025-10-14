import { cn } from "@/lib/utils";

interface RelayNodeProps {
  label: string;
  subscript?: string;
  className?: string;
  glowColor?: string;
}

export const RelayNode = ({ label, subscript, className, glowColor = "var(--teal-glow)" }: RelayNodeProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div 
        className={cn(
          "relative w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center",
          "glass-subtle border-2 border-white/30 backdrop-blur-xl",
          "transition-all duration-500 hover:scale-110 hover:border-white/50",
          "cursor-pointer select-none",
          className
        )}
        style={{
          boxShadow: `0 0 50px ${glowColor}40, inset 0 0 25px ${glowColor}30, 0 8px 32px rgba(0,0,0,0.3)`
        }}
      >
        <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white flex items-baseline drop-shadow-lg">
          {label}
          {subscript && <span className="text-xs md:text-sm lg:text-base ml-1 -mb-1">{subscript}</span>}
        </div>
      </div>
    </div>
  );
};
