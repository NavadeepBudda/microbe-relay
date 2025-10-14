import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RelayNode } from "@/components/RelayNode";
import { RelayArrow } from "@/components/RelayArrow";
import { StepCard } from "@/components/StepCard";
import { FoodControlCard } from "@/components/FoodControlCard";
import { ExplanationCard } from "@/components/ExplanationCard";
import { N2OGaugeCard } from "@/components/N2OGaugeCard";
import { GlossaryChip } from "@/components/GlossaryChip";
import { useState, useEffect } from "react";

const MeetTheRelay = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const glossaryItems: Array<{ term: string; definition: string; icon: "denit" | "modular" | "n2o" }> = [
    {
      term: "Denitrification",
      definition: "Microbes breathing nitrogen when oxygen is scarce",
      icon: "denit"
    },
    {
      term: "Modular",
      definition: "Different microbes do different steps of the chain",
      icon: "modular"
    },
    {
      term: "N₂O",
      definition: "A greenhouse gas made in the chain",
      icon: "n2o"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-abyss via-abyss/95 to-abyss relative overflow-hidden">
      {/* Animated ocean background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-teal-glow/10 via-omz-violet/10 to-transparent animate-breathe"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
          }}
        />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-teal-glow/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-abyss/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white" />
                <div className="w-2 h-2 rounded-full bg-white" />
                <div className="w-2 h-2 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-12 md:pt-20 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border border-white/20 mb-6">
              <Info className="w-4 h-4 text-teal-glow" />
              <span className="text-sm text-white/80">A few microbes can do many steps, but most do one or two</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Meet the Relay
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-16">
              Four steps transform nitrogen in the ocean's twilight zone
            </p>

            {/* Relay Pipeline Diagram */}
            <div className="relative max-w-4xl mx-auto mb-32">
              {/* Multistep specialist band */}
              <div className="absolute top-0 left-0 right-0 -mt-20 flex justify-center">
                <div className="glass-subtle rounded-full px-6 py-2 border border-white/20">
                  <span className="text-xs font-semibold text-white/60">Multi-step specialists span multiple reactions</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 md:gap-8">
                {/* Step 1: NO3 → NO2 */}
                <div className="relative">
                  <StepCard
                    step={1}
                    from="NO₃⁻"
                    to="NO₂⁻"
                    description="First-step specialists lead with minimal enzymes"
                    icon="🦠"
                  />
                  <RelayNode label="NO" subscript="3⁻" glowColor="hsl(var(--teal-glow))" />
                </div>

                <RelayArrow />

                {/* Step 2: NO2 → N2O */}
                <div className="relative">
                  <StepCard
                    step={2}
                    from="NO₂⁻"
                    to="N₂O"
                    description="Second-step specialists join when food allows"
                    icon="🔗"
                  />
                  <RelayNode label="NO" subscript="2⁻" glowColor="hsl(var(--omz-violet))" />
                </div>

                <RelayArrow />

                {/* Step 3: N2O → N2 */}
                <div className="relative">
                  <StepCard
                    step={3}
                    from="N₂O"
                    to="N₂"
                    description="Third-step specialists complete the relay"
                    icon="🏁"
                  />
                  <RelayNode label="N" subscript="2O" glowColor="hsl(var(--coral-cta))" className="bg-gradient-to-br from-coral-cta/20 to-amber-500/20" />
                </div>

                <RelayArrow />

                {/* Final: N2 */}
                <div className="relative">
                  <RelayNode label="N" subscript="2" glowColor="#4ade80" className="bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/60">
                    Harmless gas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <FoodControlCard />
              <ExplanationCard />
              <N2OGaugeCard />
            </div>
          </div>
        </section>

        {/* Glossary Strip */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold text-white/70 mb-6 text-center">Key Concepts</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {glossaryItems.map((item, index) => (
                <GlossaryChip
                  key={index}
                  term={item.term}
                  definition={item.definition}
                  icon={item.icon}
                  onFlip={() => {}}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-intense rounded-3xl p-8 md:p-12 border border-white/20 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to explore?
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Now that you understand the relay, dive into the interactive lab where you can control food levels and watch the specialists respond in real-time.
              </p>
              <Button
                onClick={() => navigate("/relay")}
                size="lg"
                className="bg-coral-cta hover:bg-coral-cta/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Explore the Interactive Lab
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MeetTheRelay;
