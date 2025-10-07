import { useEffect, useState } from "react";
import { FoodLevel } from "@/pages/Relay";
import { MapPin, Clock, TrendingUp, Waves } from "lucide-react";

interface ScenarioCardProps {
  foodLevel: FoodLevel;
}

const scenarios = {
  low: {
    icon: Waves,
    title: "Open-Ocean Twilight Zone",
    location: "Deep ocean (200-1000m depth)",
    description: "Sparse food particles sink slowly through the water column",
    context: "In the ocean's twilight zone, food is scarce and oxygen levels are low. First-step specialists dominate because they can efficiently process nitrate with minimal energy investment.",
    realWorld: "This represents ~95% of ocean volume where denitrification occurs at a steady, low rate.",
    n2oImpact: "Minimal N₂O production due to limited microbial activity",
    timeScale: "Continuous, year-round process",
    color: "hsl(var(--teal-glow))",
    bgGradient: "from-blue-900/20 to-blue-800/10"
  },
  medium: {
    icon: MapPin,
    title: "River Mouth & Shelf Waters",
    location: "Coastal margins (0-200m depth)",
    description: "Seasonal pulses of nutrients and organic matter",
    context: "River mouths bring variable nutrient loads throughout the year. This creates dynamic conditions where different microbial specialists can coexist as food availability shifts.",
    realWorld: "These transition zones support diverse microbial communities and significant fisheries.",
    n2oImpact: "Moderate N₂O pulses during high nutrient periods",
    timeScale: "Seasonal cycles, storm events",
    color: "hsl(var(--omz-violet))",
    bgGradient: "from-violet-900/20 to-purple-800/10"
  },
  high: {
    icon: TrendingUp,
    title: "Fresh Bloom Fallout",
    location: "Post-bloom zones, upwelling areas",
    description: "Concentrated organic matter from algae blooms sinks rapidly",
    context: "After massive algae blooms, carbon-rich particles create hotspots of microbial activity. Multi-step specialists thrive but can overwhelm the finish line, causing N₂O 'hot moments.'",
    realWorld: "These events create brief but intense greenhouse gas emissions that affect global climate.",
    n2oImpact: "High N₂O spikes during bloom decay - major climate concern",
    timeScale: "Days to weeks after bloom events",
    color: "hsl(var(--coral-cta))",
    bgGradient: "from-red-900/20 to-orange-800/10"
  }
};

export const ScenarioCard = ({ foodLevel }: ScenarioCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousLevel, setPreviousLevel] = useState<FoodLevel>(foodLevel);

  useEffect(() => {
    if (foodLevel !== previousLevel) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPreviousLevel(foodLevel);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [foodLevel, previousLevel]);

  const scenario = scenarios[foodLevel];
  const IconComponent = scenario.icon;

  return (
    <div className={`transition-all duration-700 ${isAnimating ? "scale-105" : "scale-100"}`}>
      <div 
        className={`relative rounded-2xl border border-white/20 p-6 overflow-hidden transition-all duration-700 ${
          isAnimating ? "shadow-2xl" : "shadow-lg"
        }`}
        style={{
          background: `linear-gradient(135deg, ${scenario.bgGradient})`
        }}
      >
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${scenario.color}20 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, ${scenario.color}15 0%, transparent 50%)`
          }}
        />

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-xl border"
              style={{ 
                backgroundColor: `${scenario.color}20`,
                borderColor: `${scenario.color}30`
              }}
            >
              <IconComponent 
                className="w-6 h-6"
                style={{ color: scenario.color }}
              />
            </div>
            
            <div>
              <h3 
                className="text-xl font-bold transition-colors duration-500"
                style={{ color: scenario.color }}
              >
                {scenario.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {scenario.location}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-foreground leading-relaxed">
              {scenario.description}
            </p>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {scenario.context}
            </p>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-subtle rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">TIME SCALE</span>
              </div>
              <p className="text-sm text-foreground">
                {scenario.timeScale}
              </p>
            </div>
            
            <div className="glass-subtle rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">N₂O IMPACT</span>
              </div>
              <p className="text-sm text-foreground">
                {scenario.n2oImpact}
              </p>
            </div>
          </div>

          {/* Real-world significance */}
          <div className="glass-intense rounded-lg p-4 border border-white/10">
            <h4 className="text-sm font-semibold text-primary mb-2">
              🌍 Why This Matters
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {scenario.realWorld}
            </p>
          </div>

          {/* Visual indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: scenario.color }}
              />
              <span className="text-xs text-muted-foreground">
                Currently observing: {scenario.title}
              </span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Food Level: <span style={{ color: scenario.color }} className="font-semibold">
                {foodLevel.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Animation overlay */}
        {isAnimating && (
          <div 
            className="absolute inset-0 opacity-20 animate-pulse"
            style={{ backgroundColor: scenario.color }}
          />
        )}
      </div>
    </div>
  );
};