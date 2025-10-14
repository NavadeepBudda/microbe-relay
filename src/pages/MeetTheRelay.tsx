import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RelayNode } from "@/components/RelayNode";
import { RelayArrow } from "@/components/RelayArrow";
import { StepCard } from "@/components/StepCard";
import { FoodControlCard } from "@/components/FoodControlCard";
import { ExplanationCard } from "@/components/ExplanationCard";
import { N2OGaugeCard } from "@/components/N2OGaugeCard";
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
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex items-center justify-between h-20">
              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm shadow-white/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm shadow-white/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-16 md:pt-24 pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top content - centered */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle border border-white/20 mb-8">
                <Info className="w-4 h-4 text-teal-glow" />
                <span className="text-sm text-white/80">A few microbes can do many steps, but most do one or two</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                Meet the Relay
              </h1>
              
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                Four steps transform nitrogen in the ocean's twilight zone
              </p>
            </div>

            {/* Relay Pipeline Diagram */}
            <div className="relative max-w-5xl mx-auto pt-40">
              {/* Multistep specialist band */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md">
                <div className="glass-subtle rounded-full px-6 py-2 border border-white/20 text-center">
                  <span className="text-xs font-semibold text-white/60">Multi-step specialists span multiple reactions</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 md:gap-4 lg:gap-6">
                {/* Step 1: NO3 → NO2 */}
                <div className="relative flex-shrink-0">
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
                <div className="relative flex-shrink-0">
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
                <div className="relative flex-shrink-0">
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
                <div className="relative flex-shrink-0">
                  <RelayNode label="N" subscript="2" glowColor="#4ade80" className="bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/60 font-medium">
                    Harmless gas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
              Control the Environment
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <FoodControlCard />
              <ExplanationCard />
              <N2OGaugeCard />
            </div>
          </div>
        </section>

        {/* Glossary Strip */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
              Key Concepts
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {glossaryItems.map((item, index) => (
                <div 
                  key={index}
                  className="glass-subtle rounded-2xl p-6 border border-white/20 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-4xl mb-4">{item.icon === 'denit' ? '🫁' : item.icon === 'modular' ? '🧩' : '🌡️'}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.term}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 pb-24 md:pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-intense rounded-3xl p-10 md:p-16 border border-white/20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to explore?
              </h2>
              <p className="text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                Now that you understand the relay, dive into the interactive lab where you can control food levels and watch the specialists respond in real-time.
              </p>
              <Button
                onClick={() => navigate("/relay")}
                size="lg"
                className="bg-coral-cta hover:bg-coral-cta/90 text-white font-semibold px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
