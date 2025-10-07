import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RelayPipeline } from "@/components/RelayPipeline";
import { Slider } from "@/components/ui/slider";
import { foodLevelDetails, type FoodLevel } from "@/lib/food-level";

export type { FoodLevel };

const Denitrification = () => {
  const navigate = useNavigate();
  const [foodLevel, setFoodLevel] = useState<FoodLevel>("low");
  const [stationsLearned, setStationsLearned] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState([0]);

  const currentLevelDetails = foodLevelDetails.find(level => level.value === foodLevel) ?? foodLevelDetails[0];

  const handleStationLearned = useCallback((stationId: string) => {
    if (!stationsLearned.includes(stationId)) {
      setStationsLearned(prev => [...prev, stationId]);
    }
  }, [stationsLearned]);

  const handleSliderChange = (values: number[]) => {
    setSliderValue(values);
    
    // Determine closest snap point
    const newValue = values[0];
    let closestLevel: FoodLevel = "low";
    
    if (newValue <= 25) {
      closestLevel = "low";
    } else if (newValue <= 75) {
      closestLevel = "medium";  
    } else {
      closestLevel = "high";
    }
    
    if (closestLevel !== foodLevel) {
      setFoodLevel(closestLevel);
    }
  };

  const totalLearningProgress = stationsLearned.length;
  const maxProgress = 4;
  const learningProgressPercent = (totalLearningProgress / maxProgress) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Minimal Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/relay")}
                className="flex items-center gap-2 px-3 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              
              <div className="text-sm font-semibold text-foreground">
                Denitrification Relay Simulation
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xs text-muted-foreground">
                Progress: {totalLearningProgress}/{maxProgress}
              </div>
              <div className="w-16 h-1.5 glass-subtle rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                  style={{ width: `${learningProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Simulation Focused */}
      <div className="flex-1 flex flex-col">
        
        {/* Minimal Organic Matter Control - Inline */}
        <div className="border-b border-white/5 bg-white/2 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              
              <div className="flex items-center gap-6">
                <div className="text-sm">
                  <span className="text-muted-foreground">Organic Matter: </span>
                  <span className="font-semibold text-foreground">{currentLevelDetails.label}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">Sparse</span>
                  <div className="w-32">
                    <Slider
                      value={sliderValue}
                      onValueChange={handleSliderChange}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                      aria-label="Food level slider"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">Abundant</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Environment: </span>
                  <span className="font-medium text-foreground">{currentLevelDetails.scenario}</span>
                </div>
                
                <div 
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${currentLevelDetails.particleColor}15`,
                    color: currentLevelDetails.particleColor 
                  }}
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: currentLevelDetails.particleColor }}
                  />
                  {currentLevelDetails.n2oRisk} N₂O
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Live Relay Simulation - Dominant Element */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto h-full">
            <RelayPipeline 
              foodLevel={foodLevel} 
              onStationLearned={handleStationLearned}
            />
          </div>
        </div>

      </div>

      {/* Minimal Footer */}
      <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Adjust organic matter to see how microbial teams respond
            </div>
            
            <Button 
              onClick={() => navigate("/relay")}
              variant="ghost"
              size="sm"
              className="text-xs"
            >
              <span className="flex items-center gap-1">
                Back to Concepts
                <ChevronRight className="w-3 h-3" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Denitrification;