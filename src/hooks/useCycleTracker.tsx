
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface CycleEntry {
  id: string;
  userId: string;
  startDate: string;
  flowIntensity: "spotting" | "light" | "medium" | "heavy";
  notes?: string;
  createdAt: string;
}

interface SymptomEntry {
  id: string;
  userId: string;
  date: string;
  type: string;
  intensity: number;
  notes?: string;
  createdAt: string;
}

export const useCycleTracker = () => {
  const { user } = useAuth();
  const [cycles, setCycles] = useState<CycleEntry[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [isLoadingCycles, setIsLoadingCycles] = useState(true);
  const [isLoadingSymptoms, setIsLoadingSymptoms] = useState(true);
  
  useEffect(() => {
    if (!user) return;
    
    // In a real app, this would fetch from a database
    // For now, we'll use mock data
    const fetchCycleData = async () => {
      setIsLoadingCycles(true);
      try {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockCycles: CycleEntry[] = [
          {
            id: "1",
            userId: user.id,
            startDate: "2025-04-17",
            flowIntensity: "medium",
            notes: "Normal cycle",
            createdAt: "2025-04-17T08:30:00Z"
          },
          {
            id: "2",
            userId: user.id,
            startDate: "2025-03-20",
            flowIntensity: "heavy",
            notes: "Heavier than usual",
            createdAt: "2025-03-20T09:15:00Z"
          },
          {
            id: "3",
            userId: user.id,
            startDate: "2025-02-19",
            flowIntensity: "medium",
            createdAt: "2025-02-19T10:00:00Z"
          }
        ];
        
        setCycles(mockCycles);
      } catch (error) {
        toast({
          title: "Error fetching cycle data",
          description: "Please try again later.",
          variant: "destructive",
        });
        console.error("Error fetching cycle data:", error);
      } finally {
        setIsLoadingCycles(false);
      }
    };
    
    const fetchSymptomData = async () => {
      setIsLoadingSymptoms(true);
      try {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Mock data
        const mockSymptoms: SymptomEntry[] = [
          {
            id: "1",
            userId: user.id,
            date: "2025-04-16",
            type: "cramps",
            intensity: 7,
            notes: "Moderate pain, used heating pad",
            createdAt: "2025-04-16T14:20:00Z"
          },
          {
            id: "2",
            userId: user.id,
            date: "2025-04-17",
            type: "headache",
            intensity: 5,
            createdAt: "2025-04-17T09:45:00Z"
          },
          {
            id: "3",
            userId: user.id,
            date: "2025-04-18",
            type: "fatigue",
            intensity: 6,
            notes: "Very tired all day",
            createdAt: "2025-04-18T20:10:00Z"
          },
          {
            id: "4",
            userId: user.id,
            date: "2025-03-18",
            type: "cramps",
            intensity: 8,
            createdAt: "2025-03-18T11:30:00Z"
          }
        ];
        
        setSymptoms(mockSymptoms);
      } catch (error) {
        toast({
          title: "Error fetching symptom data",
          description: "Please try again later.",
          variant: "destructive",
        });
        console.error("Error fetching symptom data:", error);
      } finally {
        setIsLoadingSymptoms(false);
      }
    };
    
    fetchCycleData();
    fetchSymptomData();
  }, [user]);
  
  const addCycleEntry = async (entry: Omit<CycleEntry, "id" | "userId" | "createdAt">) => {
    if (!user) return;
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newEntry: CycleEntry = {
        id: `cycle-${Date.now()}`,
        userId: user.id,
        ...entry,
        createdAt: new Date().toISOString()
      };
      
      setCycles(prevCycles => [newEntry, ...prevCycles]);
      
      toast({
        title: "Period Logged!",
        description: "Your period has been recorded.",
      });
      
      return newEntry;
    } catch (error) {
      toast({
        title: "Error saving cycle data",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Error saving cycle data:", error);
    }
  };
  
  const addSymptomEntry = async (entry: Omit<SymptomEntry, "id" | "userId" | "createdAt">) => {
    if (!user) return;
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newEntry: SymptomEntry = {
        id: `symptom-${Date.now()}`,
        userId: user.id,
        ...entry,
        createdAt: new Date().toISOString()
      };
      
      setSymptoms(prevSymptoms => [newEntry, ...prevSymptoms]);
      
      toast({
        title: "Symptom Logged!",
        description: "Your symptom has been recorded.",
      });
      
      return newEntry;
    } catch (error) {
      toast({
        title: "Error saving symptom data",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Error saving symptom data:", error);
    }
  };
  
  return {
    cycles,
    symptoms,
    isLoadingCycles,
    isLoadingSymptoms,
    isLoading: isLoadingCycles || isLoadingSymptoms,
    addCycleEntry,
    addSymptomEntry
  };
};
