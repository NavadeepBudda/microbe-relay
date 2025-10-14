import { AlertTriangle } from "lucide-react";

export const N2OGaugeCard = () => {
  return (
    <div className="glass-subtle rounded-3xl p-6 md:p-8 border border-white/20">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral-cta/20 to-amber-500/20 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-coral-cta" />
        </div>
        <h3 className="text-lg font-bold text-white">N₂O Gauge</h3>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Vertical gauge */}
        <div className="relative w-20 h-48 bg-white/10 rounded-full p-2">
          {/* Gradient fill */}
          <div className="absolute inset-2 rounded-full overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-glow/60 via-omz-violet/60 to-coral-cta/80 transition-all duration-500"
              style={{ height: '40%' }}
            />
          </div>
          
          {/* Marks */}
          <div className="absolute top-2 right-full mr-3 text-xs text-white/50 font-medium">High</div>
          <div className="absolute top-1/2 -translate-y-1/2 right-full mr-3 text-xs text-white/70 font-semibold">Mid</div>
          <div className="absolute bottom-2 right-full mr-3 text-xs text-white/50 font-medium">Low</div>
          
          {/* Pointer */}
          <div className="absolute left-1/2 -translate-x-1/2 transition-all duration-500" style={{ top: '58%' }}>
            <div className="w-6 h-1 bg-white rounded-full shadow-lg" />
          </div>
        </div>
        
        {/* Neutral face */}
        <div className="mt-4 text-2xl">😐</div>
        
        <p className="mt-3 text-xs text-white/60 text-center max-w-[200px]">
          Rises in certain resource mixes
        </p>
      </div>
    </div>
  );
};
