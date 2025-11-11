import { AlertTriangle, Activity } from "lucide-react";

export const N2OGaugeCard = () => {
  const gaugeValue = 0.42;
  const pointerRotation = -120 + gaugeValue * 240;
  const gaugePercent = Math.round(gaugeValue * 100);

  return (
    <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-[rgba(12,24,44,0.82)] p-4 md:p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-coral-cta/18 via-transparent to-amber-400/12" aria-hidden />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/12 text-white">
            <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-coral-200" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">N₂O monitor</p>
            <h3 className="mt-1 text-sm md:text-lg font-semibold text-white">Gauge preview</h3>
          </div>
        </div>

        <p className="mt-3 md:mt-4 text-xs md:text-sm text-white/75 leading-relaxed">
          Track nitrous oxide as the relay expands. Rising values signal it&apos;s time for the closing team to finish the final conversion to harmless N₂.
        </p>

        <div className="mt-4 md:mt-6 flex flex-1 items-center justify-center">
          <div className="relative h-32 w-32 sm:h-36 sm:w-36 md:h-44 md:w-44">
            <div className="absolute inset-0 rounded-full border border-white/10 bg-[conic-gradient(from_220deg,_rgba(26,220,178,0.35)_0deg,_rgba(121,80,255,0.45)_140deg,_rgba(245,97,69,0.65)_240deg,_rgba(245,97,69,0.05)_300deg,_rgba(26,220,178,0.1)_360deg)]" />
            <div className="absolute inset-3 md:inset-5 rounded-full border border-white/10 bg-[rgba(8,18,32,0.92)] shadow-inner" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">N₂O</p>
                <p className="mt-1 text-2xl sm:text-3xl md:text-4xl font-semibold">{gaugePercent}%</p>
                <p className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/60">Current level</p>
              </div>
            </div>
            <div
              className="absolute left-1/2 top-1/2 h-14 sm:h-16 md:h-20 w-[2px] origin-bottom rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]"
              style={{ transform: `translate(-50%, -100%) rotate(${pointerRotation}deg)` }}
            />
            <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 md:h-3 md:w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow" />
          </div>
        </div>

        <div className="mt-3 md:mt-4 rounded-[1.25rem] border border-white/12 bg-white/5 p-3 md:p-4 text-xs text-white/70">
          <div className="flex items-center gap-2 font-semibold text-white/80">
            <Activity className="h-4 w-4 text-coral-200" />
            Why it matters
          </div>
          <p className="mt-1 md:mt-2 leading-relaxed">
            If this gauge spikes without dropping, it means the closing team is off-duty. Add food or reduce oxygen to bring them back into the relay.
          </p>
        </div>
      </div>
    </div>
  );
};
