
import { createContext, useContext, useState, useEffect } from "react";
import { User, LifeStage } from "@/types";

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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // For demo purposes, we'll simulate authentication with localStorage
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("herhealth_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real application
      // For now, let's simulate with mock data
      const mockUser: User = {
        id: "user-123",
        name: "Jane Doe",
        email: email,
        dob: "1990-05-15",
        lifeStage: "adult",
        location: "New York, USA",
        privacyPreferences: {
          dataSharing: true,
          marketingEmails: false,
          researchParticipation: true,
        },
        createdAt: new Date().toISOString(),
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("herhealth_user", JSON.stringify(mockUser));
      setUser(mockUser);
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
      // This would be an API call in a real application
      // For now, let's simulate with mock data
      const mockUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        dob,
        lifeStage,
        location,
        privacyPreferences: {
          dataSharing: false,
          marketingEmails: false,
          researchParticipation: false,
        },
        createdAt: new Date().toISOString(),
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("herhealth_user", JSON.stringify(mockUser));
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("herhealth_user");
    setUser(null);
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
