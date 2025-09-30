import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { OrientationHeader } from "@/components/OrientationHeader";
import { GlossaryChip } from "@/components/GlossaryChip";
import { PretestDrawer } from "@/components/PretestDrawer";
import { ChevronRight, Play, ArrowDown, Waves, Microscope, Target } from "lucide-react";
import oceanHero from "@/assets/ocean-hero.jpg";

const Orientation = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [flippedChips, setFlippedChips] = useState<Set<string>>(new Set());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPretestComplete, setIsPretestComplete] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Show floating CTA when scrolled past hero
      const heroHeight = heroRef.current?.offsetHeight || 0;
      setShowFloatingCTA(window.scrollY > heroHeight * 0.7);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
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
      <OrientationHeader
        onToggleContrast={() => setIsHighContrast(!isHighContrast)}
        isHighContrast={isHighContrast}
      />

      {/* Apple-Quality Hero Ocean */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden hero-mobile-landscape">
        {/* Constrained Ocean Background */}
        <div className="absolute inset-0">
          {/* Base ocean image with proper constraints */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] parallax-mobile-reduce"
              style={{
                transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) translateY(${Math.max(scrollY * 0.3, -100)}px)`,
                transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              <img
                src={oceanHero}
                alt="Deep ocean cross-section"
                className="w-full h-full object-cover"
              />
              
              {/* Edge fade masks */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background/60" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/20" />
            </div>
          </div>
          
          {/* Sophisticated gradient overlay system */}
          <div 
            className="absolute inset-0 opacity-80 parallax-mobile-reduce"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at center 40%, 
                  transparent 0%, 
                  hsl(var(--abyss) / 0.3) 40%,
                  hsl(var(--abyss) / 0.7) 100%
                ),
                linear-gradient(180deg, 
                  hsl(var(--abyss) / 0.1) 0%, 
                  transparent 25%, 
                  hsl(var(--omz-violet) / 0.2) 40%, 
                  hsl(var(--omz-violet) / 0.4) 50%, 
                  hsl(var(--omz-violet) / 0.2) 60%, 
                  transparent 75%,
                  hsl(var(--abyss) / 0.9) 100%
                )`,
              transform: `translateY(${mousePos.y * 0.4}px)`,
            }}
          />

          {/* Enhanced OMZ breathing layer */}
          <div
            className="absolute inset-0 opacity-40 animate-breathe"
            style={{
              background: `linear-gradient(135deg, 
                transparent 30%, 
                hsl(var(--omz-violet) / 0.2) 45%, 
                hsl(var(--primary) / 0.3) 50%, 
                hsl(var(--omz-violet) / 0.2) 55%, 
                transparent 70%)`,
              transform: `translateY(${mousePos.y * 0.2}px) rotate(${mousePos.x * 0.05}deg)`,
            }}
          />

          {/* Pulse plume effect */}
          {isPulsing && (
            <div
              className="absolute top-1/2 left-0 right-0 h-48 animate-pulse-plume"
              style={{
                background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.5) 50%, transparent 100%)",
                filter: "blur(60px)",
              }}
            />
          )}

          {/* Refined floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full animate-float ${
                  i % 4 === 0 ? "bg-primary/50" : 
                  i % 4 === 1 ? "bg-accent/30" : 
                  i % 4 === 2 ? "bg-teal-400/40" : "bg-blue-400/20"
                }`}
                style={{
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  left: `${10 + Math.random() * 80}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 15}s`,
                  opacity: 0.4 + Math.random() * 0.4,
                }}
              />
            ))}
          </div>

        </div>

        {/* Apple-style gradient bridge to next section */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              hsl(var(--background) / 0.8) 70%, 
              hsl(var(--background)) 100%
            )`,
          }}
        />

        {/* Enhanced Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div 
            className={`max-w-5xl text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{
              transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
              transition: "transform 0.8s ease-out",
            }}
          >
            {/* Enhanced title with better animations */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border border-primary/20 text-sm text-primary font-medium mb-6 animate-scale-in">
                <Waves className="w-4 h-4" />
                Welcome to the Microbial Relay
              </div>
              
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 tracking-tight">
                <span className="bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent">
                  Orientation Bay
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-8 font-light leading-relaxed max-w-3xl mx-auto px-4">
                Discover the hidden world of ocean microbes and make your predictions before we 
                <span className="text-primary font-medium"> dive into the deep</span>.
              </p>
            </div>

            {/* Enhanced Status Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm mb-12">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-subtle">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  allChipsRead ? 'bg-primary shadow-lg shadow-primary/50' : 'bg-muted'
                }`} />
                <Microscope className="w-4 h-4" />
                <span className={`font-medium transition-colors ${allChipsRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Learn concepts
                </span>
              </div>
              
              <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-subtle">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  isPretestComplete ? 'bg-primary shadow-lg shadow-primary/50' : 'bg-muted'
                }`} />
                <Play className="w-4 h-4" />
                <span className={`font-medium transition-colors ${isPretestComplete ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Make predictions
                </span>
              </div>
            </div>

            {/* Enhanced scroll indicator */}
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToContent}
              className="group flex items-center gap-2 mx-auto text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              <span className="text-sm font-medium">Start learning</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Apple-Quality Learning Section */}
      <section ref={learningRef} id="learning-section" className="relative py-16 lg:py-32 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Refined section header */}
          <div className="text-center mb-20 animate-fade-in-delayed">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-subtle border border-primary/20 text-sm text-primary font-semibold mb-8 shadow-lg shadow-primary/5">
              <Microscope className="w-4 h-4" />
              Essential Knowledge
            </div>
            
            <h2 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl mb-8 tracking-tight leading-none">
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                Three Core Concepts
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Tap each card to unlock the science behind ocean microbes.<br />
              <span className="text-primary font-medium">Takes just 30 seconds</span>.
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
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                      <span className="text-primary font-bold">Ready for predictions!</span>
                      <div className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                        3/3 ✓
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => setIsDrawerOpen(true)}
                      size="lg"
                      className="h-12 px-8 font-bold rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
                    >
                      <span className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
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
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i < flippedChips.size ? 'bg-primary scale-110' : 'bg-muted/50'
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
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Complete predictions to unlock the lab
                  </span>
                )}
                {canEnterLab && (
                  <span className="text-emerald-400 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Ready to explore the lab
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end">
              <Button
                disabled={!canEnterLab}
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
