import { useState, useEffect, useRef } from "react";
import { X, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostTestCard1 } from "./PostTestCard1";
import { PostTestCard2 } from "./PostTestCard2";
import { PostTestCard3 } from "./PostTestCard3";
import { posttestService, PosttestSessionData } from "@/lib/posttest-service";
import { comparisonService } from "@/lib/comparison-service";

interface PostTestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (comparisonData: any) => void;
  onPulse: () => void;
}

interface PredictionData {
  id: string;
  response: string | number;
  timestamp: Date;
}

export const PostTestDrawer = ({ isOpen, onClose, onComplete, onPulse }: PostTestDrawerProps) => {
  const [card1Data, setCard1Data] = useState<PredictionData | null>(null);
  const [card2Data, setCard2Data] = useState<PredictionData | null>(null);
  const [card3Data, setCard3Data] = useState<PredictionData | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [session, setSession] = useState<PosttestSessionData | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [completionData, setCompletionData] = useState<any>(null);
  const hasCompletedRef = useRef(false);


  const allLocked = card1Data && card2Data && card3Data;
  const completedCount = [card1Data, card2Data, card3Data].filter(Boolean).length;

  // Get existing user ID from localStorage (from pretest)
  const getUserId = (): string | null => {
    const existingUserId = localStorage.getItem('microberelay_user_id');
    return existingUserId;
  };

  // Initialize session when drawer opens
  const hasAttemptedInit = useRef(false);

  useEffect(() => {
    const initializeSession = async () => {
      // Only run if open, no session, and haven't tried yet
      if (isOpen && !session && !hasAttemptedInit.current) {
        hasAttemptedInit.current = true;
        setIsInitializing(true);
        try {
          const existingUserId = getUserId();
          const newSession = await posttestService.initializeSession(existingUserId || undefined);
          setSession(newSession);

          // Save user ID to localStorage if it's new
          if (!existingUserId) {
            localStorage.setItem('microberelay_user_id', newSession.userId);
          }

          console.log('Posttest session initialized:', newSession);
        } catch (error) {
          console.error('Failed to initialize posttest session (OFFLINE MODE):', error);
          // Fallback handled by submit button
        } finally {
          setIsInitializing(false);
        }
      }
    };

    initializeSession();
  }, [isOpen]);





  if (!isOpen) return null;

  return (
    <>
      {/* Apple-Quality Backdrop */}
      <div
        className="fixed inset-0 bg-background/90 backdrop-blur-xl z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Compact Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl max-h-[80vh] overflow-hidden">

          {/* Main Modal */}
          <div className="bg-background/98 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-3xl relative animate-slide-up-smooth">

            {/* Compact Header */}
            <div className="relative z-10 p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="font-display font-bold text-2xl tracking-tight text-foreground">
                      Test Your Knowledge
                    </h2>
                    <p className="text-sm text-foreground/80">Evaluate what you've learned about ocean microbe behavior</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-white/10 rounded-full h-10 w-10 transition-all duration-300"
                  aria-label="Close knowledge test modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Compact Content Section */}
            <div className="relative z-10 p-6 max-h-[50vh] overflow-y-auto">
              {/* Cards Grid - Responsive */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <PostTestCard1
                  value={card1Data ? JSON.parse(card1Data.response as string).n2oGuess : ""}
                  onChange={(val) => {
                    const data = { foodLevel: 50, n2oGuess: val };
                    const mockData = { id: 'n2o-response', response: JSON.stringify(data), timestamp: new Date() };
                    setCard1Data(mockData);
                  }}
                />
                <PostTestCard2
                  value={card2Data ? (card2Data.response as string) : ""}
                  onChange={(val) => {
                    const mockData = { id: 'dominant-step', response: val, timestamp: new Date() };
                    setCard2Data(mockData);
                  }}
                />
                <PostTestCard3
                  value={card3Data ? (card3Data.response as string) : ""}
                  onChange={(val) => {
                    const mockData = { id: 'pulse-moment', response: val, timestamp: new Date() };
                    setCard3Data(mockData);
                  }}
                  onPulse={onPulse}
                />
              </div>
            </div>

            {/* Compact Footer */}
            <div className="relative z-10 p-6 border-t border-white/10 bg-background/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                <div className="space-y-1">
                  <div className="text-sm font-medium">
                    <span className="text-primary">{completedCount}</span>/3 answered
                  </div>
                  <div className="w-32 h-1 bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(completedCount / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <Button
                  onClick={async () => {
                    if (!allLocked) return;
                    setIsInitializing(true);

                    try {
                      // 1. Lazy Init Session
                      let currentSession = posttestService.getCurrentSession();
                      if (!currentSession) {
                        try {
                          const existingUserId = getUserId();
                          console.log("Lazy initializing post-test session...");
                          currentSession = await posttestService.initializeSession(existingUserId || undefined);
                          setSession(currentSession);
                        } catch (e) { console.error("Lazy init failed", e); }
                      }

                      // 2. Save Answers if session exists
                      if (currentSession) {
                        const saveSafe = async (q: number, a: string) => {
                          try { await posttestService.saveResponse(q, a); }
                          catch (e) { console.error(`Save Q${q} failed`, e); }
                        };

                        // Save 1
                        const c1Val = JSON.parse(card1Data!.response as string).n2oGuess;
                        const std1 = posttestService.mapCardResponseToStandardAnswer(1, { foodLevel: 50, n2oGuess: c1Val });
                        await saveSafe(1, std1);

                        // Save 2
                        const c2Val = card2Data!.response as string;
                        const std2 = posttestService.mapCardResponseToStandardAnswer(2, c2Val);
                        await saveSafe(2, std2);

                        // Save 3
                        const c3Val = card3Data!.response as string;
                        const std3 = posttestService.mapCardResponseToStandardAnswer(3, c3Val);
                        await saveSafe(3, std3);

                        // 3. Complete & Compare
                        try {
                          await posttestService.completeSession();
                          const data = await comparisonService.getOrCreateUserComparison(currentSession.userId, currentSession.sessionId);
                          setCompletionData(data);
                        } catch (e) { console.error("Completion failed", e); }

                      } else {
                        console.warn("No session, skipping save but allowing proceed.");
                      }

                      setShowSuccessAnimation(true); // Always show success

                    } catch (e) {
                      console.error("Submit failed", e);
                      setShowSuccessAnimation(true);
                    } finally {
                      setIsInitializing(false);
                    }
                  }}
                  disabled={!allLocked || isInitializing}
                  size="lg"
                  className="rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {isInitializing ? "Submitting..." : "Submit Answers"}
                </Button>
              </div>
            </div>

            {/* Enhanced Success Overlay */}
            {showSuccessAnimation && (
              <div
                className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl rounded-3xl flex items-center justify-center cursor-pointer animate-fade-in"
                onClick={() => {
                  setShowSuccessAnimation(false);
                  if (onComplete) onComplete(completionData);
                  onClose();
                }}
              >
                <div className="text-center animate-scale-in-spring">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Knowledge Test Complete!</h3>
                  <p className="text-muted-foreground mb-4">Well done! You've mastered the concepts.</p>
                  <p className="text-xs text-muted-foreground/70">Tap to continue exploring</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};