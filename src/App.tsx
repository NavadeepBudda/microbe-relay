import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orientation from "./pages/Orientation";
import NotFound from "./pages/NotFound";
import IntroSequence from "./components/IntroSequence";

const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);

  const handleIntroComplete = () => {
    setIntroCompleted(true);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowIntro(false);
    }, 100);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {/* Intro sequence overlay */}
        {showIntro && <IntroSequence onComplete={handleIntroComplete} />}
        
        {/* Main application - pre-mounted for smooth transition */}
        <div className={showIntro && !introCompleted ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Orientation />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
