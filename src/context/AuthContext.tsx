
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, LifeStage } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    dob: string,
    lifeStage: LifeStage,
    location?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // For development purposes, we'll create a dummy user
    const dummyUser: User = {
      id: "dummy-user-id",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      dob: "1990-05-15",
      lifeStage: "adult",
      location: "New York, NY",
      privacyPreferences: {
        dataSharing: true,
        marketingEmails: false,
        researchParticipation: true,
      },
      createdAt: new Date().toISOString(),
    };
    
    // Check if we have a stored user
    const storedUser = localStorage.getItem("herhealth_user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
      } else if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: "", // Email isn't stored in the profiles table for security
          dob: data.dob,
          lifeStage: data.life_stage as LifeStage,
          location: data.location || undefined,
          privacyPreferences: {
            dataSharing: data.data_sharing,
            marketingEmails: data.marketing_emails,
            researchParticipation: data.research_participation,
          },
          createdAt: data.created_at,
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email?: string, password?: string) => {
    setIsLoading(true);
    try {
      // Create dummy user
      const dummyUser: User = {
        id: "dummy-user-id",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        dob: "1990-05-15",
        lifeStage: "adult",
        location: "New York, NY",
        privacyPreferences: {
          dataSharing: true,
          marketingEmails: false,
          researchParticipation: true,
        },
        createdAt: new Date().toISOString(),
      };
      
      // Set the dummy user
      setUser(dummyUser);
      
      // Store user in localStorage
      localStorage.setItem("herhealth_user", JSON.stringify(dummyUser));
      
      toast({
        title: "Login Successful",
        description: "You've been logged in with a demo account.",
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    dob: string,
    lifeStage: LifeStage,
    location?: string
  ) => {
    setIsLoading(true);
    try {
      // Create dummy user
      const dummyUser: User = {
        id: "dummy-user-id",
        name: name,
        email: email,
        dob: dob,
        lifeStage: lifeStage,
        location: location,
        privacyPreferences: {
          dataSharing: true,
          marketingEmails: false,
          researchParticipation: true,
        },
        createdAt: new Date().toISOString(),
      };
      
      // Set the dummy user
      setUser(dummyUser);
      
      // Store user in localStorage
      localStorage.setItem("herhealth_user", JSON.stringify(dummyUser));
      
      toast({
        title: "Account created!",
        description: "Welcome to HerHealth! Your wellness journey begins now.",
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear user from state
      setUser(null);
      
      // Remove from localStorage
      localStorage.removeItem("herhealth_user");
      
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message || "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
