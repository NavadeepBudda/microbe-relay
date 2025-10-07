import { useEffect, useState } from "react";
import { MapPin, Clock, TrendingUp, Waves, HelpCircle } from "lucide-react";
import { FoodLevel } from "@/pages/Relay";

// Import images
import deepSeaImg from "/images/deep-sea.jpg";
import riverMouthImg from "/images/river-mouth.jpg";
import algaeBloomImg from "/images/algea-bloom.jpeg";

interface ContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  foodLevel: FoodLevel;
}

const scenarios = {
  low: {
    icon: Waves,
    title: "Open-Ocean Twilight Zone",
    location: "Deep ocean, about 200–1000 m",
    description: "Small particles sink slowly. Food is scarce.",
    context: "In the twilight zone, first-step specialists lead. They convert nitrate to nitrite and use few enzymes, which helps when food is limited.",
    realWorld: "This zone covers much of the open ocean. Even slow, steady processing here shapes background nitrogen levels.",
    n2oImpact: "Low. Mid-steps stay quiet most of the time.",
    timeScale: "Ongoing through the year",
    microbialStrategy: "First-step specialists 'travel light' and dominate.",
    n2oRisk: "Low — little N₂O builds up",
    color: "hsl(var(--teal-glow))",
    bgGradient: "from-blue-900/20 to-blue-800/10",
    image: deepSeaImg
  },
  medium: {
    icon: MapPin,
    title: "River Mouth & Shelf Waters",
    location: "Coastal areas, roughly 0–200 m",
    description: "Rivers and storms bring pulses of nutrients and organic matter.",
    context: "Food levels rise and fall. Different specialists can coexist. When food rises, the relay moves beyond the first step and N₂O can form.",
    realWorld: "These waters support fisheries and coastal life. Changes in the relay affect water quality and local food webs.",
    n2oImpact: "Medium. Short pulses appear during high-nutrient periods.",
    timeScale: "Seasonal cycles and storm events",
    microbialStrategy: "Mix of specialists. Coexistence as conditions shift.",
    n2oRisk: "Medium — mid-steps activate and can make N₂O",
    color: "hsl(var(--omz-violet))",
    bgGradient: "from-violet-900/20 to-purple-800/10",
    image: riverMouthImg
  },
  high: {
    icon: TrendingUp,
    title: "Fresh Bloom Fallout",
    location: "Areas after algal blooms or strong upwelling",
    description: "After a bloom, carbon-rich particles sink fast. Food becomes abundant.",
    context: "Multi-step teams switch on. They can outpace the finishers, which lets N₂O build up before it turns into N₂.",
    realWorld: "These brief events can release strong bursts of N₂O, which adds to climate warming.",
    n2oImpact: "High. Spikes can occur during bloom decay.",
    timeScale: "Days to weeks after a bloom",
    microbialStrategy: "Multi-step specialists thrive; finishers may lag.",
    n2oRisk: "High — bottlenecks can cause N₂O hot moments",
    color: "hsl(var(--coral-cta))",
    bgGradient: "from-red-900/20 to-orange-800/10",
    image: algaeBloomImg
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

          {/* Image */}
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={scenario.image} 
                alt={scenario.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
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