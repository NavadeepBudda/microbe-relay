import { useState, useRef, useEffect } from "react";
import { HelpCircle, X, ExternalLink } from "lucide-react";

interface HelpTooltipProps {
  term: string;
  definition: string;
  context?: string;
  example?: string;
  moreInfo?: {
    title: string;
    description: string;
    link?: string;
  };
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

export const HelpTooltip = ({ 
  term, 
  definition, 
  context, 
  example,
  moreInfo,
  position = "top",
  children 
}: HelpTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(position);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && tooltipRef.current && triggerRef.current) {
      const tooltip = tooltipRef.current;
      const trigger = triggerRef.current;
      const rect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Adjust position based on available space
      let newPosition = position;
      
      if (position === "top" && rect.top < tooltipRect.height + 20) {
        newPosition = "bottom";
      } else if (position === "bottom" && rect.bottom + tooltipRect.height + 20 > viewportHeight) {
        newPosition = "top";
      } else if (position === "left" && rect.left < tooltipRect.width + 20) {
        newPosition = "right";
      } else if (position === "right" && rect.right + tooltipRect.width + 20 > viewportWidth) {
        newPosition = "left";
      }

      setTooltipPosition(newPosition);
    }
  }, [isOpen, position]);

  const getTooltipClasses = () => {
    const base = "absolute z-50 w-80 max-w-sm glass-intense rounded-xl p-4 border border-white/20 shadow-2xl";
    
    switch (tooltipPosition) {
      case "top":
        return `${base} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      case "bottom":
        return `${base} top-full left-1/2 transform -translate-x-1/2 mt-2`;
      case "left":
        return `${base} right-full top-1/2 transform -translate-y-1/2 mr-2`;
      case "right":
        return `${base} left-full top-1/2 transform -translate-y-1/2 ml-2`;
      default:
        return `${base} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
    }
  };

  const getArrowClasses = () => {
    const base = "absolute w-3 h-3 bg-white/10 border border-white/20 transform rotate-45";
    
    switch (tooltipPosition) {
      case "top":
        return `${base} top-full left-1/2 -translate-x-1/2 -translate-y-1/2`;
      case "bottom":
        return `${base} bottom-full left-1/2 -translate-x-1/2 translate-y-1/2`;
      case "left":
        return `${base} left-full top-1/2 -translate-x-1/2 -translate-y-1/2`;
      case "right":
        return `${base} right-full top-1/2 translate-x-1/2 -translate-y-1/2`;
      default:
        return `${base} top-full left-1/2 -translate-x-1/2 -translate-y-1/2`;
    }
  };

  return (
    <div className="relative inline-block" ref={triggerRef}>
      {/* Trigger */}
      <div 
        className="cursor-help inline-flex items-center gap-1"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        <HelpCircle className="w-4 h-4 text-primary/70 hover:text-primary transition-colors" />
      </div>

      {/* Tooltip */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div
            ref={tooltipRef}
            className={getTooltipClasses()}
            style={{
              animation: "fadeIn 200ms ease-out forwards"
            }}
          >
            {/* Arrow */}
            <div className={getArrowClasses()} />
            
            {/* Content */}
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-primary text-sm">
                  {term}
                </h4>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors md:hidden"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>

              {/* Definition */}
              <p className="text-sm text-foreground leading-relaxed">
                {definition}
              </p>

              {/* Context */}
              {context && (
                <div className="glass-subtle rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Context
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {context}
                  </p>
                </div>
              )}

              {/* Example */}
              {example && (
                <div className="glass-subtle rounded-lg p-3">
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    Example
                  </h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {example}
                  </p>
                </div>
              )}

              {/* More info */}
              {moreInfo && (
                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h5 className="text-xs font-semibold text-primary mb-1">
                        {moreInfo.title}
                      </h5>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {moreInfo.description}
                      </p>
                    </div>
                    {moreInfo.link && (
                      <a
                        href={moreInfo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 text-primary" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Pre-configured tooltips for common terms
export const DenitrificationTooltip = ({ children }: { children: React.ReactNode }) => (
  <HelpTooltip
    term="Denitrification"
    definition="A microbial process that converts nitrate to nitrogen gas when oxygen is scarce"
    context="Essential for removing excess nitrogen from ecosystems and completing the nitrogen cycle"
    example="In oxygen minimum zones, microbes use nitrate instead of oxygen for respiration"
    moreInfo={{
      title: "Environmental Impact",
      description: "Removes ~50% of ocean nitrogen, affecting marine productivity and climate"
    }}
  >
    {children}
  </HelpTooltip>
);

export const ModularTooltip = ({ children }: { children: React.ReactNode }) => (
  <HelpTooltip
    term="Modular Process"
    definition="Most microbes perform only 1-2 steps of the 4-step denitrification pathway"
    context="Like specialists in a relay race - each team member excels at their specific step"
    example="Some microbes only convert NO₃⁻ → NO₂⁻, while others handle N₂O → N₂"
    moreInfo={{
      title: "Evolutionary Advantage",
      description: "Specialization allows efficient resource use and faster response to environmental changes"
    }}
  >
    {children}
  </HelpTooltip>
);

export const N2OTooltip = ({ children }: { children: React.ReactNode }) => (
  <HelpTooltip
    term="Nitrous Oxide (N₂O)"
    definition="A greenhouse gas that's 300x more potent than CO₂"
    context="Produced as an intermediate step in denitrification"
    example="When the relay gets crowded, N₂O escapes before being converted to harmless N₂"
    moreInfo={{
      title: "Climate Impact",
      description: "Ocean N₂O emissions contribute significantly to global greenhouse warming"
    }}
  >
    {children}
  </HelpTooltip>
);