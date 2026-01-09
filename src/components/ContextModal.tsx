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
    description: "Particles sink slowly and food stays scarce year-round.",
    context: "In the twilight zone, first-step specialists lead. They convert nitrate to nitrite and use few enzymes, which helps when food is limited.",
    realWorld: "This zone covers most of the open ocean. What happens here sets the baseline for global nitrogen.",
    n2oImpact: "Low. The relay rarely gets past step 1.",
    timeScale: "Ongoing through the year",
    microbialStrategy: "First-step specialists dominate. They need less energy.",
    n2oRisk: "Low. Little N₂O builds up.",
    color: "hsl(var(--teal-glow))",
    bgGradient: "from-blue-900/20 to-blue-800/10",
    image: deepSeaImg
  },
  medium: {
    icon: MapPin,
    title: "River Mouth & Shelf Waters",
    location: "Coastal areas, roughly 0–200 m",
    description: "Rivers and storms bring pulses of food.",
    context: "When levels rise, the relay moves further and N₂O can form at the handoffs.",
    realWorld: "These waters support fisheries and coastal life. Changes in the relay affect water quality and local food webs.",
    n2oImpact: "Medium. Spikes happen after nutrient pulses.",
    timeScale: "Seasonal cycles and storm events",
    microbialStrategy: "Mixed teams. Different specialists take turns as conditions shift.",
    n2oRisk: "Medium. Handoffs can bottleneck.",
    color: "hsl(var(--omz-violet))",
    bgGradient: "from-violet-900/20 to-purple-800/10",
    image: riverMouthImg
  },
  high: {
    icon: TrendingUp,
    title: "Fresh Bloom Fallout",
    location: "Areas after algal blooms or strong upwelling",
    description: "After a bloom, food floods in fast.",
    context: "N₂O producers ramp up quickly, but the microbes that convert N₂O to safe nitrogen take longer to catch up.",
    realWorld: "These short events punch above their weight. Brief bursts can release significant N₂O.",
    n2oImpact: "High during the pulse. Drops once finishers catch up.",
    timeScale: "Days to weeks after a bloom",
    microbialStrategy: "Multi-step microbes thrive, but the final-step converters lag behind at first.",
    n2oRisk: "High during bloom decay. These short bursts can release a lot of N₂O.",
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
        className={`relative max-w-4xl max-h-[90vh] w-full overflow-hidden rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300 ${isAnimating ? "scale-100" : "scale-95"
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
          <div className="flex flex-col gap-2 mb-8">
            <h2
              className="text-4xl font-bold transition-colors duration-500 mb-2"
              style={{ color: scenario.color }}
            >
              {scenario.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {scenario.location}
            </p>
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
              <div className="mb-2">
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: scenario.color }}>TIME SCALE</span>
              </div>
              <p className="text-foreground font-medium text-lg">
                {scenario.timeScale}
              </p>
            </div>

            <div className="glass-subtle rounded-xl p-5 border border-white/10">
              <div className="mb-2">
                <span className="text-sm font-semibold uppercase tracking-wider text-coral-cta">N₂O IMPACT</span>
              </div>
              <p className="text-foreground font-medium text-lg">
                {scenario.n2oImpact}
              </p>
            </div>

            <div className="glass-subtle rounded-xl p-5 border border-white/10">
              <div className="mb-2">
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: scenario.color }}>MICROBIAL STRATEGY</span>
              </div>
              <p className="text-foreground font-medium text-lg">
                {scenario.microbialStrategy}
              </p>
            </div>

            <div className="glass-subtle rounded-xl p-5 border border-white/10">
              <div className="mb-2">
                <span className="text-sm font-semibold uppercase tracking-wider text-amber-400">GREENHOUSE RISK</span>
              </div>
              <p className="text-foreground font-medium text-lg">
                {scenario.n2oRisk}
              </p>
            </div>
          </div>

          {/* Real-world significance */}
          <div className="glass-intense rounded-2xl p-6 border border-primary/20">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Why This Matters for Our Planet
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {scenario.realWorld}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};