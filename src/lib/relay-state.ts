export type RelayModule = "Step1" | "Step2" | "Step3" | "TwoStepBand" | "ThreeStepBand";

export interface RelayState {
  foodLevel: number; // 0-100
  dominantModules: RelayModule[];
  coexistingModules: RelayModule[];
  n2oLevel: number; // 0-100
}

export const calculateN2OLevel = (foodLevel: number): number => {
  // Smooth hump curve peaking around 65
  const peak = 65;
  const width = 22;
  const result = 100 * Math.exp(-Math.pow(foodLevel - peak, 2) / (2 * Math.pow(width, 2)));
  return Math.round(Math.max(0, Math.min(100, result)));
};

export const getRelayState = (foodLevel: number): RelayState => {
  let dominantModules: RelayModule[] = [];
  let coexistingModules: RelayModule[] = [];

  if (foodLevel < 35) {
    // Low Food: Step 1 dominates
    dominantModules = ["Step1"];
    coexistingModules = [];
  } else if (foodLevel < 70) {
    // Medium Food: Coexistence
    dominantModules = ["Step1", "Step2"];
    coexistingModules = ["Step3", "TwoStepBand"];
  } else {
    // High Food: Multi-step modules dominate
    dominantModules = ["TwoStepBand", "ThreeStepBand", "Step3"];
    coexistingModules = ["Step2"];
  }

  return {
    foodLevel,
    dominantModules,
    coexistingModules,
    n2oLevel: calculateN2OLevel(foodLevel),
  };
};

export const getFoodLevelExplanation = (foodLevel: number): {
  badge: string;
  title: string;
  description: string;
} => {
  if (foodLevel < 35) {
    return {
      badge: "Low Food",
      title: "First-step specialists dominate",
      description: "Low food prefers the first-step specialist because it needs fewer enzymes.",
    };
  } else if (foodLevel < 70) {
    return {
      badge: "Medium Food",
      title: "Multiple specialists coexist",
      description: "With moderate food, multiple specialists can coexist and share the relay steps.",
    };
  } else {
    return {
      badge: "High Food",
      title: "Multi-step specialists active",
      description: "High food can support longer, multistep specialists when nitrogen is scarce.",
    };
  }
};