import React, { useState, useEffect, useMemo } from 'react';
import { GoodGuy } from './svgs/GoodGuy';
import { GoodGuyHuggingCO2 } from './svgs/GoodGuyHuggingCO2';
import { GoodGuyEatingCO2 } from './svgs/GoodGuyEatingCO2';
import { cn } from '@/lib/utils';

// Microbe Component that can be any of the 3 types
const Microbe = ({
    type,
    className,
    style,
}: {
    type: 'hug' | 'eat' | 'float',
    className?: string,
    style?: React.CSSProperties,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn("absolute transition-all duration-1000 ease-in-out touch-manipulation", className)}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)} // Tap to toggle on mobile
        >
            <div className={cn("relative transition-all duration-500", isHovered ? "scale-110 z-50" : "scale-100 z-10")}>
                {type === 'hug' && (
                    <GoodGuyHuggingCO2 className="w-24 h-24 sm:w-44 sm:h-44 drop-shadow-[0_0_15px_rgba(100,255,218,0.3)]" />
                )}
                {type === 'eat' && (
                    <GoodGuyEatingCO2 className="w-24 h-24 sm:w-44 sm:h-44 drop-shadow-[0_0_15px_rgba(100,255,218,0.3)]" />
                )}
                {type === 'float' && (
                    <GoodGuy className="w-20 h-20 sm:w-32 sm:h-32 opacity-90" />
                )}
            </div>
        </div>
    );
};

export const EntrySection = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Responsive positions - Increased density
    const microbes = useMemo(() => {
        const desktopPositions = [
            // Top Row
            { top: 15, left: 10, type: 'hug' },
            { top: 8, left: 30, type: 'float' },
            { top: 12, left: 55, type: 'float' },
            { top: 10, left: 85, type: 'eat' },

            // Middle Sides
            { top: 35, left: 5, type: 'float' },
            { top: 45, left: 15, type: 'eat' },
            { top: 38, left: 92, type: 'float' },
            { top: 50, left: 85, type: 'hug' },

            // Bottom Row
            { top: 75, left: 12, type: 'eat' },
            { top: 85, left: 35, type: 'float' },
            { top: 82, left: 65, type: 'hug' },
            { top: 78, left: 88, type: 'float' },

            // Fillers
            { top: 25, left: 75, type: 'float' },
            { top: 65, left: 25, type: 'float' },
        ];

        // Mobile positions: Denser clusters at top/bottom
        const mobilePositions = [
            // Top Cluster
            { top: 8, left: 5, type: 'hug' },
            { top: 12, left: 35, type: 'float' },
            { top: 5, left: 65, type: 'float' },
            { top: 10, left: 88, type: 'eat' },
            { top: 22, left: 15, type: 'float' },
            { top: 18, left: 80, type: 'float' },

            // Bottom Cluster
            { top: 65, left: 5, type: 'float' },
            { top: 72, left: 25, type: 'eat' },
            { top: 85, left: 10, type: 'float' },
            { top: 68, left: 75, type: 'hug' },
            { top: 82, left: 55, type: 'float' },
            { top: 78, left: 90, type: 'float' },
        ];

        const positions = isMobile ? mobilePositions : desktopPositions;

        return positions.map((pos, i) => ({
            id: i,
            type: pos.type as 'hug' | 'eat' | 'float',
            top: pos.top,
            left: pos.left,
            scale: (isMobile ? 0.55 : 0.75) + Math.random() * 0.3,
            duration: 12 + Math.random() * 8,
            delay: Math.random() * -10,
        }));
    }, [isMobile]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            requestAnimationFrame(() => {
                setMousePos({
                    x: (e.clientX / window.innerWidth - 0.5) * 20,
                    y: (e.clientY / window.innerHeight - 0.5) * 20,
                });
            });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-cyan-200 via-sky-300 to-blue-500">

            <style>{`
        @keyframes float-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -20px); }
        }
        .animate-float-drift {
          animation: float-drift ease-in-out infinite;
        }
      `}</style>

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                {/* Sun Rays */}
                <div className="absolute inset-0 flex justify-center opacity-50">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-0 w-[15vw] h-[120vh] bg-gradient-to-b from-white/40 to-transparent blur-3xl origin-top"
                            style={{
                                left: `${10 + i * 20}%`,
                                transform: `rotate(${(i - 2) * 8}deg) translateX(${mousePos.x * -0.5}px)`,
                                transition: 'transform 0.5s ease-out',
                                animation: `pulse-plume ${6 + i}s ease-in-out infinite alternate`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Microbes Layer */}
            <div className="absolute inset-0 z-10">
                {microbes.map((microbe) => (
                    <div
                        key={microbe.id}
                        className="absolute animate-float-drift"
                        style={{
                            top: `${microbe.top}%`,
                            left: `${microbe.left}%`,
                            animationDuration: `${microbe.duration}s`,
                            animationDelay: `${microbe.delay}s`,
                        }}
                    >
                        <div
                            style={{
                                transform: `scale(${microbe.scale}) translate(${mousePos.x * (0.03 * (microbe.id % 3 + 1))}px, ${mousePos.y * (0.03 * (microbe.id % 3 + 1))}px)`,
                                transition: 'transform 0.2s ease-out'
                            }}
                        >
                            <Microbe type={microbe.type} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area - Clear of Microbes */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
                <div
                    className="max-w-4xl mx-auto"
                    style={{
                        transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                >
                    <h1 className="font-display font-bold text-4xl sm:text-7xl md:text-8xl text-white drop-shadow-2xl tracking-tight mb-6 sm:mb-8 leading-tight">
                        Deep in the ocean, microbes are making a choice.
                    </h1>

                    <p className="text-lg sm:text-2xl md:text-3xl text-white/95 font-light max-w-2xl mx-auto drop-shadow-lg leading-relaxed mb-6">
                        What they do with nitrogen impacts our climate.
                    </p>


                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 text-white/90 transition-all duration-500"
                style={{
                    opacity: Math.max(0, 1 - scrollY / 200),
                    transform: `translate(-50%, ${scrollY * 0.5}px)`
                }}
            >
                <div className="flex flex-col items-center gap-3 animate-bounce">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cyan-50 drop-shadow-md">Dive Deeper</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md">
                        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                    </svg>
                </div>
            </div>

            {/* Gradient Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[hsl(var(--abyss))] pointer-events-none z-10" />
        </section>
    );
};
