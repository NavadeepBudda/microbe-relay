import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Target, Zap, AlertTriangle, ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LearningHeader } from "@/components/LearningHeader";
import { InteractiveRelayPipeline } from "@/components/InteractiveRelayPipeline";
import { InteractiveFoodControl } from "@/components/InteractiveFoodControl";
import { InteractiveN2OGauge } from "@/components/InteractiveN2OGauge";
import { getRelayState, calculateN2OLevel } from "@/lib/relay-state";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

interface Mission {
  id: number;
  title: string;
  description: string;
  goal: string;
  successCriteria: (foodLevel: number, n2oLevel: number, timeInState: number) => boolean;
  successMessage: string;
  icon: string;
}

const missions: Mission[] = [
  {
    id: 1,
    title: "Scarcity Masters",
    description: "In food-poor waters, which specialists win the competition?",
    goal: "Set food level to LOW and watch Step 1 specialists dominate",
    successCriteria: (foodLevel: number, n2oLevel: number, timeInState: number) => 
      foodLevel <= 35 && timeInState >= 3000, // 3 seconds in low food state
    successMessage: "Perfect! Step 1 specialists dominate when food is scarce.",
    icon: "🦠"
  },
  {
    id: 2,
    title: "N₂O Hotspot",
    description: "When do greenhouse gases spike to dangerous levels?",
    goal: "Find the food level that creates peak N₂O emissions",
    successCriteria: (foodLevel: number, n2oLevel: number, timeInState: number) => 
      n2oLevel >= 85 && timeInState >= 2000, // High N₂O for 2 seconds
    successMessage: "Excellent! Medium food creates N₂O hotspots as multiple specialists coexist.",
    icon: "⚠️"
  },
  {
    id: 3,
    title: "Complete the Cycle",
    description: "How do we achieve full nitrogen conversion with minimal greenhouse gases?",
    goal: "Activate multi-step specialists to complete the entire pathway",
    successCriteria: (foodLevel: number, n2oLevel: number, timeInState: number) => 
      foodLevel >= 70 && timeInState >= 3000, // High food for 3 seconds
    successMessage: "Brilliant! High food enables complete pathways that finish the job safely.",
    icon: "🔄"
  }
];

