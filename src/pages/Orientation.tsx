import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { OrientationHeader } from "@/components/OrientationHeader";
import { GlossaryChip } from "@/components/GlossaryChip";
import { PretestDrawer } from "@/components/PretestDrawer";
import { ChevronRight, Microscope, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { EntrySection } from "@/components/EntrySection";
import { TwilightZoneSection } from "@/components/TwilightZoneSection";
import { AbyssalPlainSection } from "@/components/AbyssalPlainSection";
import { HeroSection } from "@/components/HeroSection";
import { CardRelayDiagram } from "@/components/CardRelayDiagram";

const Orientation = () => {
  useDocumentTitle("MicrobeRelay | Ocean Microbes & Climate");
  const navigate = useNavigate();
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [flippedChips, setFlippedChips] = useState<Set<string>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPretestComplete, setIsPretestComplete] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const learningRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only scroll listener needed here now
    // Mouse move logic moved to HeroSection to prevent re-renders of the whole page
  }, []);

  const handleChipFlip = (term: string) => {
    setFlippedChips((prev) => new Set([...prev, term]));
  };

  const allChipsRead = flippedChips.size === 3;
  const canEnterLab = allChipsRead && isPretestComplete;

  // Smart auto-scroll when all concepts are learned
  useEffect(() => {
    if (allChipsRead && !hasAutoScrolled) {
      setTimeout(() => {
        const element = document.getElementById('prediction-cta');
        element?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        setHasAutoScrolled(true);
      }, 800);
    }
  }, [allChipsRead, hasAutoScrolled]);

  const handlePulse = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 1200);
  };

  const scrollToContent = () => {
    const element = document.getElementById('learning-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
  };

  return (
    <div className={isHighContrast ? "high-contrast" : ""}>
      <OrientationHeader
        isHighContrast={isHighContrast}
        onToggleContrast={toggleHighContrast}
      />

      {/* New Entry Section */}
      <EntrySection />

      {/* Twilight Zone Section */}
      <TwilightZoneSection />

      {/* Abyssal Plain Section */}
      <AbyssalPlainSection />

      {/* Apple-Quality Hero Ocean - Now Isolated */}
      <HeroSection
        allChipsRead={allChipsRead}
        isPretestComplete={isPretestComplete}
        isPulsing={isPulsing}
        scrollToContent={scrollToContent}
      />

      {/* Apple-Quality Learning Section */}
      <section ref={learningRef} id="learning-section" className="relative py-16 lg:py-32 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Refined section header */}
          <div className="text-center mb-20 animate-fade-in-delayed">


            <h2 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl mb-8 tracking-tight leading-none">
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                Three Ideas You'll Need
              </span>
            </h2>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Tap each card. Then you'll make your predictions.
            </p>
          </div>

          {/* Enhanced glossary grid with staggered animations */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-24">
            {[
              { term: "The Relay", definition: "Microbes in low-oxygen water breathe nitrogen in steps, like a relay race. Different specialists run different legs.", icon: "denit" as const, delay: "0ms", diagramVariant: "relay" as const },
              { term: "Food Decides", definition: "Food for the microbes is organic matter. When food is scarce, only cheap single-step microbes survive. When food is abundant, microbes can afford to run multiple steps.", icon: "modular" as const, delay: "150ms", diagramVariant: "food" as const },
              { term: "N₂O Escapes", definition: "N₂O is a greenhouse gas 300× more potent than CO₂, made at step 2. When food is moderate, it escapes to the atmosphere. When food is abundant, microbes finish the relay and convert it to harmless N₂.", icon: "n2o" as const, delay: "300ms", diagramVariant: "n2o" as const },
            ].map((concept) => (
              <div
                key={concept.term}
                className="animate-reveal-up"
                style={{ animationDelay: concept.delay }}
              >
                <GlossaryChip
                  term={concept.term}
                  definition={concept.definition}
                  icon={concept.icon}
                  onFlip={() => handleChipFlip(concept.icon)}
                  diagram={<CardRelayDiagram variant={concept.diagramVariant} />}
                />
              </div>
            ))}
          </div>

          {/* Immediately visible CTA section */}
          {allChipsRead && !isPretestComplete && (
            <div className="mt-12 -mb-8">
              {/* Sticky notification bar */}
              <div className="sticky top-20 z-20 mb-8">
                <div className="glass-intense border border-primary/30 rounded-2xl p-6 shadow-2xl shadow-primary/20 animate-slide-up-smooth">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-bold">Ready for predictions!</span>
                    </div>

                    <Button
                      onClick={() => setIsDrawerOpen(true)}
                      size="lg"
                      className="h-12 px-8 font-bold rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        Make Predictions
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Completion state */}
          {isPretestComplete && (
            <div className="mt-12 text-center animate-scale-in-spring">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-intense border border-emerald-500/30 text-emerald-400 font-bold shadow-xl shadow-emerald-500/10">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  ✓
                </div>
                <span>All predictions complete</span>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* Apple-Quality Bottom Navigation */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 backdrop-blur-2xl transition-all duration-500
          ${canEnterLab
            ? 'glass-intense border-t border-primary/40 bg-primary/5 py-7 shadow-[0_-4px_20px_rgba(var(--primary-rgb),0.1)]'
            : 'glass-intense border-t border-white/20 py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Progress indicator */}
            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold">
                {!allChipsRead && (
                  <span className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${i < flippedChips.size ? 'bg-primary scale-110' : 'bg-muted/50'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      <span className="text-primary font-bold">{flippedChips.size}/3</span> concepts learned
                    </span>
                  </span>
                )}
                {allChipsRead && !isPretestComplete && (
                  <span className="text-amber-400 flex items-center gap-2">
                    Complete predictions to unlock the lab
                  </span>
                )}
                {canEnterLab && (
                  <span className="text-emerald-400 flex items-center gap-2 font-bold text-lg animate-pulse">
                    Ready to explore the lab
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end">
              <Button
                disabled={!canEnterLab}
                onClick={() => navigate("/meet-the-relay")}
                className={`font-bold rounded-full text-white shadow-lg transition-all duration-300 group
                  ${canEnterLab
                    ? 'h-14 px-10 bg-gradient-to-r from-coral-cta to-coral-cta/90 hover:from-coral-cta/95 hover:to-coral-cta/85 shadow-coral-cta/30 hover:scale-105 text-lg'
                    : 'h-12 px-8 bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <span>Enter the Lab</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing to prevent content overlap */}
      <div className="h-24" />

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
