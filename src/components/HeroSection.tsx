import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, ArrowDown, Waves, Microscope, Target } from "lucide-react";
import oceanHero from "@/assets/ocean-hero.jpg";

interface HeroSectionProps {
    allChipsRead: boolean;
    isPretestComplete: boolean;
    isPulsing: boolean;
    scrollToContent: () => void;
}

export const HeroSection = ({
    allChipsRead,
    isPretestComplete,
    isPulsing,
    scrollToContent
}: HeroSectionProps) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Throttle or use requestAnimationFrame could be even better, but isolation is the big win here
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        // Faster entrance on mobile/desktop
        const timer = setTimeout(() => setIsVisible(true), 50);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, []);

    return (
        <section ref={heroRef} className="relative min-h-screen overflow-hidden hero-mobile-landscape pt-16">
            {/* Constrained Ocean Background */}
            <div className="absolute inset-0">
                {/* Transition Gradient from Abyssal Plain */}
                <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#00050a] via-[#00050a]/80 to-transparent z-20 pointer-events-none" />

                {/* Base ocean image with proper constraints */}
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] parallax-mobile-reduce"
                        style={{
                            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) translateY(${Math.max(scrollY * 0.3, -100)}px)`,
                            transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}
                    >
                        <img
                            src={oceanHero}
                            alt="Deep ocean cross-section"
                            className="w-full h-full object-cover"
                        />

                        {/* Edge fade masks */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-background/60" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/20" />
                    </div>
                </div>

                {/* Sophisticated gradient overlay system */}
                <div
                    className="absolute inset-0 opacity-80 parallax-mobile-reduce"
                    style={{
                        background: `
                radial-gradient(ellipse 80% 60% at center 40%, 
                  transparent 0%, 
                  hsl(var(--abyss) / 0.3) 40%,
                  hsl(var(--abyss) / 0.7) 100%
                ),
                linear-gradient(180deg, 
                  hsl(var(--abyss) / 0.1) 0%, 
                  transparent 25%, 
                  hsl(var(--omz-violet) / 0.2) 40%, 
                  hsl(var(--omz-violet) / 0.4) 50%, 
                  hsl(var(--omz-violet) / 0.2) 60%, 
                  transparent 75%,
                  hsl(var(--abyss) / 0.9) 100%
                )`,
                        transform: `translateY(${mousePos.y * 0.4}px)`,
                    }}
                />

                {/* Enhanced OMZ breathing layer */}
                <div
                    className="absolute inset-0 opacity-40 animate-breathe"
                    style={{
                        background: `linear-gradient(135deg, 
                transparent 30%, 
                hsl(var(--omz-violet) / 0.2) 45%, 
                hsl(var(--primary) / 0.3) 50%, 
                hsl(var(--omz-violet) / 0.2) 55%, 
                transparent 70%)`,
                        transform: `translateY(${mousePos.y * 0.2}px) rotate(${mousePos.x * 0.05}deg)`,
                    }}
                />

                {/* Pulse plume effect */}
                {isPulsing && (
                    <div
                        className="absolute top-1/2 left-0 right-0 h-48 animate-pulse-plume"
                        style={{
                            background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.5) 50%, transparent 100%)",
                            filter: "blur(60px)",
                        }}
                    />
                )}

                {/* Refined floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute rounded-full animate-float ${i % 4 === 0 ? "bg-primary/50" :
                                i % 4 === 1 ? "bg-accent/30" :
                                    i % 4 === 2 ? "bg-teal-400/40" : "bg-blue-400/20"
                                }`}
                            style={{
                                width: `${1 + Math.random() * 3}px`,
                                height: `${1 + Math.random() * 3}px`,
                                left: `${10 + Math.random() * 80}%`,
                                top: `${20 + Math.random() * 60}%`,
                                animationDelay: `${Math.random() * 10}s`,
                                animationDuration: `${10 + Math.random() * 15}s`,
                                opacity: 0.4 + Math.random() * 0.4,
                            }}
                        />
                    ))}
                </div>

            </div>

            {/* Apple-style gradient bridge to next section */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: `linear-gradient(to bottom, 
              transparent 0%, 
              hsl(var(--background) / 0.8) 70%, 
              hsl(var(--background)) 100%
            )`,
                }}
            />

            {/* Enhanced Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div
                    className={`max-w-5xl text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                        }`}
                    style={{
                        transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
                        transition: "transform 0.8s ease-out",
                    }}
                >
                    {/* Enhanced title with better animations */}
                    <div className="mb-8">


                        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 tracking-tight">
                            <span className="text-white">
                                Before You Dive
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 font-light leading-relaxed max-w-3xl mx-auto px-4">
                            You've seen the possible outcomes: nitrogen gas vs. nitrous oxide. Now it's time to learn what's actually happening, then predict how the system behaves.
                        </p>
                    </div>



                    {/* Enhanced scroll indicator */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={scrollToContent}
                        className="group flex items-center gap-2 mx-auto text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
                    >
                        <span className="text-sm font-medium">Start learning</span>
                        <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </section>
    );
};
