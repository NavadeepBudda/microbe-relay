import { Languages, Volume2, Contrast, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrientationHeaderProps {
  onToggleContrast: () => void;
  isHighContrast: boolean;
}

export const OrientationHeader = ({ onToggleContrast, isHighContrast }: OrientationHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Beaker className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-lg tracking-tight">
            Microbe Relay
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm hover:bg-white/10"
            aria-label="For Teachers"
          >
            For Teachers
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10"
            aria-label="Language"
          >
            <Languages className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10"
            aria-label="Audio"
          >
            <Volume2 className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleContrast}
            className="hover:bg-white/10"
            aria-label="Toggle High Contrast"
          >
            <Contrast className="w-5 h-5" />
          </Button>

          {/* Progress Dots */}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/50">
            <div className="w-2 h-2 rounded-full bg-primary" aria-label="Orientation - Current" />
            <div className="w-2 h-2 rounded-full bg-muted" aria-label="Lab" />
            <div className="w-2 h-2 rounded-full bg-muted" aria-label="Summary" />
          </div>
        </div>
      </div>
    </header>
  );
};
