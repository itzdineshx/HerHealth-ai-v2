
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Heart, Calendar, Activity, Brain } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

const HomePage = () => {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-herhealth-pink-light to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Your Complete Women's Wellness Journey
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                HerHealth is your personalized wellness companion for every life stage. Track your cycle, monitor symptoms, connect with experts, and join a supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white text-lg px-8 py-6">
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="text-lg px-8 py-6">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-herhealth-pink-light/30 p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-herhealth-pink-dark" />
                      </div>
                      <h3 className="ml-4 text-xl font-bold">Cycle Tracker</h3>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 28 }).map((_, i) => {
                        let bgColor = "bg-white";
                        if (i >= 0 && i <= 4) bgColor = "bg-herhealth-pink-dark";
                        if (i >= 5 && i <= 13) bgColor = "bg-herhealth-blue-light";
                        if (i >= 14 && i <= 18) bgColor = "bg-herhealth-green-light";
                        return (
                          <div 
                            key={i} 
                            className={`h-8 rounded-full ${bgColor} flex items-center justify-center text-xs font-medium`}
                          >
                            {i + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Care for Every Life Stage</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              HerHealth adapts to your unique journey, providing personalized support as your needs evolve.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Calendar className="h-8 w-8 text-herhealth-pink-dark" />}
              title="Cycle & Symptom Tracking"
              description="Log your period, monitor symptoms, and gain insights into your unique patterns."
              color="pink"
            />
            <FeatureCard 
              icon={<Activity className="h-8 w-8 text-herhealth-green-dark" />}
              title="Wellness Hub"
              description="Connect your wearables, track fitness, sleep and nutrition with cycle-aware recommendations."
              color="green"
            />
            <FeatureCard 
              icon={<Brain className="h-8 w-8 text-herhealth-purple-dark" />}
              title="Mental Health Support"
              description="Access mood tracking, AI-driven tips, and a supportive community of women."
              color="purple"
            />
          </div>
        </div>
      </section>
      
      {/* Life Stages Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Supporting You Through Every Stage</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From adolescence to menopause, HerHealth provides tailored support for your changing needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <LifeStageCard
              title="Teen"
              description="Education and guidance for young women beginning their wellness journey."
              color="blue"
            />
            <LifeStageCard
              title="Adult"
              description="Comprehensive tracking and insights for reproductive health management."
              color="pink"
            />
            <LifeStageCard
              title="Pregnancy & Postpartum"
              description="Week-by-week guidance, symptom tracking, and specialized support."
              color="peach"
            />
            <LifeStageCard
              title="Perimenopause & Menopause"
              description="Symptom management, resources, and a community of women sharing your experience."
              color="purple"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from women whose lives have been transformed by HerHealth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="HerHealth helped me understand my cycle in a way no other app could. The personalized insights have been incredibly valuable."
              name="Sarah K."
              role="Using HerHealth for 2 years"
            />
            <TestimonialCard
              quote="During my pregnancy, the week-by-week guidance was so reassuring. Now postpartum, I still rely on it daily for tracking my recovery."
              name="Michelle T."
              role="New mother"
            />
            <TestimonialCard
              quote="Finding a community of women going through menopause was life-changing. The symptom tracking helps me have better conversations with my doctor."
              name="Patricia L."
              role="Menopausal journey"
            />
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-herhealth-pink-light to-herhealth-purple-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Begin Your Wellness Journey Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of women who are taking control of their health with HerHealth's personalized platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white text-lg px-8 py-6">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="bg-white text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "pink" | "green" | "blue" | "purple" | "peach";
}

const FeatureCard = ({ icon, title, description, color }: FeatureCardProps) => {
  const colorMap = {
    pink: "bg-herhealth-pink-light/30",
    green: "bg-herhealth-green-light/30",
    blue: "bg-herhealth-blue-light/30",
    purple: "bg-herhealth-purple-light/30",
    peach: "bg-herhealth-peach-light/30",
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`p-6 ${colorMap[color]}`}>
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

interface LifeStageCardProps {
  title: string;
  description: string;
  color: "pink" | "green" | "blue" | "purple" | "peach";
}

const LifeStageCard = ({ title, description, color }: LifeStageCardProps) => {
  const colorMap = {
    pink: {
      bg: "bg-herhealth-pink-light/20",
      border: "border-herhealth-pink",
    },
    green: {
      bg: "bg-herhealth-green-light/20",
      border: "border-herhealth-green",
    },
    blue: {
      bg: "bg-herhealth-blue-light/20",
      border: "border-herhealth-blue",
    },
    purple: {
      bg: "bg-herhealth-purple-light/20",
      border: "border-herhealth-purple",
    },
    peach: {
      bg: "bg-herhealth-peach-light/20",
      border: "border-herhealth-peach",
    },
  };
  
  return (
    <div className={`rounded-xl p-6 ${colorMap[color].bg} border ${colorMap[color].border} hover:shadow-md transition-shadow`}>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

const TestimonialCard = ({ quote, name, role }: TestimonialCardProps) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 text-herhealth-pink-dark">
        <svg width="45" height="36" className="fill-current">
          <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
        </svg>
      </div>
      <p className="text-gray-600 mb-6">{quote}</p>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default HomePage;
