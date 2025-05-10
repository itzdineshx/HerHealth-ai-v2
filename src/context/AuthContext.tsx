
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, LifeStage } from "@/types";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        fetchUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        fetchUserProfile(data.user.id);
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
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
      // Register the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            dob,
            life_stage: lifeStage,
            location,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Trigger functions will create the profile
        toast({
          title: "Account created!",
          description: "Welcome to HerHealth! Your wellness journey begins now.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      
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
