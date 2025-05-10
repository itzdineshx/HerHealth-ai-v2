
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Droplet, TrendingUp, Clock, Plus, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCycleTracker } from "@/hooks/useCycleTracker";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const CycleTrackerPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { cycleHistory, symptoms, isLoading: cycleLoading, addCycle, addSymptom } = useCycleTracker();
  
  const [openAddCycle, setOpenAddCycle] = useState(false);
  const [openAddSymptom, setOpenAddSymptom] = useState(false);
  
  if (authLoading || cycleLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const handleAddCycle = (data: any) => {
    addCycle({
      startDate: data.startDate,
      flowIntensity: data.flowIntensity,
      notes: data.notes,
    });
    
    setOpenAddCycle(false);
    toast({
      title: "Cycle Added!",
      description: "Your period has been logged successfully.",
    });
  };
  
  const handleAddSymptom = (data: any) => {
    addSymptom({
      date: data.date,
      type: data.symptomType,
      intensity: parseInt(data.intensity, 10),
      notes: data.notes,
    });
    
    setOpenAddSymptom(false);
    toast({
      title: "Symptom Added!",
      description: "Your symptom has been logged successfully.",
    });
  };
  
  return (
    <AppLayout>
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Cycle & Symptom Tracker</h1>
              <p className="text-gray-600">Track your period, symptoms, and gain insights into your patterns</p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => setOpenAddCycle(true)}
                className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Log Period
              </Button>
              <Button 
                onClick={() => setOpenAddSymptom(true)}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" /> Log Symptom
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="bg-herhealth-pink-light/40 pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Cycle Calendar</CardTitle>
                      <CardDescription>View your period, fertile window, and symptoms</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Clock className="h-4 w-4 mr-1" /> History
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Calendar placeholder - In a real implementation, this would be a proper calendar component */}
                  <div className="bg-white border rounded-lg shadow-sm">
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-center">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          &lt;
                        </Button>
                        <h3 className="font-medium">May 2025</h3>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          &gt;
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-0">
                      {/* Days of week */}
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="p-2 text-center text-xs font-medium text-gray-500">
                          {day}
                        </div>
                      ))}
                      
                      {/* Empty days from previous month */}
                      {[...Array(3)].map((_, i) => (
                        <div key={`empty-${i}`} className="p-2 text-center text-xs text-gray-300">
                          {30 - 2 + i}
                        </div>
                      ))}
                      
                      {/* Days of current month */}
                      {[...Array(31)].map((_, i) => {
                        const dayNum = i + 1;
                        let bgColor = '';
                        let textColor = '';
                        
                        // Simulate period days
                        if (dayNum >= 5 && dayNum <= 10) {
                          bgColor = 'bg-herhealth-pink-light';
                          textColor = 'text-herhealth-pink-dark font-medium';
                        }
                        
                        // Simulate fertile window
                        if (dayNum >= 15 && dayNum <= 20) {
                          bgColor = 'bg-herhealth-green-light';
                          textColor = 'text-herhealth-green-dark font-medium';
                        }
                        
                        // Simulate today
                        if (dayNum === 10) {
                          bgColor = 'bg-herhealth-pink';
                          textColor = 'text-white font-bold';
                        }
                        
                        return (
                          <div 
                            key={dayNum}
                            className={`p-2 text-center border-t ${bgColor}`}
                          >
                            <div className={`text-sm ${textColor}`}>{dayNum}</div>
                            {/* Symptom indicators */}
                            {dayNum === 6 && (
                              <div className="flex justify-center mt-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-herhealth-purple-dark"></div>
                              </div>
                            )}
                            {dayNum === 18 && (
                              <div className="flex justify-center mt-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-herhealth-blue-dark"></div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Calendar Legend */}
                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-herhealth-pink-light mr-2"></div>
                      <span>Period</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-herhealth-green-light mr-2"></div>
                      <span>Fertile Window</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-herhealth-purple-dark mr-2"></div>
                      <span>Symptom</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-herhealth-blue-dark mr-2"></div>
                      <span>Activity</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader className="bg-herhealth-blue-light/40 pb-2">
                  <CardTitle>Cycle Insights</CardTitle>
                  <CardDescription>Based on your historical data</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-herhealth-blue-dark mr-3" />
                        <span className="font-medium">Average Cycle Length</span>
                      </div>
                      <span className="text-lg font-bold">28 days</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Droplet className="h-5 w-5 text-herhealth-pink-dark mr-3" />
                        <span className="font-medium">Average Period Length</span>
                      </div>
                      <span className="text-lg font-bold">5 days</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-herhealth-purple-dark mr-3" />
                        <span className="font-medium">Most Common Symptom</span>
                      </div>
                      <span className="text-lg font-bold">Cramps</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View Full Analysis
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-herhealth-purple-light/40 pb-2">
                  <CardTitle>Recent Symptoms</CardTitle>
                  <CardDescription>Your recently logged symptoms</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {symptoms.slice(0, 3).map((symptom) => (
                      <div key={symptom.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-herhealth-purple-light flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-herhealth-purple-dark">
                            {symptom.intensity}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{symptom.type}</h4>
                          <p className="text-xs text-gray-500">
                            {new Date(symptom.date).toLocaleDateString()}
                          </p>
                          {symptom.notes && (
                            <p className="text-xs mt-1">{symptom.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="ghost" 
                      className="w-full text-herhealth-purple-dark hover:bg-herhealth-purple-light/30"
                      onClick={() => setOpenAddSymptom(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Log New Symptom
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Cycle Dialog */}
      <AddCycleDialog open={openAddCycle} onOpenChange={setOpenAddCycle} onSubmit={handleAddCycle} />
      
      {/* Add Symptom Dialog */}
      <AddSymptomDialog open={openAddSymptom} onOpenChange={setOpenAddSymptom} onSubmit={handleAddSymptom} />
    </AppLayout>
  );
};

interface AddCycleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const AddCycleDialog = ({ open, onOpenChange, onSubmit }: AddCycleDialogProps) => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [flowIntensity, setFlowIntensity] = useState("medium");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = () => {
    onSubmit({
      startDate,
      flowIntensity,
      notes,
    });
    
    // Reset form
    setStartDate(new Date().toISOString().split('T')[0]);
    setFlowIntensity("medium");
    setNotes("");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Period</DialogTitle>
          <DialogDescription>Track your period and flow intensity.</DialogDescription>
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
          
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button 
              className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface AddSymptomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

const AddSymptomDialog = ({ open, onOpenChange, onSubmit }: AddSymptomDialogProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [symptomType, setSymptomType] = useState("cramps");
  const [intensity, setIntensity] = useState("5");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = () => {
    onSubmit({
      date,
      symptomType,
      intensity,
      notes,
    });
    
    // Reset form
    setDate(new Date().toISOString().split('T')[0]);
    setSymptomType("cramps");
    setIntensity("5");
    setNotes("");
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
                {[...Array(10)].map((_, i) => (
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
          
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button 
              className="bg-herhealth-purple-dark hover:bg-herhealth-purple text-white"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CycleTrackerPage;
