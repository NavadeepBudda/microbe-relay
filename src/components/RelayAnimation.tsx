import { useEffect, useState } from "react";
import { FoodLevel } from "@/pages/Relay";

interface RelayAnimationProps {
  foodLevel: FoodLevel;
  activeStations: string[];
}

interface Particle {
  id: string;
  fromStation: number;
  toStation: number;
  progress: number;
  compound: "NO3" | "NO2" | "N2O" | "N2";
  active: boolean;
}

const compounds = {
  NO3: { label: "NO₃⁻", color: "hsl(var(--teal-glow))", size: 8 },
  NO2: { label: "NO₂⁻", color: "hsl(var(--omz-violet))", size: 7 },
  N2O: { label: "N₂O", color: "hsl(var(--coral-cta))", size: 6 },
  N2: { label: "N₂", color: "hsl(var(--primary))", size: 5 }
};

export const RelayAnimation = ({ foodLevel, activeStations }: RelayAnimationProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animation when food level changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
    setParticles([]);
    
    // Start new particle flow after a brief delay
    const timer = setTimeout(() => {
      generateParticles();
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodLevel, activeStations]);

  const generateParticles = () => {
    const newParticles: Particle[] = [];
    let particleId = 0;

    // Determine flow pattern based on food level
    const flowPatterns = {
      low: [{ from: 0, to: 1, compound: "NO3" as const }],
      medium: [
        { from: 0, to: 1, compound: "NO3" as const },
        { from: 1, to: 2, compound: "NO2" as const }
      ],
      high: [
        { from: 0, to: 1, compound: "NO3" as const },
        { from: 1, to: 2, compound: "NO2" as const },
        { from: 2, to: 3, compound: "N2O" as const }
      ]
    };

    const pattern = flowPatterns[foodLevel];
    
    pattern.forEach((flow, index) => {
      // Create multiple particles for each flow with staggered timing
      const particleCount = foodLevel === "high" ? 3 : foodLevel === "medium" ? 2 : 1;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: `${particleId++}`,
          fromStation: flow.from,
          toStation: flow.to,
          progress: 0,
          compound: flow.compound,
          active: true
        });
      }
    });

    setParticles(newParticles);
    animateParticles(newParticles);
  };

  const animateParticles = (initialParticles: Particle[]) => {
    let animationFrame: number;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const duration = 3000; // 3 seconds for full animation
      
      setParticles(prevParticles => 
        prevParticles.map((particle, index) => {
          // Stagger particle start times
          const delay = index * 400;
          const adjustedElapsed = Math.max(0, elapsed - delay);
          const progress = Math.min(adjustedElapsed / duration, 1);
          
          return {
            ...particle,
            progress: progress,
            active: progress < 1
          };
        })
      );

      if (elapsed < duration + 2000) { // Continue for 2 extra seconds
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Restart the animation cycle
        setTimeout(() => {
          if (activeStations.length > 0) {
            generateParticles();
          }
        }, 1000);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  };

  const getStationPosition = (stationIndex: number) => {
    const positions = [
      { x: 12.5, y: 50 }, // Station 1: NO₃⁻
      { x: 37.5, y: 50 }, // Station 2: NO₂⁻  
      { x: 62.5, y: 50 }, // Station 3: N₂O
      { x: 87.5, y: 50 }  // Station 4: N₂
    ];
    return positions[stationIndex] || { x: 0, y: 50 };
  };

  const getParticlePosition = (particle: Particle) => {
    const fromPos = getStationPosition(particle.fromStation);
    const toPos = getStationPosition(particle.toStation);
    
    // Smooth easing function
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    
    const easedProgress = easeInOutCubic(particle.progress);
    
    return {
      x: fromPos.x + (toPos.x - fromPos.x) * easedProgress,
      y: fromPos.y + Math.sin(easedProgress * Math.PI) * -10 // Arc motion
    };
  };

  return (
    <div className="relative w-full h-16" key={animationKey}>
      {/* Flow paths */}
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--teal-glow))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--omz-violet))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Base flow line */}
        <line
          x1="12.5%"
          y1="50%"
          x2="87.5%"
          y2="50%"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="animate-pulse"
        />

        {/* Arrow indicators */}
        {activeStations.length > 1 && (
          <>
            {Array.from({ length: 3 }, (_, i) => {
              const isActive = activeStations.length > i + 1;
              return (
                <polygon
                  key={i}
                  points={`${25 + i * 25},47 ${30 + i * 25},50 ${25 + i * 25},53`}
                  fill={isActive ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className={isActive ? "animate-pulse" : ""}
                />
              );
            })}
          </>
        )}
      </svg>

      {/* Animated particles */}
      {particles.map((particle) => {
        if (!particle.active) return null;
        
        const position = getParticlePosition(particle);
        const compound = compounds[particle.compound];
        
        return (
          <div
            key={particle.id}
            className="absolute transition-all duration-100 ease-linear"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
              filter: "drop-shadow(0 0 6px currentColor)"
            }}
          >
            <div
              className="flex items-center justify-center rounded-full border-2 border-current animate-pulse"
              style={{
                width: `${compound.size * 2}px`,
                height: `${compound.size * 2}px`,
                backgroundColor: `${compound.color}40`,
                borderColor: compound.color,
                color: compound.color
              }}
            >
              <span className="text-xs font-bold">
                {particle.compound === "NO3" ? "³⁻" :
                 particle.compound === "NO2" ? "²⁻" :
                 particle.compound === "N2O" ? "O" : "₂"}
              </span>
            </div>
          </div>
        );
      })}

      {/* Station indicators */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        {["NO₃⁻", "NO₂⁻", "N₂O", "N₂"].map((label, index) => {
          const isActive = activeStations.includes(["no3", "no2", "n2o", "n2"][index]);
          const stationColors = [
            "hsl(var(--teal-glow))",
            "hsl(var(--omz-violet))", 
            "hsl(var(--coral-cta))",
            "hsl(var(--primary))"
          ];
          
          return (
            <div
              key={label}
              className={`flex flex-col items-center transition-all duration-500 ${
                isActive ? "scale-110" : "scale-90 opacity-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  isActive ? "animate-pulse shadow-lg" : ""
                }`}
                style={{
                  backgroundColor: isActive ? `${stationColors[index]}20` : "transparent",
                  borderColor: stationColors[index],
                  color: stationColors[index],
                  boxShadow: isActive ? `0 0 12px ${stationColors[index]}40` : "none"
                }}
              >
                {index + 1}
              </div>
              <span 
                className="text-xs mt-1 font-medium"
                style={{ color: isActive ? stationColors[index] : "hsl(var(--muted-foreground))" }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Educational overlay */}
      <div className="absolute -bottom-8 left-0 right-0 text-center">
        <div className="text-xs text-muted-foreground">
          {foodLevel === "low" && "Single-step specialists dominate • Minimal relay activity"}
          {foodLevel === "medium" && "Two-step relay active • Coexistence emerges"}
          {foodLevel === "high" && "Multi-step teams active • Watch for N₂O spikes"}
        </div>
      </div>
    </div>
  );
};