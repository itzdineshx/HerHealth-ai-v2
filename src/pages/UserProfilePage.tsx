
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Calendar, User, Heart, Settings, Lock, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const UserProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    dob: user?.dob || "",
    location: user?.location || "",
    profileImage: "https://img.icons8.com/?size=100&id=A2cvMrJpftoK&format=png&color=000000",
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      dataSharing: user?.privacyPreferences?.dataSharing || false,
      marketingEmails: user?.privacyPreferences?.marketingEmails || false,
      researchParticipation: user?.privacyPreferences?.researchParticipation || false
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked
      }
    }));
  };

  const handlePrivacyChange = (key: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: checked
      }
    }));
  };

  const saveChanges = () => {
    // In a real app, this would make an API call to update the user's profile
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully.",
      duration: 3000,
    });
  };

  if (!user) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[70vh]">
          <Card>
            <CardHeader>
              <CardTitle>Not Authorized</CardTitle>
              <CardDescription>Please log in to view your profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <a href="/login">Login</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Profile sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={formData.profileImage} alt={formData.name} />
                    <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="font-bold text-xl">{formData.name}</h3>
                    <p className="text-sm text-gray-500">{formData.email}</p>
                    <p className="text-sm text-gray-500">{formData.location}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => document.getElementById('profileImage')?.click()}
                  >
                    Update Photo
                    <input 
                      type="file" 
                      id="profileImage" 
                      className="hidden" 
                      accept="image/*"
                    />
                  </Button>
                </div>
                
                <div className="mt-8 space-y-2">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeTab === "personal" ? "bg-herhealth-pink-light/20" : ""}`}
                    onClick={() => setActiveTab("personal")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Personal Information
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeTab === "health" ? "bg-herhealth-pink-light/20" : ""}`}
                    onClick={() => setActiveTab("health")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Health Preferences
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeTab === "notifications" ? "bg-herhealth-pink-light/20" : ""}`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeTab === "privacy" ? "bg-herhealth-pink-light/20" : ""}`}
                    onClick={() => setActiveTab("privacy")}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Privacy
                  </Button>
                </div>
                
                <div className="mt-8">
                  <Button variant="destructive" className="w-full" onClick={logout}>
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Profile content */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-3 text-gray-400">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <Input
                            id="dob"
                            name="dob"
                            type="date"
                            className="pl-10"
                            value={formData.dob}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={saveChanges}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="health">
                <Card>
                  <CardHeader>
                    <CardTitle>Health Preferences</CardTitle>
                    <CardDescription>
                      Customize your health tracking preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Life Stage</h4>
                          <p className="text-sm text-gray-500">Current life stage: {user.lifeStage}</p>
                        </div>
                        <Button variant="outline">Update</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Health Conditions</h4>
                          <p className="text-sm text-gray-500">Add any health conditions for personalized support</p>
                        </div>
                        <Button variant="outline">Manage</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Tracking Preferences</h4>
                          <p className="text-sm text-gray-500">Set which symptoms and metrics you want to track</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={saveChanges}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch 
                          checked={formData.notifications.email}
                          onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications on your device</p>
                        </div>
                        <Switch 
                          checked={formData.notifications.push}
                          onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via text message</p>
                        </div>
                        <Switch 
                          checked={formData.notifications.sms}
                          onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={saveChanges}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control your data sharing and privacy preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Data Sharing</Label>
                          <p className="text-sm text-gray-500">Allow anonymous data sharing for research</p>
                        </div>
                        <Switch 
                          checked={formData.privacy.dataSharing}
                          onCheckedChange={(checked) => handlePrivacyChange("dataSharing", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Marketing Emails</Label>
                          <p className="text-sm text-gray-500">Receive promotional and marketing emails</p>
                        </div>
                        <Switch 
                          checked={formData.privacy.marketingEmails}
                          onCheckedChange={(checked) => handlePrivacyChange("marketingEmails", checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Research Participation</Label>
                          <p className="text-sm text-gray-500">Opt in to participate in women's health research</p>
                        </div>
                        <Switch 
                          checked={formData.privacy.researchParticipation}
                          onCheckedChange={(checked) => handlePrivacyChange("researchParticipation", checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={saveChanges}>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default UserProfilePage;
