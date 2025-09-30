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
      className="group relative h-56 w-full perspective-1000 focus-ring rounded-3xl"
      aria-expanded={isFlipped}
      aria-label={`${term} - ${isFlipped ? "showing definition" : "tap to learn"}`}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 backface-hidden hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <span className="font-display font-semibold text-xl tracking-tight">{term}</span>
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Tap to learn</div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backdrop-blur-2xl bg-white/[0.05] border border-primary/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 [transform:rotateY(180deg)] backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <p className="text-base leading-relaxed text-foreground/90">
            {definition}
          </p>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm text-primary mt-2">
            ✓
          </div>
        </div>
      </div>
    </button>
  );
};
