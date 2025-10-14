import { useEffect, useState, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  GaugeCircle,
  Link2,
  Microscope,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { InteractiveFoodControl } from "@/components/InteractiveFoodControl";
import { InteractiveRelayPipeline } from "@/components/InteractiveRelayPipeline";
import { DynamicExplanation } from "@/components/DynamicExplanation";
import { GuidedOverlay } from "@/components/GuidedOverlay";
import { analytics } from "@/lib/analytics";

type RelayStage = {
  stage: string;
  chemical: string;
  role: string;
  description: string;
  insight: string;
  node: {
    label: string;
    subscript?: string;
    glowColor: string;
  };
};

type MicrobeProfile = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  accent: string;
};

const relayStages: RelayStage[] = [
  {
    stage: "Step 01",
    chemical: "NO₃⁻ → NO₂⁻",
    role: "Starter specialists",
    description: "Lean enzyme sets ignite the relay as soon as oxygen dips.",
    insight: "Perfect for scarce food and low oxygen moments.",
    node: {
      label: "NO",
      subscript: "₃⁻",
      glowColor: "hsl(var(--teal-glow))",
    },
  },
  {
    stage: "Step 02",
    chemical: "NO₂⁻ → N₂O",
    role: "Relay converters",
    description: "Modular microbes join when food levels rise enough to fuel longer pathways.",
    insight: "Balances energy cost with denitrification speed.",
    node: {
      label: "NO",
      subscript: "₂⁻",
      glowColor: "hsl(var(--omz-violet))",
    },
  },
  {
    stage: "Step 03",
    chemical: "N₂O → N₂",
    role: "Closing team",
    description: "Final-step microbes neutralize potent N₂O before it escapes to the sky.",
    insight: "Crucial for keeping greenhouse gases in check.",
    node: {
      label: "N",
      subscript: "₂O",
      glowColor: "hsl(var(--coral-cta))",
    },
  },
  {
    stage: "Release",
    chemical: "N₂ to atmosphere",
    role: "Harmless finish",
    description: "Nitrogen returns to its inert form and diffuses back into the broader ocean.",
    insight: "A safe ending—no reactive nitrogen left behind.",
    node: {
      label: "N",
      subscript: "₂",
      glowColor: "#4ade80",
    },
  },
];

const microbeProfiles: MicrobeProfile[] = [
  {
    icon: Microscope,
    title: "Starter specialists (NO₃⁻ → NO₂⁻)",
    subtitle: "STEP 01 — NITRATE REDUCERS",
    description: "The lightest enzyme toolkit kicks off the relay by turning nitrate into nitrite. They dominate when food is scarce.",
    highlights: [
      "Win at low food — thrifty with carbon.",
      "Feed the rest by supplying NO₂⁻ for downstream steps.",
      "Common in OMZs and tolerant of tiny oxygen leaks.",
    ],
    accent: "from-teal-glow/20 via-transparent to-white/5",
  },
  {
    icon: Link2,
    title: "Relay converters (NO₂⁻ → N₂O)",
    subtitle: "STEP 02 — NITRITE REDUCERS",
    description: "Take the handoff from Step 1. With moderate food—or short pulses—they grow and often pass along nitrous oxide as the intermediate.",
    highlights: [
      "Depend on Step 1’s NO₂⁻; coexist with other steps at mid food.",
      "Pulses can create N₂O spikes at this handoff.",
      "Bridge early and late steps in patchy environments.",
    ],
    accent: "from-omz-violet/20 via-transparent to-white/5",
  },
  {
    icon: Droplets,
    title: "Closing team (N₂O → N₂)",
    subtitle: "STEP 03 — N₂O REDUCERS / COMPLETE DENITRIFIERS",
    description: "When food is plentiful and nitrate becomes limiting, longer pathways are worth the cost. Finishers convert N₂O to harmless N₂.",
    highlights: [
      "Favored at high food when nitrogen is scarce.",
      "Lower greenhouse gas by turning N₂O into N₂.",
      "Often multi-step players during high-food periods.",
    ],
    accent: "from-coral-cta/20 via-transparent to-white/5",
  },
];

