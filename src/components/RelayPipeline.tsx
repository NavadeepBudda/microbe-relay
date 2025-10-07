import { useEffect, useState } from "react";
import { FoodLevel } from "@/pages/Relay";
import { RelayAnimation } from "@/components/RelayAnimation";

interface RelayPipelineProps {
  foodLevel: FoodLevel;
  onStationLearned?: (stationId: string) => void;
}

const stations = [
  {
    id: "no3",
    label: "NO₃⁻",
    name: "Nitrate",
    role: "Step 1: Nitrate Reduction",
    description: "Microbes grab nitrate (NO₃⁻) and remove one oxygen atom",
    process: "NO₃⁻ → NO₂⁻ + ½O₂",
    specialists: "First-step specialists excel here - they travel light with minimal enzymes",
    realWorld: "Always active when nitrate is present, even in low-food conditions",
    color: "hsl(var(--teal-glow))"
  },
  {
    id: "no2", 
    label: "NO₂⁻",
    name: "Nitrite",
    role: "Step 2: Nitrite Reduction",
    description: "The baton passes to microbes that convert nitrite to nitrous oxide",
    process: "NO₂⁻ → N₂O + H₂O",
    specialists: "Second-step specialists need more energy investment to maintain their enzymes",
    realWorld: "Becomes active when moderate food supports coexistence of specialists",
    color: "hsl(var(--omz-violet))"
  },
  {
    id: "n2o",
    label: "N₂O",
    name: "Nitrous Oxide", 
    role: "Step 3: Critical Intermediate",
    description: "Greenhouse gas that's 300x more potent than CO₂",
    process: "N₂O → ½N₂ + ½O₂",
    specialists: "Third-step specialists compete with multi-step teams for this conversion",
    realWorld: "Accumulates when finish line gets crowded - major climate concern",
    color: "hsl(var(--coral-cta))"
  },
  {
    id: "n2",
    label: "N₂",
    name: "Nitrogen Gas",
    role: "Step 4: Safe Completion", 
    description: "Harmless nitrogen gas released back to atmosphere",
    process: "Final product - completes the denitrification relay",
    specialists: "Multi-step microbes with complete enzyme sets dominate this finish line",
    realWorld: "Prevents N₂O escape when the full relay operates efficiently",
    color: "hsl(var(--primary))"
  }
];

export const RelayPipeline = ({ foodLevel }: RelayPipelineProps) => {
  const [activeStations, setActiveStations] = useState<string[]>([]);

  useEffect(() => {
    // Correct the logic to show proper modular behavior
    switch (foodLevel) {
      case "low":
        // Low food: Only first-step specialists can afford to be active
        setActiveStations(["no3"]);
        break;
      case "medium":
        // Medium food: Coexistence allows first and second step specialists
        setActiveStations(["no3", "no2"]);
        break;
      case "high":
        // High food: Multi-step teams can complete the full pathway
        setActiveStations(["no3", "no2", "n2o", "n2"]);
        break;
    }
  }, [foodLevel]);


  return (
    <div className="space-y-8">
      {/* Simplified Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">The 4-Step Nitrogen Relay</h3>
        <p className="text-sm text-muted-foreground">Food levels determine which steps are active</p>
      </div>

      {/* Clean Relay Flow */}
      <div className="p-4">
        <RelayAnimation foodLevel={foodLevel} activeStations={activeStations} />
      </div>

      {/* Compact Station Overview */}
      <div className="grid gap-3 md:grid-cols-4">
        {stations.map((station, index) => {
          const isActive = activeStations.includes(station.id);

          return (
            <div
              key={station.id}
              className={`rounded-lg border p-3 text-center transition-all duration-300 ${
                isActive ? "border-primary/50 bg-primary/5" : "border-white/10"
              }`}
            >
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step {index + 1}
                </div>
                <div 
                  className="text-lg font-bold"
                  style={{ color: isActive ? station.color : "hsl(var(--muted-foreground))" }}
                >
                  {station.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {station.name}
                </div>
                <div className="flex items-center justify-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-primary animate-pulse" : "bg-muted"
                  }`} />
                  <span className={`text-xs ${
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  }`}>
                    {isActive ? "Active" : "Dormant"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
