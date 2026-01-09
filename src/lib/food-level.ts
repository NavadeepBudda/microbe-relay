export type FoodLevel = "low" | "medium" | "high";

export interface FoodLevelDetails {
  value: FoodLevel;
  label: string;
  numeric: number;
  emoji: string;
  scenario: string;
  location: string;
  timeScale: string;
  microbialStrategy: string;
  n2oRisk: string;
  particles: number;
  particleSize: number;
  particleColor: string;
}

export const foodLevelDetails: FoodLevelDetails[] = [
  {
    value: "low",
    label: "Sparse",
    numeric: 0,
    emoji: "🪶",
    scenario: "Open-Ocean Twilight Zone",
    location: "Deep ocean (200-1000m)",
    timeScale: "Year-round steady state",
    microbialStrategy: "First-step specialists 'travel light' with minimal enzymes",
    n2oRisk: "Low. The relay stalls early",
    particles: 3,
    particleSize: 2,
    particleColor: "hsl(var(--teal-glow))",
  },
  {
    value: "medium",
    label: "Moderate",
    numeric: 50,
    emoji: "🥄",
    scenario: "River Mouth & Shelf Waters",
    location: "Coastal margins (0-200m)",
    timeScale: "Seasonal pulses",
    microbialStrategy: "Coexistence of multiple specialist teams",
    n2oRisk: "Medium. The handoffs can bottleneck",
    particles: 8,
    particleSize: 3,
    particleColor: "hsl(var(--omz-violet))",
  },
  {
    value: "high",
    label: "Abundant",
    numeric: 100,
    emoji: "🍽️",
    scenario: "Fresh Bloom Fallout",
    location: "Post-bloom zones, upwelling areas",
    timeScale: "Days to weeks after blooms",
    microbialStrategy: "Multi-step teams with complete enzyme toolkits",
    n2oRisk: "High during pulse while finishers fall behind",
    particles: 15,
    particleSize: 4,
    particleColor: "hsl(var(--coral-cta))",
  },
];
