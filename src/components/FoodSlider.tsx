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
    <div className="space-y-8">
      {/* Header with scenario info */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <HelpTooltip
            term="Organic Matter"
            definition="Carbon-rich particles from dead phytoplankton and marine organisms"
            context="The primary food source for denitrifying microbes in the ocean"
            example="After algae blooms, sinking particles create concentrated food patches"
          >
            <h3 className="text-2xl font-bold cursor-help border-b border-dotted border-primary/50 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Organic Matter Availability
            </h3>
          </HelpTooltip>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mx-auto">
          Adjust the food level to see how microbial communities respond
        </p>
      </div>

      {/* Particle visualization background */}
      <div className="relative glass-subtle rounded-2xl p-8 overflow-hidden border border-white/10 shadow-lg">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: currentLevel.particleColor,
                opacity: particle.opacity,
                transform: "translate(-50%, -50%)",
                transition: "all 0.3s ease-out"
              }}
            />
          ))}
        </div>

        {/* Slider container */}
        <div className="relative z-10 space-y-6">
          {/* Scenario indicators */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-muted-foreground/80 transition-colors hover:text-primary">
              <Waves className="w-4 h-4" />
              <span className="font-medium">Twilight Zone</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground/80 transition-colors hover:text-primary">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">River Mouth</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground/80 transition-colors hover:text-primary">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Bloom Fallout</span>
            </div>
          </div>

          {/* Main slider */}
          <div className="relative px-4 py-2">
            <Slider
              value={sliderValue}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
              max={100}
              min={0}
              step={1}
              className="w-full"
              aria-label="Food level slider"
            />
            
            {/* Snap point indicators */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-4">
              {foodLevelDetails.map((level) => (
                <div
                  key={level.value}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    value === level.value ? "text-primary scale-110" : "text-muted-foreground"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    value === level.value ? "bg-primary shadow-lg shadow-primary/50" : "bg-muted"
                  }`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Current level display */}
      <div className="text-center space-y-6">
        <div className="text-6xl transition-all duration-500 transform hover:scale-110">
          {currentLevel.emoji}
        </div>
        
        <div className="space-y-3">
          <div className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
            {currentLevel.label} Food
          </div>
          <div className="text-lg text-muted-foreground font-medium">
            {currentLevel.scenario}
          </div>
        </div>
        
        {/* Quick impact indicator */}
        <div 
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-subtle border transition-all duration-500 hover:scale-105"
          style={{ borderColor: `${currentLevel.particleColor}30` }}
        >
          <div 
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: currentLevel.particleColor }}
          />
          <span className="text-base font-medium text-muted-foreground">
            Level {sliderValue[0]}%
          </span>
        </div>
      </div>

    </div>
  );
};
