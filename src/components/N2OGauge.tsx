import { useEffect, useState } from "react";
import { AlertTriangle, Info, TrendingUp, Thermometer, HelpCircle } from "lucide-react";
import { HelpTooltip, N2OTooltip } from "@/components/HelpTooltip";

interface N2OGaugeProps {
  level: "low" | "medium" | "high";
  onEducationalClick?: () => void;
}

export const N2OGauge = ({ level, onEducationalClick }: N2OGaugeProps) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [previousLevel, setPreviousLevel] = useState<"low" | "medium" | "high">("low");
  const [showDetails, setShowDetails] = useState(false);

  // Trigger pulse animation on level changes
  useEffect(() => {
    if (level !== previousLevel) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 1200);
      setPreviousLevel(level);
      return () => clearTimeout(timer);
    }
  }, [level, previousLevel]);

  const getLevelConfig = (currentLevel: "low" | "medium" | "high") => {
    switch (currentLevel) {
      case "low":
        return {
          percentage: 20,
          color: "hsl(var(--teal-glow))",
          bgColor: "hsl(var(--teal-glow) / 0.1)",
          label: "Low",
          description: "Minimal N₂O production",
          explanation: "Only first-step specialists are active, so very little N₂O is produced",
          climateImpact: "Negligible contribution to greenhouse warming",
          relayStatus: "Single-step operation, baton rarely passed beyond nitrate",
          realWorld: "Typical of deep ocean twilight zones where food is scarce",
          co2Equivalent: "~60x CO₂ warming potential",
          intensity: 0.3
        };
      case "medium":
        return {
          percentage: 55,
          color: "hsl(var(--omz-violet))",
          bgColor: "hsl(var(--omz-violet) / 0.1)", 
          label: "Medium",
          description: "Moderate N₂O levels",
          explanation: "Two-step relay reaches nitrite, producing modest N₂O levels",
          climateImpact: "Moderate contribution to ocean greenhouse gas emissions",
          relayStatus: "Coexistence allows second step activation, N₂O as intermediate",
          realWorld: "Common in coastal margins and river mouths during seasonal cycles",
          co2Equivalent: "~300x CO₂ warming potential",
          intensity: 0.6
        };
      case "high":
        return {
          percentage: 85,
          color: "hsl(var(--coral-cta))",
          bgColor: "hsl(var(--coral-cta) / 0.1)",
          label: "High",
          description: "Elevated greenhouse gas",
          explanation: "Full relay active but finish line gets crowded, causing N₂O escape",
          climateImpact: "Significant greenhouse gas emissions - major climate concern",
          relayStatus: "Bottleneck at final step allows N₂O buildup before conversion to N₂",
          realWorld: "Occurs during bloom decay events and in high-productivity zones",
          co2Equivalent: "~300x CO₂ warming potential",
          intensity: 0.9
        };
    }
  };

  const config = getLevelConfig(level);

  return (
    <div className="space-y-6">
      {/* Header with educational context */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <N2OTooltip>
            <h3 className="text-lg font-semibold cursor-help border-b border-dotted border-coral-cta/50">
              N₂O Greenhouse Gas Monitor
            </h3>
          </N2OTooltip>
        </div>
        <p className="text-sm text-muted-foreground">
          Tracks nitrous oxide emissions from the denitrification relay
        </p>
      </div>

      {/* Enhanced gauge container */}
      <div className="glass-subtle rounded-xl p-4 space-y-4">
        {/* Gauge header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">CURRENT LEVEL</span>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Info className="w-3 h-3" />
            <span>Details</span>
          </button>
        </div>

        {/* Main gauge */}
        <div className="relative">
          {/* Background track */}
          <div className="w-full h-8 rounded-full glass-intense border border-muted/30 overflow-hidden">
            {/* Gradient background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: "linear-gradient(90deg, hsl(var(--teal-glow)) 0%, hsl(var(--omz-violet)) 50%, hsl(var(--coral-cta)) 100%)"
              }}
            />
            
            {/* Fill bar */}
            <div
              className={`h-full transition-all duration-1000 ease-out relative overflow-hidden ${
                isPulsing ? "animate-pulse" : ""
              }`}
              style={{
                width: `${config.percentage}%`,
                background: `linear-gradient(90deg, ${config.color} 0%, ${config.color}dd 100%)`,
                boxShadow: `0 0 20px ${config.color}40`
              }}
            >
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                  animation: level === "high" ? "shimmer 2s ease-in-out infinite" : "none"
                }}
              />

              {/* Danger zone indicator */}
              {level === "high" && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <AlertTriangle className="w-4 h-4 text-white animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Level markers */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-1">
            {[
              { label: "Low", pos: 20, threshold: "Safe" },
              { label: "Medium", pos: 55, threshold: "Moderate" }, 
              { label: "High", pos: 85, threshold: "Concern" }
            ].map((marker, index) => {
              const isActive = 
                (marker.label === "Low" && level === "low") ||
                (marker.label === "Medium" && level === "medium") ||
                (marker.label === "High" && level === "high");
              
              return (
                <div
                  key={marker.label}
                  className="relative"
                  style={{ left: `${marker.pos - 20}%` }}
                >
                  <div className={`w-1 h-4 rounded-full transition-all duration-500 ${
                    isActive ? "bg-primary scale-110 shadow-lg shadow-primary/50" : "bg-muted/50"
                  }`} />
                  <div className={`text-xs mt-1 font-medium transition-colors duration-500 text-center ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {marker.label}
                  </div>
                  <div className="text-xs text-muted-foreground/70 text-center">
                    {marker.threshold}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current level display */}
      <div 
        className="glass-intense rounded-xl p-4 border transition-all duration-500"
        style={{ borderColor: `${config.color}40`, backgroundColor: config.bgColor }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {level === "high" && (
              <AlertTriangle 
                className={`w-6 h-6 text-coral-cta ${isPulsing ? "animate-pulse" : ""}`}
              />
            )}
            <div>
              <div className="text-xl font-bold" style={{ color: config.color }}>
                {config.label} N₂O
              </div>
              <div className="text-sm text-muted-foreground">
                {config.description}
              </div>
            </div>
          </div>
          
          {/* Percentage display */}
          <div className="text-right">
            <div className="text-3xl font-bold" style={{ color: config.color }}>
              {config.percentage}%
            </div>
            <div className="text-xs text-muted-foreground">
              Relative Level
            </div>
          </div>
        </div>

        {/* Quick explanation */}
        <div className="mt-3 p-3 glass-subtle rounded-lg">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {config.explanation}
          </p>
        </div>
      </div>

      {/* Detailed information (expandable) */}
      {showDetails && (
        <div className="glass-intense rounded-xl p-4 border border-primary/30 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-primary">N₂O Impact Analysis</h4>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-accent mb-1">RELAY STATUS</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {config.relayStatus}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-coral-cta mb-1">CLIMATE IMPACT</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {config.climateImpact}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold text-primary mb-1">REAL WORLD</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {config.realWorld}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">WARMING POTENTIAL</div>
                <p className="text-sm text-muted-foreground">
                  {config.co2Equivalent}
                </p>
              </div>
            </div>
          </div>

          {/* Educational callout */}
          <div className="glass-subtle rounded-lg p-3 border border-primary/20">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h5 className="text-sm font-semibold text-primary mb-1">
                  Why N₂O Matters for Climate
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nitrous oxide persists in the atmosphere for ~120 years and is 300x more potent than CO₂. 
                  Ocean denitrification produces ~40% of global N₂O emissions, making microbial relay 
                  efficiency crucial for climate regulation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warning message for high levels */}
      {level === "high" && (
        <div className={`p-4 rounded-xl border border-coral-cta/30 bg-coral-cta/10 ${
          isPulsing ? "animate-pulse" : ""
        }`}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-coral-cta mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-coral-cta mb-1">
                Climate Alert: High N₂O Emissions
              </h4>
              <p className="text-sm text-coral-cta/90 leading-relaxed">
                The relay is producing significant greenhouse gas emissions. This occurs when 
                abundant food creates bottlenecks at the finish line, allowing N₂O to escape 
                before being converted to harmless N₂.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ARIA live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Greenhouse Gas Indicator: {config.label} level at {config.percentage} percent. {config.description}. {config.explanation}
      </div>
    </div>
  );
};