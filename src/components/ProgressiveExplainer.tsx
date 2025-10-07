import { useEffect, useState } from "react";
import { FoodLevel } from "@/pages/Relay";
import { ArrowRight, Users, Zap, AlertTriangle, Lightbulb } from "lucide-react";

interface ProgressiveExplainerProps {
  foodLevel: FoodLevel;
  onConceptLearned: (concept: string) => void;
}

const concepts = {
  relay: {
    icon: ArrowRight,
    title: "The 4-Step Relay",
    description: "Denitrification is like a relay race with 4 hand-offs: NO₃⁻ → NO₂⁻ → N₂O → N₂",
    detail: "Each step requires different enzymes, so most microbes specialize in just 1-2 steps rather than the full pathway."
  },
  modular: {
    icon: Users,
    title: "Modular Teams",
    description: "Most microbes only run one or two steps—not the complete relay",
    detail: "This modular approach lets specialists excel at their step, but requires teamwork to complete the full pathway."
  },
  food: {
    icon: Lightbulb,
    title: "Food Controls Teams",
    description: "Low food favors 'travel light' specialists, high food allows multi-step teams",
    detail: "When food is scarce, single-step specialists dominate. With abundant food, multi-step microbes can afford bigger enzyme toolkits."
  },
  n2o: {
    icon: AlertTriangle,
    title: "N₂O Greenhouse Gas",
    description: "N₂O builds up when the relay gets crowded at the finish line",
    detail: "If later steps can't keep up with earlier ones, the greenhouse gas N₂O escapes before being converted to harmless N₂."
  }
};

export const ProgressiveExplainer = ({ foodLevel, onConceptLearned }: ProgressiveExplainerProps) => {
  const [currentConcept, setCurrentConcept] = useState<keyof typeof concepts>("relay");
  const [isAnimating, setIsAnimating] = useState(false);
  const [learnedConcepts, setLearnedConcepts] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Progress through concepts based on food level
    switch (foodLevel) {
      case "low":
        if (currentConcept !== "food") {
          setCurrentConcept("food");
          triggerAnimation();
        }
        break;
      case "medium":
        if (currentConcept !== "modular") {
          setCurrentConcept("modular");
          triggerAnimation();
        }
        break;
      case "high":
        if (currentConcept !== "n2o") {
          setCurrentConcept("n2o");
          triggerAnimation();
        }
        break;
    }
  }, [foodLevel, currentConcept]);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleConceptClick = (conceptKey: string) => {
    if (!learnedConcepts.has(conceptKey)) {
      setLearnedConcepts(prev => new Set([...prev, conceptKey]));
      onConceptLearned(conceptKey);
    }
  };

  const concept = concepts[currentConcept];
  const IconComponent = concept.icon;

  return (
    <div className="space-y-6">
      {/* Main concept card */}
      <div 
        className={`glass-intense rounded-2xl p-6 border transition-all duration-700 cursor-pointer hover:scale-105 ${
          isAnimating ? "animate-pulse scale-105" : ""
        } ${learnedConcepts.has(currentConcept) ? "border-primary/50 bg-primary/5" : "border-white/20"}`}
        onClick={() => handleConceptClick(currentConcept)}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">
                {concept.title}
              </h3>
              {learnedConcepts.has(currentConcept) && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs text-white">✓</span>
                </div>
              )}
            </div>
            
            <p className="text-foreground/90 leading-relaxed">
              {concept.description}
            </p>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {concept.detail}
            </p>
          </div>
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center justify-center gap-3">
        {Object.keys(concepts).map((key, index) => {
          const isActive = key === currentConcept;
          const isLearned = learnedConcepts.has(key);
          
          return (
            <div
              key={key}
              className={`w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${
                isLearned ? "bg-primary scale-110 shadow-lg shadow-primary/50" : 
                isActive ? "bg-primary/60 scale-105" : "bg-muted/50"
              }`}
              onClick={() => {
                setCurrentConcept(key as keyof typeof concepts);
                triggerAnimation();
              }}
            />
          );
        })}
      </div>

      {/* Food level specific insights */}
      <div className="glass-subtle rounded-xl p-4">
        <h4 className="text-sm font-semibold text-primary mb-2">
          Current Food Level: {foodLevel.charAt(0).toUpperCase() + foodLevel.slice(1)}
        </h4>
        <div className="text-sm text-muted-foreground">
          {foodLevel === "low" && (
            <p>
              <strong>First-step specialists dominate:</strong> Low food favors microbes that "travel light" 
              with minimal enzyme sets. They efficiently grab nitrate but pass the baton quickly.
            </p>
          )}
          {foodLevel === "medium" && (
            <p>
              <strong>Coexistence emerges:</strong> Moderate food allows multiple specialist teams to work 
              together. Notice how the relay reaches the nitrite step consistently.
            </p>
          )}
          {foodLevel === "high" && (
            <p>
              <strong>Multi-step teams flourish:</strong> Abundant food supports microbes with complete 
              enzyme toolkits. Watch for N₂O spikes when the finish line gets crowded.
            </p>
          )}
        </div>
      </div>

      {/* Learning progress */}
      <div className="text-center">
        <div className="text-sm text-muted-foreground">
          Concepts learned: <span className="text-primary font-semibold">{learnedConcepts.size}/4</span>
        </div>
        {learnedConcepts.size === 4 && (
          <div className="mt-2 text-sm text-emerald-400 font-semibold animate-pulse">
            🎉 All core concepts mastered!
          </div>
        )}
      </div>
    </div>
  );
};