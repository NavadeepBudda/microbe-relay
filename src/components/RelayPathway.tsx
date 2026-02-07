
import React from 'react';

export const RelayPathway = () => {
    return (
        <div className="w-full mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center overflow-hidden">

            <div className="flex items-center justify-between w-full relative">

                {/* Connection Line Background */}
                <div className="absolute top-[24px] left-6 right-6 h-[2px] bg-white/5 z-0" />

                {/* Step 1: Nitrate */}
                <div className="flex flex-col items-center z-10 relative group">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3 shadow-lg shadow-cyan-500/5 backdrop-blur-sm transition-transform group-hover:scale-110 duration-300">
                        <span className="text-lg font-bold text-cyan-200">NO₃⁻</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-cyan-200/60 font-semibold">Nitrate</span>
                    <div className="absolute -right-[50%] top-4 text-[9px] text-white/20 font-mono hidden sm:block">Step 1</div>
                </div>

                {/* Step 2: Nitrite */}
                <div className="flex flex-col items-center z-10 relative group">
                    <div className="w-12 h-12 rounded-xl bg-omz-violet/10 border border-omz-violet/30 flex items-center justify-center mb-3 shadow-lg shadow-omz-violet/5 backdrop-blur-sm transition-transform group-hover:scale-110 duration-300 delay-75">
                        <span className="text-lg font-bold text-omz-violet">NO₂⁻</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-omz-violet/60 font-semibold">Nitrite</span>
                    <div className="absolute -right-[50%] top-4 text-[9px] text-white/20 font-mono hidden sm:block">Step 2</div>
                </div>

                {/* Step 3: N2O */}
                <div className="flex flex-col items-center z-10 relative group">
                    {/* Floating Warning Label */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:-translate-y-1">
                        <span className="bg-orange-500/20 border border-orange-500/30 text-orange-200 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            ⚠️ Greenhouse
                        </span>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-3 shadow-lg shadow-orange-500/5 backdrop-blur-sm transition-transform group-hover:scale-110 duration-300 delay-150">
                        <span className="text-lg font-bold text-orange-300">N₂O</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-orange-300/60 font-semibold">Nitrous Oxide</span>
                    <div className="absolute -right-[50%] top-4 text-[9px] text-white/20 font-mono hidden sm:block">Step 3</div>
                </div>

                {/* Final: Nitrogen Gas */}
                <div className="flex flex-col items-center z-10 relative group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/5 backdrop-blur-sm transition-transform group-hover:scale-110 duration-300 delay-200">
                        <span className="text-lg font-bold text-emerald-300">N₂</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-300/60 font-semibold">Nitrogen</span>
                </div>

            </div>
        </div>
    );
};
