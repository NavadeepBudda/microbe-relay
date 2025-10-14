import { cn } from "@/lib/utils";

type ActivityLevel = "inactive" | "coexisting" | "dominant";

interface StepCardProps {
  step: number;
  from: string;
  to: string;
  description: string;
  icon?: string;
  className?: string;
  activityLevel?: ActivityLevel;
}

export const StepCard = ({ 
  step, 
  from, 
  to, 
  description, 
  icon = "🦠", 
  className,
  activityLevel = "inactive"
}: StepCardProps) => {
  const getActivityStyles = () => {
    switch (activityLevel) {
      case "dominant":
        return {
          border: "border-white/60",
          background: "bg-white/20",
          opacity: "opacity-100",
          scale: "scale-105",
          glow: "shadow-[0_0_30px_rgba(255,255,255,0.2)]",
          pulse: "animate-pulse"
        };
      case "coexisting":
        return {
          border: "border-white/40",
          background: "bg-white/15",
          opacity: "opacity-90",
          scale: "scale-102",
          glow: "shadow-[0_0_20px_rgba(255,255,255,0.1)]",
          pulse: ""
        };
      case "inactive":
      default:
        return {
          border: "border-white/20",
          background: "bg-white/5",
          opacity: "opacity-50",
          scale: "scale-100",
          glow: "",
          pulse: ""
        };
    }
  };

  const styles = getActivityStyles();
  const stepColor = activityLevel === "dominant" ? "text-teal-200" : 
                   activityLevel === "coexisting" ? "text-teal-300/80" : "text-teal-500/60";

  return (
    <div 
      className={cn(
        "w-full max-w-xs mx-auto mb-6 rounded-2xl p-4 md:p-5",
        "glass-subtle transition-all duration-300",
        styles.border,
        styles.background,
        styles.opacity,
        styles.scale,
        styles.glow,
        styles.pulse,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl md:text-3xl shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className={cn("text-xs md:text-sm font-semibold mb-2", stepColor)}>Step {step}</div>
          <div className={cn(
            "text-sm md:text-base font-bold mb-2 leading-tight transition-colors duration-300",
            activityLevel === "dominant" ? "text-white" : 
            activityLevel === "coexisting" ? "text-white/90" : "text-white/60"
          )}>
            {from} → {to}
          </div>
          <div className={cn(
            "text-xs md:text-sm leading-relaxed transition-colors duration-300",
            activityLevel === "dominant" ? "text-white/80" : 
            activityLevel === "coexisting" ? "text-white/70" : "text-white/50"
          )}>
            {description}
          </div>
        </div>
      </div>
      
      {/* Activity indicator */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full transition-colors duration-300",
            activityLevel === "dominant" ? "bg-teal-200 animate-pulse" :
            activityLevel === "coexisting" ? "bg-teal-400/70" : "bg-white/30"
          )} />
          <span className={cn(
            "text-xs font-medium uppercase tracking-wider transition-colors duration-300",
            activityLevel === "dominant" ? "text-teal-200" :
            activityLevel === "coexisting" ? "text-teal-300/80" : "text-white/40"
          )}>
            {activityLevel === "dominant" ? "Dominant" :
             activityLevel === "coexisting" ? "Active" : "Dormant"}
          </span>
        </div>
      </div>
    </div>
  );
};
