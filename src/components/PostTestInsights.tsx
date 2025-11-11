import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Brain, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export type QuestionStatus = "mastered" | "improved" | "needs-review";
export type QuestionDifficulty = "intro" | "core" | "challenge";

export interface QuestionBreakdown {
  id: string;
  prompt: string;
  concept: string;
  difficulty: QuestionDifficulty;
  preAnswer: string;
  postAnswer: string;
  correctAnswer: string;
  explanation: string;
  tip: string;
  status: QuestionStatus;
}

export interface InsightCardData {
  id: string;
  kind: "lift" | "focus" | "attention" | "momentum";
  title: string;
  description: string;
}

export interface PostTestResults {
  preScore: number;
  postScore: number;
  totalQuestions: number;
  timeToComplete: string;
  completedAt: string;
  focusAreas: string[];
  insights: InsightCardData[];
  questions: QuestionBreakdown[];
}

export const mockPostTestResults: PostTestResults = {
  preScore: 48,
  postScore: 92,
  totalQuestions: 3,
  timeToComplete: "01:52",
  completedAt: "November 10, 2025 • 3:24 PM PT",
  focusAreas: [
    "Narrate how bloom pulses briefly spike N₂O before finishers catch up",
    "Explain why complete denitrifiers only dominate when carbon is abundant"
  ],
  insights: [
    {
      id: "lift",
      kind: "lift",
      title: "+44 pt leap",
      description: "Connecting food supply to relay finishers clicked—your biggest gain of the day."
    },
    {
      id: "focus",
      kind: "focus",
      title: "Finishers locked",
      description: "You now identify Step 4 handoffs every time rich particles show up."
    },
    {
      id: "attention",
      kind: "attention",
      title: "Pulse story fuzzy",
      description: "Still mixing up how N₂O behaves right after blooms. Revisit the pulse animation."
    }
  ],
  questions: [
    {
      id: "q1",
      prompt: "When food is fixed at medium, what happens to N₂O output?",
      concept: "N₂O response",
      difficulty: "core",
      preAnswer: "High N₂O",
      postAnswer: "Medium N₂O",
      correctAnswer: "Medium N₂O",
      explanation: "Medium food means partial relay completion—N₂O builds but doesn't spike because finishers are present but not dominant.",
      tip: "Check the gauge card at 50 to remember this steady-state response.",
      status: "improved"
    },
    {
      id: "q2",
      prompt: "During a high-food bloom, which step dominates the relay?",
      concept: "Relay finishers",
      difficulty: "challenge",
      preAnswer: "Step 2 (NO₂⁻ → NO)",
      postAnswer: "Step 4 (N₂O → N₂)",
      correctAnswer: "Step 4 (N₂O → N₂)",
      explanation: "Complete denitrifiers thrive when carbon is plentiful, converting N₂O all the way to N₂ and capping greenhouse spikes.",
      tip: "Remember the final baton pass in the relay animation—finishers glow coral during blooms.",
      status: "mastered"
    },
    {
      id: "q3",
      prompt: "Right after a bloom pulse, how does N₂O behave?",
      concept: "Pulse spikes",
      difficulty: "core",
      preAnswer: "Stays the same",
      postAnswer: "Drops temporarily",
      correctAnswer: "Spikes briefly",
      explanation: "When bloom debris rains down, early steps surge before finishers catch up, so N₂O momentarily spikes.",
      tip: "Replay the pulse moment in the interactive slider and watch the pink flash of N₂O.",
      status: "needs-review"
    }
  ]
};

interface PostTestInsightsProps {
  results?: PostTestResults;
}

