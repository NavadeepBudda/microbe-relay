import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LearningHeader } from "@/components/LearningHeader";
import { GlossaryChip } from "@/components/GlossaryChip";
import { PretestDrawer } from "@/components/PretestDrawer";
import { ChevronRight, Microscope, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { EntrySection } from "@/components/EntrySection";
import { TwilightZoneSection } from "@/components/TwilightZoneSection";
import { AbyssalPlainSection } from "@/components/AbyssalPlainSection";
import { HeroSection } from "@/components/HeroSection";

const Orientation = () => {
  useDocumentTitle("Microbe Relay | Orientation Bay");
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

  return (
    <div className={isHighContrast ? "high-contrast" : ""}>
      <LearningHeader />

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
                Three Core Concepts
              </span>
            </h2>

            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Tap each card to unlock the science behind ocean microbes.
            </p>
          </div>

          {/* Enhanced glossary grid with staggered animations */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-24">
            {[
              { term: "Denitrification", definition: "Breathing with nitrogen when oxygen is scarce.", icon: "denit" as const, delay: "0ms" },
              { term: "Modular", definition: "Most microbes do only one or two steps of the relay.", icon: "modular" as const, delay: "150ms" },
              { term: "N₂O", definition: "Nitrous oxide: a greenhouse gas sometimes made in the relay.", icon: "n2o" as const, delay: "300ms" },
            ].map((concept, index) => (
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
      <div className="fixed bottom-0 left-0 right-0 z-30 glass-intense border-t border-white/20 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5">
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
                  <span className="text-emerald-400 flex items-center gap-2">

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
                className="h-12 px-8 font-bold rounded-full bg-gradient-to-r from-coral-cta to-coral-cta/90 hover:from-coral-cta/95 hover:to-coral-cta/85 text-white shadow-lg shadow-coral-cta/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100 group"
              >
                <span className="flex items-center gap-2">
                  <span>Enter the Lab</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
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
