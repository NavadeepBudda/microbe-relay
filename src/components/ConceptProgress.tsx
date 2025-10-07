import { useEffect, useState } from "react";
import { Check, ArrowRight, Users, Zap, AlertTriangle, Globe } from "lucide-react";

interface ConceptProgressProps {
  learnedConcepts: string[];
  onAllConceptsLearned: () => void;
}

const requiredConcepts = [
  {
    id: "relay",
    icon: ArrowRight,
    title: "4-Step Relay Structure",
    description: "NO₃⁻ → NO₂⁻ → N₂O → N₂ (nitrate → nitrite → nitrous oxide → nitrogen gas)",
    detail: "Each step requires different enzymes and environmental conditions"
  },
  {
    id: "modular",
    icon: Users,
    title: "Modular Participation", 
    description: "Most microbes run only 1-2 steps, not the complete pathway",
    detail: "Specialists excel at their step but require teamwork for full completion"
  },
  {
    id: "food",
    icon: Zap,
    title: "Food Controls Community",
    description: "Low food = specialists, high food = multi-step teams",
    detail: "Energy availability determines which microbial strategies succeed"
  },
  {
    id: "n2o",
    icon: AlertTriangle,
    title: "N₂O Greenhouse Impact",
    description: "N₂O rises when relay gets crowded, falls when completion succeeds",
    detail: "Bottlenecks in the pathway cause greenhouse gas escape"
  },
  {
    id: "realworld",
    icon: Globe,
    title: "Real-World Connections",
    description: "Ocean patterns affect nutrients, fisheries, and climate globally",
    detail: "Microbial choices scale up to environmental impacts"
  }
];

export const ConceptProgress = ({ learnedConcepts, onAllConceptsLearned }: ConceptProgressProps) => {
  const [animatingConcept, setAnimatingConcept] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const completedCount = learnedConcepts.length;
  const totalCount = requiredConcepts.length;
  const progressPercent = (completedCount / totalCount) * 100;

  useEffect(() => {
    if (completedCount === totalCount && !showCelebration) {
      setShowCelebration(true);
      onAllConceptsLearned();
      
      // Celebration animation
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [completedCount, totalCount, showCelebration, onAllConceptsLearned]);

  const isConceptLearned = (conceptId: string) => {
    return learnedConcepts.includes(conceptId);
  };

  const getConceptStatus = (conceptId: string) => {
    if (isConceptLearned(conceptId)) return "completed";
    if (learnedConcepts.length === 0) return "pending";
    
    // Next concept to learn
    const currentIndex = requiredConcepts.findIndex(c => !isConceptLearned(c.id));
    const conceptIndex = requiredConcepts.findIndex(c => c.id === conceptId);
    
    if (conceptIndex === currentIndex) return "current";
    return "pending";
  };

  return (
    <div className="space-y-6">
      {/* Header with progress */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <h3 className="text-xl font-semibold text-foreground">
            Learning Progress
          </h3>
          <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold">
            {completedCount}/{totalCount}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 glass-subtle rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          {completedCount === 0 && "Start exploring to track your learning progress"}
          {completedCount > 0 && completedCount < totalCount && 
            `Great progress! ${totalCount - completedCount} concept${totalCount - completedCount !== 1 ? 's' : ''} remaining`}
          {completedCount === totalCount && "🎉 All concepts mastered! You understand the nitrogen relay!"}
        </p>
      </div>

      {/* Concept list */}
      <div className="space-y-3">
        {requiredConcepts.map((concept, index) => {
          const IconComponent = concept.icon;
          const status = getConceptStatus(concept.id);
          const isLearned = isConceptLearned(concept.id);
          
          return (
            <div
              key={concept.id}
              className={`glass-subtle rounded-xl p-4 border transition-all duration-500 ${
                status === "current" ? "border-primary/50 bg-primary/5 scale-105" :
                isLearned ? "border-emerald-500/50 bg-emerald-500/5" :
                "border-white/10"
              } ${animatingConcept === concept.id ? "animate-pulse" : ""}`}
            >
              <div className="flex items-start gap-4">
                {/* Icon and status */}
                <div className="flex-shrink-0">
                  <div className={`relative p-2 rounded-lg transition-all duration-500 ${
                    isLearned ? "bg-emerald-500/20 border border-emerald-500/30" :
                    status === "current" ? "bg-primary/20 border border-primary/30" :
                    "bg-muted/20 border border-muted/30"
                  }`}>
                    <IconComponent className={`w-5 h-5 transition-colors duration-500 ${
                      isLearned ? "text-emerald-400" :
                      status === "current" ? "text-primary" :
                      "text-muted-foreground"
                    }`} />
                    
                    {isLearned && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-semibold transition-colors duration-500 ${
                      isLearned ? "text-emerald-400" :
                      status === "current" ? "text-primary" :
                      "text-muted-foreground"
                    }`}>
                      {concept.title}
                    </h4>
                    
                    <span className="text-xs text-muted-foreground">
                      Step {index + 1}
                    </span>
                  </div>
                  
                  <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                    isLearned || status === "current" ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {concept.description}
                  </p>
                  
                  {(isLearned || status === "current") && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {concept.detail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next step guidance */}
      {completedCount > 0 && completedCount < totalCount && (
        <div className="glass-intense rounded-xl p-4 border border-primary/30">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div>
              <h4 className="text-sm font-semibold text-primary">Next Up</h4>
              <p className="text-sm text-muted-foreground">
                {(() => {
                  const nextConcept = requiredConcepts.find(c => !isConceptLearned(c.id));
                  return nextConcept ? `Learn about: ${nextConcept.title}` : "Complete your learning journey!";
                })()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="glass-intense rounded-2xl p-8 text-center border border-emerald-500/30 bg-emerald-500/5 animate-scale-in-spring">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-2">
              Congratulations!
            </h3>
            <p className="text-muted-foreground">
              You've mastered all the core concepts of the nitrogen relay!
            </p>
            <div className="mt-4 text-sm text-emerald-400">
              Ready to explore the interactive simulation
            </div>
          </div>
        </div>
      )}
    </div>
  );
};