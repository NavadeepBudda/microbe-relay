import { ChevronRight } from "lucide-react";

interface RelayArrowProps {
  className?: string;
}

export const RelayArrow = ({ className }: RelayArrowProps) => {
  return (
    <div className={`flex items-center justify-center flex-shrink-0 ${className || ''}`}>
      <div className="relative flex items-center">
        <div className="h-1 w-8 md:w-20 lg:w-24 bg-gradient-to-r from-teal-glow/70 to-omz-violet/70 rounded-full" />
        <ChevronRight className="w-5 h-5 md:w-7 md:h-7 text-teal-glow -ml-2 md:-ml-3 drop-shadow-lg" strokeWidth={3} />
      </div>
    </div>
  );
};
