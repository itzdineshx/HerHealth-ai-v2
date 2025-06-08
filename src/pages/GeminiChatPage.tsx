
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GeminiHealthAssistant } from "@/components/chat/GeminiHealthAssistant";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Heart, Star, Shield, Zap } from "lucide-react";

const GeminiChatPage = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <AppLayout>
      <div className="py-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Gemini Health Assistant
            </h1>
            <p className="text-gray-600">Get personalized health information powered by Google's Gemini AI</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GeminiHealthAssistant />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="bg-gradient-to-r from-purple-100 to-blue-100 pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    About Gemini Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Our Gemini-powered AI assistant provides advanced health information 
                    and personalized advice using Google's latest AI technology.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Star className="h-4 w-4 text-purple-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Advanced AI</h4>
                        <p className="text-xs text-gray-600">Powered by Google's Gemini 2.0 Flash model</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Heart className="h-4 w-4 text-pink-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Women's Health Focus</h4>
                        <p className="text-xs text-gray-600">Specialized in female health topics</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Real-time Responses</h4>
                        <p className="text-xs text-gray-600">Fast and contextual conversations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Shield className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium">Safe & Secure</h4>
                        <p className="text-xs text-gray-600">Built-in safety filters and guidelines</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    Health Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-md">
                      <h4 className="text-sm font-medium text-purple-700">Menstrual Health</h4>
                      <ul className="mt-2 text-xs text-gray-600 space-y-1 pl-4 list-disc">
                        <li>Cycle tracking and patterns</li>
                        <li>PMS and symptom management</li>
                        <li>Irregular periods</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md">
                      <h4 className="text-sm font-medium text-blue-700">Fertility & Pregnancy</h4>
                      <ul className="mt-2 text-xs text-gray-600 space-y-1 pl-4 list-disc">
                        <li>Ovulation tracking</li>
                        <li>Pregnancy symptoms</li>
                        <li>Prenatal health</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-md">
                      <h4 className="text-sm font-medium text-green-700">General Wellness</h4>
                      <ul className="mt-2 text-xs text-gray-600 space-y-1 pl-4 list-disc">
                        <li>Nutrition and diet</li>
                        <li>Mental health support</li>
                        <li>Exercise and fitness</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-yellow-50 pb-2">
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <Shield className="h-5 w-5" />
                    Important Notice
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-xs text-yellow-800">
                      <strong>Medical Disclaimer:</strong> This AI assistant provides general health information only. 
                      Always consult with qualified healthcare professionals for medical advice, diagnosis, or treatment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GeminiChatPage;
