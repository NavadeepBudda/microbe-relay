import { RelayNode } from "@/components/RelayNode";
import { RelayArrow } from "@/components/RelayArrow";
import { getRelayState, type RelayModule } from "@/lib/relay-state";

interface InteractiveRelayPipelineProps {
  foodLevel: number;
  className?: string;
}

interface RelayStage {
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
  icon: string;
}

const relayStages: RelayStage[] = [
  {
    stage: "Step 01",
    chemical: "NO₃⁻ → NO₂⁻",
    role: "First-step specialist",
    description: "Lean enzyme sets ignite the relay as soon as oxygen dips.",
    insight: "Perfect for scarce food and low oxygen moments.",
    icon: "🦠",
    node: {
      label: "NO",
      subscript: "₃⁻",
      glowColor: "hsl(var(--teal-glow))",
    },
  },
  {
    stage: "Step 02",
    chemical: "NO₂⁻ → N₂O",
    role: "Relay converter",
    description: "Modular microbes join when food levels rise enough to fuel longer pathways.",
    insight: "Balances energy cost with denitrification speed.",
    icon: "🔄",
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
    icon: "🛡️",
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
    icon: "💨",
    node: {
      label: "N",
      subscript: "₂",
      glowColor: "#4ade80",
    },
  },
];

export const InteractiveRelayPipeline = ({ foodLevel, className }: InteractiveRelayPipelineProps) => {
  const relayState = getRelayState(foodLevel);
  const twoStepActive = relayState.dominantModules.includes("TwoStepBand") || relayState.coexistingModules.includes("TwoStepBand");
  const threeStepActive = relayState.dominantModules.includes("ThreeStepBand") || relayState.coexistingModules.includes("ThreeStepBand");
  const isHighFood = foodLevel >= 70;

  const getStepActivityLevel = (stepNumber: number): "inactive" | "active" | "dominant" => {
    const moduleMap: { [key: number]: RelayModule } = {
      1: "Step1",
      2: "Step2",
      3: "Step3"
    };

    // For step 4 (Release), only active in high food when multi-step specialists complete full pathway
    if (stepNumber === 4) {
      if (foodLevel >= 70) {
        return "dominant"; // Multi-step specialists complete the full pathway
      }
      return "inactive"; // Medium and low food don't complete to release
    }

    const module = moduleMap[stepNumber];
    if (!module) return "inactive";

    // Special handling for low food: Step1 represents NO₃⁻ → NO₂⁻ conversion (both circles 1 and 2)
    if (foodLevel < 35 && relayState.dominantModules.includes("Step1")) {
      if (stepNumber === 1 || stepNumber === 2) {
        return "dominant"; // Both NO₃⁻ and NO₂⁻ circles should light up for Step1
      }
      return "inactive";
    }

    // For high food (multi-step specialists), show all steps as active
    if (foodLevel >= 70) {
      // Multi-step specialists perform all steps, so show all as dominant
      return "dominant";
    }

    if (relayState.dominantModules.includes(module)) return "dominant";
    if (relayState.coexistingModules.includes(module)) return "active";
    return "inactive";
  };

  return (
    <div className={`relative w-full max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-2xl backdrop-blur-xl ${className || ""}`}>
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" aria-hidden />

      {/* Educational badge - always visible */}
      <div className="educational-badge mb-3 md:mb-5 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white/90 backdrop-blur-xl">
          A few microbes can do many steps, but most do one or two
        </div>
      </div>

      {/* Clean, centered pipeline */}
      <div className="space-y-3 md:space-y-5">
        {/* Step nodes row - responsive layout */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 px-2 md:px-4 py-4 overflow-x-auto">
          {relayStages.map((stage, index) => {
            const activityLevel = getStepActivityLevel(index + 1);

            return (
              <div key={stage.stage} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center text-center">
                  <RelayNode
                    label={stage.node.label}
                    subscript={stage.node.subscript}
                    glowColor={stage.node.glowColor}
                    isActive={activityLevel === "active"}
                    isDominant={activityLevel === "dominant"}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                  />
                  <div className="mt-1 md:mt-3 text-center">
                    <p className="text-xs sm:text-sm font-medium text-white">{stage.node.label}{stage.node.subscript}</p>
                  </div>
                </div>

                {index < relayStages.length - 1 && (
                  <div className="mx-1 sm:mx-2 md:mx-4 flex flex-col items-center flex-shrink-0">
                    {index < 3 && (
                      <div className="w-8 sm:w-12 md:w-16 flex flex-col items-center">
                        <div className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-all duration-300 ${activityLevel === "dominant" ? "opacity-100" :
                          activityLevel === "active" ? "opacity-70" : "opacity-30"
                          }`}>
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-teal-glow"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <p className="text-xs text-white/60 mt-1 hidden sm:block">Step {index + 1}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Multi-step bands */}
        {threeStepActive && !isHighFood && (
          <div className="mx-2 md:mx-8 mt-2 md:mt-4 flex flex-col items-center gap-2 md:gap-3">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {threeStepActive && (
                <div className={`rounded-xl border px-3 md:px-4 py-1.5 md:py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/80 transition-all duration-500 ${relayState.dominantModules.includes("ThreeStepBand")
                  ? "border-white/50 bg-white/15"
                  : "border-white/25 bg-white/8"
                  }`}>
                  Three-step specialists
                </div>
              )}
            </div>
          </div>
        )}

        {/* Activity summary */}
        <div className="pt-2 md:pt-4 text-center px-2">
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            {foodLevel < 35 && "Step 1 specialists dominate with minimal energy requirements"}
            {foodLevel >= 35 && foodLevel < 70 && "Multiple specialists coexist and share the workload"}
            {foodLevel >= 70 && "Multi-step specialists carry the relay and finish the full pathway"}
          </p>
        </div>
      </div>
    </div>
  );
};
