
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { LifeStage } from "@/types";

interface SignUpStep1Props {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  dob: string;
  setDob: (dob: string) => void;
  onNext: () => void;
}

const SignUpStep1 = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  dob,
  setDob,
  onNext,
}: SignUpStep1Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !dob) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    onNext();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-herhealth-pink-dark hover:bg-herhealth-pink text-white"
      >
        Continue
      </Button>
    </form>
  );
};

interface SignUpStep2Props {
  lifeStage: LifeStage;
  setLifeStage: (stage: LifeStage) => void;
  location: string;
  setLocation: (location: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const SignUpStep2 = ({
  lifeStage,
  setLifeStage,
  location,
  setLocation,
  onBack,
  onSubmit,
  isSubmitting,
}: SignUpStep2Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lifeStage) {
      toast({
        title: "Error",
        description: "Please select your life stage.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>What best describes your current life stage?</Label>
        <Select 
          value={lifeStage} 
          onValueChange={(value) => setLifeStage(value as LifeStage)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your life stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="teen">Teen</SelectItem>
            <SelectItem value="adult">Adult</SelectItem>
            <SelectItem value="pregnant">Pregnant</SelectItem>
            <SelectItem value="postpartum">Postpartum</SelectItem>
            <SelectItem value="perimenopause">Perimenopause</SelectItem>
            <SelectItem value="menopause">Menopause</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location (Optional)</Label>
        <Input
          id="location"
          type="text"
          placeholder="City, Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        <Label className="text-base">Privacy Preferences</Label>
        <div className="pl-4 border-l-2 border-herhealth-pink-light">
          <p className="text-sm text-gray-600 mb-4">
            HerHealth is committed to your privacy. You can change these settings anytime.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <Input
                id="data-sharing"
                type="checkbox"
                className="mt-1"
              />
              <div>
                <Label htmlFor="data-sharing" className="font-medium">Data Sharing</Label>
                <p className="text-sm text-gray-600">Allow anonymous data sharing for research purposes</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Input
                id="marketing"
                type="checkbox"
                className="mt-1"
              />
              <div>
                <Label htmlFor="marketing" className="font-medium">Marketing Communications</Label>
                <p className="text-sm text-gray-600">Receive wellness tips and promotional emails</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-herhealth-pink-dark hover:bg-herhealth-pink text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
};

export const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [lifeStage, setLifeStage] = useState<LifeStage>("adult");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await register(name, email, password, dob, lifeStage, location);
      toast({
        title: "Account created!",
        description: "Welcome to HerHealth! Your wellness journey begins now.",
      });
      navigate("/onboarding");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Join HerHealth</h1>
        <p className="mt-2 text-gray-600">Start your personalized wellness journey today</p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-herhealth-pink-dark" : "bg-gray-200"}`}></div>
          <div className={`h-2 flex-1 rounded-full ml-2 ${step >= 2 ? "bg-herhealth-pink-dark" : "bg-gray-200"}`}></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs">Account Details</span>
          <span className="text-xs">Personalization</span>
        </div>
      </div>
      
      {step === 1 && (
        <SignUpStep1
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          dob={dob}
          setDob={setDob}
          onNext={() => setStep(2)}
        />
      )}
      
      {step === 2 && (
        <SignUpStep2
          lifeStage={lifeStage}
          setLifeStage={setLifeStage}
          location={location}
          setLocation={setLocation}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-herhealth-pink-dark hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
