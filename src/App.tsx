import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orientation from "./pages/Orientation";
import MeetTheRelay from "./pages/MeetTheRelay";
import Relay from "./pages/Relay";
import TryIt from "./pages/TryIt";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { IntroAnimation } from "./components/IntroAnimation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <IntroAnimation />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Orientation />} />
          <Route path="/meet-the-relay" element={<MeetTheRelay />} />
          <Route path="/relay" element={<Relay />} />
          <Route path="/try-it" element={<TryIt />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
