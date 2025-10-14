import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelayArrowProps {
  className?: string;
  isActive?: boolean;
  isDominant?: boolean;
}

export const RelayArrow = ({ className, isActive = false, isDominant = false }: RelayArrowProps) => {
  const getOpacity = () => {
    if (isDominant) return "opacity-100";
    if (isActive) return "opacity-70";
    return "opacity-30";
  };

  const getThickness = () => {
    if (isDominant) return "h-1.5";
    if (isActive) return "h-1";
    return "h-0.5";
  };

  return (
    <div className={cn("flex items-center justify-center flex-shrink-0 transition-all duration-300", className)}>
      <div className="relative flex items-center">
        <div className={cn(
          "bg-gradient-to-r from-teal-glow/70 to-omz-violet/70 rounded-full transition-all duration-300",
          getThickness(),
          getOpacity(),
          className
        )} />
        <ChevronRight className={cn(
          "w-5 h-5 text-teal-glow -ml-1 transition-all duration-300",
          getOpacity()
        )} strokeWidth={2} />
      </div>
    </div>
  );
};
