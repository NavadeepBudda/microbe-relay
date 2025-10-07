import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Target, Award, ChevronRight, Globe, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RelayPipeline } from "@/components/RelayPipeline";
import { FoodSlider } from "@/components/FoodSlider";
import { foodLevelDetails, type FoodLevel } from "@/lib/food-level";
import { ContextModal } from "@/components/ContextModal";

export type { FoodLevel };

const Relay = () => {
  const navigate = useNavigate();
  const [foodLevel, setFoodLevel] = useState<FoodLevel>("low");
  const [stationsLearned, setStationsLearned] = useState<string[]>([]);
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  const currentLevelDetails = foodLevelDetails.find(level => level.value === foodLevel) ?? foodLevelDetails[0];

  const handleStationLearned = useCallback((stationId: string) => {
    if (!stationsLearned.includes(stationId)) {
      setStationsLearned(prev => [...prev, stationId]);
    }
  }, [stationsLearned]);

  const totalLearningProgress = stationsLearned.length;
  const maxProgress = 4; // 4 stations
  const learningProgressPercent = (totalLearningProgress / maxProgress) * 100;

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
                Meet the Relay
              </div>
            </div>

            {/* Learning progress indicator */}
            <div className="flex items-center gap-3">
              <div className="text-xs text-muted-foreground">
                Progress: <span className="text-primary font-semibold">{totalLearningProgress}/{maxProgress}</span>
              </div>
              <div className="w-20 h-2 glass-subtle rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${learningProgressPercent}%` }}
                />
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
                Meet the Nitrogen Relay
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover how food availability reshapes modular denitrification. Adjust the food level and 
              watch which teams take the baton—and how nitrous oxide responds in the process.
            </p>
          </div>

          {/* Learning objectives */}
          <div className="glass-subtle rounded-2xl p-6 max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-primary mb-4">You'll Learn:</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <span>4-step relay structure</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <span>Modular participation</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <span>Food-driven dynamics</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-accent" />
                <span>N₂O greenhouse impact</span>
              </div>
            </div>
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
                    Adjust organic matter availability and watch how the nitrogen relay responds. Each food level creates different microbial dynamics and nitrous oxide outcomes.
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

          {/* The Relay Pipeline - Main Focus */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent">
                The Denitrification Relay
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto">
                Watch how different microbial teams participate based on food availability. 
                Click each station to learn more about their role in the nitrogen cycle.
              </p>
            </div>
            <RelayPipeline 
              foodLevel={foodLevel} 
              onStationLearned={handleStationLearned}
            />
          </div>

        </section>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-primary">
                <Award className="w-5 h-5" />
                <span className="text-sm font-semibold">Explore the Interactive Relay</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Continue to next section when ready
              </div>
              <Button className="h-10 px-6 font-semibold rounded-full bg-gradient-to-r from-coral-cta to-coral-cta/90 hover:from-coral-cta/95 hover:to-coral-cta/85 text-white shadow-lg shadow-coral-cta/25 transition-all duration-300 hover:scale-105 group">
                <span className="flex items-center gap-2">
                  <span>Continue Journey</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </Button>
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
