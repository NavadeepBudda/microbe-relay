import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const explanations = {
  low: "Low food prefers the first-step specialist because it needs fewer enzymes.",
  high: "High food can support longer, multistep specialists when nitrogen is scarce."
};

export const ExplanationCard = () => {
  const [mode, setMode] = useState<'low' | 'high'>('low');
  
  return (
    <div className="glass-subtle rounded-3xl p-6 md:p-8 border border-white/20 relative">
      {/* Speech bubble pointer */}
      <div className="absolute -top-3 left-8 w-6 h-6 bg-white/10 border-l border-t border-white/20 backdrop-blur-xl rotate-45" />
      
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-omz-violet/20 to-coral-cta/20 flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 text-omz-violet" />
        </div>
        <h3 className="text-lg font-bold text-white">Explanation</h3>
      </div>
      
      <p className="text-white/90 text-base leading-relaxed mb-6">
        {explanations[mode]}
      </p>
      
      <div className="flex gap-2">
        <Button
          onClick={() => setMode('low')}
          variant="ghost"
          size="sm"
          className={`text-xs ${mode === 'low' ? 'bg-teal-glow/20 text-teal-glow' : 'text-white/60 hover:text-white'}`}
        >
          Low Food
        </Button>
        <Button
          onClick={() => setMode('high')}
          variant="ghost"
          size="sm"
          className={`text-xs ${mode === 'high' ? 'bg-coral-cta/20 text-coral-cta' : 'text-white/60 hover:text-white'}`}
        >
          High Food
        </Button>
      </div>
    </div>
  );
};
