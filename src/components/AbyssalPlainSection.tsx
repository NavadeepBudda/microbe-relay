import React, { useState, useEffect } from 'react';
import { LeftVent } from './svgs/LeftVent';
import { RightVent } from './svgs/RightVent';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

export const AbyssalPlainSection = () => {
    const [oxygenLevel, setOxygenLevel] = useState([100]); // 100 = High Oxygen (Safe), 0 = Low Oxygen (Stress)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Desktop Opacity Logic (Gradual)
    const desktopLeftOpacity = 0.2 + (oxygenLevel[0] / 100) * 0.8;
    const desktopRightOpacity = 1 - (oxygenLevel[0] / 100) * 0.8;

    // Mobile Opacity Logic (Hard Switch)
    // If oxygen >= 50, Left is 1, Right is 0.
    // If oxygen < 50, Left is 0, Right is 1.
    const mobileLeftOpacity = oxygenLevel[0] >= 50 ? 1 : 0;
    const mobileRightOpacity = oxygenLevel[0] < 50 ? 1 : 0;

    const leftVentOpacity = isMobile ? mobileLeftOpacity : desktopLeftOpacity;
    const rightVentOpacity = isMobile ? mobileRightOpacity : desktopRightOpacity;

    // Murky haze opacity
    const hazeOpacity = (100 - oxygenLevel[0]) / 100 * 0.6;

    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#00050a] flex items-center justify-center">

            {/* Murky Haze Overlay - Optimized for Mobile */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none z-10 bg-[#3e2723] transition-opacity duration-1000",
                    isMobile ? "mix-blend-normal" : "mix-blend-overlay"
                )}
                style={{ opacity: isMobile ? hazeOpacity * 0.5 : hazeOpacity }}
            />

            {/* Main Container */}
            <div className="relative z-20 container mx-auto px-6 h-full">

                {isMobile ? (
                    // --- MOBILE LAYOUT (Ergonomic: Title Top, Vent Middle, Controls Bottom) ---
                    <div className="flex flex-col h-full py-8 justify-between">

                        {/* 1. Header (Top) */}
                        <div className="text-center z-30 mt-4">
                            <h2 className="text-4xl font-display text-white/95 mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                The Deep
                            </h2>
                            <p className="text-white/60 text-lg max-w-ws mx-auto leading-snug">
                                See what gets released in this low-oxygen environment when the conditions change.
                            </p>
                        </div>

                        {/* 2. Vents Area (Middle - One at a time) */}
                        <div className="flex-1 relative w-full flex items-center justify-center my-4">

                            {/* Left Vent (Safe) */}
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500"
                                style={{
                                    opacity: leftVentOpacity,
                                    zIndex: oxygenLevel[0] >= 50 ? 10 : 0,
                                    transform: `scale(${oxygenLevel[0] >= 50 ? 1 : 0.9})`,
                                    willChange: 'transform, opacity'
                                }}
                            >
                                <LeftVent className="w-full max-w-[320px] h-auto drop-shadow-[0_0_25px_rgba(38,198,218,0.4)]" />

                                {/* Label - Below Vent */}
                                <div className="mt-6 p-4 rounded-2xl glass-subtle border border-cyan-500/30 text-center backdrop-blur-xl bg-cyan-950/30">
                                    <h3 className="text-cyan-300 font-bold text-2xl mb-1">Safe Nitrogen</h3>
                                    <p className="text-cyan-100/80 text-sm">Well fed microbes complete the task, and nitrogen exits harmlessly.</p>
                                </div>
                            </div>

                            {/* Right Vent (Danger) */}
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500"
                                style={{
                                    opacity: rightVentOpacity,
                                    zIndex: oxygenLevel[0] < 50 ? 10 : 0,
                                    transform: `scale(${oxygenLevel[0] < 50 ? 1 : 0.9})`,
                                    willChange: 'transform, opacity'
                                }}
                            >
                                <RightVent className="w-full max-w-[320px] h-auto drop-shadow-[0_0_25px_rgba(255,87,34,0.4)]" />

                                {/* Label - Below Vent */}
                                <div className="mt-6 p-4 rounded-2xl glass-subtle border border-orange-500/30 text-center backdrop-blur-xl bg-orange-950/30">
                                    <h3 className="text-orange-400 font-bold text-2xl mb-1">Nitrous Oxide</h3>
                                    <p className="text-orange-100/80 text-sm">Starving microbes only complete half the job, and greenhouse gas escapes.</p>
                                </div>
                            </div>

                        </div>

                        {/* 3. Controls (Bottom) */}
                        <div className="w-full p-6 rounded-3xl glass-intense border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40 mb-4">
                            <h3 className="text-white font-display text-sm tracking-widest uppercase opacity-80 text-center mb-4">FOOD</h3>
                            <div className="flex justify-between items-center mb-2">
                                <span className={cn("text-xs font-bold transition-colors duration-500", oxygenLevel[0] < 50 ? "text-orange-400" : "text-white/30")}>
                                    Moderate and Dynamic
                                </span>
                                <span className={cn("text-xs font-bold transition-colors duration-500", oxygenLevel[0] > 50 ? "text-cyan-400" : "text-white/30")}>
                                    Abundant and Constant
                                </span>
                            </div>

                            <Slider
                                defaultValue={[100]}
                                max={100}
                                step={1}
                                value={oxygenLevel}
                                onValueChange={setOxygenLevel}
                                className="py-4 touch-none"
                            />
                        </div>
                    </div>
                ) : (
                    // --- DESKTOP LAYOUT (3-Column Grid) ---
                    <div className="grid grid-cols-12 gap-4 h-full items-center">
                        {/* Left Column: Safe Vent */}
                        <div className="col-span-4 flex flex-col items-center justify-end h-full order-1">
                            <div
                                className="relative w-full max-w-[300px] transition-all duration-1000 flex flex-col items-center"
                                style={{
                                    opacity: leftVentOpacity,
                                    filter: `brightness(${leftVentOpacity}) grayscale(${(1 - leftVentOpacity) * 100}%)`
                                }}
                            >
                                {/* Label */}
                                <div className={cn(
                                    "mb-4 p-3 rounded-xl glass-subtle border border-cyan-500/30 text-center transition-all duration-500 w-full backdrop-blur-md",
                                    oxygenLevel[0] > 50 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                )}>
                                    <h3 className="text-cyan-300 font-bold text-lg leading-none mb-1">Safe Nitrogen</h3>
                                    <p className="text-cyan-100/70 text-xs">Well fed microbes complete the task, and nitrogen exits harmlessly.</p>
                                </div>
                                <LeftVent className="w-full h-auto drop-shadow-[0_0_30px_rgba(38,198,218,0.3)]" />
                            </div>
                        </div>

                        {/* Center Column: Title & Controls */}
                        <div className="col-span-4 flex flex-col items-center justify-center text-center z-30 order-2">
                            <div className="mb-16">
                                <h2 className="text-5xl font-display text-white/90 mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                    The Deep
                                </h2>
                                <p className="text-white/50 text-base max-w-ws mx-auto leading-relaxed">
                                    See what gets released in this low-oxygen environment when the conditions change.
                                </p>
                            </div>

                            {/* Control Panel */}
                            <div className="w-full max-w-sm p-6 rounded-2xl glass-intense border border-white/10 shadow-2xl backdrop-blur-xl bg-black/20">
                                <h3 className="text-white font-display text-sm tracking-widest uppercase opacity-80 text-center mb-4">FOOD</h3>
                                <div className="flex justify-between items-center mb-2">
                                    <span className={cn("text-xs font-bold transition-colors duration-500", oxygenLevel[0] < 50 ? "text-orange-400" : "text-white/30")}>
                                        Moderate and Dynamic
                                    </span>
                                    <span className={cn("text-xs font-bold transition-colors duration-500", oxygenLevel[0] > 50 ? "text-cyan-400" : "text-white/30")}>
                                        Abundant and Constant
                                    </span>
                                </div>

                                <Slider
                                    defaultValue={[100]}
                                    max={100}
                                    step={1}
                                    value={oxygenLevel}
                                    onValueChange={setOxygenLevel}
                                    className="py-2 cursor-pointer"
                                />

                                <p className="text-white/40 text-xs mt-4">
                                    {oxygenLevel[0] > 50
                                        ? "Microbes have enough energy to finish the job."
                                        : "Low food leads to incomplete denitrification."}
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Danger Vent */}
                        <div className="col-span-4 flex flex-col items-center justify-end h-full order-3">
                            <div
                                className="relative w-full max-w-[300px] transition-all duration-1000 flex flex-col items-center"
                                style={{
                                    opacity: rightVentOpacity,
                                    filter: `brightness(${rightVentOpacity}) grayscale(${(1 - rightVentOpacity) * 50}%)`
                                }}
                            >
                                {/* Label */}
                                <div className={cn(
                                    "mb-4 p-3 rounded-xl glass-subtle border border-orange-500/30 text-center transition-all duration-500 w-full backdrop-blur-md",
                                    oxygenLevel[0] < 50 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                )}>
                                    <h3 className="text-orange-400 font-bold text-lg leading-none mb-1">Nitrous Oxide</h3>
                                    <p className="text-orange-100/70 text-xs">Starving microbes only complete half the job, and greenhouse gas escapes.</p>
                                </div>
                                <RightVent className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,87,34,0.3)]" />
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Bottom Fade to Hero */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#00050a] pointer-events-none" />
        </section>
    );
};
