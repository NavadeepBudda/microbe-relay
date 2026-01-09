import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const TwilightZoneSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (requestRef.current) return;

            requestRef.current = requestAnimationFrame(() => {
                if (sectionRef.current) {
                    const rect = sectionRef.current.getBoundingClientRect();
                    // Only update if section is visible or close to viewport
                    if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
                        setMousePos({
                            x: (e.clientX / window.innerWidth - 0.5) * 15, // Reduced range
                            y: (e.clientY / window.innerHeight - 0.5) * 15,
                        });
                    }
                }
                requestRef.current = undefined;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            observer.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[70vh] w-full overflow-hidden bg-[#020b14]"
        >
            {/* Deep Ocean Gradient Background - Static layer */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-cyan-900/40 via-[#0a1a2a] to-[#020b14] z-0"
            />

            {/* Dynamic Lighting / God Rays - Hardware accelerated */}
            <div className="absolute top-0 left-0 right-0 h-[60vh] pointer-events-none z-0 opacity-30 will-change-transform">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-[radial-gradient(ellipse_at_top,_rgba(64,224,208,0.15)_0%,_transparent_70%)] blur-3xl"
                    style={{
                        transform: `translate3d(calc(-50% + ${mousePos.x * -0.5}px), 0, 0)`,
                        transition: 'transform 0.8s ease-out'
                    }}
                />
            </div>

            {/* Marine Snow & Bubbles Layer - Reduced count & Hardware accelerated */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Small drifting particles (Marine Snow) - Reduced to 20 */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`snow-${i}`}
                        className="absolute rounded-full bg-white/20 animate-float will-change-transform"
                        style={{
                            width: Math.random() * 2 + 1 + 'px',
                            height: Math.random() * 2 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDuration: 20 + Math.random() * 30 + 's',
                            animationDelay: Math.random() * -20 + 's',
                            opacity: 0.1 + Math.random() * 0.3
                        }}
                    />
                ))}

                {/* Rising Bubbles (Sparse) - Reduced to 8 */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`bubble-${i}`}
                        className="absolute rounded-full border border-white/10 bg-white/5 backdrop-blur-[1px] will-change-transform"
                        style={{
                            width: Math.random() * 6 + 4 + 'px',
                            height: Math.random() * 6 + 4 + 'px',
                            top: 100 + Math.random() * 20 + '%',
                            left: Math.random() * 100 + '%',
                            animation: `float-up ${15 + Math.random() * 15}s linear infinite`,
                            animationDelay: Math.random() * -15 + 's',
                            opacity: 0.2 + Math.random() * 0.2
                        }}
                    />
                ))}
            </div>

            <style>{`
        @keyframes float-up {
            0% { transform: translate3d(0, 0, 0); opacity: 0; }
            10% { opacity: 0.4; }
            90% { opacity: 0.4; }
            100% { transform: translate3d(20px, -120vh, 0); opacity: 0; }
        }
      `}</style>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-6">
                <div
                    className={cn(
                        "relative max-w-4xl p-10 md:p-20 rounded-[2.5rem] text-center transform transition-all duration-1000 ease-out will-change-transform",
                        "border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-md bg-gradient-to-b from-white/5 to-transparent",
                        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-32 scale-90"
                    )}
                    style={{
                        transform: isVisible ? `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)` : undefined
                    }}
                >
                    {/* Inner Glow Border */}
                    <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none" />

                    {/* Subtle Gradient Overlay on Card */}
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />

                    <p className="font-display text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/70 font-medium leading-tight drop-shadow-lg tracking-wide">
                        One path releases harmless nitrogen. The other path leaks a greenhouse gas that’s 300 times worse than CO₂.
                    </p>
                </div>
            </div>

            {/* Dark Vignette / Transition to Abyss */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_#020b14_120%)] z-0" />

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-[#00050a] pointer-events-none z-20" />
        </section>
    );
};
