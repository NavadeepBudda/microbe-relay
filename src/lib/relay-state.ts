export type RelayModule = "Step1" | "Step2" | "Step3" | "TwoStepBand" | "ThreeStepBand";

export interface RelayState {
  foodLevel: number; // 0-100
  dominantModules: RelayModule[];
  coexistingModules: RelayModule[];
  n2oLevel: number; // 0-100
}

export const calculateN2OLevel = (foodLevel: number): number => {
  // N₂O peaks at medium food (~50-55%) and drops at high food
  // Low food: minimal N₂O (short pathways)
  // Medium food: peak N₂O (multiple specialists, handoff bottlenecks)  
  // High food: lower N₂O (complete pathways convert N₂O to N₂)
  
  if (foodLevel <= 35) {
    // Low food: minimal N₂O production
    return Math.round(10 + (foodLevel / 35) * 15); // 10-25%
  } else if (foodLevel <= 70) {
    // Medium food: peak N₂O production (hotspot zone)
    const mediumPosition = (foodLevel - 35) / 35; // 0 to 1
    const peak = Math.sin(mediumPosition * Math.PI); // Bell curve in medium range
    return Math.round(25 + peak * 65); // 25-90%
  } else {
    // High food: declining N₂O (complete pathways dominate)
    const highPosition = (foodLevel - 70) / 30; // 0 to 1
    const decline = 1 - (highPosition * 0.7); // Gradual decline
    return Math.round(90 * decline); // 90% down to ~27%
  }
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