const MeetTheRelay = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Interactive state management
  const [foodLevel, setFoodLevel] = useState(50); // 0-100
  const [hasVisitedLow, setHasVisitedLow] = useState(false);
  const [hasVisitedHigh, setHasVisitedHigh] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCompletionToast, setShowCompletionToast] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth - 0.5) * 28,
        y: (event.clientY / window.innerHeight - 0.5) * 28,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Check if this is the user's first visit and track page open
  useEffect(() => {
    analytics.pageOpen();
    
    const hasVisited = localStorage.getItem('meetTheRelay-visited');
    if (!hasVisited) {
      setShowOnboarding(true);
      analytics.onboardingStarted();
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  // Track food level changes and visit ranges
  const handleFoodLevelChange = useCallback((newLevel: number) => {
    setFoodLevel(newLevel);
    
    // Determine band and track analytics
    const band = newLevel <= 33 ? 'LOW' : newLevel >= 67 ? 'HIGH' : 'MID';
    analytics.foodLevelChange(newLevel, band);
    analytics.sliderInteraction(newLevel);
    
    // Track if user has visited low and high ranges
    if (newLevel <= 33 && !hasVisitedLow) {
      setHasVisitedLow(true);
      analytics.bandEntered('LOW');
    }
    if (newLevel >= 67 && !hasVisitedHigh) {
      setHasVisitedHigh(true);
      analytics.bandEntered('HIGH');
    }
    
    // Show completion toast when both ranges visited
    if (hasVisitedLow && newLevel >= 67 && !hasVisitedHigh) {
      setHasVisitedHigh(true);
      analytics.exploredBothExtremes();
      setShowCompletionToast(true);
      setTimeout(() => setShowCompletionToast(false), 4000);
    }
    if (hasVisitedHigh && newLevel <= 33 && !hasVisitedLow) {
      setHasVisitedLow(true);
      analytics.exploredBothExtremes();
      setShowCompletionToast(true);
      setTimeout(() => setShowCompletionToast(false), 4000);
    }
  }, [hasVisitedLow, hasVisitedHigh]);

  const handleOnboardingComplete = () => {
    analytics.onboardingCompleted();
    setShowOnboarding(false);
    setIsFirstVisit(false);
    localStorage.setItem('meetTheRelay-visited', 'true');
  };

  const handleOnboardingSkip = () => {
    analytics.onboardingSkipped();
    setShowOnboarding(false);
    setIsFirstVisit(false);
    localStorage.setItem('meetTheRelay-visited', 'true');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_hsla(var(--teal-glow)_/_0.28)_0%,_transparent_70%)] blur-3xl"
          style={{ transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.2}px)` }}
          aria-hidden
        />
        <div
          className="absolute -bottom-32 right-[-160px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,_hsla(var(--omz-violet)_/_0.26)_0%,_transparent_65%)] blur-3xl"
          style={{ transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.25}px)` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.12)_0%,_rgba(255,255,255,0)_50%)] opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:100%_72px] opacity-10" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(6,15,26,0.82)] backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="lg"
              className="gap-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to overview
            </Button>

            <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/60 sm:flex">
              <span className="h-2 w-2 rounded-full bg-white/60" />
              <span className="h-2 w-2 rounded-full bg-teal-400/70" />
              <span className="h-2 w-2 rounded-full bg-omz-violet/60" />
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col">
          <section className="relative isolate pb-24 pt-16 md:pb-28 md:pt-24">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6">
              <div className="space-y-8 text-center md:text-left">
                <div className="inline-flex items-center gap-2 self-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white/60 backdrop-blur-xl md:self-start">
                  <Zap className="h-4 w-4 text-teal-200" />
                  Relay intelligence
                </div>
                <div className="space-y-6">
                  <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    Meet the Relay
                  </h1>
                  <p className="mx-auto max-w-3xl text-base text-white/80 sm:text-lg md:mx-0">
                    In low-oxygen waters, different microbes run different steps. Move the Food dial to see the handoff change.
                  </p>
                </div>
              </div>

              {/* Interactive Pipeline Section - Clean and Centered */}
              <div className="relay-pipeline flex justify-center mb-10">
                <InteractiveRelayPipeline 
                  foodLevel={foodLevel} 
                  className="w-full"
                />
              </div>

              {/* Interactive Controls and Explanation Grid - Better spacing */}
              <div className="grid gap-7 lg:grid-cols-2 max-w-5xl mx-auto">
                {/* Food Control */}
                <div className="food-control-slider">
                  <InteractiveFoodControl
                    value={foodLevel}
                    onChange={handleFoodLevelChange}
                    className="h-full min-h-[310px]"
                  />
                </div>
                
                {/* Dynamic Explanation */}
                <div className="explanation-area">
                  <DynamicExplanation
                    foodLevel={foodLevel}
                    className="h-full min-h-[310px]"
                    autoUpdate={true}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="relative border-t border-white/10 bg-white/5 py-24 md:py-32">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
              <div className="flex flex-col gap-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 self-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white/60 md:self-start">
                  <GaugeCircle className="h-4 w-4" />
                  Microbe playbook
                </div>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                  Who holds the baton as food changes
                </h2>
                <p className="max-w-3xl text-base text-white/75 sm:text-lg">
                  Most microbes do just one step of the nitrogen relay. When food (organic matter) is scarce, early-step specialists lead. As food rises (and nitrogen becomes limiting), longer, multi-step players take over. Later steps depend on earlier ones for their starting material.
                </p>
              </div>

              <div className="grid gap-10 lg:grid-cols-3 xl:gap-12">
                {microbeProfiles.map(({ icon: Icon, title, subtitle, description, highlights, accent }) => (
                  <div
                    key={title}
                    className="relative flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-[rgba(10,22,38,0.65)] p-9 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
                  >
                    <div className={`absolute inset-0 rounded-[1.75rem] bg-gradient-to-br ${accent} opacity-70`} aria-hidden />
                    <div className="relative z-10 flex h-full flex-col gap-8">
                      <div className="flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/60">{subtitle}</p>
                            <h3 className="text-lg font-semibold leading-snug text-white">{title}</h3>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-white/80">{description}</p>
                      </div>
                      <div className="space-y-4 text-sm leading-relaxed text-white/80">
                        {highlights.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <span className="mt-2 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/70" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          <section className="relative py-24 pb-32 md:py-32">
            <div className="mx-auto w-full max-w-4xl px-6">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[rgba(10,24,44,0.7)] p-12 text-center shadow-[0_40px_120px_-45px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18)_0%,_rgba(10,24,44,0.85)_55%,_rgba(6,15,26,0.95)_100%)] opacity-90" aria-hidden />
                <div className="relative z-10 space-y-6">
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white/60">
                    <Droplets className="h-4 w-4" />
                    Ready to try the relay?
                  </p>
                  <h2 className="text-4xl font-semibold text-white sm:text-5xl">
                    Slide Food (organic matter) and watch which specialists lead each step.
                  </h2>
                  <Button
                    onClick={() => navigate("/relay")}
                    size="lg"
                    className="rounded-full bg-coral-cta px-10 py-6 text-base font-semibold text-white shadow-[0_25px_60px_-30px_rgba(245,97,69,0.8)] transition hover:scale-[1.03] hover:bg-coral-cta/90"
                  >
                    Start the lab
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Guided Overlay for First-Time Users */}
        <GuidedOverlay
          isFirstVisit={showOnboarding}
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />

        {/* Completion Toast */}
        {showCompletionToast && (
          <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4 fade-in-0 duration-300">
            <div className="rounded-2xl border border-teal-glow/30 bg-[rgba(8,20,36,0.95)] p-6 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-glow/20">
                  <Zap className="h-5 w-5 text-teal-200" />
                </div>
                <div>
                  <p className="font-semibold text-white">Great exploration! 🎉</p>
                  <p className="text-sm text-white/70">You've seen how food changes which step wins</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetTheRelay;
