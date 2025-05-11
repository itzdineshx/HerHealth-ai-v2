
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { MessageCircle, Mail, MapPin, PhoneCall } from "lucide-react";

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    toast({
      title: "Message sent",
      description: "Thank you for contacting us. We'll get back to you shortly.",
      duration: 5000,
    });
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <AppLayout>
      <div className="bg-gradient-to-b from-herhealth-pink-light/40 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or feedback? Our team is here to help with any inquiries about our women's health platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-herhealth-pink-light/30 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-herhealth-pink-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-sm text-gray-500 mt-1">Our friendly team is here to help.</p>
                      <a href="mailto:support@herhealth.com" className="text-sm text-herhealth-pink-dark hover:underline mt-1 block">
                        support@herhealth.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-herhealth-pink-light/30 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-herhealth-pink-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium">Office</h3>
                      <p className="text-sm text-gray-500 mt-1">Come visit our headquarters.</p>
                      <p className="text-sm mt-1">
                        123 Wellness Ave<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-herhealth-pink-light/30 p-3 rounded-full">
                      <PhoneCall className="h-6 w-6 text-herhealth-pink-dark" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm text-gray-500 mt-1">Mon-Fri from 8am to 5pm.</p>
                      <a href="tel:+1-555-health-support" className="text-sm text-herhealth-pink-dark hover:underline mt-1 block">
                        +1 (555) HEALTH-SUPPORT
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Complete the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        rows={5} 
                        placeholder="How can we help you?" 
                        required 
                      />
                    </div>

                    <Button type="submit" className="w-full md:w-auto">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ContactPage;
