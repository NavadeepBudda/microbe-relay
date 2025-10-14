import { ChevronRight } from "lucide-react";

interface RelayArrowProps {
  className?: string;
}

export const RelayArrow = ({ className }: RelayArrowProps) => {
  return (
    <div className={`flex items-center justify-center ${className || ''}`}>
      <div className="relative flex items-center">
        <div className="h-0.5 w-12 md:w-20 bg-gradient-to-r from-teal-glow/60 to-omz-violet/60" />
        <ChevronRight className="w-6 h-6 text-teal-glow -ml-2" strokeWidth={3} />
      </div>
    </div>
  );
};
