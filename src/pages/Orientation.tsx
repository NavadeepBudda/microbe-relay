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
      <section className="relative min-h-screen overflow-hidden pt-16">
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
        <div className="relative z-10 container mx-auto px-4 py-24">
          {/* Hero Card */}
          <div
            className="glass-intense elevation-16 rounded-3xl p-12 max-w-2xl mb-16 animate-fade-in"
            style={{
              transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
              transition: "transform 0.5s ease-out",
              animationDelay: "200ms",
            }}
          >
            <h1 className="font-display font-bold text-5xl mb-4">
              Orientation Bay
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Make your best guesses before we dive.
            </p>

            {/* Micro Hint Row */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                <span>Food knob</span>
              </div>
              <div className="flex items-center gap-2">
                <TestTube className="w-4 h-4" />
                <span>Oxygen knob</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                <span>Relay pipeline</span>
              </div>
            </div>
          </div>

          {/* Glossary Section */}
          <div className="max-w-4xl mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-2xl">
                Learn in 30 seconds
              </h2>
              {allChipsRead && (
                <div className="text-primary text-sm font-semibold flex items-center gap-2 animate-fade-in">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  Section 1 complete
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
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
          </div>

          {/* Pre-test CTA */}
          {allChipsRead && (
            <div className="max-w-4xl animate-fade-in">
              <Button
                onClick={() => setIsDrawerOpen(true)}
                className="glass-intense elevation-8 h-16 px-8 text-lg font-display font-semibold hover:bg-white/15 relative overflow-hidden group"
                disabled={isPretestComplete}
              >
                {isPretestComplete ? (
                  <>
                    <span>Predictions complete</span>
                    <div className="ml-2 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                      ✓
                    </div>
                  </>
                ) : (
                  <>
                    <span>Open pre-test</span>
                    <div className="ml-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 glass border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {!allChipsRead && "Read all glossary chips to continue"}
              {allChipsRead && !isPretestComplete && "Complete pre-test to unlock lab"}
              {canEnterLab && "Ready to dive! Enter the lab when you're ready."}
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:bg-white/10"
              >
                Skip pre-test (not recommended)
              </Button>
              
              <Button
                disabled={!canEnterLab}
                className="h-12 px-8 font-display font-bold text-lg bg-gradient-to-r from-coral-cta to-coral-cta/80 hover:from-coral-cta/90 hover:to-coral-cta/70 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Enter the Lab
                <ChevronRight className="ml-2 w-5 h-5" />
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
