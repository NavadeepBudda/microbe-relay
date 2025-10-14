import { cn } from "@/lib/utils";

interface RelayNodeProps {
  label: string;
  subscript?: string;
  className?: string;
  glowColor?: string;
}

export const RelayNode = ({ label, subscript, className, glowColor = "var(--teal-glow)" }: RelayNodeProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={cn(
          "relative w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center",
          "glass-subtle border border-white/20 backdrop-blur-xl",
          "transition-all duration-300 hover:scale-110",
          className
        )}
        style={{
          boxShadow: `0 0 40px ${glowColor}33, inset 0 0 20px ${glowColor}22`
        }}
      >
        <div className="text-base md:text-xl font-semibold text-white flex items-baseline">
          {label}
          {subscript && <span className="text-[10px] md:text-xs ml-0.5 -mb-1">{subscript}</span>}
        </div>
      </div>
    </div>
  );
};
