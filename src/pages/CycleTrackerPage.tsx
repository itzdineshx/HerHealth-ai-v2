
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useCycleTracker } from "@/hooks/useCycleTracker";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const CycleTrackerPage = () => {
  const { user, isLoading } = useAuth();
  const { cycles, symptoms, isLoadingCycles } = useCycleTracker();
  const [cycleDialogOpen, setCycleDialogOpen] = useState(false);
  const [symptomDialogOpen, setSymptomDialogOpen] = useState(false);
  
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
            <h1 className="text-3xl font-bold">Cycle Tracker</h1>
            <p className="text-gray-600">Track, analyze, and understand your menstrual cycle</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CycleCalendar />
            </div>
            
            <div className="space-y-6">
              <QuickActions 
                onAddCycle={() => setCycleDialogOpen(true)}
                onAddSymptom={() => setSymptomDialogOpen(true)}
              />
              <CycleSummary />
            </div>
          </div>
          
          <div className="mt-8">
            <Tabs defaultValue="symptoms">
              <TabsList className="mb-4">
                <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                <TabsTrigger value="patterns">Patterns</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="symptoms" className="p-4 bg-white rounded-lg border">
                <SymptomsTrends />
              </TabsContent>
              
              <TabsContent value="patterns" className="p-4 bg-white rounded-lg border">
                <CyclePatterns />
              </TabsContent>
              
              <TabsContent value="insights" className="p-4 bg-white rounded-lg border">
                <AiInsights />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <AddCycleDialog open={cycleDialogOpen} onOpenChange={setCycleDialogOpen} />
      <AddSymptomDialog open={symptomDialogOpen} onOpenChange={setSymptomDialogOpen} />
    </AppLayout>
  );
};

const CycleCalendar = () => {
  // This would be replaced with a real calendar component
  return (
    <Card className="w-full">
      <CardHeader className="bg-herhealth-pink-light/30 pb-2">
        <CardTitle>May 2025</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-center p-10 border rounded-md">
          <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Full calendar implementation coming soon</p>
          <p className="text-sm text-gray-400 mt-2">This is a placeholder for the interactive cycle calendar</p>
        </div>
      </CardContent>
    </Card>
  );
};

const QuickActions = ({ onAddCycle, onAddSymptom }: { onAddCycle: () => void, onAddSymptom: () => void }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          className="w-full bg-herhealth-pink-dark hover:bg-herhealth-pink text-white justify-start"
          onClick={onAddCycle}
        >
          <Plus className="h-4 w-4 mr-2" />
          Start Period
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-herhealth-purple-dark text-herhealth-purple-dark hover:bg-herhealth-purple-light/30 justify-start"
          onClick={onAddSymptom}
        >
          <Plus className="h-4 w-4 mr-2" />
          Log Symptom
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-gray-200 text-gray-700 hover:bg-gray-100 justify-start"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Notes
        </Button>
      </CardContent>
    </Card>
  );
};

const CycleSummary = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Cycle Summary</CardTitle>
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
            History
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Current Cycle Day</p>
            <p className="text-3xl font-bold text-herhealth-pink-dark">14</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Next Period in</p>
            <p className="text-xl font-bold">14 days</p>
            <p className="text-xs text-gray-500">Estimated: May 15, 2025</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Average Cycle Length</p>
            <p className="text-xl font-bold">28 days</p>
            <p className="text-xs text-gray-500">Based on last 6 cycles</p>
          </div>
          
          <div className="p-3 bg-herhealth-blue-light/30 rounded-md">
            <p className="text-sm font-medium text-herhealth-blue-dark">Current Phase</p>
            <p className="text-lg font-bold text-herhealth-blue-dark">Ovulation</p>
            <p className="text-xs text-gray-600">Fertile window active</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SymptomsTrends = () => {
  // This would be filled with real data and charts
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Symptom Analysis</h3>
      <p className="text-gray-500">Track how your symptoms correlate with your cycle phases</p>
      
      <div className="p-4 bg-gray-50 rounded-md text-center">
        <p className="text-gray-400">Symptom visualization coming soon</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-3 bg-herhealth-purple-light/30 rounded-md text-center">
          <p className="text-sm font-medium">Most Common</p>
          <p className="text-lg font-bold text-herhealth-purple-dark">Cramps</p>
        </div>
        <div className="p-3 bg-herhealth-purple-light/30 rounded-md text-center">
          <p className="text-sm font-medium">Highest Intensity</p>
          <p className="text-lg font-bold text-herhealth-purple-dark">Headaches</p>
        </div>
        <div className="p-3 bg-herhealth-purple-light/30 rounded-md text-center">
          <p className="text-sm font-medium">Duration</p>
          <p className="text-lg font-bold text-herhealth-purple-dark">2-3 Days</p>
        </div>
        <div className="p-3 bg-herhealth-purple-light/30 rounded-md text-center">
          <p className="text-sm font-medium">Trend</p>
          <p className="text-lg font-bold text-herhealth-purple-dark">Improving</p>
        </div>
      </div>
    </div>
  );
};

