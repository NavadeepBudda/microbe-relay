import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Globe, Info, ArrowRight, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LearningHeader } from "@/components/LearningHeader";
import { FoodSlider } from "@/components/FoodSlider";
import { foodLevelDetails, type FoodLevel } from "@/lib/food-level";
import { ContextModal } from "@/components/ContextModal";
import { PostTestDrawer } from "@/components/PostTestDrawer";
import { PostTestInsights, type PostTestResults } from "@/components/PostTestInsights";
import type { UserComparisonData } from "@/lib/comparison-service";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export type { FoodLevel };

const Relay = () => {
  useDocumentTitle("Microbe Relay | Relay");
  const navigate = useNavigate();
  const [foodLevel, setFoodLevel] = useState<FoodLevel>("low");
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);
  const [isPostTestOpen, setIsPostTestOpen] = useState(false);
  const [isPostTestComplete, setIsPostTestComplete] = useState(false);
  const [comparisonData, setComparisonData] = useState<UserComparisonData | null>(null);
  const [isPulsing, setIsPulsing] = useState(false);
  const currentLevelDetails = foodLevelDetails.find(level => level.value === foodLevel) ?? foodLevelDetails[0];

  const handlePulse = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 1200);
  };

  const handlePostTestComplete = (userData: UserComparisonData | null) => {
    setIsPostTestComplete(true);
    setComparisonData(userData);
    console.log('Post-test completed with data:', userData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LearningHeader />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 md:py-8 pt-24 md:pt-32 space-y-6 md:space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-3 md:space-y-6">
          <div className="space-y-2 md:space-y-4">

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight px-2 text-white">
              Organic Matter & Ocean Chemistry
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-3">
              You've seen how the amount of food changes the relay. Now see where these conditions actually occur.
            </p>
          </div>

        </section>

        {/* Main Learning Interface */}
        <section className="grid gap-6 md:gap-12 lg:gap-16">
          {/* Food Control - Enhanced Context */}
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-background/60 to-background px-4 py-6 sm:px-6 sm:py-8 lg:px-16 lg:py-12 shadow-[0_40px_120px_-60px_rgba(16,76,133,0.6)]">
            <div className="pointer-events-none absolute -top-12 md:-top-24 -right-8 md:-right-16 h-28 w-28 md:h-56 md:w-56 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_55%)]" />

            <div className="relative grid gap-6 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,1fr)] lg:items-center">
              <div className="space-y-4 md:space-y-8 text-center lg:text-left">
                <div className="space-y-2 md:space-y-4">

                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
                    Explore the Environments
                  </h2>
                  <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2">
                    Each location has different food levels. See how that changes who runs the relay.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 max-w-2xl mx-auto lg:mx-0">
                  <div className="glass-subtle border border-white/10 rounded-xl md:rounded-2xl px-3 py-3 md:px-6 md:py-5 text-center transition-all duration-300 hover:border-primary/30 hover:scale-105">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80 mb-1 md:mb-2">Scenario</div>
                    <div className="text-xs sm:text-sm md:text-base font-semibold text-foreground">{currentLevelDetails.scenario}</div>
                  </div>
                  <div className="glass-subtle border border-white/10 rounded-xl md:rounded-2xl px-3 py-3 md:px-6 md:py-5 text-center transition-all duration-300 hover:border-primary/30 hover:scale-105">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80 mb-1 md:mb-2">Location</div>
                    <div className="text-xs sm:text-sm md:text-base font-semibold text-foreground">{currentLevelDetails.location}</div>
                  </div>
                  <div className="glass-subtle border border-white/10 rounded-xl md:rounded-2xl px-3 py-3 md:px-6 md:py-5 text-center transition-all duration-300 hover:border-primary/30 hover:scale-105">
                    <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80 mb-1 md:mb-2">N₂O Risk</div>
                    <div className="text-xs sm:text-sm md:text-base font-semibold text-foreground">{currentLevelDetails.n2oRisk}</div>
                  </div>
                </div>
              </div>

              <div className="relative max-w-xl w-full mx-auto lg:mx-0">
                <FoodSlider value={foodLevel} onChange={setFoodLevel} />
              </div>
            </div>

            {/* Context Button */}
            <div className="relative mt-6 md:mt-12 flex justify-center">
              <Button
                onClick={() => setIsContextModalOpen(true)}
                size="lg"
                className="group relative h-auto rounded-full px-4 py-2.5 md:px-8 md:py-4 text-xs sm:text-sm md:text-base font-semibold text-white shadow-[0_4px_20px_rgba(244,114,87,0.3)] transition-all duration-300 bg-[#F47257] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(244,114,87,0.5)] hover:bg-[#F47257]/90 border border-white/20"
              >
                <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-2 md:gap-3">
                  <span className="md:text-lg">Show Real-World Context</span>
                  <Info className="h-3 w-3 md:h-4 md:w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Button>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="space-y-8 md:space-y-16">
            <div className="text-center space-y-3 md:space-y-6">
              <div className="space-y-2 md:space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.1] px-2">
                  Why Organic Matter
                  <br />
                  <span className="text-coral-cta">Matters</span>
                </h2>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto font-light px-3">
                Food level sets who runs the nitrogen relay and how far it goes. It also shapes how much nitrous oxide (N₂O) builds up.
              </p>
            </div>

            {/* Enhanced Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Sparse Food Card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl text-white font-semibold">Sparse Food</h3>
                  </div>

                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed text-lg">
                      In food-poor waters, first-step specialists lead. They only do step 1, so they need less energy to survive.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span>Relay focus: mostly Step 1 (NO₃⁻ → NO₂⁻)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span>Downstream steps: limited; the relay often stalls early</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span>N₂O: low</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Moderate Food Card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl text-white font-semibold">Moderate Food</h3>
                  </div>

                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed text-lg">
                      Food pulses let more specialists join in. Multiple steps run at once, and handoffs can bottleneck.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span>Relay focus: Steps 1 and 2 are both active</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span>Handoffs: bottlenecks can form at nitrite/N₂O</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span>N₂O: moderate, with short pulses</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Abundant Food Card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl text-white font-semibold">Abundant Food</h3>
                  </div>

                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed text-lg">
                      Lots of food lets multi-step microbes take over. They can run the full relay on their own.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span>Relay focus: multi-step and full pathways</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span>Constraint: nitrogen runs low, not food</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span>N₂O: high if finishers lag; lower when finishers keep pace</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>
      </div>

      {/* Enhanced Footer with Post-Test */}
      <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
          {!isPostTestComplete ? (
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Test Yourself
                </h2>

                <p className="text-muted-foreground text-xl leading-relaxed max-w-3xl mx-auto font-light">
                  Same questions from earlier. See how you do now.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => setIsPostTestOpen(true)}
                  size="lg"
                  className="group relative h-auto rounded-full px-8 py-4 text-base font-semibold text-white shadow-[0_4px_20px_rgba(244,114,87,0.3)] transition-all duration-300 bg-[#F47257] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(244,114,87,0.5)] hover:bg-[#F47257]/90 border border-white/20"
                >
                  <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative flex items-center justify-center gap-3">
                    <span className="text-lg">Take Knowledge Assessment</span>
                  </span>
                </Button>
              </div>
            </div>
          ) : (
            <PostTestInsights key={comparisonData?.userId} comparisonData={comparisonData} />
          )}
        </div>
      </div>

      {/* Context Modal */}
      <ContextModal
        isOpen={isContextModalOpen}
        onClose={() => setIsContextModalOpen(false)}
        foodLevel={foodLevel}
      />

      {/* Post-Test Drawer */}
      <PostTestDrawer
        isOpen={isPostTestOpen}
        onClose={() => setIsPostTestOpen(false)}
        onComplete={handlePostTestComplete}
        onPulse={handlePulse}
      />
    </div>
  );
};

export default Relay;
