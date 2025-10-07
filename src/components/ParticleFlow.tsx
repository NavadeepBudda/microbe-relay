import { useEffect, useState } from "react";

interface Station {
  id: string;
  position: { x: number; y: number };
}

interface ParticleFlowProps {
  startStation: Station;
  endStation: Station;
  delay: number;
  speed: number;
  isActive: boolean;
}

export const ParticleFlow = ({ 
  startStation, 
  endStation, 
  delay, 
  speed, 
  isActive 
}: ParticleFlowProps) => {
  const [position, setPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      return;
    }

    const startAnimation = () => {
      setIsVisible(true);
      setPosition(0);
      
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / speed, 1);
        
        // Easing function for smooth motion
        const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        setPosition(easeInOut(progress));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Hide particle and restart after a brief pause
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(startAnimation, 500 + Math.random() * 1000);
          }, 200);
        }
      };
      
      requestAnimationFrame(animate);
    };

    const timer = setTimeout(startAnimation, delay);
    return () => clearTimeout(timer);
  }, [isActive, delay, speed]);

  if (!isVisible || !endStation) return null;

  const startX = startStation.position.x;
  const startY = startStation.position.y;
  const endX = endStation.position.x;
  const endY = endStation.position.y;
  
  const currentX = startX + (endX - startX) * position;
  const currentY = startY + (endY - startY) * position;

  return (
    <div
      className="absolute pointer-events-none z-10"
      style={{
        left: `${currentX}%`,
        top: `${currentY}%`,
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.2s ease-in-out"
      }}
    >
      {/* Particle with trail effect */}
      <div className="relative">
        {/* Trail */}
        <div 
          className="absolute w-8 h-1 rounded-full opacity-30"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary)) 50%, transparent 100%)",
            transform: `translateX(-100%) scale(${0.5 + position * 0.5})`
          }}
        />
        
        {/* Main particle */}
        <div 
          className="w-2 h-2 rounded-full shadow-lg animate-pulse"
          style={{
            background: "hsl(var(--primary))",
            boxShadow: "0 0 8px hsl(var(--primary) / 0.6)",
            transform: `scale(${0.8 + Math.sin(position * Math.PI * 4) * 0.2})`
          }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 w-2 h-2 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
            transform: "scale(3)"
          }}
        />
      </div>
    </div>
  );
};