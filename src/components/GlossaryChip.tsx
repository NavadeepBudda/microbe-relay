import { useState, useEffect } from "react";
import { Atom, Box, Wind, Sparkles } from "lucide-react";

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

const colorMap = {
  denit: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
  modular: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
  n2o: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
};

export const GlossaryChip = ({ term, definition, icon, onFlip }: GlossaryChipProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const Icon = iconMap[icon];

  const handleClick = () => {
    if (!isFlipped) {
      onFlip();
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    }
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => {
        setShowSparkles(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFlipped]);

  return (
    <div className="relative group">
      {/* Floating sparkles */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <Sparkles
              key={i}
              className={`absolute w-4 h-4 text-primary animate-ping`}
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      )}

      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-64 w-full perspective-1000 focus-ring rounded-3xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        aria-expanded={isFlipped}
        aria-label={`${term} - ${isFlipped ? "showing definition" : "tap to learn"}`}
        style={{ perspective: "1000px" }}
      >
        <div
          className={`relative w-full h-full transition-all duration-400 preserve-3d ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 glass-subtle rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 backface-hidden transition-all duration-300 ${
              isHovered && !isFlipped ? "glass-intense scale-105" : ""
            } ${isFlipped ? "opacity-0" : "opacity-100"}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Icon container with enhanced gradient */}
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[icon]} flex items-center justify-center transition-all duration-500 ${
              isHovered ? "scale-110 rotate-12" : ""
            }`}>
              <Icon className="w-8 h-8 text-primary" />
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Term with enhanced typography */}
            <div className="space-y-2">
              <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {term}
              </span>
              
              {/* Animated indicator */}
              <div className="flex items-center justify-center gap-2">
                <div className={`h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500 ${
                  isHovered ? "w-16" : "w-8"
                }`} />
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                  Tap to learn
                </div>
                <div className={`h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-500 ${
                  isHovered ? "w-16" : "w-8"
                }`} />
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                    animationDelay: `${i * 2}s`,
                    animationDuration: `${4 + i}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Back */}
          <div
            className={`absolute inset-0 glass-intense border-2 ${colorMap[icon]} rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 [transform:rotateY(180deg)] backface-hidden ${
              isFlipped ? "opacity-100" : "opacity-0"
            }`}
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Definition with better typography */}
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-foreground font-medium">
                {definition}
              </p>
              
              {/* Success indicator */}
              <div className="flex items-center justify-center gap-3 animate-scale-in">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-background font-bold shadow-lg shadow-primary/25">
                  ✓
                </div>
                <span className="text-sm text-primary font-semibold">Concept learned</span>
              </div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" 
                 style={{ backgroundSize: "200% 100%" }} />
          </div>
        </div>
      </button>
    </div>
  );
};
