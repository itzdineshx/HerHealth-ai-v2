
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const UserProfilePage = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <AppLayout>
      <div className="py-8 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ProfileSidebar user={user} />
            </div>
            
            <div className="lg:col-span-3">
              <Tabs defaultValue="personal">
                <TabsList className="mb-6 bg-white">
                  <TabsTrigger value="personal">Personal Information</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <PersonalInfoTab user={user} />
                </TabsContent>
                
                <TabsContent value="notifications">
                  <NotificationsTab />
                </TabsContent>
                
                <TabsContent value="privacy">
                  <PrivacyTab user={user} />
                </TabsContent>
                
                <TabsContent value="integrations">
                  <IntegrationsTab />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface ProfileSidebarProps {
  user: any;
}

const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  return (
    <Card>
      <CardContent className="pt-6 flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="" />
          <AvatarFallback className="bg-herhealth-pink-dark text-white text-xl">
            {user.name.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500 mb-4">{user.email}</p>
        
        <div className="w-full mt-2">
          <Button variant="outline" className="w-full mb-2">Edit Profile</Button>
          <Button variant="outline" className="w-full text-red-500 hover:bg-red-50">Log Out</Button>
        </div>
        
        <Separator className="my-4" />
        
        <div className="w-full">
          <h3 className="font-medium text-sm mb-3">Account Status</h3>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Member Since</span>
            <span className="text-sm">{format(new Date(user.createdAt), 'MMM yyyy')}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-500">Plan</span>
            <span className="text-sm">Free</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface PersonalInfoTabProps {
  user: any;
}

const PersonalInfoTab = ({ user }: PersonalInfoTabProps) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    dob: user.dob || '',
    location: user.location || ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your personal information has been saved.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input 
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Health Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="life-stage">Current Life Stage</Label>
                <select 
                  id="life-stage"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  defaultValue={user.lifeStage || "adult"}
                >
                  <option value="teen">Teen (13-19)</option>
                  <option value="adult">Adult (20-45)</option>
                  <option value="perimenopause">Perimenopause</option>
                  <option value="postmenopause">Post-menopause</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avg-cycle">Average Cycle Length</Label>
                <select 
                  id="avg-cycle"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  defaultValue="28"
                >
                  <option value="21">21 days</option>
                  <option value="24">24 days</option>
                  <option value="28">28 days</option>
                  <option value="30">30 days</option>
                  <option value="35">35 days</option>
                  <option value="irregular">Irregular</option>
                </select>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="mt-6">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    periodReminders: true,
    fertileWindow: true,
    symptomReminders: false,
    healthTips: true,
    appUpdates: false,
    communityActivity: false
  });
  
  const handleToggle = (setting: string) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Preferences Saved",
      description: "Your notification settings have been updated.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your notification preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="period-reminders" className="font-medium">Period Reminders</Label>
                <p className="text-sm text-gray-500">Get notified before your period is expected</p>
              </div>
              <Switch 
                id="period-reminders"
                checked={notifications.periodReminders}
                onCheckedChange={() => handleToggle('periodReminders')}
              />
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="fertile-window" className="font-medium">Fertile Window Alerts</Label>
                <p className="text-sm text-gray-500">Get notified during your fertile window</p>
              </div>
              <Switch 
                id="fertile-window"
                checked={notifications.fertileWindow}
                onCheckedChange={() => handleToggle('fertileWindow')}
              />
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="symptom-reminders" className="font-medium">Symptom Log Reminders</Label>
                <p className="text-sm text-gray-500">Daily reminder to track your symptoms</p>
              </div>
              <Switch 
                id="symptom-reminders"
                checked={notifications.symptomReminders}
                onCheckedChange={() => handleToggle('symptomReminders')}
              />
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="health-tips" className="font-medium">Health Tips & Insights</Label>
                <p className="text-sm text-gray-500">Receive personalized health insights</p>
              </div>
              <Switch 
                id="health-tips"
                checked={notifications.healthTips}
                onCheckedChange={() => handleToggle('healthTips')}
              />
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="app-updates" className="font-medium">App Updates</Label>
                <p className="text-sm text-gray-500">Stay informed about new features</p>
              </div>
              <Switch 
                id="app-updates"
                checked={notifications.appUpdates}
                onCheckedChange={() => handleToggle('appUpdates')}
              />
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="community-activity" className="font-medium">Community Activity</Label>
                <p className="text-sm text-gray-500">Notifications about community posts and replies</p>
              </div>
              <Switch 
                id="community-activity"
                checked={notifications.communityActivity}
                onCheckedChange={() => handleToggle('communityActivity')}
              />
            </div>
          </div>
          
          <Button type="submit" className="mt-6">Save Preferences</Button>
        </form>
      </CardContent>
    </Card>
  );
};

