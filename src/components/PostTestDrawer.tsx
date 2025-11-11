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
  const hasCompletedRef = useRef(false);
  

  const allLocked = card1Data && card2Data && card3Data;
  const completedCount = [card1Data, card2Data, card3Data].filter(Boolean).length;

  // Get existing user ID from localStorage (from pretest)
  const getUserId = (): string | null => {
    const existingUserId = localStorage.getItem('microberelay_user_id');
    return existingUserId;
  };

  // Initialize session when drawer opens
  useEffect(() => {
    const initializeSession = async () => {
      if (isOpen && !session && !isInitializing) {
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
          console.error('Failed to initialize posttest session:', error);
        } finally {
          setIsInitializing(false);
        }
      }
    };

    initializeSession();
  }, [isOpen, session, isInitializing]);

  // Handle saving responses to database
  const saveResponse = async (questionNumber: number, response: string) => {
    // Wait for session to be available
    let attempts = 0;
    while (!session && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (!session) {
      console.error('No active session for saving response after waiting');
      return;
    }

    try {
      console.log('Saving posttest response:', { questionNumber, response });
      await posttestService.saveResponse(questionNumber, response);
      console.log('Posttest response saved successfully');
    } catch (error) {
      console.error('Failed to save posttest response:', error);
    }
  };

  useEffect(() => {
    if (allLocked && !showSuccessAnimation && session && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      setShowSuccessAnimation(true);
      
      // Complete the session and create comparison data
      const completeSession = async () => {
        try {
          await posttestService.completeSession();
          
          // Create comparison data
          const comparisonData = await comparisonService.getOrCreateUserComparison(
            session.userId, 
            session.sessionId
          );
          
          // Auto-close after animation with comparison data
          setTimeout(() => {
            onComplete(comparisonData);
            onClose();
          }, 1200);
        } catch (error) {
          console.error('Failed to complete session or create comparison:', error);
          hasCompletedRef.current = false; // Reset on error
        }
      };
      
      completeSession();
    }
  }, [allLocked, showSuccessAnimation, session, onComplete, onClose]);

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
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl tracking-tight">
                      Test Your Knowledge
                    </h2>
                    <p className="text-sm text-muted-foreground">Evaluate what you've learned about ocean microbe behavior</p>
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
              onLock={async (data) => {
                console.log('Card 1 locked with data:', data);
                const now = new Date();
                const cardData = {
                  id: 'n2o-response',
                  response: JSON.stringify(data),
                  timestamp: now
                };
                setCard1Data(cardData);
                
                // Save to database
                const standardAnswer = posttestService.mapCardResponseToStandardAnswer(1, data);
                await saveResponse(1, standardAnswer);
              }}
              isLocked={!!card1Data}
              onUnlock={() => setCard1Data(null)}
            />
            <PostTestCard2
              onLock={async (data) => {
                console.log('Card 2 locked with data:', data);
                const now = new Date();
                const cardData = {
                  id: 'dominant-step',
                  response: data.dominantStep,
                  timestamp: now
                };
                setCard2Data(cardData);
                
                // Save to database
                const standardAnswer = posttestService.mapCardResponseToStandardAnswer(2, data.dominantStep);
                await saveResponse(2, standardAnswer);
              }}
              isLocked={!!card2Data}
              onUnlock={() => setCard2Data(null)}
            />
            <PostTestCard3
              onLock={async (data) => {
                console.log('Card 3 locked with data:', data);
                const now = new Date();
                const cardData = {
                  id: 'pulse-moment',
                  response: data.pulseGuess,
                  timestamp: now
                };
                setCard3Data(cardData);
                
                // Save to database
                const standardAnswer = posttestService.mapCardResponseToStandardAnswer(3, data.pulseGuess);
                await saveResponse(3, standardAnswer);
              }}
              isLocked={!!card3Data}
              onUnlock={() => setCard3Data(null)}
              onPulse={onPulse}
            />
              </div>
            </div>

            {/* Compact Footer */}
            <div className="relative z-10 p-6 border-t border-white/10 bg-background/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Progress */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          i < completedCount 
                            ? 'bg-primary shadow-sm shadow-primary/50' 
                            : 'bg-muted/50'
                        }`} 
                      />
                    ))}
                  </div>
                  
                  <span className="text-sm font-medium">
                    <span className="text-primary">{completedCount}</span>/3 completed
                  </span>
                </div>

                {/* Status Only - Auto-completion when all locked */}
                <div className="flex items-center justify-center">
                  {allLocked ? (
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Knowledge test complete!</span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Complete {3 - completedCount} more question{3 - completedCount > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
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