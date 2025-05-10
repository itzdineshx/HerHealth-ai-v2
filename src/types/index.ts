
// User types
export type LifeStage = 'teen' | 'adult' | 'pregnant' | 'postpartum' | 'perimenopause' | 'menopause';

export interface User {
  id: string;
  name: string;
  email: string;
  dob: string;
  location?: string;
  lifeStage: LifeStage;
  privacyPreferences: {
    dataSharing: boolean;
    marketingEmails: boolean;
    researchParticipation: boolean;
  };
  createdAt: string;
}

// Cycle tracking types
export interface CycleLog {
  id: string;
  userId: string;
  startDate: string;
  endDate?: string;
  flowIntensity: 'light' | 'medium' | 'heavy' | 'spotting';
  notes?: string;
}

export interface SymptomLog {
  id: string;
  userId: string;
  date: string;
  type: string;  // cramps, mood, sleep, etc.
  intensity: number; // 1-10
  notes?: string;
}

// Activity types
export interface ActivityLog {
  id: string;
  userId: string;
  date: string;
  type: 'workout' | 'sleep' | 'nutrition';
  metadata: {
    duration?: number;
    calories?: number;
    steps?: number;
    mealDetails?: string;
  };
}

// Healthcare types
export interface Appointment {
  id: string;
  userId: string;
  providerId: string;
  dateTime: string;
  type: 'teleconsult' | 'lab' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  language: string[];
  telehealthLink?: string;
}

// Content types
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'mental' | 'fitness' | 'nutrition' | 'pregnancy' | 'menopause';
  language: string;
  publishDate: string;
  imageUrl?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  anonymous: boolean;
  topic: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}
