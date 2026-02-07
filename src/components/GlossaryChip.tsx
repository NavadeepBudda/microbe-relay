import { useState } from "react";
import { Route, Utensils, CloudFog } from "lucide-react";

interface GlossaryChipProps {
  term: string;
  definition: string;
  icon: "denit" | "modular" | "n2o";
  onFlip: () => void;
  diagram?: React.ReactNode;
}

const iconMap = {
  denit: Route,
  modular: Utensils,
  n2o: CloudFog,
};

const colorMap = {
  denit: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
  modular: "from-emerald-500/20 to-lime-500/20 border-emerald-500/30",
  n2o: "from-rose-500/20 to-orange-500/20 border-rose-500/30",
};

export const GlossaryChip = ({ term, definition, icon, onFlip, diagram }: GlossaryChipProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
    <div className="relative group">
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-[24rem] w-full perspective-1000 focus-ring rounded-3xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        aria-expanded={isFlipped}
        aria-label={`${term} - ${isFlipped ? "showing definition" : "tap to learn"}`}
        style={{ perspective: "1000px" }}
      >
        <div
          className={`relative w-full h-full transition-all duration-400 preserve-3d ${isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 glass-subtle rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-6 backface-hidden transition-all duration-300 ${isHovered && !isFlipped ? "glass-intense scale-105" : ""
              } ${isFlipped ? "opacity-0" : "opacity-100"}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Icon container */}
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[icon]} flex items-center justify-center transition-all duration-500 ${isHovered ? "scale-110" : ""
              }`}>
              <Icon className="w-8 h-8 text-primary" />
            </div>

            {/* Term */}
            <div className="space-y-2">
              <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {term}
              </span>

              {/* Simple indicator */}
              <div className="flex items-center justify-center gap-2">
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                  Tap to learn
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 glass-intense border-2 ${colorMap[icon]} rounded-3xl px-5 py-4 flex flex-col items-center justify-center text-center gap-3 [transform:rotateY(180deg)] backface-hidden ${isFlipped ? "opacity-100" : "opacity-0"
              }`}
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Diagram */}
            {diagram && (
              <div className="w-full flex-shrink-0">
                {diagram}
              </div>
            )}

            {/* Definition */}
            <p className="text-sm leading-relaxed text-foreground font-medium">
              {definition}
            </p>

            {/* Success indicator */}
            <div className="flex items-center justify-center gap-2 animate-scale-in flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-background font-bold shadow-lg shadow-primary/25">
                ✓
              </div>
              <span className="text-sm text-primary font-semibold">Concept learned</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
