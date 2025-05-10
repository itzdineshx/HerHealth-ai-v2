
import { OnboardingCarousel } from "@/components/onboarding/OnboardingCarousel";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const OnboardingPage = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <OnboardingCarousel />;
};

export default OnboardingPage;
