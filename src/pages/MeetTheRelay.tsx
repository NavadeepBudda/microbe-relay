import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  GaugeCircle,
  Link2,
  Microscope,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { RelayNode } from "@/components/RelayNode";
import { FoodControlCard } from "@/components/FoodControlCard";

type RelayStage = {
  stage: string;
  chemical: string;
  role: string;
  description: string;
  insight: string;
  node: {
    label: string;
    subscript?: string;
    glowColor: string;
  };
};

type MicrobeProfile = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  accent: string;
};

const relayStages: RelayStage[] = [
  {
    stage: "Step 01",
    chemical: "NO₃⁻ → NO₂⁻",
    role: "Starter specialists",
    description: "Lean enzyme sets ignite the relay as soon as oxygen dips.",
    insight: "Perfect for scarce food and low oxygen moments.",
    node: {
      label: "NO",
      subscript: "₃⁻",
      glowColor: "hsl(var(--teal-glow))",
    },
  },
  {
    stage: "Step 02",
    chemical: "NO₂⁻ → N₂O",
    role: "Relay converters",
    description: "Modular microbes join when food levels rise enough to fuel longer pathways.",
    insight: "Balances energy cost with denitrification speed.",
    node: {
      label: "NO",
      subscript: "₂⁻",
      glowColor: "hsl(var(--omz-violet))",
    },
  },
  {
    stage: "Step 03",
    chemical: "N₂O → N₂",
    role: "Closing team",
    description: "Final-step microbes neutralize potent N₂O before it escapes to the sky.",
    insight: "Crucial for keeping greenhouse gases in check.",
    node: {
      label: "N",
      subscript: "₂O",
      glowColor: "hsl(var(--coral-cta))",
    },
  },
  {
    stage: "Release",
    chemical: "N₂ to atmosphere",
    role: "Harmless finish",
    description: "Nitrogen returns to its inert form and diffuses back into the broader ocean.",
    insight: "A safe ending—no reactive nitrogen left behind.",
    node: {
      label: "N",
      subscript: "₂",
      glowColor: "#4ade80",
    },
  },
];

const microbeProfiles: MicrobeProfile[] = [
  {
    icon: Microscope,
    title: "Starter specialists",
    subtitle: "Nitrate reducers",
    description: "Operate on the lightest energy budget, flipping nitrate into nitrite within moments.",
    highlights: [
      "Activate instantly as oxygen falls",
      "Minimal enzyme toolkit to conserve energy",
      "Keep the relay primed even when food is sparse",
    ],
    accent: "from-teal-glow/20 via-transparent to-white/5",
  },
  {
    icon: Link2,
    title: "Relay converters",
    subtitle: "Nitrite transformers",
    description: "Modular players that stretch across steps when resources allow for a longer hand-off.",
    highlights: [
      "Adjust participation based on available food",
      "Bridge early and late reactions with shared enzymes",
      "Introduce the intermediate N₂O pulse",
    ],
    accent: "from-omz-violet/20 via-transparent to-white/5",
  },
  {
    icon: Droplets,
    title: "Closing team",
    subtitle: "N₂O scrubbers",
    description: "Prevent nitrous oxide from escaping by completing the last reduction to inert nitrogen.",
    highlights: [
      "Guard against greenhouse leakage",
      "Need stable food and low oxygen to stay engaged",
      "Return nitrogen safely to the atmosphere",
    ],
    accent: "from-coral-cta/20 via-transparent to-white/5",
  },
];

