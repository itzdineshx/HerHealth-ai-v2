
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";

const TermsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to HerHealth. By using our services, you agree to these Terms of Service. Please read them carefully.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">2. Using Our Services</h2>
          <p className="mb-4">
            You must follow any policies made available to you within the Services. You may use our Services only as permitted by law. We may suspend or stop providing our Services to you if you do not comply with our terms or policies.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">3. Privacy and Copyright Protection</h2>
          <p className="mb-4">
            HerHealth's privacy policies explain how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that HerHealth can use such data in accordance with our privacy policies.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">4. Your Content in Our Services</h2>
          <p className="mb-4">
            Some of our Services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold in that content.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">5. Modifying and Terminating our Services</h2>
          <p className="mb-4">
            We are constantly changing and improving our Services. We may add or remove functionalities or features, and we may suspend or stop a Service altogether.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">6. Our Warranties and Disclaimers</h2>
          <p className="mb-4">
            We provide our Services using a commercially reasonable level of skill and care. But there are certain things that we don't promise about our Services. We don't make any commitments about the content within the Services, the specific functions of the Services, or their reliability, availability, or ability to meet your needs.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">7. Liability for our Services</h2>
          <p className="mb-4">
            To the extent permitted by law, the total liability of HerHealth for any claims under these terms, including for any implied warranties, is limited to the amount you paid us to use the Services.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">8. About these Terms</h2>
          <p className="mb-4">
            We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law or changes to our Services. We'll post notice of modifications to these terms on this page.
          </p>
          
          <p className="mt-8">Last updated: May 10, 2025</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default TermsPage;
