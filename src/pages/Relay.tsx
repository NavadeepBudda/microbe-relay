import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Globe, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FoodSlider } from "@/components/FoodSlider";
import { foodLevelDetails, type FoodLevel } from "@/lib/food-level";
import { ContextModal } from "@/components/ContextModal";

export type { FoodLevel };

const Relay = () => {
  const navigate = useNavigate();
  const [foodLevel, setFoodLevel] = useState<FoodLevel>("low");
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  const currentLevelDetails = foodLevelDetails.find(level => level.value === foodLevel) ?? foodLevelDetails[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-3 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to orientation
              </Button>
              
              <div className="hidden sm:block h-6 w-px bg-white/20" />
              
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Understanding Organic Matter
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border border-primary/20 text-sm text-primary font-medium">
              <BookOpen className="w-4 h-4" />
              Interactive Learning Lab
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent">
                Organic Matter & Ocean Chemistry
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Understand how organic matter availability fundamentally shapes ocean denitrification. 
              Explore the environmental conditions that determine which microbial teams can participate in this critical nitrogen cycle.
            </p>
          </div>

        </section>

        {/* Main Learning Interface */}
        <section className="grid gap-12 lg:gap-16">
          {/* Food Control - Enhanced Context */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-background/60 to-background px-8 py-12 lg:px-16 shadow-[0_40px_120px_-60px_rgba(16,76,133,0.6)]">
            <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_55%)]" />

            <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(380px,1fr)] lg:items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                    Interactive Controls
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
                    Control the Environment
                  </h2>
                  <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Move the food slider and see how the nitrogen relay changes. Different food levels lead to different teams and different nitrous oxide outcomes.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0">
                  <div className="glass-subtle border border-white/10 rounded-2xl px-6 py-5 text-center transition-all duration-300 hover:border-primary/30 hover:scale-105">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80 mb-2">Scenario</div>
                    <div className="text-base font-semibold text-foreground">{currentLevelDetails.scenario}</div>
                  </div>
                  <div className="glass-subtle border border-white/10 rounded-2xl px-6 py-5 text-center transition-all duration-300 hover:border-primary/30 hover:scale-105">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80 mb-2">Location</div>
                    <div className="text-base font-semibold text-foreground">{currentLevelDetails.location}</div>
                  </div>
                  <div className="glass-subtle border border-white/10 rounded-2xl px-6 py-5 text-center transition-all duration-300 hover:border-primary/30 hover:scale-105">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80 mb-2">N₂O Risk</div>
                    <div className="text-base font-semibold text-foreground">{currentLevelDetails.n2oRisk}</div>
                  </div>
                </div>
              </div>

              <div className="relative max-w-xl w-full mx-auto lg:mx-0">
                <FoodSlider value={foodLevel} onChange={setFoodLevel} />
              </div>
            </div>

            {/* Context Button */}
            <div className="relative mt-12 flex justify-center">
              <Button
                onClick={() => setIsContextModalOpen(true)}
                size="lg"
                className="group relative h-auto rounded-full px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_25px_60px_-25px_rgba(16,76,133,0.8)] transition-all duration-300 bg-gradient-to-r from-primary via-accent to-coral-cta hover:-translate-y-0.5 hover:shadow-[0_35px_80px_-25px_rgba(244,114,87,0.75)] hover:scale-105"
              >
                <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  <span className="text-lg">Show Real-World Context</span>
                  <Info className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Button>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="space-y-16">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-subtle border border-primary/20">
                  <div className="w-3 h-3 rounded-full bg-primary/60 animate-pulse" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-[0.3em]">Key Concept</span>
                </div>
                
                <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-foreground via-primary via-accent to-coral-cta bg-clip-text text-transparent leading-[1.1]">
                  Why Organic Matter
                  <br />
                  <span className="bg-gradient-to-r from-accent to-coral-cta bg-clip-text text-transparent">Matters</span>
                </h2>
              </div>
              
              <p className="text-muted-foreground text-2xl leading-relaxed max-w-4xl mx-auto font-light">
                Food level sets who runs the nitrogen relay and how far it goes. It also shapes how much nitrous oxide (N₂O) builds up.
              </p>
              
              <div className="flex items-center justify-center gap-8 mt-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>Low Food</span>
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                  <span>Medium Food</span>
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-coral-400" />
                  <span>High Food</span>
                </div>
              </div>
            </div>

            {/* Enhanced Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Sparse Food Card */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-teal-500/20 bg-gradient-to-br from-teal-500/5 via-background/90 to-background transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_40px_120px_-40px_rgba(20,184,166,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative p-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-teal-400/20 to-teal-600/20 border border-teal-400/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="text-3xl">🪶</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">Sparse Food</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        In food-poor waters like the <span className="text-teal-400 font-medium">twilight zone</span>, first-step specialists lead. They turn nitrate (NO₃⁻) into nitrite (NO₂⁻) using few enzymes.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="text-muted-foreground"><strong>Relay focus:</strong> mostly Step 1 (NO₃⁻ → NO₂⁻)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="text-muted-foreground"><strong>Downstream steps:</strong> limited; the relay often stalls early</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="text-muted-foreground"><strong>N₂O:</strong> low</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-teal-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse" />
                        <span className="text-teal-400 font-bold text-sm uppercase tracking-wider">Low N₂O Production</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Moderate Food Card */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-violet-500/20 bg-gradient-to-br from-violet-500/5 via-background/90 to-background transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_40px_120px_-40px_rgba(139,92,246,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative p-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-400/20 to-violet-600/20 border border-violet-400/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="text-3xl">🥄</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-violet-500 bg-clip-text text-transparent">Moderate Food</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        <span className="text-violet-400 font-medium">Coastal pulses</span> raise food and let more teams take part. Neighbors share the relay, and handoffs can crowd the middle.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        <span className="text-muted-foreground"><strong>Relay focus:</strong> Steps 1–2 become active</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        <span className="text-muted-foreground"><strong>Handoffs:</strong> bottlenecks can form at nitrite/N₂O</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        <span className="text-muted-foreground"><strong>N₂O:</strong> moderate, with short pulses</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-violet-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-violet-400 animate-pulse" />
                        <span className="text-violet-400 font-bold text-sm uppercase tracking-wider">Moderate N₂O Pulses</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Abundant Food Card */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-coral-500/20 bg-gradient-to-br from-coral-500/5 via-background/90 to-background transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_40px_120px_-40px_rgba(244,114,87,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-coral-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative p-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-coral-400/20 to-coral-600/20 border border-coral-400/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="text-3xl">🍽️</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Abundant Food</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-foreground leading-relaxed text-lg">
                        After <span className="text-coral-400 font-medium">blooms</span>, rich particles fuel busy communities. Multi-step and complete denitrifiers thrive as nitrogen becomes scarce.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-coral-400" />
                        <span className="text-foreground"><strong>Relay focus:</strong> multi-step and full pathways</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-coral-400" />
                        <span className="text-foreground"><strong>Constraint:</strong> nitrogen becomes the limiter</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-coral-400" />
                        <span className="text-foreground"><strong>N₂O:</strong> high if finishers lag; lower when finishers keep pace</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-coral-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-coral-400 animate-pulse" />
                        <span className="text-coral-400 font-bold text-sm uppercase tracking-wider">High N₂O Spikes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>
      </div>

      {/* Simple Footer */}
      <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-semibold">Understanding Organic Matter Impact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Context Modal */}
      <ContextModal 
        isOpen={isContextModalOpen}
        onClose={() => setIsContextModalOpen(false)}
        foodLevel={foodLevel}
      />
    </div>
  );
};

export default Relay;
