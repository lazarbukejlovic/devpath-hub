import { forwardRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import Videos from "./pages/Videos.tsx";
import VideoDetail from "./pages/VideoDetail.tsx";
import CreatorDashboard from "./pages/CreatorDashboard.tsx";
import Pricing from "./pages/Pricing.tsx";
import About from "./pages/About.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import Auth from "./pages/Auth.tsx";
import { Privacy, Terms, CreatorGuidelines } from "./pages/Policies.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/videos/:id" element={<VideoDetail />} />
            <Route path="/creator" element={<CreatorDashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/creator-guidelines" element={<CreatorGuidelines />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </div>
));

App.displayName = "App";

export default App;
