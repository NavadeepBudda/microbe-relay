import { Languages, Volume2, Contrast, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrientationHeaderProps {
  onToggleContrast: () => void;
  isHighContrast: boolean;
}

export const OrientationHeader = ({ onToggleContrast, isHighContrast }: OrientationHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <Beaker className="w-5 h-5 text-primary" />
          <span className="font-display font-semibold text-base tracking-tight">
            Microbe Relay
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-muted-foreground hover:text-foreground hover:bg-transparent font-medium h-8 px-3"
            aria-label="For Teachers"
          >
            For Teachers
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent hover:text-foreground h-8 w-8"
            aria-label="Language"
          >
            <Languages className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent hover:text-foreground h-8 w-8"
            aria-label="Audio"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleContrast}
            className="hover:bg-transparent hover:text-foreground h-8 w-8"
            aria-label="Toggle High Contrast"
          >
            <Contrast className="w-4 h-4" />
          </Button>

          {/* Progress Dots */}
          <div className="flex items-center gap-1.5 ml-3 pl-3 border-l border-border/10">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" aria-label="Orientation - Current" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted" aria-label="Lab" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted" aria-label="Summary" />
          </div>
        </div>
      </div>
    </header>
  );
};
