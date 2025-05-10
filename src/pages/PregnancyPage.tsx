
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Baby, Calendar, Activity, HeartPulse } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const PregnancyTracker = () => {
  const [dueDate, setDueDate] = useState<string>("");
  const [weekCount, setWeekCount] = useState<number>(0);
  
  const calculateWeeks = () => {
    if (!dueDate) return;
    
    const due = new Date(dueDate);
    const today = new Date();
    
    // Calculate conception date (approximately 40 weeks before due date)
    const conceptionDate = new Date(due);
    conceptionDate.setDate(conceptionDate.getDate() - 280);
    
    // Calculate weeks pregnant
    const diffTime = Math.abs(today.getTime() - conceptionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    
    setWeekCount(weeks);
  };
  
  const getMilestone = () => {
    if (!weekCount) return "Enter your due date to see milestones";
    
    if (weekCount < 0) return "Not pregnant yet";
    if (weekCount > 42) return "Baby is here!";
    
    const milestones = [
      { week: 8, text: "Baby's heart starts beating" },
      { week: 12, text: "First trimester complete" },
      { week: 18, text: "You may feel the baby kick" },
      { week: 20, text: "Halfway there! You may learn baby's sex" },
      { week: 24, text: "Baby's face is fully formed" },
      { week: 28, text: "Third trimester begins" },
      { week: 32, text: "Baby's lungs developing" },
      { week: 36, text: "Baby is considered full term" },
      { week: 40, text: "Due date!" },
    ];
    
    // Find the next milestone
    for (const milestone of milestones) {
      if (weekCount <= milestone.week) {
        return `Week ${weekCount}: ${milestone.text} (in ${milestone.week - weekCount} week${milestone.week - weekCount !== 1 ? 's' : ''})`;
      }
    }
    
    return `Week ${weekCount}: Baby is due any day now!`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pregnancy Tracker</CardTitle>
        <CardDescription>Track your pregnancy journey and upcoming milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dueDate">When is your due date?</Label>
            <div className="flex gap-4">
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1"
              />
              <Button onClick={calculateWeeks}>Calculate</Button>
            </div>
          </div>
          
          {weekCount > 0 && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-herhealth-pink-light/30 p-4 text-center">
                <h3 className="text-lg font-semibold">You are</h3>
                <p className="text-3xl font-bold text-herhealth-pink-dark my-2">{weekCount} weeks</p>
                <p className="text-sm text-gray-600">pregnant</p>
              </div>
              
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">Current Milestone:</h3>
                <p className="text-sm">{getMilestone()}</p>
              </div>
              
              {/* Pregnancy progress bar */}
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-herhealth-pink h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, (weekCount / 40) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 weeks</span>
                  <span>20 weeks</span>
                  <span>40 weeks</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-2">Common Symptoms by Trimester</h3>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="border rounded-md p-2">
                <p className="font-medium">First Trimester</p>
                <ul className="text-xs text-left list-disc pl-4 mt-1">
                  <li>Morning sickness</li>
                  <li>Fatigue</li>
                  <li>Food aversions</li>
                </ul>
              </div>
              <div className="border rounded-md p-2">
                <p className="font-medium">Second Trimester</p>
                <ul className="text-xs text-left list-disc pl-4 mt-1">
                  <li>Baby movements</li>
                  <li>Energy returns</li>
                  <li>Appetite increase</li>
                </ul>
              </div>
              <div className="border rounded-md p-2">
                <p className="font-medium">Third Trimester</p>
                <ul className="text-xs text-left list-disc pl-4 mt-1">
                  <li>Back pain</li>
                  <li>Trouble sleeping</li>
                  <li>Braxton Hicks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const VitalTracking = () => {
  const { user } = useAuth();
  const [reading, setReading] = useState({
    type: "bloodPressure",
    systolic: "",
    diastolic: "",
    glucose: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      let healthMetric = "";
      let healthValue = "";
      
      if (reading.type === "bloodPressure") {
        healthMetric = "Blood Pressure";
        healthValue = `${reading.systolic}/${reading.diastolic}`;
      } else {
        healthMetric = "Glucose";
        healthValue = reading.glucose;
      }
      
      // Store as activity log
      const { error } = await supabase
        .from("activity_logs")
        .insert([{
          user_id: user.id,
          date: new Date().toISOString().split('T')[0],
          activity_type: "health",
          notes: `${healthMetric}: ${healthValue} - ${reading.notes}`,
        }]);
        
      if (error) throw error;
      
      toast({
        title: "Reading Saved",
        description: `Your ${reading.type === "bloodPressure" ? "blood pressure" : "glucose"} reading has been recorded.`,
      });
      
      // Reset form
      setReading({
        ...reading,
        systolic: "",
        diastolic: "",
        glucose: "",
        notes: ""
      });
    } catch (error) {
      console.error("Error saving reading:", error);
      toast({
        title: "Error Saving Reading",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Vitals Tracking</CardTitle>
        <CardDescription>Track important health metrics during pregnancy</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Reading Type</Label>
            <Select
              value={reading.type}
              onValueChange={(value) => setReading({ ...reading, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reading type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bloodPressure">Blood Pressure</SelectItem>
                <SelectItem value="glucose">Blood Glucose</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {reading.type === "bloodPressure" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systolic">Systolic (mmHg)</Label>
                <Input 
                  id="systolic" 
                  placeholder="120" 
                  value={reading.systolic}
                  onChange={(e) => setReading({ ...reading, systolic: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                <Input 
                  id="diastolic" 
                  placeholder="80" 
                  value={reading.diastolic}
                  onChange={(e) => setReading({ ...reading, diastolic: e.target.value })}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="glucose">Glucose (mg/dL)</Label>
              <Input 
                id="glucose" 
                placeholder="95" 
                value={reading.glucose}
                onChange={(e) => setReading({ ...reading, glucose: e.target.value })}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input 
              id="notes" 
              placeholder="Reading taken after meal" 
              value={reading.notes}
              onChange={(e) => setReading({ ...reading, notes: e.target.value })}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-herhealth-pink-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Reading"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const PostpartumSupport = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Postpartum Support</CardTitle>
        <CardDescription>Resources and support for your postpartum journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="font-semibold text-blue-800">Edinburgh Postnatal Depression Scale (EPDS)</h3>
          <p className="text-sm mt-1 text-blue-700">
            The EPDS is a valuable and efficient way of identifying people at risk for perinatal depression.
          </p>
          <Button className="mt-3 bg-blue-600 hover:bg-blue-700">Take Assessment</Button>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Common Postpartum Concerns</h3>
          <div className="space-y-2">
            <div className="border rounded-md p-3">
              <p className="font-medium">Recovery & Healing</p>
              <p className="text-sm text-gray-600 mt-1">
                Track physical recovery, get tips on managing discomfort, and know when to seek care.
              </p>
            </div>
            <div className="border rounded-md p-3">
              <p className="font-medium">Breastfeeding Support</p>
              <p className="text-sm text-gray-600 mt-1">
                Find resources, track feeds, and connect with lactation consultants.
              </p>
            </div>
            <div className="border rounded-md p-3">
              <p className="font-medium">Mental Wellbeing</p>
              <p className="text-sm text-gray-600 mt-1">
                Resources for managing anxiety, depression, and emotional changes after childbirth.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Coming Soon</h3>
          <p className="text-sm text-gray-600">
            Sleep tracking for you and baby, personalized recovery plans, and connections to local support groups.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-herhealth-green-dark">Find Local Resources</Button>
      </CardFooter>
    </Card>
  );
};

const PregnancyPage = () => {
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
              <Baby className="mr-2" />
              Pregnancy & Postpartum
            </h1>
            <p className="text-gray-600">Support for your pregnancy and postpartum journey</p>
          </div>
          
          <Tabs defaultValue="tracker" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tracker">Pregnancy Tracker</TabsTrigger>
              <TabsTrigger value="vitals">Health Vitals</TabsTrigger>
              <TabsTrigger value="postpartum">Postpartum Support</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="tracker">
                <PregnancyTracker />
              </TabsContent>
              <TabsContent value="vitals">
                <VitalTracking />
              </TabsContent>
              <TabsContent value="postpartum">
                <PostpartumSupport />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default PregnancyPage;