export const PostTestInsights = ({ results = mockPostTestResults }: PostTestInsightsProps) => {
  const orderedQuestions = useMemo(() => {
    return [...results.questions].sort((a, b) => {
      const order = { "needs-review": 0, improved: 1, mastered: 2 } as Record<QuestionStatus, number>;
      return order[a.status] - order[b.status];
    });
  }, [results.questions]);

  const improvement = Math.max(results.postScore - results.preScore, 0);
  const needsReviewQuestions = useMemo(
    () => orderedQuestions.filter(q => q.status === "needs-review"),
    [orderedQuestions]
  );
  const [activeReviewId, setActiveReviewId] = useState<string | null>(needsReviewQuestions[0]?.id ?? null);

  useEffect(() => {
    if (needsReviewQuestions.length === 0) {
      setActiveReviewId(null);
      return;
    }

    const stillExists = needsReviewQuestions.some(question => question.id === activeReviewId);
    if (!stillExists) {
      setActiveReviewId(needsReviewQuestions[0].id);
    }
  }, [needsReviewQuestions, activeReviewId]);

  const activeReview = needsReviewQuestions.find(q => q.id === activeReviewId) ?? needsReviewQuestions[0];
  const activeReviewIndex = activeReview
    ? needsReviewQuestions.findIndex(question => question.id === activeReview.id)
    : -1;

  const scoreStats = [
    {
      label: "Pre check",
      value: `${results.preScore}%`,
      tone: "text-muted-foreground"
    },
    {
      label: "Gain",
      value: `+${improvement} pts`,
      tone: "text-primary"
    },
    {
      label: "Post check",
      value: `${results.postScore}%`,
      tone: "text-foreground"
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-background/80 to-background px-6 py-8 shadow-[0_25px_60px_-30px_rgba(13,55,106,0.6)]">
      <div className="pointer-events-none absolute -top-20 right-0 h-32 w-32 rounded-full bg-primary/15 blur-[80px]" />

      <div className="relative z-10 space-y-8">
        <header className="space-y-3 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Knowledge Assessment
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground">
            Microbe Relay Assessment
          </h2>
        </header>

        <section className="rounded-[2.25rem] border border-white/10 bg-gradient-to-r from-white/10 via-background/60 to-background p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Score swing</p>
              <p className="text-2xl font-semibold text-foreground">{results.preScore}% → {results.postScore}%</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-primary to-coral-400 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg">
                +{improvement} pts
              </div>
              <Trophy className="h-5 w-5 text-amber-300" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {scoreStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
                <p className={cn("text-2xl font-semibold", stat.tone)}>{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="space-y-6">
            {needsReviewQuestions.length > 0 && activeReview && (
              <section className="rounded-3xl border border-coral-500/30 bg-coral-500/5 p-6 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-coral-300" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral-200">Need another look</p>
                    <p className="text-lg font-semibold text-foreground">{needsReviewQuestions.length} concept{needsReviewQuestions.length > 1 ? "s" : ""} still fuzzy</p>
                  </div>
                </div>

                <nav
                  className="flex flex-wrap gap-2 rounded-2xl border border-coral-500/20 bg-background/70 p-2"
                  aria-label="Review questions"
                >
                  {needsReviewQuestions.map((question, index) => {
                    const isActive = question.id === activeReview.id;
                    return (
                      <button
                        key={question.id}
                        type="button"
                        className={cn(
                          "flex-1 min-w-[110px] rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition",
                          isActive
                            ? "bg-coral-500/20 text-coral-100 border border-coral-400/40"
                            : "text-coral-200/70 border border-transparent hover:border-coral-400/30"
                        )}
                        onClick={() => setActiveReviewId(question.id)}
                        aria-pressed={isActive}
                        aria-current={isActive}
                      >
                        Q{index + 1}
                      </button>
                    );
                  })}
                </nav>

                <article className="rounded-2xl border border-coral-500/30 bg-background/90 p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-coral-100">
                      <span>Question {activeReviewIndex + 1}</span>
                      <span className="text-white/50">•</span>
                      <span>Need another look</span>
                    </div>
                    <p className="text-base font-semibold text-foreground">{activeReview.prompt}</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3 text-sm">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
                      <p className="text-xs text-muted-foreground uppercase">Pre guess</p>
                      <p className="font-semibold text-muted-foreground">{activeReview.preAnswer}</p>
                    </div>
                    <div className="rounded-2xl border border-coral-500/30 bg-coral-500/5 p-3">
                      <p className="text-xs text-coral-200 uppercase">You chose</p>
                      <p className="font-semibold text-coral-100">{activeReview.postAnswer}</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3">
                      <p className="text-xs text-emerald-200 uppercase">Correct baton</p>
                      <p className="font-semibold text-emerald-100">{activeReview.correctAnswer}</p>
                    </div>
                  </div>
                </article>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Brain className="h-4 w-4 text-primary" />
                <span>Question outcomes</span>
              </div>
              <div className="space-y-3">
                {results.questions.map((question, index) => {
                  const isCorrect = question.postAnswer === question.correctAnswer;
                  const badgeClasses = isCorrect
                    ? "bg-emerald-500/10 text-emerald-200 border border-emerald-500/30"
                    : "bg-coral-500/10 text-coral-200 border border-coral-500/30";
                  const statusLabel = isCorrect ? "Correct" : "Incorrect";

                  return (
                    <article key={question.id} className="rounded-2xl border border-white/10 bg-background/70 p-4 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        className={cn(
                          "text-left text-sm font-semibold",
                          question.status === "needs-review"
                            ? "text-primary hover:text-primary/80"
                            : "text-foreground/60 cursor-default"
                        )}
                        onClick={() => {
                          if (question.status === "needs-review") {
                            setActiveReviewId(question.id);
                          }
                        }}
                        disabled={question.status !== "needs-review"}
                        aria-pressed={question.status === "needs-review" && question.id === activeReviewId}
                      >
                        Question {index + 1}
                      </button>
                      <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", badgeClasses)}>
                        {statusLabel}
                      </span>
                    </article>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};
