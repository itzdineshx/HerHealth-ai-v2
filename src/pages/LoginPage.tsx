
import { LoginForm } from "@/components/auth/LoginForm";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage = () => {
  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-herhealth-pink-light/40 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-5">
              {/* Left side decorative column */}
              <div className="hidden md:block md:col-span-2 bg-gradient-to-b from-herhealth-pink-dark to-herhealth-pink">
                <div className="h-full p-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mt-8">Welcome Back</h2>
                    <p className="text-white/90">
                      Your personalized health journey continues here
                    </p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="relative">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10"
                        style={{
                          width: `${i * 50}px`,
                          height: `${i * 50}px`,
                          bottom: `${i * 10}px`,
                          right: `${i * -25}px`,
                        }}
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 0.7, 0.5],
                        }}
                        transition={{
                          duration: 3 + i,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right side with form */}
              <div className="col-span-5 md:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <LoginForm />
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
