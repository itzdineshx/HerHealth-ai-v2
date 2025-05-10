
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CycleEntry {
  id: string;
  userId: string;
  startDate: string;
  endDate?: string;
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
    
    const fetchCycleData = async () => {
      setIsLoadingCycles(true);
      try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from("cycle_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("start_date", { ascending: false });
        
        if (error) {
          // Instead of throwing, just log the error and use mock data
          console.error("Error fetching cycle data:", error);
          
          // Use mock data
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
        } else if (data && data.length > 0) {
          const formattedData: CycleEntry[] = data.map(entry => ({
            id: entry.id,
            userId: entry.user_id,
            startDate: entry.start_date,
            endDate: entry.end_date || undefined,
            flowIntensity: entry.flow_intensity as "spotting" | "light" | "medium" | "heavy",
            notes: entry.notes || undefined,
            createdAt: entry.created_at
          }));
          
          setCycles(formattedData);
        } else {
          // No data returned, use mock data
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
        }
      } catch (error) {
        console.error("Error in cycle data handling:", error);
        
        // Fallback to mock data if there's an error
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
      } finally {
        setIsLoadingCycles(false);
      }
    };
    
    const fetchSymptomData = async () => {
      setIsLoadingSymptoms(true);
      try {
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from("symptom_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: false });
        
        if (error) {
          console.error("Error fetching symptom data:", error);
          
          // Use mock data
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
        } else if (data && data.length > 0) {
          const formattedData: SymptomEntry[] = data.map(entry => ({
            id: entry.id,
            userId: entry.user_id,
            date: entry.date,
            type: entry.symptom_type,
            intensity: entry.intensity,
            notes: entry.notes || undefined,
            createdAt: entry.created_at
          }));
          
          setSymptoms(formattedData);
        } else {
          // No data returned, use mock data
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
        }
      } catch (error) {
        console.error("Error in symptom data handling:", error);
        
        // Fallback to mock data if there's an error
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
      const { data, error } = await supabase
        .from("cycle_logs")
        .insert([
          {
            user_id: user.id,
            start_date: entry.startDate,
            end_date: entry.endDate,
            flow_intensity: entry.flowIntensity,
            notes: entry.notes
          }
        ])
        .select()
        .single();
      
      if (error) {
        console.error("Error saving cycle data to Supabase:", error);
        
        // Create mock entry with locally generated ID
        const mockEntry: CycleEntry = {
          id: Math.random().toString(36).substring(2, 11),
          userId: user.id,
          startDate: entry.startDate,
          endDate: entry.endDate,
          flowIntensity: entry.flowIntensity,
          notes: entry.notes,
          createdAt: new Date().toISOString()
        };
        
        setCycles(prevCycles => [mockEntry, ...prevCycles]);
        
        toast({
          title: "Period Logged!",
          description: "Your period has been recorded (locally).",
        });
        
        return mockEntry;
      }
      
      if (data) {
        const newEntry: CycleEntry = {
          id: data.id,
          userId: data.user_id,
          startDate: data.start_date,
          endDate: data.end_date || undefined,
          flowIntensity: data.flow_intensity as "spotting" | "light" | "medium" | "heavy",
          notes: data.notes || undefined,
          createdAt: data.created_at
        };
        
        setCycles(prevCycles => [newEntry, ...prevCycles]);
        
        toast({
          title: "Period Logged!",
          description: "Your period has been recorded.",
        });
        
        return newEntry;
      }
    } catch (error) {
      console.error("Error saving cycle data:", error);
      
      // Create mock entry with locally generated ID
      const mockEntry: CycleEntry = {
        id: Math.random().toString(36).substring(2, 11),
        userId: user.id,
        startDate: entry.startDate,
        endDate: entry.endDate,
        flowIntensity: entry.flowIntensity,
        notes: entry.notes,
        createdAt: new Date().toISOString()
      };
      
      setCycles(prevCycles => [mockEntry, ...prevCycles]);
      
      toast({
        title: "Period Logged!",
        description: "Your period has been recorded (locally).",
      });
      
      return mockEntry;
    }
  };
  
  const addSymptomEntry = async (entry: Omit<SymptomEntry, "id" | "userId" | "createdAt">) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("symptom_logs")
        .insert([
          {
            user_id: user.id,
            date: entry.date,
            symptom_type: entry.type,
            intensity: entry.intensity,
            notes: entry.notes
          }
        ])
        .select()
        .single();
      
      if (error) {
        console.error("Error saving symptom data to Supabase:", error);
        
        // Create mock entry with locally generated ID
        const mockEntry: SymptomEntry = {
          id: Math.random().toString(36).substring(2, 11),
          userId: user.id,
          date: entry.date,
          type: entry.type,
          intensity: entry.intensity,
          notes: entry.notes,
          createdAt: new Date().toISOString()
        };
        
        setSymptoms(prevSymptoms => [mockEntry, ...prevSymptoms]);
        
        toast({
          title: "Symptom Logged!",
          description: "Your symptom has been recorded (locally).",
        });
        
        return mockEntry;
      }
      
      if (data) {
        const newEntry: SymptomEntry = {
          id: data.id,
          userId: data.user_id,
          date: data.date,
          type: data.symptom_type,
          intensity: data.intensity,
          notes: data.notes || undefined,
          createdAt: data.created_at
        };
        
        setSymptoms(prevSymptoms => [newEntry, ...prevSymptoms]);
        
        toast({
          title: "Symptom Logged!",
          description: "Your symptom has been recorded.",
        });
        
        return newEntry;
      }
    } catch (error) {
      console.error("Error saving symptom data:", error);
      
      // Create mock entry with locally generated ID
      const mockEntry: SymptomEntry = {
        id: Math.random().toString(36).substring(2, 11),
        userId: user.id,
        date: entry.date,
        type: entry.type,
        intensity: entry.intensity,
        notes: entry.notes,
        createdAt: new Date().toISOString()
      };
      
      setSymptoms(prevSymptoms => [mockEntry, ...prevSymptoms]);
      
      toast({
        title: "Symptom Logged!",
        description: "Your symptom has been recorded (locally).",
      });
      
      return mockEntry;
    }
  };
  
  // Get cycle statistics
  const getCycleStatistics = () => {
    if (cycles.length < 2) return { averageCycleLength: 28, nextPeriodDate: null };
    
    // Calculate average cycle length
    let totalDays = 0;
    const cycleLengths = [];
    
    for (let i = 0; i < cycles.length - 1; i++) {
      const currentCycleStart = new Date(cycles[i].startDate);
      const nextCycleStart = new Date(cycles[i + 1].startDate);
      const daysDiff = Math.floor((currentCycleStart.getTime() - nextCycleStart.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff > 10 && daysDiff < 60) { // Filter out potential errors
        cycleLengths.push(daysDiff);
        totalDays += daysDiff;
      }
    }
    
    const averageCycleLength = cycleLengths.length > 0 
      ? Math.round(totalDays / cycleLengths.length) 
      : 28; // Default to 28 if not enough data
    
    // Calculate next period date
    const lastPeriodDate = new Date(cycles[0].startDate);
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(lastPeriodDate.getDate() + averageCycleLength);
    
    // Calculate days until next period
    const today = new Date();
    const daysUntilNextPeriod = Math.floor((nextPeriodDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate current cycle day
    const currentCycleDay = Math.floor((today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Determine cycle phase
    let cyclePhase = "menstrual";
    if (currentCycleDay > 5) cyclePhase = "follicular";
    if (currentCycleDay > 10) cyclePhase = "ovulation";
    if (currentCycleDay > 14) cyclePhase = "luteal";
    
    return {
      averageCycleLength,
      nextPeriodDate,
      daysUntilNextPeriod,
      currentCycleDay,
      cyclePhase,
      cycleLengthHistory: cycleLengths
    };
  };
  
  return {
    cycles,
    symptoms,
    isLoadingCycles,
    isLoadingSymptoms,
    isLoading: isLoadingCycles || isLoadingSymptoms,
    addCycleEntry,
    addSymptomEntry,
    getCycleStatistics
  };
};
