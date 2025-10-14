import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  from: string;
  to: string;
  description: string;
  icon?: string;
  className?: string;
}

export const StepCard = ({ step, from, to, description, icon = "🦠", className }: StepCardProps) => {
  return (
    <div 
      className={cn(
        "absolute -top-32 left-1/2 -translate-x-1/2 w-48",
        "glass-subtle rounded-2xl p-4 border border-white/20",
        "transition-all duration-300 hover:scale-105 hover:shadow-lg",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-teal-glow mb-1">Step {step}</div>
          <div className="text-sm font-bold text-white mb-1">{from} → {to}</div>
          <div className="text-xs text-white/70 leading-tight">{description}</div>
        </div>
      </div>
    </div>
  );
};
