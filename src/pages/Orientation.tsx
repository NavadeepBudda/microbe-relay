import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OrientationHeader } from "@/components/OrientationHeader";
import { GlossaryChip } from "@/components/GlossaryChip";
import { PretestDrawer } from "@/components/PretestDrawer";
import { ChevronRight, Droplets, TestTube, Gauge } from "lucide-react";
import oceanHero from "@/assets/ocean-hero.jpg";

const Orientation = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [flippedChips, setFlippedChips] = useState<Set<string>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPretestComplete, setIsPretestComplete] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChipFlip = (term: string) => {
    setFlippedChips((prev) => new Set([...prev, term]));
  };

  const allChipsRead = flippedChips.size === 3;
  const canEnterLab = allChipsRead && isPretestComplete;

  const handlePulse = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 1200);
  };

  return (
    <div className={isHighContrast ? "high-contrast" : ""}>
      <OrientationHeader
        onToggleContrast={() => setIsHighContrast(!isHighContrast)}
        isHighContrast={isHighContrast}
      />

      {/* Hero Ocean */}
      <section className="relative min-h-screen overflow-hidden pt-14">
        {/* Ocean Background with Parallax */}
        <div className="absolute inset-0 animate-fade-in">
          <img
            src={oceanHero}
            alt="Deep ocean cross-section"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
              transition: "transform 0.3s ease-out",
            }}
          />
          
          {/* OMZ Glow Layer */}
          <div
            className="absolute inset-0 opacity-60 animate-breathe"
            style={{
              background: `linear-gradient(to bottom, 
                transparent 30%, 
                hsl(var(--omz-violet) / 0.4) 45%, 
                hsl(var(--omz-violet) / 0.6) 50%, 
                hsl(var(--omz-violet) / 0.4) 55%, 
                transparent 70%)`,
              transform: `translateY(${mousePos.y * 0.6}px)`,
            }}
          />

          {/* Pulse Plume */}
          {isPulsing && (
            <div
              className="absolute top-1/2 left-0 right-0 h-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-pulse-plume"
              style={{ filter: "blur(40px)" }}
            />
          )}

          {/* Floating Plankton Bokeh */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${6 + Math.random() * 6}s`,
                  opacity: 0.3 + Math.random() * 0.4,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          {/* Hero Content - Apple-style centered */}
          <div className="flex flex-col items-center justify-center min-h-[85vh] text-center">
            <div
              className="max-w-4xl animate-fade-in"
              style={{
                transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
                transition: "transform 0.5s ease-out",
                animationDelay: "200ms",
              }}
            >
              <h1 className="font-display font-bold text-6xl sm:text-7xl lg:text-8xl mb-6 tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                Orientation Bay
              </h1>
              <p className="text-xl sm:text-2xl text-foreground/70 mb-12 font-normal leading-relaxed max-w-2xl mx-auto">
                Make your best guesses before we dive into the deep.
              </p>

              {/* Status Indicators */}
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mb-16">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${allChipsRead ? 'bg-primary' : 'bg-muted'}`} />
                  <span className={allChipsRead ? 'text-foreground' : ''}>Learn concepts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${isPretestComplete ? 'bg-primary' : 'bg-muted'}`} />
                  <span className={isPretestComplete ? 'text-foreground' : ''}>Make predictions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Glossary Section - Further down */}
          <div className="max-w-6xl mx-auto pb-32">
            <div className="text-center mb-12">
              <h2 className="font-display font-semibold text-3xl sm:text-4xl mb-3 tracking-tight">
                Three core concepts
              </h2>
              <p className="text-muted-foreground text-lg">Tap each card to learn. Takes 30 seconds.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-20">
              <GlossaryChip
                term="Denitrification"
                definition="Breathing with nitrogen when oxygen is scarce."
                icon="denit"
                onFlip={() => handleChipFlip("denit")}
              />
              <GlossaryChip
                term="Modular"
                definition="Most microbes do only one or two steps of the relay."
                icon="modular"
                onFlip={() => handleChipFlip("modular")}
              />
              <GlossaryChip
                term="N₂O"
                definition="Nitrous oxide: a greenhouse gas sometimes made in the relay."
                icon="n2o"
                onFlip={() => handleChipFlip("n2o")}
              />
            </div>

            {/* Pre-test CTA - Apple style */}
            {allChipsRead && (
              <div className="flex flex-col items-center gap-4 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Ready for predictions
                </div>
                <Button
                  onClick={() => setIsDrawerOpen(true)}
                  disabled={isPretestComplete}
                  className="h-14 px-10 text-base font-semibold rounded-full bg-gradient-to-b from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isPretestComplete ? (
                    <span className="flex items-center gap-2">
                      Predictions complete
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                        ✓
                      </div>
                    </span>
                  ) : (
                    <span>Make your predictions</span>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground">Required to continue to the lab</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 backdrop-blur-2xl bg-background/90 border-t border-border/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground font-medium">
              {!allChipsRead && "Explore the three concepts above to continue"}
              {allChipsRead && !isPretestComplete && "Complete your predictions to unlock the lab"}
              {canEnterLab && "All set. Ready to dive into the lab."}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hover:bg-transparent text-sm font-medium h-9"
              >
                Skip
              </Button>
              
              <Button
                disabled={!canEnterLab}
                className="h-11 px-7 font-semibold text-base rounded-full bg-gradient-to-b from-coral-cta to-coral-cta/90 hover:from-coral-cta/90 hover:to-coral-cta/80 text-white shadow-lg shadow-coral-cta/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Enter the Lab
                <ChevronRight className="ml-1.5 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-test Drawer */}
      <PretestDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onComplete={() => setIsPretestComplete(true)}
        onPulse={handlePulse}
      />
    </div>
  );
};

export default Orientation;
