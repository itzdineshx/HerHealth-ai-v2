
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Activity, Heart, Stethoscope, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { createCycleLog, createSymptomLog } from "@/services/apiService";

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
              
              <AddActivityForm onClose={() => closeDialog("activity")} />
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
              
              <AddAppointmentForm onClose={() => closeDialog("appointment")} />
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
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [flowIntensity, setFlowIntensity] = useState<"spotting" | "light" | "medium" | "heavy">("medium");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (!user) {
      toast({ 
        title: "Please login first",
        description: "You need to be logged in to log period data.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      const result = await createCycleLog({
        userId: user.id,
        startDate,
        flowIntensity,
        notes: notes || undefined
      });
      
      if (result) {
        toast({ 
          title: "Period Logged!",
          description: "Your period has been recorded successfully.",
        });
        onClose();
      } else {
        throw new Error("Failed to log period");
      }
    } catch (error) {
      console.error("Error logging cycle:", error);
      toast({ 
        title: "Error",
        description: "Failed to log period. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <Select value={flowIntensity} onValueChange={(value) => setFlowIntensity(value as "spotting" | "light" | "medium" | "heavy")}>
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
        <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
        <Button 
          className="bg-herhealth-pink-dark hover:bg-herhealth-pink text-white" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </div>
  );
};

interface AddSymptomFormProps {
  onClose: () => void;
}

const AddSymptomForm = ({ onClose }: AddSymptomFormProps) => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [symptomType, setSymptomType] = useState("cramps");
  const [intensity, setIntensity] = useState("5");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (!user) {
      toast({ 
        title: "Please login first",
        description: "You need to be logged in to log symptoms.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      const result = await createSymptomLog({
        userId: user.id,
        date,
        type: symptomType,
        intensity: parseInt(intensity),
        notes: notes || undefined
      });
      
      if (result) {
        toast({ 
          title: "Symptom Logged!",
          description: "Your symptom has been recorded successfully.",
        });
        onClose();
      } else {
        throw new Error("Failed to log symptom");
      }
    } catch (error) {
      console.error("Error logging symptom:", error);
      toast({ 
        title: "Error",
        description: "Failed to log symptom. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
        <Button 
          className="bg-herhealth-purple-dark hover:bg-herhealth-purple text-white" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </div>
  );
};

interface AddActivityFormProps {
  onClose: () => void;
}

const AddActivityForm = ({ onClose }: AddActivityFormProps) => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [activityType, setActivityType] = useState<"workout" | "sleep" | "nutrition">("workout");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [steps, setSteps] = useState("");
  const [mealDetails, setMealDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = () => {
    if (!user) {
      toast({ 
        title: "Please login first",
        description: "You need to be logged in to log activities.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would call an API to save the activity data
    toast({ 
      title: "Activity Logged!",
      description: `Your ${activityType} has been recorded.`,
    });
    onClose();
  };
  
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="activity-date">Date</Label>
        <Input
          id="activity-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="activity-type">Activity Type</Label>
        <Select value={activityType} onValueChange={(value) => setActivityType(value as "workout" | "sleep" | "nutrition")}>
          <SelectTrigger id="activity-type">
            <SelectValue placeholder="Select activity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="workout">Workout</SelectItem>
            <SelectItem value="sleep">Sleep</SelectItem>
            <SelectItem value="nutrition">Nutrition</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {activityType === "workout" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="Enter duration in minutes"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="calories">Calories burned</Label>
            <Input
              id="calories"
              type="number"
              placeholder="Enter calories burned"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="steps">Steps</Label>
            <Input
              id="steps"
              type="number"
              placeholder="Enter number of steps"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            />
          </div>
        </>
      )}
      
      {activityType === "sleep" && (
        <div className="space-y-2">
          <Label htmlFor="duration">Sleep Duration (hours)</Label>
          <Input
            id="duration"
            type="number"
            step="0.1"
            placeholder="Enter sleep duration in hours"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      )}
      
      {activityType === "nutrition" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="calories">Calories consumed</Label>
            <Input
              id="calories"
              type="number"
              placeholder="Enter calories consumed"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meal-details">Meal Details</Label>
            <Input
              id="meal-details"
              placeholder="Enter meal details"
              value={mealDetails}
              onChange={(e) => setMealDetails(e.target.value)}
            />
          </div>
        </>
      )}
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button 
          className="bg-herhealth-green-dark hover:bg-herhealth-green text-white" 
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogFooter>
    </div>
  );
};

interface AddAppointmentFormProps {
  onClose: () => void;
}

const AddAppointmentForm = ({ onClose }: AddAppointmentFormProps) => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState("09:00");
  const [appointmentType, setAppointmentType] = useState("teleconsult");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = () => {
    if (!user) {
      toast({ 
        title: "Please login first",
        description: "You need to be logged in to schedule appointments.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would call an API to save the appointment data
    toast({ 
      title: "Appointment Scheduled!",
      description: `Your ${appointmentType} appointment has been scheduled for ${date} at ${time}.`,
    });
    onClose();
  };
  
  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="appointment-date">Date</Label>
        <Input
          id="appointment-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="appointment-time">Time</Label>
        <Input
          id="appointment-time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="appointment-type">Appointment Type</Label>
        <Select value={appointmentType} onValueChange={setAppointmentType}>
          <SelectTrigger id="appointment-type">
            <SelectValue placeholder="Select appointment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="teleconsult">Teleconsultation</SelectItem>
            <SelectItem value="lab">Lab Work</SelectItem>
            <SelectItem value="in-person">In-Person Visit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="appointment-notes">Notes (Optional)</Label>
        <Input
          id="appointment-notes"
          placeholder="Add any details about your appointment..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button 
          className="bg-herhealth-blue-dark hover:bg-herhealth-blue text-white" 
          onClick={handleSubmit}
        >
          Schedule
        </Button>
      </DialogFooter>
    </div>
  );
};