const TryIt = () => {
  useDocumentTitle("Microbe Relay | Try It");
  const navigate = useNavigate();
  const [foodLevel, setFoodLevel] = useState(50);
  const [currentMission, setCurrentMission] = useState(0);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [missionStartTime, setMissionStartTime] = useState(Date.now());
  const [timeInCurrentState, setTimeInCurrentState] = useState(0);

  const n2oLevel = calculateN2OLevel(foodLevel);
  const relayState = getRelayState(foodLevel);

  // Track time in current state for mission validation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInCurrentState(Date.now() - missionStartTime);
    }, 100);

    return () => clearInterval(interval);
  }, [missionStartTime]);

  // Reset timer when food level changes significantly
  useEffect(() => {
    setMissionStartTime(Date.now());
    setTimeInCurrentState(0);
  }, [Math.floor(foodLevel / 10)]); // Reset on significant food level changes

  // Check mission completion
  useEffect(() => {
    if (currentMission < missions.length && !completedMissions.includes(currentMission)) {
      const mission = missions[currentMission];
      if (mission.successCriteria(foodLevel, n2oLevel, timeInCurrentState)) {
        // Mission completed!
        setCompletedMissions(prev => [...prev, currentMission]);
        setSuccessMessage(mission.successMessage);
        setShowSuccessMessage(true);
        
        // Auto-advance to next mission after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
          if (currentMission < missions.length - 1) {
            setCurrentMission(currentMission + 1);
          }
        }, 3000);
      }
    }
  }, [foodLevel, n2oLevel, timeInCurrentState, currentMission, completedMissions]);

  const handleFoodLevelChange = useCallback((newLevel: number) => {
    setFoodLevel(newLevel);
  }, []);

  const getMissionCardStatus = (missionIndex: number) => {
    if (completedMissions.includes(missionIndex)) return "completed";
    if (missionIndex === currentMission) return "active";
    return "pending";
  };

  const getProgressText = () => {
    const completed = completedMissions.length;
    const total = missions.length;
    return `${completed}/${total} missions completed`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <LearningHeader />

      <div className="flex-1 p-3 md:p-6 pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-in fade-in-0 zoom-in-95 duration-300 px-4">
              <div className="rounded-3xl border border-teal-glow/30 bg-[rgba(8,20,36,0.95)] p-6 md:p-8 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-center max-w-md w-full mx-auto">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-teal-glow/20">
                    <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-teal-200" />
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Mission Complete! 🎉</h3>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">{successMessage}</p>
              </div>
            </div>
          )}


          {/* Main Content - Mobile-First */}
          <div className="space-y-6 md:space-y-8">
            {/* Mission Cards - Top on Mobile */}
            <div className="space-y-3 md:space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 md:w-5 md:h-5 text-coral-cta" />
                Missions
              </h2>
              
              {/* Mobile: Horizontal scroll for missions */}
              <div className="md:hidden flex gap-3 overflow-x-auto pb-2 -mx-3 px-3">
                {missions.map((mission, index) => {
                  const status = getMissionCardStatus(index);
                  const isActive = status === "active";
                  const isCompleted = status === "completed";
                  
                  return (
                    <div
                      key={mission.id}
                      className={`relative rounded-xl border p-4 transition-all duration-300 min-w-[280px] flex-shrink-0 ${
                        isActive 
                          ? "border-coral-cta/40 bg-coral-cta/10 shadow-[0_0_20px_rgba(245,97,69,0.3)]" 
                          : isCompleted
                            ? "border-teal-glow/40 bg-teal-glow/10"
                            : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold flex-shrink-0 ${
                          isCompleted 
                            ? "bg-teal-glow/20 text-teal-200" 
                            : isActive 
                              ? "bg-coral-cta/20 text-coral-cta" 
                              : "bg-white/10 text-white/60"
                        }`}>
                          {isCompleted ? <CheckCircle className="w-4 h-4" /> : mission.icon}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`text-sm font-semibold ${
                              isActive ? "text-coral-cta" : isCompleted ? "text-teal-200" : "text-white"
                            }`}>
                              Mission {mission.id}: {mission.title}
                            </h3>
                            {isActive && (
                              <div className="animate-pulse">
                                <div className="w-1.5 h-1.5 rounded-full bg-coral-cta"></div>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-xs text-white/70 mb-2 leading-relaxed">{mission.description}</p>
                          
                          <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                            isCompleted 
                              ? "bg-teal-glow/20 text-teal-200" 
                              : isActive 
                                ? "bg-coral-cta/20 text-coral-cta" 
                                : "bg-white/10 text-white/60"
                          }`}>
                            {mission.goal}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop: Grid layout for missions */}
              <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6">
                {missions.map((mission, index) => {
                  const status = getMissionCardStatus(index);
                  const isActive = status === "active";
                  const isCompleted = status === "completed";
                  
                  return (
                    <div
                      key={mission.id}
                      className={`relative rounded-2xl border p-5 md:p-6 transition-all duration-300 ${
                        isActive 
                          ? "border-coral-cta/40 bg-coral-cta/10 shadow-[0_0_20px_rgba(245,97,69,0.3)]" 
                          : isCompleted
                            ? "border-teal-glow/40 bg-teal-glow/10"
                            : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className={`flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full text-sm font-semibold ${
                          isCompleted 
                            ? "bg-teal-glow/20 text-teal-200" 
                            : isActive 
                              ? "bg-coral-cta/20 text-coral-cta" 
                              : "bg-white/10 text-white/60"
                        }`}>
                          {isCompleted ? <CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> : mission.icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`text-sm md:text-base font-semibold ${
                              isActive ? "text-coral-cta" : isCompleted ? "text-teal-200" : "text-white"
                            }`}>
                              Mission {mission.id}: {mission.title}
                            </h3>
                            {isActive && (
                              <div className="animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-coral-cta"></div>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-xs md:text-sm text-white/70 mb-3 leading-relaxed">{mission.description}</p>
                          
                          <div className={`text-xs font-medium px-2.5 md:px-3 py-1 rounded-full inline-block ${
                            isCompleted 
                              ? "bg-teal-glow/20 text-teal-200" 
                              : isActive 
                                ? "bg-coral-cta/20 text-coral-cta" 
                                : "bg-white/10 text-white/60"
                          }`}>
                            {mission.goal}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Area */}
            <div className="space-y-4 md:space-y-6">
              {/* Relay Pipeline */}
              <div className="w-full">
                <InteractiveRelayPipeline 
                  foodLevel={foodLevel}
                  className="w-full"
                />
              </div>

              {/* Controls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Food Control */}
                <InteractiveFoodControl
                  value={foodLevel}
                  onChange={handleFoodLevelChange}
                  className="h-full min-h-[280px] md:min-h-[320px]"
                />
                
                {/* N2O Gauge */}
                <InteractiveN2OGauge
                  value={n2oLevel}
                  foodLevel={foodLevel}
                  className="h-full min-h-[280px] md:min-h-[320px]"
                />
              </div>

              {/* Real-time Feedback */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Zap className="h-5 w-5 text-coral-cta" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Live Feedback</h3>
                    <p className="text-xs text-white/60">Real-time system response</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">Current Food Level:</span>
                    <span className="font-medium text-white">{Math.round(foodLevel)}%</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      foodLevel < 35 ? "bg-teal-glow/20 text-teal-200" :
                      foodLevel < 70 ? "bg-omz-violet/20 text-omz-violet" :
                      "bg-coral-cta/20 text-coral-cta"
                    }`}>
                      {foodLevel < 35 ? "Low" : foodLevel < 70 ? "Medium" : "High"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">N₂O Level:</span>
                    <span className="font-medium text-white">
                      {n2oLevel <= 35 ? "Low" : n2oLevel <= 70 ? "Medium" : "High"}
                    </span>
                    {n2oLevel > 70 && (
                      <AlertTriangle className="w-4 h-4 text-coral-cta animate-pulse" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">Dominant Steps:</span>
                    <span className="font-medium text-white">
                      {relayState.dominantModules.map(module => {
                        if (module === "Step1") return "1";
                        if (module === "Step2") return "2"; 
                        if (module === "Step3") return "3";
                        if (module === "TwoStepBand") return "Multi-step";
                        if (module === "ThreeStepBand") return "Complete";
                        return module;
                      }).join(", ") || "None"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border border-primary/20 text-sm text-primary font-medium">
                  <BookOpen className="w-4 h-4" />
                  Ready for Deep Dive
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Explore Ocean Chemistry
                </h2>
                
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Now that you've mastered the relay dynamics, dive deeper into the environmental chemistry that drives these microbial processes.
                </p>
              </div>

              <Button
                onClick={() => navigate("/relay")}
                size="lg"
                className="group relative h-auto rounded-full px-8 py-4 text-base font-semibold text-white shadow-[0_25px_60px_-25px_rgba(245,97,69,0.8)] transition-all duration-300 bg-gradient-to-r from-coral-cta to-coral-cta/80 hover:-translate-y-0.5 hover:shadow-[0_35px_80px_-25px_rgba(245,97,69,0.75)] hover:scale-105"
              >
                <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-3">
                  <BookOpen className="h-5 w-5" />
                  <span className="text-lg">Continue to Ocean Chemistry</span>
                  <ArrowRight className="h-5 w-5 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryIt;