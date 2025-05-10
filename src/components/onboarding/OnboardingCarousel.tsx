
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const slides = [
  {
    title: "Welcome to HerHealth",
    description: "Your all-in-one platform for personalized women's wellness across all life stages.",
    image: "slide1.png",
  },
  {
    title: "Track Your Cycle",
    description: "Log your period, symptoms, and get insights into your unique patterns.",
    image: "slide2.png",
  },
  {
    title: "Holistic Wellness",
    description: "Connect fitness, nutrition, sleep, and mental health for a complete picture of your wellbeing.",
    image: "slide3.png",
  },
  {
    title: "Community & Support",
    description: "Join a community of women sharing similar journeys, with expert advice when you need it.",
    image: "slide4.png",
  },
];

export const OnboardingCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // On last slide, navigate to dashboard
      navigate("/dashboard");
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const skipOnboarding = () => {
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-herhealth-pink-light to-white flex flex-col">
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={skipOnboarding}>
          Skip
        </Button>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="mb-6 flex justify-center">
                <div className="h-40 w-40 rounded-full bg-herhealth-pink-light flex items-center justify-center">
                  {/* Placeholder for slide image */}
                  <span className="text-5xl text-herhealth-pink-dark">
                    {currentSlide + 1}
                  </span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-4">
                {slides[currentSlide].title}
              </h2>
              
              <p className="text-center text-gray-600 mb-8">
                {slides[currentSlide].description}
              </p>
              
              <div className="flex justify-center mb-6">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 ${
                      index === currentSlide ? "bg-herhealth-pink-dark" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                >
                  Previous
                </Button>
                <Button
                  className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white"
                  onClick={nextSlide}
                >
                  {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
