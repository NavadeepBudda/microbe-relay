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
    <div className={`relative w-full max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl ${className || ""}`}>
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" aria-hidden />
      
      {/* Educational badge - always visible */}
      <div className="educational-badge mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-xl">
          A few microbes can do many steps, but most do one or two
        </div>
      </div>

      {/* Clean, centered pipeline */}
      <div className="space-y-8">
        {/* Step nodes row */}
        <div className="flex items-center justify-center gap-8 px-4">
          {relayStages.map((stage, index) => {
            const activityLevel = getStepActivityLevel(index + 1);
            
            return (
              <div key={stage.stage} className="flex items-center">
                <div className="flex flex-col items-center text-center">
                  <RelayNode
                    label={stage.node.label}
                    subscript={stage.node.subscript}
                    glowColor={stage.node.glowColor}
                    isActive={activityLevel === "active"}
                    isDominant={activityLevel === "dominant"}
                    className="w-20 h-20 md:w-24 md:h-24"
                  />
                  <div className="mt-3 text-center">
                    <p className="text-xs text-white/60">Step {index + 1}</p>
                    <p className="text-sm font-medium text-white">{stage.node.label}{stage.node.subscript}</p>
                  </div>
                </div>
                
                {index < relayStages.length - 1 && (
                  <div className="mx-4">
                    <RelayArrow
                      className="w-16"
                      isActive={activityLevel !== "inactive"}
                      isDominant={activityLevel === "dominant"}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Multi-step bands */}
        {threeStepActive && !isHighFood && (
          <div className="mx-8 mt-4 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {threeStepActive && (
                <div className={`rounded-xl border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/80 transition-all duration-500 ${
                  relayState.dominantModules.includes("ThreeStepBand")
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
        <div className="pt-4 text-center">
          <p className="text-sm text-white/70">
            {foodLevel < 35 && "Step 1 specialists dominate with minimal energy requirements"}
            {foodLevel >= 35 && foodLevel < 70 && "Multiple specialists coexist and share the workload"}
            {foodLevel >= 70 && "Multi-step specialists carry the relay and finish the full pathway"}
          </p>
        </div>
      </div>
    </div>
  );
};
