import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FoodLevel } from "@/pages/Relay";
import { Waves, Anchor, MapPin, ExternalLink } from "lucide-react";

interface RelevanceRibbonProps {
  onSliderChange: (level: FoodLevel) => void;
}

const storyCards = [
  {
    id: "algae-bloom",
    title: "After the Bloom",
    subtitle: "Coastal Eutrophication",
    icon: Waves,
    image: "🌊",
    description: "Extra nutrients fuel algae; as blooms die, food (organic matter) pulses sink to the seafloor.",
    impact: "Short, intense N₂O hot moments can appear during/after pulses; fish and shellfish can be stressed by low-oxygen episodes.",
    action: "Set Food to High and watch multiple steps light up; note the N₂O gauge bump.",
    recommendedLevel: "high" as FoodLevel,
    color: "hsl(var(--coral-cta))"
  },
  {
    id: "twilight-zone", 
    title: "Open-Ocean Twilight Zone",
    subtitle: "Deep Blue Scarcity",
    icon: Anchor,
    image: "🌌",
    description: "Away from coasts, sinking particles are slower/leaner → food is scarce in the deep ocean.",
    impact: "The first step (NO₃⁻→NO₂⁻) is widespread here; it helps explain why we find lots of genes for this early module in many ocean regions.",
    action: "Set Food to Low; see first-step specialists dominate and the N₂O gauge stay modest.",
    recommendedLevel: "low" as FoodLevel,
    color: "hsl(var(--teal-glow))"
  },
  {
    id: "river-mouth",
    title: "River Mouth to Shelf", 
    subtitle: "Variable Conditions",
    icon: MapPin,
    image: "🏞️",
    description: "Runoff delivers nutrients that periodically boost food; conditions swing between lean and rich.",
    impact: "Coexistence pops up as conditions change, and the handoff molecule can shift—sometimes toward N₂O during richer periods.",
    action: "Slide Food from Low → Medium and watch more stations glow together.",
    recommendedLevel: "medium" as FoodLevel,
    color: "hsl(var(--omz-violet))"
  }
];

export const RelevanceRibbon = ({ onSliderChange }: RelevanceRibbonProps) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleTryThis = (card: typeof storyCards[0]) => {
    onSliderChange(card.recommendedLevel);
    setSelectedCard(card.id);
    
    // Remove selection after animation
    setTimeout(() => setSelectedCard(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border border-primary/20 text-sm text-primary font-semibold mb-4">
          <ExternalLink className="w-4 h-4" />
          Real-World Connections
        </div>
        
        <h2 className="text-3xl font-bold mb-3">Why Scientists Care</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tap any card to explore real ocean scenarios. Each shows how food levels drive the relay in different environments.
        </p>
      </div>

      {/* Story cards ribbon */}
      <div className="grid md:grid-cols-3 gap-6">
        {storyCards.map((card) => {
          const IconComponent = card.icon;
          const isSelected = selectedCard === card.id;
          
          return (
            <div
              key={card.id}
              className={`glass-intense rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-105 cursor-pointer group ${
                isSelected ? "scale-105 shadow-2xl ring-2 ring-primary/50" : ""
              }`}
              style={{ borderColor: `${card.color}30` }}
              onClick={() => setSelectedCard(card.id)}
            >
              {/* Card header */}
              <div 
                className="p-6 relative overflow-hidden"
                style={{ backgroundColor: `${card.color}10` }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="text-6xl absolute top-4 right-4 opacity-30">
                    {card.image}
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <IconComponent 
                        className="w-5 h-5"
                        style={{ color: card.color }}
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {card.title}
                      </h3>
                      <p className="text-sm" style={{ color: card.color }}>
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                    What's happening:
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                    Why it matters:
                  </h4>
                  <p className="text-sm text-foreground leading-relaxed">
                    {card.impact}
                  </p>
                </div>

                {/* Try this button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTryThis(card);
                  }}
                  className={`w-full mt-4 font-semibold transition-all duration-300 group-hover:scale-105 ${
                    isSelected ? "animate-pulse" : ""
                  }`}
                  style={{ 
                    backgroundColor: card.color,
                    color: "white"
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span>Try This Scenario</span>
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </Button>

                {/* Action description */}
                <div className="text-xs text-muted-foreground text-center p-3 glass-subtle rounded-lg">
                  {card.action}
                </div>
              </div>

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-primary animate-ping" />
              )}
            </div>
          );
        })}
      </div>

      {/* Summary message */}
      <div className="text-center p-6 glass-subtle rounded-xl border border-primary/20">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-primary">The ocean relay varies by location.</strong> From nutrient-rich coastal waters to the sparse deep sea, 
          food availability shapes which microbes dominate—and how much N₂O gets released into our atmosphere.
        </p>
      </div>
    </div>
  );
};