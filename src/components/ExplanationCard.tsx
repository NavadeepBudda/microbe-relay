import { MessageCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";

type Mode = "low" | "high";

type ScenarioCopy = {
  badge: string;
  lead: string;
  summary: string;
  points: string[];
};

const scenarios: Record<Mode, ScenarioCopy> = {
  low: {
    badge: "Scenario: Low food",
    lead: "Lean relay stays at step one.",
    summary:
      "First-step specialists keep control because they cost almost no energy to run. The relay pauses before generating downstream gases.",
    points: [
      "Nitrite accumulates slowly while N₂O stays minimal.",
      "Great for observing oxygen-starved zones without extra food pulses.",
    ],
  },
  high: {
    badge: "Scenario: High food",
    lead: "Multistep relay unlocks every specialist.",
    summary:
      "Rich organic matter fuels modular players and the closing team, so the baton passes rapidly through each reaction.",
    points: [
      "Expect visible swings on the N₂O gauge until closers stabilize it.",
      "Use this mode to explore how resource surges change greenhouse emissions.",
    ],
  },
};

export const ExplanationCard = () => {
  const [mode, setMode] = useState<Mode>("low");
  const scenario = scenarios[mode];

  return (
    <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-[rgba(9,20,36,0.82)] p-8 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-omz-violet/18 via-transparent to-coral-cta/15" aria-hidden />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Guided explanation</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Why the relay shifts</h3>
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/65">
          {scenario.badge}
        </div>

        <div className="mt-6 flex gap-2">
          <Button
            onClick={() => setMode("low")}
            size="sm"
            variant="ghost"
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
              mode === "low"
                ? "border-white/40 bg-white/15 text-white"
                : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"
            }`}
          >
            Low food
          </Button>
          <Button
            onClick={() => setMode("high")}
            size="sm"
            variant="ghost"
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
              mode === "high"
                ? "border-white/40 bg-white/15 text-white"
                : "border-white/10 text-white/60 hover:border-white/25 hover:text-white"
            }`}
          >
            High food
          </Button>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/12 bg-white/5 p-6 text-sm text-white/80">
          <p className="text-base font-semibold text-white">{scenario.lead}</p>
          <p className="mt-3 text-white/75">{scenario.summary}</p>
          <div className="mt-5 space-y-3">
            {scenario.points.map((point) => (
              <div key={point} className="flex items-start gap-2 text-white/75">
                <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/70" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
