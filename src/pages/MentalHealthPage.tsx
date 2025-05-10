
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Brain, MessageCircle, Calendar as CalendarIcon, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const MoodTracker = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [mood, setMood] = useState<string>("neutral");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedDate) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("symptom_logs")
        .insert([
          {
            user_id: user.id,
            date: selectedDate.toISOString().split('T')[0],
            symptom_type: "mood",
            intensity: getMoodIntensity(mood),
            notes
          }
        ]);

      if (error) throw error;

      toast({
        title: "Mood Logged!",
        description: "Your mood has been recorded for " + selectedDate.toLocaleDateString(),
      });

      setNotes("");
    } catch (error) {
      console.error("Error saving mood:", error);
      toast({
        title: "Error Saving Mood",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMoodIntensity = (mood: string): number => {
    switch (mood) {
      case "verySad": return 1;
      case "sad": return 3;
      case "neutral": return 5;
      case "happy": return 7;
      case "veryHappy": return 10;
      default: return 5;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Tracker</CardTitle>
        <CardDescription>
          Track your daily mood and emotions to identify patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Select Date</Label>
            <div className="mt-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md mx-auto"
                disabled={(date) => date > new Date()}
              />
            </div>
          </div>
          <div>
            <Label>How are you feeling today?</Label>
            <div className="mt-2">
              <RadioGroup value={mood} onValueChange={setMood} className="flex justify-between">
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="verySad" id="verySad" className="sr-only" />
                  <label htmlFor="verySad" className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                    <span className="text-4xl">😭</span>
                  </label>
                  <span className="text-xs mt-1">Very Sad</span>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="sad" id="sad" className="sr-only" />
                  <label htmlFor="sad" className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                    <span className="text-4xl">😔</span>
                  </label>
                  <span className="text-xs mt-1">Sad</span>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="neutral" id="neutral" className="sr-only" />
                  <label htmlFor="neutral" className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                    <span className="text-4xl">😐</span>
                  </label>
                  <span className="text-xs mt-1">Neutral</span>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="happy" id="happy" className="sr-only" />
                  <label htmlFor="happy" className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                    <span className="text-4xl">🙂</span>
                  </label>
                  <span className="text-xs mt-1">Happy</span>
                </div>
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="veryHappy" id="veryHappy" className="sr-only" />
                  <label htmlFor="veryHappy" className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                    <span className="text-4xl">😄</span>
                  </label>
                  <span className="text-xs mt-1">Very Happy</span>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional details about how you're feeling..."
              className="mt-1"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-herhealth-pink-dark hover:bg-herhealth-pink text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Mood Entry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const SupportChat = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Wellness Assistant</CardTitle>
        <CardDescription>
          Chat with our AI wellness assistant for mental health tips and support
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MessageCircle className="h-12 w-12 mx-auto text-herhealth-pink-dark mb-4" />
          <p>AI wellness chat coming soon</p>
          <p className="text-sm mt-2">
            You'll be able to get personalized wellness tips, CBT techniques, and mindfulness exercises
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="w-full">
          <div className="flex gap-2">
            <Textarea placeholder="Type your message here..." disabled className="flex-1" />
            <Button disabled className="bg-herhealth-pink-dark">Send</Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: This is not a substitute for professional mental health care
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

const CommunitySupport = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Community Support</CardTitle>
        <CardDescription>
          Connect with others on similar wellness journeys
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Activity className="h-12 w-12 mx-auto text-herhealth-pink-dark mb-4" />
          <p>Community forums coming soon</p>
          <p className="text-sm mt-2">
            Join topic-based groups for PCOS, postpartum depression, menopause, and more
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-herhealth-green-dark hover:bg-herhealth-green" disabled>
          Join the Waitlist
        </Button>
      </CardFooter>
    </Card>
  );
};

const MentalHealthPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <AppLayout>
      <div className="py-8 bg-gradient-to-b from-herhealth-pink-light/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold flex items-center">
              <Brain className="mr-2" />
              Mental Health & Wellness
            </h1>
            <p className="text-gray-600">Track your moods, get support, and connect with community</p>
          </div>

          <Tabs defaultValue="mood" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mood">Mood Tracker</TabsTrigger>
              <TabsTrigger value="chat">Wellness Chat</TabsTrigger>
              <TabsTrigger value="community">Community Support</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="mood">
                <MoodTracker />
              </TabsContent>
              <TabsContent value="chat">
                <SupportChat />
              </TabsContent>
              <TabsContent value="community">
                <CommunitySupport />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default MentalHealthPage;
