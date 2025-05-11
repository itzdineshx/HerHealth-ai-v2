
import { supabase } from "@/integrations/supabase/client";
import { User, CycleLog, SymptomLog, ActivityLog, Article, CommunityPost } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/components/ui/use-toast";

// Mock data for development
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Understanding Your Menstrual Cycle",
    summary: "Learn about the phases of your menstrual cycle and what's happening in your body.",
    content: "Your menstrual cycle is divided into several phases...",
    category: "mental",
    language: "en",
    publishDate: "2025-04-15",
    imageUrl: "https://source.unsplash.com/random/800x600/?menstrual"
  },
  {
    id: "2",
    title: "Nutrition During Pregnancy",
    summary: "Essential nutrients for a healthy pregnancy and fetal development.",
    content: "Proper nutrition during pregnancy is crucial for both maternal health and fetal development...",
    category: "pregnancy",
    language: "en",
    publishDate: "2025-04-10",
    imageUrl: "https://source.unsplash.com/random/800x600/?pregnancy,nutrition"
  },
  {
    id: "3",
    title: "Managing Menopause Symptoms Naturally",
    summary: "Natural approaches to easing the transition through menopause.",
    content: "Menopause is a natural biological process...",
    category: "menopause",
    language: "en",
    publishDate: "2025-04-05",
    imageUrl: "https://source.unsplash.com/random/800x600/?menopause"
  },
];

const mockCommunityPosts: CommunityPost[] = [
  {
    id: "1",
    userId: "user1",
    anonymous: false,
    topic: "Menstrual Pain",
    content: "What are your best remedies for menstrual cramps? I've been struggling lately.",
    timestamp: "2025-05-09T14:30:00Z",
    likes: 15,
    replies: 8
  },
  {
    id: "2",
    userId: "user2",
    anonymous: true,
    topic: "Fertility",
    content: "Has anyone used fertility tracking apps successfully? Which ones would you recommend?",
    timestamp: "2025-05-08T09:15:00Z",
    likes: 23,
    replies: 12
  }
];

/**
 * User Related API Functions
 */
