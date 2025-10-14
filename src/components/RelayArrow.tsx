import { ChevronRight } from "lucide-react";

interface RelayArrowProps {
  className?: string;
}

export const RelayArrow = ({ className }: RelayArrowProps) => {
  return (
    <div className={`flex items-center justify-center flex-shrink-0 ${className || ''}`}>
      <div className="relative flex items-center">
        <div className="h-0.5 w-6 md:w-16 lg:w-20 bg-gradient-to-r from-teal-glow/60 to-omz-violet/60" />
        <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-teal-glow -ml-1 md:-ml-2" strokeWidth={3} />
      </div>
    </div>
  );
};
