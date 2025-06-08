
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import CycleTrackerPage from "./pages/CycleTrackerPage";
import WellnessHubPage from "./pages/WellnessHubPage";
import MentalHealthPage from "./pages/MentalHealthPage";
import PregnancyPage from "./pages/PregnancyPage";
import MenopausePage from "./pages/MenopausePage";
import ResourcesPage from "./pages/ResourcesPage";
import NotificationsPage from "./pages/NotificationsPage";
import TermsPage from "./pages/TermsPage";
import UserProfilePage from "./pages/UserProfilePage";
import AIHealthChatPage from "./pages/AIHealthChatPage";
import GeminiChatPage from "./pages/GeminiChatPage";
import NotFound from "./pages/NotFound";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cycle" element={<CycleTrackerPage />} />
            <Route path="/wellness" element={<WellnessHubPage />} />
            <Route path="/mental-health" element={<MentalHealthPage />} />
            <Route path="/pregnancy" element={<PregnancyPage />} />
            <Route path="/menopause" element={<MenopausePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/ai-health-chat" element={<AIHealthChatPage />} />
            <Route path="/gemini-chat" element={<GeminiChatPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Redirect /index.html to home page */}
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