const CyclePatterns = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Cycle Patterns</h3>
      <p className="text-gray-500">Analyze your historical cycle data and identify patterns</p>
      
      <div className="p-4 bg-gray-50 rounded-md text-center">
        <p className="text-gray-400">Cycle pattern visualization coming soon</p>
      </div>
    </div>
  );
};

const AiInsights = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">AI-Generated Insights</h3>
      <p className="text-gray-500">Personalized insights based on your unique patterns</p>
      
      <div className="space-y-3">
        <div className="p-4 bg-herhealth-green-light/30 rounded-md">
          <h4 className="font-medium text-herhealth-green-dark">Cycle Regularity</h4>
          <p className="text-sm mt-1">Your cycles have been consistent over the past 3 months. This regularity is a positive sign of hormonal balance.</p>
        </div>
        
        <div className="p-4 bg-herhealth-blue-light/30 rounded-md">
          <h4 className="font-medium text-herhealth-blue-dark">Symptom Correlation</h4>
          <p className="text-sm mt-1">Headaches tend to occur 2-3 days before your period. Consider trying preventative measures like staying hydrated or magnesium supplements.</p>
        </div>
        
        <div className="p-4 bg-herhealth-peach-light/30 rounded-md">
          <h4 className="font-medium text-herhealth-peach-dark">Nutrition Recommendation</h4>
          <p className="text-sm mt-1">Based on your reported fatigue during your period, consider increasing iron-rich foods like spinach and legumes during your luteal phase.</p>
        </div>
      </div>
    </div>
  );
};

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddCycleDialog = ({ open, onOpenChange }: DialogProps) => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [flowIntensity, setFlowIntensity] = useState("medium");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = () => {
    // This would call an API to save the cycle data
    toast({
      title: "Period Logged!",
      description: "Your period has been recorded.",
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Period</DialogTitle>
          <DialogDescription>Record the start of your period and flow details.</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="flow">Flow Intensity</Label>
            <Select value={flowIntensity} onValueChange={setFlowIntensity}>
              <SelectTrigger id="flow">
                <SelectValue placeholder="Select flow intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spotting">Spotting</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="heavy">Heavy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              placeholder="Add any notes about your period..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AddSymptomDialog = ({ open, onOpenChange }: DialogProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [symptomType, setSymptomType] = useState("cramps");
  const [intensity, setIntensity] = useState("5");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = () => {
    // This would call an API to save the symptom data
    toast({
      title: "Symptom Logged!",
      description: "Your symptom has been recorded.",
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Symptom</DialogTitle>
          <DialogDescription>Track your symptoms and their intensity.</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="symptom-date">Date</Label>
            <Input
              id="symptom-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symptom-type">Symptom Type</Label>
            <Select value={symptomType} onValueChange={setSymptomType}>
              <SelectTrigger id="symptom-type">
                <SelectValue placeholder="Select symptom type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cramps">Cramps</SelectItem>
                <SelectItem value="headache">Headache</SelectItem>
                <SelectItem value="bloating">Bloating</SelectItem>
                <SelectItem value="fatigue">Fatigue</SelectItem>
                <SelectItem value="mood swings">Mood Swings</SelectItem>
                <SelectItem value="breast tenderness">Breast Tenderness</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="intensity">Intensity (1-10)</Label>
            <Select value={intensity} onValueChange={setIntensity}>
              <SelectTrigger id="intensity">
                <SelectValue placeholder="Select intensity" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symptom-notes">Notes (Optional)</Label>
            <Input
              id="symptom-notes"
              placeholder="Add any details about your symptom..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-herhealth-purple-dark hover:bg-herhealth-purple text-white" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CycleTrackerPage;
