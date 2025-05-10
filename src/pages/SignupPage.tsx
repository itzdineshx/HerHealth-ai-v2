
import { SignUpForm } from "@/components/auth/SignUpForm";
import { AppLayout } from "@/components/layout/AppLayout";

const SignupPage = () => {
  return (
    <AppLayout>
      <div className="min-h-[calc(100vh-200px)] bg-gradient-to-b from-herhealth-pink-light/40 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <SignUpForm />
      </div>
    </AppLayout>
  );
};

export default SignupPage;
