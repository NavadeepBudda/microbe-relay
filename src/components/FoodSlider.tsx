import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { foodLevelDetails, FoodLevel } from "@/lib/food-level";
import { HelpTooltip } from "@/components/HelpTooltip";
import { Waves, TrendingUp, MapPin } from "lucide-react";

interface FoodSliderProps {
  value: FoodLevel;
  onChange: (value: FoodLevel) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
}

export const FoodSlider = ({ value, onChange }: FoodSliderProps) => {
  const [sliderValue, setSliderValue] = useState([50]);
  const [isInteracting, setIsInteracting] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const currentLevel = foodLevelDetails.find(l => l.value === value) || foodLevelDetails[0];

  // Convert food level to slider value
  useEffect(() => {
    const level = foodLevelDetails.find(l => l.value === value);
    if (level) {
      setSliderValue([level.numeric]);
    }
  }, [value]);

  // Generate particles based on food level
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < currentLevel.particles; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: currentLevel.particleSize + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
        speed: 0.2 + Math.random() * 0.3,
        angle: Math.random() * Math.PI * 2
      });
    }
    setParticles(newParticles);
  }, [value, currentLevel]);

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles(prev =>
        prev.map(particle => ({
          ...particle,
          y: (particle.y + particle.speed) % 110, // Reset to top when reaching bottom
          opacity: particle.y > 100 ? 0.1 : 0.3 + Math.random() * 0.4
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    if (particles.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles.length]);

  const handleSliderChange = (values: number[]) => {
    setSliderValue(values);
    setIsInteracting(true);

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

    if (closestLevel !== value) {
      onChange(closestLevel);
    }
  };

  const handleSliderCommit = () => {
    setIsInteracting(false);
    // Snap to exact value
    const level = foodLevelDetails.find(l => l.value === value);
    if (level) {
      setSliderValue([level.numeric]);
    }
  };

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Header with scenario info */}
      <div className="text-center space-y-2 md:space-y-4">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white">
            Organic Matter Availability
          </h3>
        </div>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-lg mx-auto px-3">
          Adjust the food level to see how microbial communities respond
        </p>
      </div>

      {/* Particle visualization background */}
      <div className="relative glass-subtle rounded-xl md:rounded-2xl p-4 md:p-8 overflow-hidden border border-white/10 shadow-lg">
        {/* Animated background particles - hidden during interaction */}
        <div className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${isInteracting ? "opacity-0" : "opacity-100"
          }`}>
          {/* Particles removed as per user request */}
        </div>

        {/* Slider container */}
        <div className="relative z-10 space-y-3 md:space-y-6">
          {/* Scenario indicators */}
          <div className="grid grid-cols-3 gap-2 text-xs md:text-sm">
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-muted-foreground/80 transition-colors hover:text-primary text-center">
              <span className="font-medium">Sparse</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-muted-foreground/80 transition-colors hover:text-primary text-center">
              <span className="font-medium">Moderate</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 text-muted-foreground/80 transition-colors hover:text-primary text-center">
              <span className="font-medium">Abundant</span>
            </div>
          </div>

          {/* Main slider */}
          <div className="relative px-2 md:px-4 py-1 md:py-2">
            <Slider
              value={sliderValue}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
              max={100}
              min={0}
              step={1}
              className="w-full touch-manipulation"
              aria-label="Food level slider"
            />

          </div>
        </div>
      </div>

      {/* Current level display */}
      <div className="text-center space-y-3 md:space-y-6">

        <div className="space-y-1 md:space-y-3">
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
            {currentLevel.label} Food
          </div>
          <div className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium">
            {currentLevel.scenario}
          </div>
        </div>

        {/* Quick impact indicator */}
        <div
          className="inline-flex items-center gap-2 md:gap-3 px-3 py-2 md:px-6 md:py-3 rounded-full glass-subtle border transition-all duration-500 hover:scale-105"
          style={{ borderColor: `${currentLevel.particleColor}30` }}
        >
          <span className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground">
            Level {sliderValue[0]}%
          </span>
        </div>
      </div>

    </div>
  );
};
