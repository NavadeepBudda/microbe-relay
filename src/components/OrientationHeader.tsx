import { useState, useEffect } from "react";
import { Languages, Volume2, Contrast, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrientationHeaderProps {
  onToggleContrast: () => void;
  isHighContrast: boolean;
}

export const OrientationHeader = ({ onToggleContrast, isHighContrast }: OrientationHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "glass-intense border-b border-white/20" 
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <span className="font-display font-semibold text-lg tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Microbe Relay
            </span>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-muted-foreground hover:text-foreground hover:bg-white/10 font-medium h-9 px-4 rounded-full transition-all"
              aria-label="For Teachers"
            >
              For Teachers
            </Button>
            
            <div className="flex items-center gap-1 glass-subtle rounded-full p-1">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 hover:text-foreground h-8 w-8 rounded-full transition-all"
                aria-label="Language"
              >
                <Languages className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 hover:text-foreground h-8 w-8 rounded-full transition-all"
                aria-label="Audio"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleContrast}
                className={`hover:bg-white/20 hover:text-foreground h-8 w-8 rounded-full transition-all ${
                  isHighContrast ? "bg-white/20 text-primary" : ""
                }`}
                aria-label="Toggle High Contrast"
              >
                <Contrast className="w-4 h-4" />
              </Button>
            </div>

            {/* Enhanced Progress Dots */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/20">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-label="Orientation - Current" />
                  <div className="absolute -inset-1 bg-primary/30 rounded-full animate-ping" />
                </div>
                <div className="w-2 h-2 rounded-full bg-muted/50" aria-label="Lab" />
                <div className="w-2 h-2 rounded-full bg-muted/50" aria-label="Summary" />
              </div>
              <span className="text-xs text-muted-foreground font-medium ml-2">1 of 3</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden hover:bg-white/10 h-10 w-10 rounded-full transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 glass-intense border-b border-white/20 p-6 animate-slide-up">
            <div className="flex flex-col gap-4">
              <Button
                variant="ghost"
                className="justify-start text-muted-foreground hover:text-foreground hover:bg-white/10 font-medium h-12 px-4 rounded-xl"
                aria-label="For Teachers"
              >
                For Teachers
              </Button>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/20 hover:text-foreground h-10 w-10 rounded-full"
                  aria-label="Language"
                >
                  <Languages className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/20 hover:text-foreground h-10 w-10 rounded-full"
                  aria-label="Audio"
                >
                  <Volume2 className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleContrast}
                  className={`hover:bg-white/20 hover:text-foreground h-10 w-10 rounded-full ${
                    isHighContrast ? "bg-white/20 text-primary" : ""
                  }`}
                  aria-label="Toggle High Contrast"
                >
                  <Contrast className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="w-2 h-2 rounded-full bg-muted/50" />
                  <div className="w-2 h-2 rounded-full bg-muted/50" />
                </div>
                <span className="text-sm text-muted-foreground font-medium">Step 1 of 3</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
