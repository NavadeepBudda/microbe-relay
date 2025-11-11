import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Brain, Trophy, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserComparisonData, QuestionComparison } from "@/lib/comparison-service";

type QuestionStatus = "mastered" | "improved" | "needs-review";

// Map our QuestionComparison to the UI format
interface UIQuestionBreakdown {
  id: string;
  prompt: string;
  preAnswer: string;
  postAnswer: string;
  correctAnswer: string;
  status: QuestionStatus;
}

interface PostTestInsightsProps {
  comparisonData: UserComparisonData | null;
}

export const PostTestInsights = ({ comparisonData }: PostTestInsightsProps) => {
  // Show loading state if no data
  if (!comparisonData) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-background/80 to-background px-6 py-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Loading Assessment Results...</h2>
          <p className="text-muted-foreground">Processing your responses and calculating improvements.</p>
        </div>
      </div>
    );
  }

  // Map comparison data to UI format with safety checks
  const uiQuestions: UIQuestionBreakdown[] = (comparisonData.questions || []).map(q => ({
    id: q.questionNumber?.toString() || '0',
    prompt: q.questionText || '',
    preAnswer: q.preAnswer || '',
    postAnswer: q.postAnswer || '',
    correctAnswer: q.correctAnswer || '',
    status: q.status || 'needs-review'
  }));

  const orderedQuestions = useMemo(() => {
    return [...uiQuestions].sort((a, b) => {
      const order = { "needs-review": 0, improved: 1, mastered: 2 } as Record<QuestionStatus, number>;
      return order[a.status] - order[b.status];
    });
  }, [uiQuestions]);

  const improvement = Math.max(comparisonData.improvement, 0);
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

  // Format completion date
  const completedAtFormatted = new Date(comparisonData.completedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const scoreStats = [
    {
      label: "Pre check",
      value: `${Math.round(comparisonData.preScore)}%`,
      tone: "text-muted-foreground"
    },
    {
      label: "Gain",
      value: `+${Math.round(improvement)} pts`,
      tone: "text-primary"
    },
    {
      label: "Post check",
      value: `${Math.round(comparisonData.postScore)}%`,
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
              <p className="text-2xl font-semibold text-foreground">{Math.round(comparisonData.preScore)}% → {Math.round(comparisonData.postScore)}%</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-primary to-coral-400 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg">
                +{Math.round(improvement)} pts
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
            {needsReviewQuestions.length > 0 && activeReview ? (
              <section className="rounded-3xl border border-coral-500/30 bg-coral-500/5 p-6 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-coral-300" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral-200">Need another look</p>
                    <p className="text-lg font-semibold text-foreground">{needsReviewQuestions.length} concept{needsReviewQuestions.length > 1 ? "s" : ""} still fuzzy</p>
                  </div>
                </div>

                {needsReviewQuestions.length === 1 ? (
                  // Single question - show as simple label
                  <div className="rounded-2xl border border-coral-500/20 bg-background/70 p-3">
                    <span className="text-sm font-semibold text-coral-100">Q{parseInt(needsReviewQuestions[0].id)}</span>
                  </div>
                ) : (
                  // Multiple questions - show as dropdown navigation
                  <nav
                    className="flex flex-wrap gap-2 rounded-2xl border border-coral-500/20 bg-background/70 p-2"
                    aria-label="Review questions"
                  >
                    <div className="flex items-center gap-1 text-xs text-coral-200/70">
                      <ChevronDown className="h-3 w-3" />
                      <span>Multiple concepts need review:</span>
                    </div>
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
                          Q{parseInt(question.id)}
                        </button>
                      );
                    })}
                  </nav>
                )}

                <article className="rounded-2xl border border-coral-500/30 bg-background/90 p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-coral-100">
                      <span>Question {parseInt(activeReview.id)}</span>
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
            ) : (
              // Show success message when no questions need review
              <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <Trophy className="h-5 w-5 text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Excellent work!</p>
                    <p className="text-lg font-semibold text-foreground">All concepts mastered</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-background/70 p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    Great job! You've successfully demonstrated understanding of all the key concepts about ocean microbe behavior and nitrogen cycling.
                  </p>
                </div>
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
                {orderedQuestions.map((question, index) => {
                  const questionData = comparisonData.questions.find(q => q.questionNumber.toString() === question.id);
                  const isCorrect = questionData?.wasCorrectPost || false;
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
                        Question {parseInt(question.id)}
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