interface PrivacyTabProps {
  user: any;
}

const PrivacyTab = ({ user }: PrivacyTabProps) => {
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: user.privacyPreferences?.dataSharing ?? false,
    marketingEmails: user.privacyPreferences?.marketingEmails ?? false,
    researchParticipation: user.privacyPreferences?.researchParticipation ?? false,
    thirdPartyAnalytics: true
  });
  
  const handleToggle = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>Manage how your data is used and shared</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="data-sharing" className="font-medium">Anonymized Data Sharing</Label>
                <p className="text-sm text-gray-500">Allow sharing of anonymized health data for research</p>
              </div>
              <Switch 
                id="data-sharing"
                checked={privacySettings.dataSharing}
                onCheckedChange={() => handleToggle('dataSharing')}
              />
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="marketing-emails" className="font-medium">Marketing Emails</Label>
                <p className="text-sm text-gray-500">Receive promotional emails about our services</p>
              </div>
              <Switch 
                id="marketing-emails"
                checked={privacySettings.marketingEmails}
                onCheckedChange={() => handleToggle('marketingEmails')}
              />
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="research-participation" className="font-medium">Research Participation</Label>
                <p className="text-sm text-gray-500">Be notified about opportunities to participate in women's health research</p>
              </div>
              <Switch 
                id="research-participation"
                checked={privacySettings.researchParticipation}
                onCheckedChange={() => handleToggle('researchParticipation')}
              />
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <Label htmlFor="third-party" className="font-medium">Third Party Analytics</Label>
                <p className="text-sm text-gray-500">Allow us to use analytics to improve our service</p>
              </div>
              <Switch 
                id="third-party"
                checked={privacySettings.thirdPartyAnalytics}
                onCheckedChange={() => handleToggle('thirdPartyAnalytics')}
              />
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-medium">Data Management</h3>
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="justify-start">Export My Data</Button>
              <Button variant="outline" className="justify-start text-amber-600 hover:bg-amber-50">
                Delete My Account
              </Button>
            </div>
          </div>
          
          <Button type="submit" className="mt-6">Save Settings</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const IntegrationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Services</CardTitle>
        <CardDescription>Manage third-party integrations and devices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              </div>
              <div>
                <h3 className="font-medium">Apple Health</h3>
                <p className="text-sm text-gray-500">Import activity and health data</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M16.8 11.2c.8-.8.8-2 0-2.8l-4-4c-.8-.8-2-.8-2.8 0l-4 4c-.8.8-.8 2 0 2.8l4 4c.8.8 2 .8 2.8 0Z"></path><path d="m18 15-2-2"></path><path d="m6 9 2 2"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="m12 2v4"></path><path d="m10 18 2 2 2-2"></path></svg>
              </div>
              <div>
                <h3 className="font-medium">Google Fit</h3>
                <p className="text-sm text-gray-500">Track your activity data</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M21 6v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1Z"></path><path d="M12 10v5"></path><path d="M8 10v7"></path><path d="M16 10v2"></path></svg>
              </div>
              <div>
                <h3 className="font-medium">Fitbit</h3>
                <p className="text-sm text-gray-500">Sync your activity tracker</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><circle cx="12" cy="12" r="10"></circle><path d="M10 8v6l5-3-5-3Z"></path></svg>
              </div>
              <div>
                <h3 className="font-medium">Oura Ring</h3>
                <p className="text-sm text-gray-500">Track sleep and readiness scores</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfilePage;
