import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface LearningHeaderProps {
  onBackClick?: () => void;
}

type LearningPage = {
  path: string;
  title: string;
  subtitle?: string;
  step: number;
  backPath: string;
};

const learningPages: LearningPage[] = [
  {
    path: "/",
    title: "Orientation Bay",
    subtitle: "Learn core concepts",
    step: 1,
    backPath: "/",
  },
  {
    path: "/meet-the-relay",
    title: "Meet the Relay",
    subtitle: "Interactive pipeline",
    step: 2,
    backPath: "/",
  },
  {
    path: "/try-it",
    title: "Try It",
    subtitle: "Test your knowledge",
    step: 3,
    backPath: "/meet-the-relay",
  },
  {
    path: "/relay",
    title: "Organic Matter & Ocean Chemistry", 
    subtitle: "Environmental controls",
    step: 4,
    backPath: "/try-it",
  },
];

export const LearningHeader = ({ onBackClick }: LearningHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Find current page info
  const currentPage = learningPages.find(page => page.path === location.pathname) || learningPages[0];
  const totalSteps = 3; // Only count the main learning pages (exclude orientation)
  const displayStep = Math.max(1, currentPage.step - 1); // Adjust for 0-based indexing excluding orientation

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(currentPage.backPath);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "backdrop-blur-xl bg-[rgba(6,15,26,0.85)] border-b border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.15)]" 
          : "backdrop-blur-md bg-[rgba(6,15,26,0.65)] border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Back Button */}
          <div className="flex items-center">
            <Button
              onClick={handleBackClick}
              variant="ghost"
              size="sm"
              className="group flex items-center gap-2 px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 -ml-1"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span className="text-sm font-medium">Back</span>
            </Button>
          </div>

          {/* Center: Page Title */}
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <h1 className="text-lg font-semibold text-white tracking-tight">
              {currentPage.title}
            </h1>
            {currentPage.subtitle && (
              <p className="text-xs text-white/60 font-medium mt-0.5">
                {currentPage.subtitle}
              </p>
            )}
          </div>

          {/* Right: Progress Indicator */}
          <div className="flex items-center gap-3">
            {/* Progress Dots */}
            <div className="flex items-center gap-1.5">
              {[...Array(totalSteps)].map((_, index) => {
                const isActive = index + 1 === displayStep;
                const isCompleted = index + 1 < displayStep;
                
                return (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive 
                        ? "bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.6)]" 
                        : isCompleted
                          ? "bg-teal-glow scale-110"
                          : "bg-white/30 scale-100"
                    }`}
                  />
                );
              })}
            </div>
            
            {/* Step Counter */}
            <div className="text-xs font-medium text-white/70 ml-2 min-w-[2rem] text-center">
              {displayStep}/{totalSteps}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};