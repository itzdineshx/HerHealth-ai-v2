
import { useState, useEffect } from "react";
import { CycleLog, SymptomLog } from "@/types";
import { useAuth } from "@/context/AuthContext";

export const useCycleTracker = () => {
  const { user } = useAuth();
  const [cycleHistory, setCycleHistory] = useState<CycleLog[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    
    const loadCycleData = () => {
      // This would be an API call in a real application
      // For now, we'll load mock data from localStorage or create it if it doesn't exist
      const storedCycles = localStorage.getItem(`herhealth_cycles_${user.id}`);
      const storedSymptoms = localStorage.getItem(`herhealth_symptoms_${user.id}`);
      
      if (storedCycles) {
        setCycleHistory(JSON.parse(storedCycles));
      } else {
        // Generate some mock data
        const mockCycles: CycleLog[] = generateMockCycles(user.id);
        localStorage.setItem(`herhealth_cycles_${user.id}`, JSON.stringify(mockCycles));
        setCycleHistory(mockCycles);
      }
      
      if (storedSymptoms) {
        setSymptoms(JSON.parse(storedSymptoms));
      } else {
        // Generate some mock data
        const mockSymptoms: SymptomLog[] = generateMockSymptoms(user.id);
        localStorage.setItem(`herhealth_symptoms_${user.id}`, JSON.stringify(mockSymptoms));
        setSymptoms(mockSymptoms);
      }
      
      setIsLoading(false);
    };
    
    loadCycleData();
  }, [user]);
  
  const addCycle = (cycle: Omit<CycleLog, "id" | "userId">) => {
    if (!user) return;
    
    const newCycle: CycleLog = {
      id: `cycle-${Date.now()}`,
      userId: user.id,
      ...cycle,
    };
    
    const updatedCycles = [...cycleHistory, newCycle];
    setCycleHistory(updatedCycles);
    localStorage.setItem(`herhealth_cycles_${user.id}`, JSON.stringify(updatedCycles));
    return newCycle;
  };
  
  const addSymptom = (symptom: Omit<SymptomLog, "id" | "userId">) => {
    if (!user) return;
    
    const newSymptom: SymptomLog = {
      id: `symptom-${Date.now()}`,
      userId: user.id,
      ...symptom,
    };
    
    const updatedSymptoms = [...symptoms, newSymptom];
    setSymptoms(updatedSymptoms);
    localStorage.setItem(`herhealth_symptoms_${user.id}`, JSON.stringify(updatedSymptoms));
    return newSymptom;
  };
  
  return {
    cycleHistory,
    symptoms,
    isLoading,
    addCycle,
    addSymptom,
  };
};

// Helper functions to generate mock data
function generateMockCycles(userId: string): CycleLog[] {
  const today = new Date();
  const cycles: CycleLog[] = [];
  
  // Generate 6 recent cycles, approximately 28 days apart
  for (let i = 0; i < 6; i++) {
    const cycleStart = new Date(today);
    cycleStart.setDate(today.getDate() - (i * 28 + 5)); // Last cycle started 5 days ago
    
    const cycleEnd = new Date(cycleStart);
    cycleEnd.setDate(cycleStart.getDate() + 5); // Each period lasts about 5 days
    
    cycles.push({
      id: `mock-cycle-${i}`,
      userId,
      startDate: cycleStart.toISOString(),
      endDate: cycleEnd.toISOString(),
      flowIntensity: i % 3 === 0 ? 'heavy' : i % 3 === 1 ? 'medium' : 'light',
      notes: i === 0 ? 'Had some cramps on day 2' : undefined,
    });
  }
  
  return cycles.reverse(); // Most recent first
}

function generateMockSymptoms(userId: string): SymptomLog[] {
  const today = new Date();
  const symptoms: SymptomLog[] = [];
  
  // Generate random symptoms over the last 30 days
  const symptomTypes = ['cramps', 'headache', 'bloating', 'fatigue', 'mood swings'];
  
  for (let i = 0; i < 15; i++) {
    const symptomDate = new Date(today);
    symptomDate.setDate(today.getDate() - Math.floor(Math.random() * 30));
    
    symptoms.push({
      id: `mock-symptom-${i}`,
      userId,
      date: symptomDate.toISOString(),
      type: symptomTypes[Math.floor(Math.random() * symptomTypes.length)],
      intensity: Math.floor(Math.random() * 10) + 1,
      notes: i % 3 === 0 ? 'This was particularly bad today' : undefined,
    });
  }
  
  return symptoms.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
