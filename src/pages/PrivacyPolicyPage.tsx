
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mt-6 mb-4">1. Introduction</h2>
          <p className="mb-4">
            At HerHealth, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">2. Information We Collect</h2>
          <p className="mb-4">
            We collect personal information that you voluntarily provide to us when you register, express interest in obtaining information about us or our products, or otherwise contact us.
          </p>
          <p className="mb-4">
            The personal information we collect may include:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Name, email address, and contact information</li>
            <li>Health and wellness information</li>
            <li>Account preferences and settings</li>
            <li>Usage data and interactions with our platform</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Personalize your experience and deliver content relevant to your interests</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative information, such as updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">5. Your Privacy Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your personal information.
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">6. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <p className="mt-8">Last updated: May 10, 2025</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default PrivacyPolicyPage;
