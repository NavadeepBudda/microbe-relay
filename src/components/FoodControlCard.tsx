import { Feather, Utensils, UtensilsCrossed } from "lucide-react";

export const FoodControlCard = () => {
  return (
    <div className="glass-subtle rounded-3xl p-6 md:p-8 border border-white/20">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-glow/20 to-omz-violet/20 flex items-center justify-center">
          <Utensils className="w-5 h-5 text-teal-glow" />
        </div>
        <h3 className="text-lg font-bold text-white">Food (Organic Matter)</h3>
      </div>
      
      <div className="relative">
        {/* Slider track */}
        <div className="h-2 bg-white/10 rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-glow/40 via-omz-violet/40 to-coral-cta/40" style={{ width: '50%' }} />
        </div>
        
        {/* Thumb */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="w-6 h-6 rounded-full bg-white border-4 border-omz-violet shadow-lg" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-omz-violet rounded-lg text-xs font-bold text-white whitespace-nowrap">
            Medium
          </div>
        </div>
        
        {/* Labels */}
        <div className="flex justify-between items-end mt-8">
          <div className="flex flex-col items-center gap-2">
            <Feather className="w-5 h-5 text-teal-glow/60" />
            <span className="text-xs font-semibold text-white/70">Low</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Utensils className="w-5 h-5 text-omz-violet/80" />
            <span className="text-xs font-semibold text-white/90">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-coral-cta" />
            <span className="text-xs font-semibold text-white">High</span>
          </div>
        </div>
      </div>
    </div>
  );
};
