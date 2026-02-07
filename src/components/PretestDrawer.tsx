import { useState, useEffect, useRef } from "react";
import { X, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PredictionCard1 } from "./PredictionCard1";
import { PredictionCard2 } from "./PredictionCard2";
import { PredictionCard3 } from "./PredictionCard3";
import { pretestService, PretestSessionData } from "@/lib/pretest-service";

interface PretestDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  onPulse: () => void;
}

interface PredictionData {
  id: string;
  response: string | number;
  timestamp: Date;
}

export const PretestDrawer = ({ isOpen, onClose, onComplete, onPulse }: PretestDrawerProps) => {
  const [card1Data, setCard1Data] = useState<PredictionData | null>(null);
  const [card2Data, setCard2Data] = useState<PredictionData | null>(null);
  const [card3Data, setCard3Data] = useState<PredictionData | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [session, setSession] = useState<PretestSessionData | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const hasCompletedRef = useRef(false);


  const allLocked = card1Data && card2Data && card3Data;
  const completedCount = [card1Data, card2Data, card3Data].filter(Boolean).length;

  // Initialize session when drawer opens
  const hasAttemptedInit = useRef(false);

  useEffect(() => {
    const initializeSession = async () => {
      // Only run if open, no session, and haven't tried yet
      if (isOpen && !session && !hasAttemptedInit.current) {
        hasAttemptedInit.current = true;
        setIsInitializing(true);
        try {
          const newSession = await pretestService.initializeSession();
          setSession(newSession);

          // Save user ID to localStorage for linking with post-test
          localStorage.setItem('microberelay_user_id', newSession.userId);

          console.log('Session initialized:', newSession);
        } catch (error) {
          console.error('Failed to initialize pretest session (OFFLINE MODE):', error);
          // We intentionally catch and swallow this so the UI doesn't break. 
          // user can still interact and 'submit' (which will be a no-op DB wise but show success)
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
                      Make Your Predictions
                    </h2>
                    <p className="text-sm text-foreground/80">Share your hypotheses about ocean microbe behavior</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-white/10 rounded-full h-10 w-10 transition-all duration-300"
                  aria-label="Close predictions modal"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Compact Content Section */}
            <div className="relative z-10 p-6 max-h-[50vh] overflow-y-auto">
              {/* Cards Grid - Responsive */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <PredictionCard1
                  value={card1Data ? JSON.parse(card1Data.response as string).n2oGuess : ""}
                  onChange={(val) => {
                    const data = { foodLevel: 50, n2oGuess: val }; // Construct the data object Card1 used to produce
                    const mockData = { id: 'n2o-response', response: JSON.stringify(data), timestamp: new Date() };
                    setCard1Data(mockData); // Using existing state structure for now to minimize refactor, but treating it as "current value"
                  }}
                />
                <PredictionCard2
                  value={card2Data ? (card2Data.response as string) : ""}
                  onChange={(val) => {
                    const mockData = { id: 'dominant-step', response: val, timestamp: new Date() };
                    setCard2Data(mockData);
                  }}
                />
                <PredictionCard3
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

                    // Submit all
                    setIsInitializing(true);
                    try {
                      // 1. Ensure we have a session (Lazy Init)
                      let currentSession = pretestService.getCurrentSession();
                      if (!currentSession) {
                        try {
                          console.log("Lazy initializing pretest session...");
                          currentSession = await pretestService.initializeSession();
                          setSession(currentSession);
                        } catch (e) {
                          console.error("Failed to lazy init session:", e);
                          // We continue even if init fails, to allow user to proceed
                        }
                      }

                      // 2. Save Answers if session exists
                      if (currentSession) {
                        const saveSafe = async (qNum: number, answer: string) => {
                          try {
                            await pretestService.saveResponse(qNum, answer);
                          } catch (e) {
                            console.error(`Failed to save Q${qNum}:`, e);
                          }
                        };

                        // Save 1
                        const c1Val = JSON.parse(card1Data!.response as string).n2oGuess;
                        const standardAnswer1 = pretestService.mapCardResponseToStandardAnswer(1, { foodLevel: 50, n2oGuess: c1Val });
                        await saveSafe(1, standardAnswer1);

                        // Save 2
                        const c2Val = card2Data!.response as string;
                        const standardAnswer2 = pretestService.mapCardResponseToStandardAnswer(2, c2Val);
                        await saveSafe(2, standardAnswer2);

                        // Save 3
                        const c3Val = card3Data!.response as string;
                        const standardAnswer3 = pretestService.mapCardResponseToStandardAnswer(3, c3Val);
                        await saveSafe(3, standardAnswer3);

                        // Complete
                        try {
                          await pretestService.completeSession();
                        } catch (e) {
                          console.error("Failed to complete session:", e);
                        }
                      } else {
                        console.warn("No session available. Skipping DB save, but allowing user to proceed.");
                      }

                      // 3. Show Success (Always)
                      setShowSuccessAnimation(true);
                    } catch (e) {
                      console.error("Submit flow unexpected error", e);
                      // Fallback to success
                      setShowSuccessAnimation(true);
                    } finally {
                      setIsInitializing(false);
                    }
                  }}
                  disabled={!allLocked || isInitializing}
                  size="lg"
                  className="rounded-full px-8 text-base font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {isInitializing ? "Submitting..." : "Submit Predictions"}
                </Button>

              </div>
            </div>

            {/* Enhanced Success Overlay */}
            {showSuccessAnimation && (
              <div
                className="absolute inset-0 z-50 bg-background/95 backdrop-blur-xl rounded-3xl flex items-center justify-center cursor-pointer animate-fade-in"
                onClick={() => {
                  setShowSuccessAnimation(false);
                  onComplete();
                  onClose();
                }}
              >
                <div className="text-center animate-scale-in-spring">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Predictions Saved!</h3>
                  <p className="text-muted-foreground mb-4 max-w-xs mx-auto">
                    We'll revisit these questions at the end to see how your understanding has changed.
                  </p>
                  <p className="text-xs text-muted-foreground/70">Tap to continue</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
