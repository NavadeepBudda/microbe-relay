import { useState } from "react";
import { Atom, Box, Wind } from "lucide-react";

interface GlossaryChipProps {
  term: string;
  definition: string;
  icon: "denit" | "modular" | "n2o";
  onFlip: () => void;
}

const iconMap = {
  denit: Atom,
  modular: Box,
  n2o: Wind,
};

export const GlossaryChip = ({ term, definition, icon, onFlip }: GlossaryChipProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = iconMap[icon];

  const handleClick = () => {
    if (!isFlipped) {
      onFlip();
    }
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group relative h-24 w-full perspective-1000 focus-ring rounded-2xl"
      aria-expanded={isFlipped}
      aria-label={`${term} - ${isFlipped ? "showing definition" : "tap to learn"}`}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-300 preserve-3d ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass elevation-4 rounded-2xl p-6 flex items-center gap-4 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display font-semibold text-lg text-left">{term}</span>
          {isFlipped && (
            <div className="ml-auto text-primary text-xs">✓</div>
          )}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass-intense elevation-4 rounded-2xl p-6 flex items-center [transform:rotateY(180deg)] backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="text-sm leading-relaxed text-foreground/90">
            {definition}
          </p>
        </div>
      </div>
    </button>
  );
};
