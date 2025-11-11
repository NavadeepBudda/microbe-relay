import { Feather, Utensils, UtensilsCrossed } from "lucide-react";

export const FoodControlCard = () => {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-[rgba(8,20,36,0.82)] p-4 md:p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-glow/18 via-transparent to-omz-violet/15" aria-hidden />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-white/12 text-white">
            <Utensils className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Food control</p>
            <h3 className="mt-1 text-sm md:text-lg font-semibold text-white">Organic matter slider</h3>
          </div>
        </div>

        <p className="mt-3 md:mt-4 text-xs md:text-sm text-white/75 leading-relaxed">
          Drag to feed the microbes. Low settings favor step-one specialists; high settings keep the entire relay engaged.
        </p>

        <div className="mt-4 md:mt-6 space-y-4 md:space-y-5">
          <div className="relative h-3 md:h-2 rounded-full bg-white/10 touch-manipulation">
            <div className="absolute inset-y-0 left-0 w-[55%] rounded-full bg-gradient-to-r from-teal-glow/70 via-omz-violet/70 to-coral-cta/80 transition-all duration-500" />
            <div className="absolute -top-6 md:-top-4 left-[55%] flex -translate-x-1/2 flex-col items-center gap-1">
              <div className="rounded-full border border-white/20 bg-white p-1 shadow-lg">
                <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-omz-violet" />
              </div>
              <span className="rounded-full bg-white/10 px-1.5 md:px-2 py-0.5 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                Medium
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-white/60">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2">
              <Feather className="h-4 w-4 text-teal-200/80" />
              <span className="text-center sm:text-left">Low</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-white/80">
              <Utensils className="h-4 w-4 text-omz-violet/80" />
              <span className="text-center sm:text-left">Medium</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-1 sm:gap-2 text-white">
              <UtensilsCrossed className="h-4 w-4 text-coral-cta" />
              <span className="text-center sm:text-left">High</span>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 rounded-[1.25rem] border border-white/12 bg-white/5 p-3 md:p-4 text-xs text-white/70">
          <p className="font-semibold text-white/80">What changes?</p>
          <p className="mt-1 md:mt-2 leading-relaxed">
            Lower inputs freeze the relay at step one. Raising the slider unlocks multistep specialists to carry the baton further.
          </p>
        </div>
      </div>
    </div>
  );
};
