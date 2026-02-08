import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const IntroAnimation = () => {
    const [stage, setStage] = useState<'initial' | 'text-in' | 'text-out' | 'finished'>('initial');
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = 'hidden';

        // Sequence
        // 0ms: Initial (Black screen)
        // 100ms: Text In (Fade in + Blur remove)
        // 3000ms: Text Out (Fade out + Blur add)
        // 4000ms: Finished (Remove overlay)

        const timer1 = setTimeout(() => setStage('text-in'), 500);
        const timer2 = setTimeout(() => setStage('text-out'), 3500);
        const timer3 = setTimeout(() => {
            setStage('finished');
            setTimeout(() => {
                setShouldRender(false);
                document.body.style.overflow = 'unset'; // Unlock scroll
            }, 1000);
        }, 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            document.body.style.overflow = 'unset'; // Cleanup
        };
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex items-center justify-center bg-[#00050a] transition-opacity duration-1000 ease-in-out",
                stage === 'finished' ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
        >
            <div className="relative flex flex-col items-center justify-center text-center px-4">

                {/* Background Glow Effect */}
                <div className={cn(
                    "absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full transition-all duration-2000",
                    stage === 'text-in' ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )} />

                {/* Main Content */}
                <div className={cn(
                    "relative z-10 transition-all duration-1000 ease-out transform",
                    stage === 'text-in'
                        ? "opacity-100 translate-y-0 blur-0"
                        : "opacity-0 translate-y-8 blur-sm"
                )}>
                    <h1 className="text-white font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                        The Sun Lab
                    </h1>

                    <p className="text-cyan-400/90 font-mono text-sm md:text-lg tracking-[0.15em] uppercase mb-6">
                        University of Pennsylvania
                    </p>

                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto my-6 opacity-50" />

                    <p className="text-cyan-400/60 font-mono text-xs tracking-[0.2em] uppercase">
                        Developed by Navadeep Budda
                    </p>


                </div>

            </div>
        </div>
    );
};
