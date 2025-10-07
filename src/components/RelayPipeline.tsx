import { useEffect, useState } from "react";
import { FoodLevel } from "@/pages/Relay";
import { MicrobeAvatar } from "@/components/MicrobeAvatar";
import { RelayAnimation } from "@/components/RelayAnimation";
import { HelpTooltip, DenitrificationTooltip, ModularTooltip, N2OTooltip } from "@/components/HelpTooltip";
import { ArrowRight, Zap, AlertTriangle } from "lucide-react";

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

export const RelayPipeline = ({ foodLevel, onStationLearned }: RelayPipelineProps) => {
  const [activeStations, setActiveStations] = useState<string[]>([]);
  const [clickedStations, setClickedStations] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

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
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [foodLevel]);

  const getStationIntensity = (stationId: string) => {
    if (!activeStations.includes(stationId)) {
      return 0.2; // Inactive stations
    }

    switch (foodLevel) {
      case "low":
        return stationId === "no3" ? 0.9 : 0.2;
      case "medium":
        if (stationId === "no3") return 0.8;
        if (stationId === "no2") return 0.7;
        return 0.2;
      case "high":
        // High activity across all steps, but N₂O might spike due to crowding
        if (stationId === "no3") return 0.9;
        if (stationId === "no2") return 0.8; 
        if (stationId === "n2o") return 0.9; // High due to potential bottleneck
        if (stationId === "n2") return 0.7; // Finish line processing
        return 0.2;
      default:
        return 0.2;
    }
  };

  const handleStationClick = (stationId: string) => {
    if (!clickedStations.has(stationId)) {
      setClickedStations(prev => new Set([...prev, stationId]));
      onStationLearned?.(stationId);
    }
  };

  const getStationBorderColor = (station: typeof stations[0], isActive: boolean) => {
    if (clickedStations.has(station.id)) {
      return "border-emerald-500/50 bg-emerald-500/5";
    }
    if (isActive) {
      return "border-primary/50 bg-primary/5";
    }
    return "border-white/10 bg-white/0";
  };

  return (
    <div className="space-y-8">
      {/* Educational Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <DenitrificationTooltip>
            <h3 className="text-xl font-semibold">The 4-Step Nitrogen Relay</h3>
          </DenitrificationTooltip>
        </div>
        
        <div className="glass-subtle rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ModularTooltip>
              <span className="cursor-help border-b border-dotted border-primary/50">
                Most microbes run only 1-2 steps
              </span>
            </ModularTooltip>
            <span>•</span>
            <span>Each step requires different enzymes</span>
            <span>•</span>
            <N2OTooltip>
              <span className="cursor-help border-b border-dotted border-coral-cta/50">
                N₂O escapes if relay gets crowded
              </span>
            </N2OTooltip>
          </div>
        </div>
      </div>

      {/* Animated Relay Flow */}
      <div className="glass-subtle rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-primary">Live Relay Activity</h4>
          <div className="text-xs text-muted-foreground">
            Active Steps: {activeStations.length}/4
          </div>
        </div>
        <RelayAnimation foodLevel={foodLevel} activeStations={activeStations} />
      </div>

      {/* Interactive Station Details */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stations.map((station, index) => {
          const intensity = getStationIntensity(station.id);
          const isActive = activeStations.includes(station.id);
          const isLearned = clickedStations.has(station.id);

          return (
            <div
              key={station.id}
              className={`rounded-2xl border p-5 cursor-pointer transition-all duration-500 hover:scale-105 ${
                getStationBorderColor(station, isActive)
              } ${isAnimating && isActive ? "animate-pulse" : ""}`}
              onClick={() => handleStationClick(station.id)}
            >
              {/* Station Header */}
              <div className="text-center space-y-3 mb-4">
                <div className="flex items-center justify-center">
                  <MicrobeAvatar 
                    stationId={station.id} 
                    intensity={intensity} 
                    foodLevel={foodLevel} 
                  />
                  {isLearned && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/80">
                    Step {index + 1}
                  </div>
                  <div 
                    className="text-xl font-bold"
                    style={{ color: isActive ? station.color : "hsl(var(--muted-foreground))" }}
                  >
                    {station.label}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {station.name}
                  </div>
                </div>
              </div>

              {/* Station Process */}
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-xs font-semibold text-primary mb-1">
                    PROCESS
                  </div>
                  <div className="text-sm font-mono bg-black/20 rounded-lg p-2">
                    {station.process}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground leading-relaxed">
                  {station.description}
                </div>

                {/* Activity Indicator */}
                <div className="flex items-center justify-center gap-2">
                  {isActive ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs text-primary font-semibold">ACTIVE</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-muted" />
                      <span className="text-xs text-muted-foreground">DORMANT</span>
                    </>
                  )}
                </div>

                {/* Specialist Info (revealed on click) */}
                {isLearned && (
                  <div className="glass-intense rounded-lg p-3 space-y-2 animate-fade-in">
                    <div className="text-xs font-semibold text-accent">
                      SPECIALIST STRATEGY
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {station.specialists}
                    </div>
                    <div className="text-xs font-semibold text-coral-cta">
                      REAL WORLD
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {station.realWorld}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Summary */}
      <div className="glass-intense rounded-2xl p-6 border border-primary/30">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/20">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-primary">
              Key Learning: Why Modularity Matters
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {foodLevel === "low" && 
                "With scarce food, only first-step specialists can afford to stay active. They efficiently process nitrate but pass the baton quickly to conserve energy."
              }
              {foodLevel === "medium" && 
                "Moderate food allows coexistence! First and second-step specialists work together, creating a two-step relay that reaches nitrite consistently."
              }
              {foodLevel === "high" && 
                "Abundant food supports multi-step teams with complete enzyme toolkits. Watch the N₂O gauge - when all steps are active, bottlenecks can cause greenhouse gas spikes!"
              }
            </p>
            
            {foodLevel === "high" && (
              <div className="flex items-center gap-2 mt-3 p-2 bg-coral-cta/10 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-coral-cta" />
                <span className="text-xs text-coral-cta font-semibold">
                  High activity can overwhelm the finish line, causing N₂O escape
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          {stations.map((station) => (
            <div
              key={station.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                clickedStations.has(station.id) ? "bg-emerald-500 scale-110" : "bg-muted/50"
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Stations explored: {clickedStations.size}/4 • Click stations to learn more
        </div>
      </div>
    </div>
  );
};
