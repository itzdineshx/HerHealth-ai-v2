
import { LoginForm } from "@/components/auth/LoginForm";
import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-herhealth-pink-light/40 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <LoginForm />
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