const MeetTheRelay = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth - 0.5) * 28,
        y: (event.clientY / window.innerHeight - 0.5) * 28,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_hsla(var(--teal-glow)_/_0.28)_0%,_transparent_70%)] blur-3xl"
          style={{ transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.2}px)` }}
          aria-hidden
        />
        <div
          className="absolute -bottom-32 right-[-160px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,_hsla(var(--omz-violet)_/_0.26)_0%,_transparent_65%)] blur-3xl"
          style={{ transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.25}px)` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.12)_0%,_rgba(255,255,255,0)_50%)] opacity-40" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:100%_72px] opacity-10" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(6,15,26,0.82)] backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              size="lg"
              className="gap-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to overview
            </Button>

            <div className="hidden items-center gap-2 text-xs uppercase tracking-[0.4em] text-white/60 sm:flex">
              <span className="h-2 w-2 rounded-full bg-white/60" />
              <span className="h-2 w-2 rounded-full bg-teal-400/70" />
              <span className="h-2 w-2 rounded-full bg-omz-violet/60" />
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col">
          <section className="relative isolate pb-24 pt-16 md:pb-28 md:pt-24">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6">
              <div className="space-y-8 text-center md:text-left">
                <div className="inline-flex items-center gap-2 self-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white/60 backdrop-blur-xl md:self-start">
                  <Zap className="h-4 w-4 text-teal-200" />
                  Relay intelligence
                </div>
                <div className="space-y-6">
                  <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    Meet the Relay
                  </h1>
                  <p className="mx-auto max-w-3xl text-base text-white/80 sm:text-lg md:mx-0">
                    Four precision reactions pass nitrogen like a baton through the twilight zone. Specialists swap roles in response to changing food, oxygen, and nitrogen—keeping Earth’s oceans balanced.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-[0_40px_120px_-45px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18)_0%,_rgba(10,24,44,0.85)_55%,_rgba(6,15,26,0.95)_100%)] opacity-90" aria-hidden />
                <div className="relative z-10 overflow-x-auto">
                  <div className="flex min-w-[920px] items-start gap-12">
                    {relayStages.map((stage, index) => (
                      <div
                        key={stage.stage}
                        className="group relative flex min-w-[220px] flex-col items-center text-center"
                      >
                        <div className="relative flex flex-col items-center">
                          <RelayNode
                            label={stage.node.label}
                            subscript={stage.node.subscript}
                            glowColor={stage.node.glowColor}
                            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                          />
                          {index < relayStages.length - 1 && (
                            <div className="absolute left-full top-1/2 ml-4 h-[2px] w-20 -translate-y-1/2 bg-gradient-to-r from-white/40 via-white/25 to-transparent sm:w-28" />
                          )}
                        </div>
                        <div className="mt-6 w-full rounded-[1.5rem] border border-white/15 bg-white/8 p-6 text-left shadow-[0_24px_72px_-50px_rgba(0,0,0,0.85)] transition group-hover:border-white/35 group-hover:bg-white/12">
                          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
                            <span>{stage.stage}</span>
                            <span className="h-1 w-12 rounded-full bg-gradient-to-r from-teal-200 via-omz-violet/70 to-coral-cta/70" />
                            <span>{stage.role}</span>
                          </div>
                          <p className="mt-4 text-lg font-semibold text-white">{stage.chemical}</p>
                          <p className="mt-3 text-sm text-white/70">{stage.description}</p>
                          <p className="mt-4 text-xs font-medium text-teal-100/90">{stage.insight}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mx-auto w-full max-w-3xl">
                <FoodControlCard />
              </div>
            </div>
          </section>

          <section className="relative border-t border-white/10 bg-white/5 py-24 md:py-32">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
              <div className="flex flex-col gap-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 self-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white/60 md:self-start">
                  <GaugeCircle className="h-4 w-4" />
                  Microbe playbook
                </div>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                  Who holds the baton at every moment
                </h2>
                <p className="max-w-3xl text-base text-white/75 sm:text-lg">
                  Specialists tune in and out of the relay depending on how much food is available and how low oxygen dips. Each team contributes a precise move that keeps the nitrogen cycle balanced.
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {microbeProfiles.map(({ icon: Icon, title, subtitle, description, highlights, accent }) => (
                  <div
                    key={title}
                    className="relative flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-[rgba(10,22,38,0.65)] p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
                  >
                    <div className={`absolute inset-0 rounded-[1.75rem] bg-gradient-to-br ${accent} opacity-70`} aria-hidden />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.35em] text-white/50">{subtitle}</p>
                          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-white/75">{description}</p>
                      <div className="mt-6 space-y-3 text-sm text-white/80">
                        {highlights.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/70" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          <section className="relative py-24 pb-32 md:py-32">
            <div className="mx-auto w-full max-w-4xl px-6">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[rgba(10,24,44,0.7)] p-12 text-center shadow-[0_40px_120px_-45px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18)_0%,_rgba(10,24,44,0.85)_55%,_rgba(6,15,26,0.95)_100%)] opacity-90" aria-hidden />
                <div className="relative z-10 space-y-6">
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white/60">
                    <Droplets className="h-4 w-4" />
                    Ready to test the flow
                  </p>
                  <h2 className="text-4xl font-semibold text-white sm:text-5xl">
                    Step into the interactive lab
                  </h2>
                  <p className="mx-auto max-w-2xl text-base text-white/75 sm:text-lg">
                    Adjust food, oxygen, and time to watch the relay reconfigure itself. Visual gauges and guided narration help you connect each slider movement to the microbes at work.
                  </p>
                  <Button
                    onClick={() => navigate("/relay")}
                    size="lg"
                    className="rounded-full bg-coral-cta px-10 py-6 text-base font-semibold text-white shadow-[0_25px_60px_-30px_rgba(245,97,69,0.8)] transition hover:scale-[1.03] hover:bg-coral-cta/90"
                  >
                    Explore the interactive lab
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MeetTheRelay;
