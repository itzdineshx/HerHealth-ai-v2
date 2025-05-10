
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ThermometerSnowflake, 
  Calendar, 
  HeartPulse, 
  Pill, 
  BarChart4 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Sample chart component for symptom tracking
const SymptomChart = () => {
  return (
    <div className="py-4">
      <div className="border p-4 rounded-lg bg-gray-50 flex flex-col items-center justify-center h-64">
        <BarChart4 className="h-12 w-12 text-herhealth-pink-dark mb-3" />
        <p className="text-gray-500">Symptom charts will appear here as you add more data</p>
        <Button variant="outline" className="mt-4">View Sample Chart</Button>
      </div>
    </div>
  );
};

// Symptom tracker component
const SymptomTracker = () => {
  const { user } = useAuth();
  const [symptom, setSymptom] = useState({
    type: "hotFlash",
    intensity: "3",
    time: "",
    duration: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from("symptom_logs")
        .insert([{
          user_id: user.id,
          date: today,
          symptom_type: symptom.type,
          intensity: parseInt(symptom.intensity),
          notes: `Time: ${symptom.time}, Duration: ${symptom.duration} minutes, Notes: ${symptom.notes}`,
        }]);
        
      if (error) throw error;
      
      toast({
        title: "Symptom Logged",
        description: "Your symptom has been recorded.",
      });
      
      // Reset form
      setSymptom({
        ...symptom,
        intensity: "3",
        time: "",
        duration: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error saving symptom:", error);
      toast({
        title: "Error Saving Symptom",
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
        <CardTitle>Menopause Symptom Tracker</CardTitle>
        <CardDescription>Track your menopause symptoms to identify patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Symptom Type</Label>
              <Select
                value={symptom.type}
                onValueChange={(value) => setSymptom({ ...symptom, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select symptom type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotFlash">Hot Flash</SelectItem>
                  <SelectItem value="nightSweat">Night Sweat</SelectItem>
                  <SelectItem value="insomnia">Insomnia/Sleep Disturbance</SelectItem>
                  <SelectItem value="moodChange">Mood Change</SelectItem>
                  <SelectItem value="jointPain">Joint Pain</SelectItem>
                  <SelectItem value="brainFog">Brain Fog</SelectItem>
                  <SelectItem value="fatigue">Fatigue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Intensity (1-10)</Label>
              <Select
                value={symptom.intensity}
                onValueChange={(value) => setSymptom({ ...symptom, intensity: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} - {num <= 3 ? "Mild" : num <= 7 ? "Moderate" : "Severe"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={symptom.time}
                  onChange={(e) => setSymptom({ ...symptom, time: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (mins)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  placeholder="5"
                  value={symptom.duration}
                  onChange={(e) => setSymptom({ ...symptom, duration: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any triggers or additional details?"
                value={symptom.notes}
                onChange={(e) => setSymptom({ ...symptom, notes: e.target.value })}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-herhealth-pink-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Log Symptom"}
            </Button>
          </form>
          
          <div className="border-t pt-4">
            <h3 className="text-md font-semibold mb-2">Symptom History</h3>
            <SymptomChart />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Treatment options component
const TreatmentOptions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Treatment & Management</CardTitle>
        <CardDescription>Evidence-based approaches for menopause symptom management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold text-blue-800 flex items-center">
              <Pill className="mr-2 h-4 w-4" />
              Hormone Replacement Therapy (HRT)
            </h3>
            <p className="text-sm mt-1 text-blue-700">
              HRT is an effective treatment for many menopause symptoms by replacing hormones that decline during menopause.
            </p>
            <Button variant="outline" className="mt-3">Learn About HRT Options</Button>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Management Approaches</h3>
            <div className="grid gap-3">
              <div className="border rounded-md p-3">
                <p className="font-medium">Lifestyle Modifications</p>
                <ul className="text-sm text-gray-600 mt-1 list-disc pl-5">
                  <li>Regular exercise</li>
                  <li>Stress reduction techniques</li>
                  <li>Sleep hygiene practices</li>
                  <li>Dietary adjustments</li>
                </ul>
              </div>
              
              <div className="border rounded-md p-3">
                <p className="font-medium">Non-Hormonal Medications</p>
                <ul className="text-sm text-gray-600 mt-1 list-disc pl-5">
                  <li>SSRIs/SNRIs for hot flashes</li>
                  <li>Gabapentin/Pregabalin</li>
                  <li>Clonidine</li>
                  <li>Oxybutynin</li>
                </ul>
              </div>
              
              <div className="border rounded-md p-3">
                <p className="font-medium">Complementary Approaches</p>
                <ul className="text-sm text-gray-600 mt-1 list-disc pl-5">
                  <li>Cognitive behavioral therapy</li>
                  <li>Mindfulness meditation</li>
                  <li>Acupuncture</li>
                  <li>Herbal supplements (evidence varies)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-herhealth-green-dark">Find Menopause Specialists</Button>
      </CardFooter>
    </Card>
  );
};

// Health screenings component
const HealthScreenings = () => {
  const screenings = [
    { 
      name: "Bone Density (DEXA) Scan",
      frequency: "Baseline at menopause, then as recommended", 
      description: "Measures bone density to assess osteoporosis risk.",
      due: "Recommended" 
    },
    { 
      name: "Mammogram",
      frequency: "Every 1-2 years", 
      description: "X-ray of the breast to screen for breast cancer.",
      due: "Due in 3 months" 
    },
    { 
      name: "Lipid Panel",
      frequency: "Every 5 years", 
      description: "Blood test that checks cholesterol and triglyceride levels.",
      due: "Up to date" 
    },
    { 
      name: "Blood Pressure Check",
      frequency: "At least annually", 
      description: "Measures the force of blood against artery walls.",
      due: "Overdue" 
    },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Health Screenings</CardTitle>
        <CardDescription>Important health screenings for midlife and beyond</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {screenings.map((screening, index) => (
            <div key={index} className="border rounded-md p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{screening.name}</h3>
                  <p className="text-xs text-gray-500">{screening.frequency}</p>
                  <p className="text-sm mt-1">{screening.description}</p>
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded ${
                  screening.due === "Up to date" 
                    ? "bg-green-100 text-green-800" 
                    : screening.due === "Overdue"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {screening.due}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-herhealth-pink-dark">Schedule a Screening</Button>
      </CardFooter>
    </Card>
  );
};

const MenopausePage = () => {
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
              <ThermometerSnowflake className="mr-2" />
              Menopause Center
            </h1>
            <p className="text-gray-600">Track, understand, and manage your menopause journey</p>
          </div>
          
          <Tabs defaultValue="tracker" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tracker">Symptom Tracker</TabsTrigger>
              <TabsTrigger value="treatments">Treatment Options</TabsTrigger>
              <TabsTrigger value="screenings">Health Screenings</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="tracker">
                <SymptomTracker />
              </TabsContent>
              <TabsContent value="treatments">
                <TreatmentOptions />
              </TabsContent>
              <TabsContent value="screenings">
                <HealthScreenings />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default MenopausePage;
