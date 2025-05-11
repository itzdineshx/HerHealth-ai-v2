import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Heart, 
  Calendar, 
  Activity, 
  Brain, 
  ChevronRight, 
  Star,
  ArrowRight,
  BadgeCheck,
  TrendingUp
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-herhealth-pink-light to-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3ODQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+ICAgIDxwYXRoIGQ9Ik0wIDBoMTQ0MHY3ODRIMHoiIGZpbGw9Im5vbmUiIC8+ICAgIDxwYXRoIGQ9Ik0xMjk3LjA2IDM1Mi42MDhjLTEyLjUzIDE0LjYyLTI0LjUzIDI5LjcxNS0zNS45OSA0NS4yODYtMTkuNTYgMjYuNzI1LTM3LjAxIDU0LjYwMy01MS4yOSA4My44My04Ljc3IDE3LjkzNS0xNi42MyAzNi4xMDItMjQuNDkgNTQuMjctOC41NSAxOS43OS0xNy4xMSAzOS41OC0yNS42NiA1OS4zN2wtMS41MSAzLjM4SDBWNTAwLjU2YzYuNDUtMzAuMDAyIDEzLjM5LTU5LjgzMyAyMS44My04OS40OTMgNy42OS0yNy4wMjcgMTYuNjMtNTMuNzAzIDI2LjgtNzkuOTI4IDEwLjUxLTI3LjE3OCAyMi41OC01My42MDMgMzYuODgtNzguOTg1IDE1LjQzLTI3LjQ5IDMzLjctNTMuMzUzIDU2LjI4LTc1LjQzNiAyMS4yOC0yMC43OTIgNDYuMTYtMzYuMjMgNzUuMTMtNDMuNDU3IDE4LjQ0LTQuNiAzNy4wOC02LjY5OCA1NS45Ny03LjI0OSA0My43LS45NzggODYuMi0xNS44OTYgMTI1LjU5LTM2LjQwNCAzMC44OC0xNi4wNSA1OS4yOS0zNi4yMjMgODUuMi01OS45MTVsMjAuNDItMTguNTY5Yy43LS42NTMgMS40MS0xLjI5OSAyLjEzLTEuOTQgMTEuNDctMTAuMTcgMjMuMTktMTkuOTI2IDM2LjQ3LTI3LjQ1OCAxOC42LTEwLjUyOCAzOS4yLTE3LjY3IDYwLjUyLTE5Ljk4MiAyMy42NC0yLjU2MiA0Ni41Ni4zNDcgNjguNjMgOS4zMDkgMjIuNCA5LjA5NyA0My40NiAyMS4yMzggNjMuNzUgMzUuMDEgNDEuMSAyNy45NTcgODQuMDcgNTEuNDI0IDEzMi4zNyA2MS45NDcgMzQuOTMgNy42MDggNzAuMDYgNy4xNjkgMTA0Ljg5LS43NzggMTYuMzMtMy43MiAzMi4xNC04Ljg2NiA0Ny4yMS0xNi4wNSAxMC4zLTQuOTE3IDIwLjIyLTEwLjUyOCAzMC4yNy0xNS45MTEgMjIuMS0xMS44NjkgNDQuMi0yMy42ODIgNjYuNTItMzUuMTY0IDkuMDQtNC42NyAxOC4yNC05LjA1MiAyNy42Ni0xMy4wMjUgMzIuMTQtMTMuNTcgNjUuOTEtMTkuNzggOTYuODEtMTMuMDM1IDMuNi43ODggNy4xOSAxLjYyMiAxMC43OCAyLjQ1NVYyMzEuNzdjLTUuNS0uMTE2LTExLS4yMi0xNi41LS4xOTktMzMuMjYuMTI2LTY1Ljc2IDUuOTc4LTk2Ljk0IDE3LjYyOC0zNC4xNiAxMi43OTUtNjUuMSAzMi4yODItOTQuNTQgNTQuMDUzLTI2LjM1IDE5LjQ5NC01Mi4yNyAzOS40NzUtODMuMTcgNTAuMjIzLTIxLjk2IDcuNjE5LTQ0LjQgMTEuNDMyLTY3LjQ3IDkuNDU2LTI1LjAyLTIuMTM1LTQ4LjIyLTkuNTctNjguNzctMjMuNjE5LTE1LjMyLTEwLjQ5Mi0yOC4yLTIzLjM0LTQwLjA5LTM3LjE3My0xMy4xNi0xNS4yOTQtMjUuNjgtMzEuMDc3LTM4LjA1LTQ3LjAwMS0xMC40NC0xMy40Mi0yMC44LTI2Ljg4Mi0zMi4zNi0zOS4zMTItMTAuMjMtMTAuOTkzLTIxLjMzLTIxLjIxNy0zNC40OS0yOC44MzQtMTIuNi03LjMxNi0yNi4zNy0xMS42MTctNDEuMjktMTAuODdDMTMwOC42IDE3Ni43MjggMTMwMC42MSAxNzkuOTQgMTI5MyAxODRjLTYuMzIgMy4zNTktMTIuMTEgNy41MDItMTcuNTMgMTIuMTM0LTEzLjggMTEuNzktMjUuNTMgMjUuNDg4LTM2LjM2IDM5Ljg2NC0yNC45MSAzMy4wNTktNDUuMzYgNjguODIyLTYzLjcgMTA1LjcyNS02LjQ1IDEzLjAxNC0xMi41OSAyNi4yMDgtMTguNSAzOS40OTctMTMuOTkgMzEuMzgtMjYuNDQgNjMuMy0zNi45OSA5NS44NTQtNTIuMjkgMTYxLjMxMS02OC40OSAzMjkuNDY3LTYyLjI1IDQ5Ny42NTZoNjUuMTljLjI3LTQuNjcuNTgtOS4zMzYuOTItMTQuMDEyIDUuNTEtNzUuMDUxIDE3LjI0LTE0OS40NDcgMzMuMjctMjIyLjg2OCAzLjM5LTE1LjQ2NyA2LjktMzAuODk0IDEwLjE0LTQ2LjM5OSA3LjM0LTM1LjA2MyAxMy41OS03MC4zNzYgMTguNjQtMTA1Ljk5OCAzLjYtMjUuNDY3IDYuNjctNTAuOTA0IDguNTQtNzYuNTM0IDMuMTctNDMuMTEzIDIuNjgtODYuMjc4LTEuNTItMTI5LjM0LTIuMzYtMjQuMTM4LTUuOTQtNDAuMTMtOS4xMy00My44Ny01LjI0LTYuMTM4LTEzLjAxLTExLjE1NS0yMS44Mi0xNC41NS02LjE5LTIuMzgxLTEyLjgzLTQuMTktMTkuNzktNS40OS03LjYyLTEuNDI4LTE0LjktMi4xMzYtMjIuMjMtMS4zNy0xMC4wNiAxLjA1Mi0xOS4yMyAzLjYtMjcuODQgNy40OTEtMTAuODcgNC45MDYtMjEuMDYgMTEuMTk3LTMwLjc4IDE4LjI0M2wtMS4zMy45NzgtLjA4LjA2M2MtMjQuNzcgMTguMDQ0LTQ4LjA4IDM3LjkwMy03MC42MyA1OC41MjZDMTMzNC4yNyAzMjYuNzUgMTMxNi40NCAzMzkuNjU0IDEyOTcuMDYgMzUyLjYwOHoiIGZpbGw9IiNGRkRFRTIiIGZpbGwtb3BhY2l0eT0iLjUiIGZpbGwtcnVsZT0ibm9uemVybyIgLz48L3N2Zz4=')]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="md:w-1/2">
              {isAuthenticated && user ? (
                <div className="bg-white/30 backdrop-blur-sm p-2 rounded-lg inline-block mb-4">
                  <span className="text-herhealth-pink-dark font-medium text-sm px-3 py-1 rounded-full bg-herhealth-pink-light/50">
                    Welcome back, {user.name}!
                  </span>
                </div>
              ) : (
                <div className="bg-white/30 backdrop-blur-sm p-2 rounded-lg inline-block mb-4">
                  <span className="text-herhealth-pink-dark font-medium text-sm px-3 py-1 rounded-full bg-herhealth-pink-light/50">
                    Your personal wellness companion
                  </span>
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                Your Complete <span className="text-herhealth-pink-dark">Women's Wellness</span> Journey
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                HerHealth is your personalized wellness companion for every life stage. Track your cycle, monitor symptoms, connect with experts, and join a supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group">
                        Start Your Journey
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="text-lg px-8 py-6 rounded-full border-2 hover:bg-gray-50 transition-all">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-herhealth-${i % 2 ? 'pink' : 'blue'}-light`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Joined by <span className="font-medium">10,000+</span> women just like you
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative w-full max-w-md"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-herhealth-pink-light/30 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-md">
                          <Calendar className="h-6 w-6 text-herhealth-pink-dark" />
                        </div>
                        <h3 className="ml-4 text-xl font-bold">Cycle Tracker</h3>
                      </div>
                      <span className="text-sm font-medium text-herhealth-pink-dark bg-white px-3 py-1 rounded-full">May</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 28 }).map((_, i) => {
                        let bgColor = "bg-white";
                        if (i >= 0 && i <= 4) bgColor = "bg-herhealth-pink-dark text-white";
                        if (i >= 5 && i <= 13) bgColor = "bg-herhealth-blue-light";
                        if (i >= 14 && i <= 18) bgColor = "bg-herhealth-green-light";
                        return (
                          <div 
                            key={i} 
                            className={`h-10 rounded-full ${bgColor} flex items-center justify-center text-xs font-medium shadow-sm transition-all hover:scale-105`}
                          >
                            {i + 1}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Next period in</p>
                        <p className="font-bold text-herhealth-pink-dark">6 days</p>
                      </div>
                      <div className="h-8 w-8 bg-herhealth-pink-light/50 rounded-full flex items-center justify-center">
                        <ChevronRight className="h-4 w-4 text-herhealth-pink-dark" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-herhealth-blue-light/30 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-herhealth-blue-dark" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Sleep quality</p>
                      <p className="font-medium">Good</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="bg-herhealth-purple-light/30 text-herhealth-purple-dark px-3 py-1 rounded-full text-sm font-medium">
              Personalized Support
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-4">Comprehensive Care for Every Life Stage</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              HerHealth adapts to your unique journey, providing personalized support as your needs evolve.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
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
          </motion.div>
        </div>
      </section>
      
      {/* Life Stages Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="bg-herhealth-blue-light/30 text-herhealth-blue-dark px-3 py-1 rounded-full text-sm font-medium">
              Lifecycle Support
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-4">Supporting You Through Every Stage</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From adolescence to menopause, HerHealth provides tailored support for your changing needs.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
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
          </motion.div>
        </div>
      </section>
      
      {/* Benefits Section - New */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="bg-herhealth-green-light/30 text-herhealth-green-dark px-3 py-1 rounded-full text-sm font-medium">
              Why Choose HerHealth?
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-4">Benefits That Empower You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique advantages designed specifically for women's health needs.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <BenefitItem 
                icon={<BadgeCheck className="h-6 w-6 text-herhealth-pink-dark" />}
                title="Science-Backed Insights"
                description="Our recommendations are based on peer-reviewed research and clinical best practices."
              />
              <BenefitItem 
                icon={<BadgeCheck className="h-6 w-6 text-herhealth-green-dark" />}
                title="Personalized Experience"
                description="Our AI adapts to your unique patterns and needs for truly personalized guidance."
              />
              <BenefitItem 
                icon={<BadgeCheck className="h-6 w-6 text-herhealth-blue-dark" />}
                title="Complete Privacy"
                description="Your data is encrypted and protected. You control what you share and with whom."
              />
              <BenefitItem 
                icon={<BadgeCheck className="h-6 w-6 text-herhealth-purple-dark" />}
                title="Expert Support"
                description="Connect with healthcare professionals who specialize in women's health."
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-tr from-herhealth-pink-light/50 to-herhealth-purple-light/50 rounded-2xl p-8 shadow-xl">
                <img 
                  src="https://source.unsplash.com/random/600x400/?women,health,wellness" 
                  alt="Women's wellness" 
                  className="w-full h-auto rounded-xl shadow-lg" 
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg max-w-xs">
                  <div className="flex items-start space-x-2">
                    <div className="h-8 w-8 bg-herhealth-pink-light rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="h-4 w-4 text-herhealth-pink-dark" fill="currentColor" />
                    </div>
                    <div>
                      <p className="font-medium">Trusted by thousands</p>
                      <p className="text-sm text-gray-600 mt-1">
                        "HerHealth has transformed how I understand my body and health."
                      </p>
                      <p className="text-xs font-medium text-herhealth-pink-dark mt-2">— Sarah K.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-white to-herhealth-pink-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="bg-herhealth-peach-light/30 text-herhealth-peach-dark px-3 py-1 rounded-full text-sm font-medium">
              Success Stories
            </span>
            <h2 className="text-3xl font-bold mt-4 mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from women whose lives have been transformed by HerHealth.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
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
          </motion.div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-herhealth-pink-light to-herhealth-purple-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Wellness Journey Today</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of women who are taking control of their health with HerHealth's personalized platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="bg-white text-lg px-8 py-6 rounded-full border-2 hover:bg-gray-50 transition-all">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-herhealth-pink-light/30 rounded-full blur-xl" />
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-herhealth-purple-light/40 rounded-full blur-lg" />
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
    pink: "bg-herhealth-pink-light/30 border-herhealth-pink",
    green: "bg-herhealth-green-light/30 border-herhealth-green",
    blue: "bg-herhealth-blue-light/30 border-herhealth-blue",
    purple: "bg-herhealth-purple-light/30 border-herhealth-purple",
    peach: "bg-herhealth-peach-light/30 border-herhealth-peach",
  };
  
  return (
    <motion.div 
      variants={fadeIn}
      className={`bg-white rounded-xl border shadow-md overflow-hidden hover:shadow-lg transition-shadow`}
    >
      <div className={`p-6 border-l-4 ${colorMap[color]}`}>
        <div className="mb-4 bg-white/70 p-2 rounded-full inline-block">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm font-medium text-herhealth-pink-dark">Learn more</span>
          <ChevronRight className="h-4 w-4 text-herhealth-pink-dark" />
        </div>
      </div>
    </motion.div>
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
      hover: "group-hover:bg-herhealth-pink-light/30",
    },
    green: {
      bg: "bg-herhealth-green-light/20",
      border: "border-herhealth-green",
      hover: "group-hover:bg-herhealth-green-light/30",
    },
    blue: {
      bg: "bg-herhealth-blue-light/20",
      border: "border-herhealth-blue",
      hover: "group-hover:bg-herhealth-blue-light/30",
    },
    purple: {
      bg: "bg-herhealth-purple-light/20",
      border: "border-herhealth-purple",
      hover: "group-hover:bg-herhealth-purple-light/30",
    },
    peach: {
      bg: "bg-herhealth-peach-light/20",
      border: "border-herhealth-peach",
      hover: "group-hover:bg-herhealth-peach-light/30",
    },
  };
  
  return (
    <motion.div 
      variants={fadeIn}
      className={`rounded-xl p-6 ${colorMap[color].bg} border ${colorMap[color].border} hover:shadow-md transition-all group cursor-pointer`}
    >
      <div className={`w-12 h-1 rounded-full ${colorMap[color].border} mb-4`}></div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center text-sm font-medium">
        <span>Explore</span>
        <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
};

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

const TestimonialCard = ({ quote, name, role }: TestimonialCardProps) => {
  return (
    <motion.div 
      variants={fadeIn}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="mb-4 text-herhealth-pink-dark">
        <svg width="45" height="36" className="fill-current">
          <path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path>
        </svg>
      </div>
      <p className="text-gray-600 mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="bg-herhealth-pink-light/30 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-herhealth-pink-dark">
          {name.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="font-bold">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => {
  return (
    <div className="flex items-start">
      <div className="mt-1 bg-gray-50 p-2 rounded-full">{icon}</div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default HomePage;
