import { useEffect, useState } from "react";
import { X, MapPin, Clock, TrendingUp, Waves, HelpCircle } from "lucide-react";
import { FoodLevel } from "@/pages/Relay";

interface ContextModalProps {
  isOpen: boolean;
  onClose: () => void;
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
    microbialStrategy: "First-step specialists 'travel light' with minimal enzymes",
    n2oRisk: "Low - limited microbial activity",
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
    microbialStrategy: "Coexistence of multiple specialist teams",
    n2oRisk: "Medium - relay reaches nitrite stage",
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
    microbialStrategy: "Multi-step teams with complete enzyme toolkits",
    n2oRisk: "High - bottlenecks cause greenhouse gas spikes",
    color: "hsl(var(--coral-cta))",
    bgGradient: "from-red-900/20 to-orange-800/10"
  }
};

export const ContextModal = ({ isOpen, onClose, foodLevel }: ContextModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const scenario = scenarios[foodLevel];
  const IconComponent = scenario.icon;

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative max-w-4xl max-h-[90vh] w-full overflow-hidden rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 ${
          isAnimating ? "scale-100" : "scale-95"
        }`}
        style={{
          background: `linear-gradient(135deg, ${scenario.bgGradient}), 
                      linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`
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

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 z-10 p-3 rounded-full glass-subtle border border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <X className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
        </button>

        {/* Content */}
        <div className="relative z-10 p-8 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div 
              className="p-4 rounded-2xl border backdrop-blur-sm"
              style={{ 
                backgroundColor: `${scenario.color}20`,
                borderColor: `${scenario.color}30`
              }}
            >
              <IconComponent 
                className="w-8 h-8"
                style={{ color: scenario.color }}
              />
            </div>
            
            <div>
              <h2 
                className="text-3xl font-bold transition-colors duration-500 mb-2"
                style={{ color: scenario.color }}
              >
                {scenario.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {scenario.location}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 mb-8">
            <div className="glass-intense rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-foreground mb-3">Scenario Overview</h3>
              <p className="text-foreground leading-relaxed text-lg mb-4">
                {scenario.description}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {scenario.context}
              </p>
            </div>
          </div>

          {/* Key metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-subtle rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5" style={{ color: scenario.color }} />
                <span className="text-sm font-semibold" style={{ color: scenario.color }}>TIME SCALE</span>
              </div>
              <p className="text-foreground font-medium">
                {scenario.timeScale}
              </p>
            </div>
            
            <div className="glass-subtle rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-coral-cta" />
                <span className="text-sm font-semibold text-coral-cta">N₂O IMPACT</span>
              </div>
              <p className="text-foreground font-medium">
                {scenario.n2oImpact}
              </p>
            </div>

            <div className="glass-subtle rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5" style={{ color: scenario.color }} />
                <span className="text-sm font-semibold" style={{ color: scenario.color }}>MICROBIAL STRATEGY</span>
              </div>
              <p className="text-foreground font-medium">
                {scenario.microbialStrategy}
              </p>
            </div>

            <div className="glass-subtle rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-semibold text-amber-400">GREENHOUSE RISK</span>
              </div>
              <p className="text-foreground font-medium">
                {scenario.n2oRisk}
              </p>
            </div>
          </div>

          {/* Real-world significance */}
          <div className="glass-intense rounded-2xl p-6 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-3">
                  🌍 Why This Matters for Our Planet
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {scenario.realWorld}
                </p>
              </div>
            </div>
          </div>

          {/* Visual indicator */}
          <div className="flex items-center justify-center mt-8 p-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full animate-pulse"
                style={{ backgroundColor: scenario.color }}
              />
              <span className="text-muted-foreground">
                Currently observing: <span style={{ color: scenario.color }} className="font-semibold">
                  {scenario.title}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};