
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Study from "./pages/Study";
import ProgressPage from "./pages/Progress";
import History from "./pages/History";
import Goals from "./pages/Goals";
import SkillTest from "./pages/SkillTest";
import Community from "./pages/Community";
import CustomTopics from "./pages/CustomTopics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/study" element={<Study />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/history" element={<History />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/skill-test" element={<SkillTest />} />
          <Route path="/community" element={<Community />} />
          <Route path="/custom-topics" element={<CustomTopics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