export const fetchUserProfile = async (userId: string): Promise<User | null> => {
  try {
    // Attempt to fetch from Supabase
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    
    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
    
    if (data) {
      // Transform from database schema to our app schema
      return {
        id: data.id,
        name: data.name,
        email: data.email || "",
        dob: data.dob,
        lifeStage: data.life_stage,
        location: data.location || undefined,
        privacyPreferences: {
          dataSharing: data.data_sharing,
          marketingEmails: data.marketing_emails,
          researchParticipation: data.research_participation
        },
        createdAt: data.created_at
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    return null;
  }
};

export const updateUserProfile = async (userData: Partial<User>): Promise<boolean> => {
  try {
    if (!userData.id) {
      throw new Error("User ID is required for updates");
    }
    
    // Transform to database schema
    const dbData = {
      name: userData.name,
      email: userData.email,
      dob: userData.dob,
      life_stage: userData.lifeStage,
      location: userData.location,
      data_sharing: userData.privacyPreferences?.dataSharing,
      marketing_emails: userData.privacyPreferences?.marketingEmails,
      research_participation: userData.privacyPreferences?.researchParticipation,
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from("profiles")
      .update(dbData)
      .eq("id", userData.id);
    
    if (error) {
      console.error("Error updating user profile:", error);
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
    return true;
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return false;
  }
};

/**
 * Cycle Tracking API Functions
 */
export const fetchCycleLogs = async (userId: string): Promise<CycleLog[]> => {
  try {
    const { data, error } = await supabase
      .from("cycle_logs")
      .select("*")
      .eq("user_id", userId)
      .order("start_date", { ascending: false });
    
    if (error) {
      console.error("Error fetching cycle logs:", error);
      return [];
    }
    
    if (data && data.length > 0) {
      return data.map(log => ({
        id: log.id,
        userId: log.user_id,
        startDate: log.start_date,
        endDate: log.end_date || undefined,
        flowIntensity: log.flow_intensity,
        notes: log.notes || undefined
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error in fetchCycleLogs:", error);
    return [];
  }
};

export const createCycleLog = async (cycleData: Omit<CycleLog, 'id'>): Promise<CycleLog | null> => {
  try {
    const newLog = {
      id: uuidv4(),
      user_id: cycleData.userId,
      start_date: cycleData.startDate,
      end_date: cycleData.endDate,
      flow_intensity: cycleData.flowIntensity,
      notes: cycleData.notes,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from("cycle_logs")
      .insert(newLog)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating cycle log:", error);
      return null;
    }
    
    if (data) {
      return {
        id: data.id,
        userId: data.user_id,
        startDate: data.start_date,
        endDate: data.end_date || undefined,
        flowIntensity: data.flow_intensity,
        notes: data.notes || undefined
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error in createCycleLog:", error);
    return null;
  }
};

/**
 * Symptom Tracking API Functions
 */
export const fetchSymptomLogs = async (userId: string): Promise<SymptomLog[]> => {
  try {
    const { data, error } = await supabase
      .from("symptom_logs")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });
    
    if (error) {
      console.error("Error fetching symptom logs:", error);
      return [];
    }
    
    if (data && data.length > 0) {
      return data.map(log => ({
        id: log.id,
        userId: log.user_id,
        date: log.date,
        type: log.type,
        intensity: log.intensity,
        notes: log.notes || undefined
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error in fetchSymptomLogs:", error);
    return [];
  }
};

export const createSymptomLog = async (symptomData: Omit<SymptomLog, 'id'>): Promise<SymptomLog | null> => {
  try {
    const newLog = {
      id: uuidv4(),
      user_id: symptomData.userId,
      date: symptomData.date,
      type: symptomData.type,
      intensity: symptomData.intensity,
      notes: symptomData.notes,
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from("symptom_logs")
      .insert(newLog)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating symptom log:", error);
      return null;
    }
    
    if (data) {
      return {
        id: data.id,
        userId: data.user_id,
        date: data.date,
        type: data.type,
        intensity: data.intensity,
        notes: data.notes || undefined
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error in createSymptomLog:", error);
    return null;
  }
};

/**
 * Activity Tracking API Functions
 */
export const fetchActivityLogs = async (userId: string): Promise<ActivityLog[]> => {
  try {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });
    
    if (error) {
      console.error("Error fetching activity logs:", error);
      return [];
    }
    
    if (data && data.length > 0) {
      return data.map(log => ({
        id: log.id,
        userId: log.user_id,
        date: log.date,
        type: log.type,
        metadata: log.metadata || {}
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error in fetchActivityLogs:", error);
    return [];
  }
};

/**
 * Content API Functions
 */
export const fetchArticles = async (category?: string, limit = 10): Promise<Article[]> => {
  try {
    // Try to fetch from Supabase first
    let query = supabase.from("articles").select("*");
    
    if (category) {
      query = query.eq("category", category);
    }
    
    query = query.limit(limit);
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching articles:", error);
      // Fall back to mock data
      return category 
        ? mockArticles.filter(article => article.category === category).slice(0, limit) 
        : mockArticles.slice(0, limit);
    }
    
    if (data && data.length > 0) {
      return data.map(article => ({
        id: article.id,
        title: article.title,
        summary: article.summary,
        content: article.content,
        category: article.category,
        language: article.language,
        publishDate: article.publish_date,
        imageUrl: article.image_url
      }));
    }
    
    // Fall back to mock data if no data from supabase
    return category 
      ? mockArticles.filter(article => article.category === category).slice(0, limit) 
      : mockArticles.slice(0, limit);
  } catch (error) {
    console.error("Error in fetchArticles:", error);
    // Fall back to mock data
    return category 
      ? mockArticles.filter(article => article.category === category).slice(0, limit) 
      : mockArticles.slice(0, limit);
  }
};

/**
 * Community API Functions
 */
export const fetchCommunityPosts = async (topic?: string, limit = 10): Promise<CommunityPost[]> => {
  try {
    // Try to fetch from Supabase first
    let query = supabase.from("community_posts").select("*");
    
    if (topic) {
      query = query.eq("topic", topic);
    }
    
    query = query.limit(limit);
    
    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching community posts:", error);
      // Fall back to mock data
      return topic 
        ? mockCommunityPosts.filter(post => post.topic === topic).slice(0, limit) 
        : mockCommunityPosts.slice(0, limit);
    }
    
    if (data && data.length > 0) {
      return data.map(post => ({
        id: post.id,
        userId: post.user_id,
        anonymous: post.anonymous,
        topic: post.topic,
        content: post.content,
        timestamp: post.timestamp,
        likes: post.likes,
        replies: post.replies
      }));
    }
    
    // Fall back to mock data if no data from supabase
    return topic 
      ? mockCommunityPosts.filter(post => post.topic === topic).slice(0, limit) 
      : mockCommunityPosts.slice(0, limit);
  } catch (error) {
    console.error("Error in fetchCommunityPosts:", error);
    // Fall back to mock data
    return topic 
      ? mockCommunityPosts.filter(post => post.topic === topic).slice(0, limit) 
      : mockCommunityPosts.slice(0, limit);
  }
};

export const createCommunityPost = async (
  userId: string, 
  topic: string, 
  content: string, 
  anonymous: boolean
): Promise<CommunityPost | null> => {
  try {
    const newPost = {
      id: uuidv4(),
      user_id: userId,
      anonymous,
      topic,
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: 0
    };
    
    const { data, error } = await supabase
      .from("community_posts")
      .insert(newPost)
      .select()
      .single();
    
    if (error) {
      console.error("Error creating community post:", error);
      return null;
    }
    
    if (data) {
      return {
        id: data.id,
        userId: data.user_id,
        anonymous: data.anonymous,
        topic: data.topic,
        content: data.content,
        timestamp: data.timestamp,
        likes: data.likes,
        replies: data.replies
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error in createCommunityPost:", error);
    return null;
  }
};
