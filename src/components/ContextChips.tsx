import { useState } from "react";
import { Info, X, Microscope, Recycle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContextChip {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  definition: string;
  context: string;
  example: string;
  color: string;
  borderColor: string;
}

const contextChips: ContextChip[] = [
  {
    id: "denitrification",
    label: "Denitrification",
    icon: Recycle,
    definition: "The process where microbes use nitrogen compounds as electron acceptors when oxygen is scarce.",
    context: "This happens in oxygen minimum zones where microbes need alternative ways to 'breathe' and get energy.",
    example: "In the ocean's twilight zone, microbes switch from oxygen breathing to nitrogen breathing when conditions change.",
    color: "text-teal-200",
    borderColor: "border-teal-glow/30",
  },
  {
    id: "modular",
    label: "Modular",
    icon: Microscope,
    definition: "A system where different organisms specialize in specific steps rather than doing everything themselves.",
    context: "Most denitrifying microbes are specialists - they excel at one or two steps but can't do the whole process.",
    example: "Like an assembly line: some workers install wheels, others paint, rather than one person building the entire car.",
    color: "text-omz-violet",
    borderColor: "border-omz-violet/30",
  },
  {
    id: "n2o",
    label: "N₂O",
    icon: AlertTriangle,
    definition: "Nitrous oxide - a potent greenhouse gas that's 300 times more warming than CO₂.",
    context: "It's produced as an intermediate step in denitrification and can escape to the atmosphere if not fully processed.",
    example: "When the relay gets 'stuck' at step 2, N₂O accumulates instead of being converted to harmless N₂.",
    color: "text-coral-200",
    borderColor: "border-coral-cta/30",
  },
];

interface ContextChipsProps {
  className?: string;
}

export const ContextChips = ({ className }: ContextChipsProps) => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipClick = (chipId: string) => {
    setSelectedChip(selectedChip === chipId ? null : chipId);
  };

  const selectedChipData = contextChips.find(chip => chip.id === selectedChip);

  return (
    <div className={`space-y-4 ${className || ""}`}>
      {/* Chip buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {contextChips.map((chip) => {
          const Icon = chip.icon;
          const isSelected = selectedChip === chip.id;
          
          return (
            <button
              key={chip.id}
              onClick={() => handleChipClick(chip.id)}
              className={`
                inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105
                ${isSelected 
                  ? `${chip.borderColor} bg-white/15 ${chip.color} shadow-lg` 
                  : "border-white/20 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <Icon className={`h-4 w-4 ${isSelected ? "" : "opacity-70"}`} />
              {chip.label}
              {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />}
            </button>
          );
        })}
      </div>

      {/* Modal/Tooltip for selected chip */}
      {selectedChip && selectedChipData && (
        <div className="relative">
          <div className="glass-intense rounded-2xl border border-white/20 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] animate-scale-in">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border ${selectedChipData.borderColor}`}>
                  <selectedChipData.icon className={`h-5 w-5 ${selectedChipData.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {selectedChipData.label}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Key Concept
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setSelectedChip(null)}
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white p-2 rounded-full -mt-1 -mr-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-white/90 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Definition
                </h4>
                <p className="text-white/75 leading-relaxed">
                  {selectedChipData.definition}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white/90 mb-2">
                  Why it matters
                </h4>
                <p className="text-white/75 leading-relaxed">
                  {selectedChipData.context}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white/90 mb-2">
                  Real-world example
                </h4>
                <p className="text-white/75 leading-relaxed italic">
                  {selectedChipData.example}
                </p>
              </div>
            </div>

            {/* Visual accent */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${selectedChipData.color.replace('text-', 'from-').replace('-200', '/10')} to-transparent pointer-events-none opacity-50`} />
          </div>
        </div>
      )}

      {/* Hint text */}
      {!selectedChip && (
        <p className="text-center text-xs text-white/50 animate-pulse">
          Click any concept chip to learn more
        </p>
      )}
    </div>
  );
};