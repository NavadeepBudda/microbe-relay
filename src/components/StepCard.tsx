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
        "w-full max-w-xs mx-auto mb-6",
        "glass-subtle rounded-2xl p-4 md:p-5 border border-white/20",
        "transition-all duration-300 hover:scale-105 hover:shadow-lg",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl md:text-3xl shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs md:text-sm font-semibold text-teal-glow mb-2">Step {step}</div>
          <div className="text-sm md:text-base font-bold text-white mb-2 leading-tight">{from} → {to}</div>
          <div className="text-xs md:text-sm text-white/70 leading-relaxed">{description}</div>
        </div>
      </div>
    </div>
  );
};
