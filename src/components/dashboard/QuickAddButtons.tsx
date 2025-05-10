import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Activity, Heart, Stethoscope, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export const QuickAddButtons = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({
    cycle: false,
    symptom: false,
    activity: false,
    appointment: false,
  });
  
  const closeDialog = (dialogKey: string) => {
    setOpen(prev => ({ ...prev, [dialogKey]: false }));
  };
  
  return (
    <Card className="w-full border-gray-100">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium">Quick Add</h3>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="grid grid-cols-2 gap-3">
          <Dialog open={open.cycle} onOpenChange={(isOpen) => setOpen(prev => ({ ...prev, cycle: isOpen }))}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex flex-col h-20 gap-1 hover:bg-herhealth-pink-light/50 border-herhealth-pink-light">
                <Calendar className="h-5 w-5 text-herhealth-pink-dark" />
                <span className="text-xs">Cycle</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Cycle</DialogTitle>
                <DialogDescription>Track your period and flow intensity.</DialogDescription>
              </DialogHeader>
              
              <AddCycleForm onClose={() => closeDialog("cycle")} />
            </DialogContent>
          </Dialog>
          
          <Dialog open={open.symptom} onOpenChange={(isOpen) => setOpen(prev => ({ ...prev, symptom: isOpen }))}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex flex-col h-20 gap-1 hover:bg-herhealth-purple-light/50 border-herhealth-purple-light">
                <Heart className="h-5 w-5 text-herhealth-purple-dark" />
                <span className="text-xs">Symptom</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Symptom</DialogTitle>
                <DialogDescription>Track your symptoms and their intensity.</DialogDescription>
              </DialogHeader>
              
              <AddSymptomForm onClose={() => closeDialog("symptom")} />
            </DialogContent>
          </Dialog>
          
          <Dialog open={open.activity} onOpenChange={(isOpen) => setOpen(prev => ({ ...prev, activity: isOpen }))}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex flex-col h-20 gap-1 hover:bg-herhealth-green-light/50 border-herhealth-green-light">
                <Activity className="h-5 w-5 text-herhealth-green-dark" />
                <span className="text-xs">Activity</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Log Activity</DialogTitle>
                <DialogDescription>Track your workouts, sleep, or nutrition.</DialogDescription>
              </DialogHeader>
              
              {/* Activity form would go here */}
              <DialogFooter>
                <Button variant="outline" onClick={() => closeDialog("activity")}>Cancel</Button>
                <Button onClick={() => {
                  toast({ title: "Activity logged!", description: "Your activity has been recorded." });
                  closeDialog("activity");
                }}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={open.appointment} onOpenChange={(isOpen) => setOpen(prev => ({ ...prev, appointment: isOpen }))}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex flex-col h-20 gap-1 hover:bg-herhealth-blue-light/50 border-herhealth-blue-light">
                <Stethoscope className="h-5 w-5 text-herhealth-blue-dark" />
                <span className="text-xs">Appointment</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Appointment</DialogTitle>
                <DialogDescription>Book a consultation or screening.</DialogDescription>
              </DialogHeader>
              
              {/* Appointment form would go here */}
              <DialogFooter>
                <Button variant="outline" onClick={() => closeDialog("appointment")}>Cancel</Button>
                <Button onClick={() => {
                  toast({ title: "Appointment scheduled!", description: "Your appointment has been booked." });
                  closeDialog("appointment");
                }}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

interface AddCycleFormProps {
  onClose: () => void;
}

const AddCycleForm = ({ onClose }: AddCycleFormProps) => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [flowIntensity, setFlowIntensity] = useState("medium");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = () => {
    // In a real app, we would call the API to save the cycle data
    toast({ 
      title: "Period Logged!",
      description: "Your period has been recorded.",
    });
    onClose();
  };
  
  return (
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
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white" onClick={handleSubmit}>
          Save
        </Button>
      </DialogFooter>
    </div>
  );
};

interface AddSymptomFormProps {
  onClose: () => void;
}

const AddSymptomForm = ({ onClose }: AddSymptomFormProps) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [symptomType, setSymptomType] = useState("cramps");
  const [intensity, setIntensity] = useState("5");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = () => {
    // In a real app, we would call the API to save the symptom data
    toast({ 
      title: "Symptom Logged!",
      description: "Your symptom has been recorded.",
    });
    onClose();
  };
  
  return (
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
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button className="bg-herhealth-purple-dark hover:bg-herhealth-purple text-white" onClick={handleSubmit}>
          Save
        </Button>
      </DialogFooter>
    </div>
  );
};
