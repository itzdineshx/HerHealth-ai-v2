
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Calendar, Heart, Activity, Baby, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export const LifeStageWidget = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Default to "adult" if lifeStage is not available
  const lifeStage = user.lifeStage || "adult";
  
  return (
    <Card className="w-full overflow-hidden border-herhealth-pink-light">
      <CardHeader className="bg-herhealth-pink-light/40 pb-2">
        <CardTitle>Your Wellness Journey</CardTitle>
        <CardDescription>
          Personalized for your {getUserStageLabel(lifeStage)} life stage
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {lifeStage === "teen" && <TeenContent />}
        {lifeStage === "adult" && <AdultContent />}
        {lifeStage === "pregnant" && <PregnantContent />}
        {lifeStage === "postpartum" && <PostpartumContent />}
        {(lifeStage === "perimenopause" || lifeStage === "menopause") && <MenopauseContent />}
      </CardContent>
    </Card>
  );
};

const getUserStageLabel = (lifeStage: string) => {
  switch (lifeStage) {
    case "teen":
      return "teen";
    case "adult":
      return "adult";
    case "pregnant":
      return "pregnancy";
    case "postpartum":
      return "postpartum";
    case "perimenopause":
      return "perimenopause";
    case "menopause":
      return "menopause";
    default:
      return "adult";
  }
};

const TeenContent = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-herhealth-blue-light flex items-center justify-center">
        <Calendar className="h-5 w-5 text-herhealth-blue-dark" />
      </div>
      <div>
        <h4 className="font-medium">Cycle Tracker</h4>
        <p className="text-sm text-gray-600">Learn about your cycle patterns</p>
      </div>
    </div>
    
    <div className="bg-herhealth-blue-light/30 p-4 rounded-md">
      <h4 className="font-medium mb-2">Teen Wellness Tips</h4>
      <ul className="text-sm space-y-2">
        <li className="flex items-start gap-2">
          <Heart className="h-4 w-4 text-herhealth-blue-dark mt-0.5" />
          <span>Track your mood changes throughout your cycle</span>
        </li>
        <li className="flex items-start gap-2">
          <Activity className="h-4 w-4 text-herhealth-blue-dark mt-0.5" />
          <span>Regular physical activity can help reduce cramps</span>
        </li>
      </ul>
    </div>
    
    <Link to="/cycle">
      <Button className="w-full bg-herhealth-blue-dark hover:bg-herhealth-blue text-white">
        Track My Cycle
      </Button>
    </Link>
  </div>
);

const AdultContent = () => (
  <div className="space-y-4">
    <Tabs defaultValue="cycle">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="cycle">Cycle</TabsTrigger>
        <TabsTrigger value="fitness">Fitness</TabsTrigger>
        <TabsTrigger value="mental">Mental</TabsTrigger>
      </TabsList>
      
      <TabsContent value="cycle" className="animate-in">
        <div className="space-y-4">
          <div className="bg-herhealth-pink-light/30 p-4 rounded-md">
            <h4 className="font-medium mb-2">Your Cycle Overview</h4>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-white rounded shadow-sm">
                <div className="text-xs text-gray-500">Day</div>
                <div className="font-bold text-herhealth-pink-dark">14</div>
              </div>
              <div className="p-2 bg-white rounded shadow-sm">
                <div className="text-xs text-gray-500">Phase</div>
                <div className="font-bold text-herhealth-pink-dark">Ovulation</div>
              </div>
              <div className="p-2 bg-white rounded shadow-sm">
                <div className="text-xs text-gray-500">Cycle</div>
                <div className="font-bold text-herhealth-pink-dark">28</div>
              </div>
              <div className="p-2 bg-white rounded shadow-sm">
                <div className="text-xs text-gray-500">Next Period</div>
                <div className="font-bold text-herhealth-pink-dark">14d</div>
              </div>
            </div>
          </div>
          
          <Link to="/cycle">
            <Button className="w-full bg-herhealth-pink-dark hover:bg-herhealth-pink text-white">
              View Full Cycle Tracker
            </Button>
          </Link>
        </div>
      </TabsContent>
      
      <TabsContent value="fitness" className="animate-in">
        <div className="space-y-4">
          <div className="bg-herhealth-green-light/30 p-4 rounded-md">
            <h4 className="font-medium mb-2">Today's Recommendation</h4>
            <p className="text-sm mb-2">
              Based on your cycle phase, today is ideal for:
            </p>
            <div className="p-3 bg-white rounded-md shadow-sm">
              <span className="font-medium text-herhealth-green-dark">Strength Training</span>
              <p className="text-xs text-gray-600 mt-1">
                Your energy levels are high during this follicular phase. Focus on compound exercises.
              </p>
            </div>
          </div>
          
          <Link to="/wellness">
            <Button className="w-full bg-herhealth-green-dark hover:bg-herhealth-green text-white">
              View Wellness Hub
            </Button>
          </Link>
        </div>
      </TabsContent>
      
      <TabsContent value="mental" className="animate-in">
        <div className="space-y-4">
          <div className="bg-herhealth-purple-light/30 p-4 rounded-md">
            <h4 className="font-medium mb-2">Mood Insights</h4>
            <p className="text-sm mb-2">
              Your recent mood patterns indicate:
            </p>
            <div className="p-3 bg-white rounded-md shadow-sm">
              <span className="font-medium text-herhealth-purple-dark">Increasing stress levels</span>
              <p className="text-xs text-gray-600 mt-1">
                Consider trying our guided meditation sessions to help reduce stress.
              </p>
            </div>
          </div>
          
          <Link to="/mental-health">
            <Button className="w-full bg-herhealth-purple-dark hover:bg-herhealth-purple text-white">
              Explore Mental Wellness
            </Button>
          </Link>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);

const PregnantContent = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-herhealth-peach-light flex items-center justify-center">
        <Baby className="h-5 w-5 text-herhealth-peach-dark" />
      </div>
      <div>
        <h4 className="font-medium">Pregnancy Tracker</h4>
        <p className="text-sm text-gray-600">Week 24 - Second Trimester</p>
      </div>
    </div>
    
    <div className="bg-herhealth-peach-light/30 p-4 rounded-md">
      <h4 className="font-medium mb-2">Baby's Development</h4>
      <p className="text-sm mb-3">
        Your baby is now about the size of an ear of corn and weighs around 1.3 pounds.
      </p>
      
      <div className="mb-3">
        <h5 className="text-sm font-medium">This Week's Milestones:</h5>
        <ul className="text-xs space-y-1 mt-1">
          <li className="flex items-start gap-2">
            <Heart className="h-3 w-3 text-herhealth-peach-dark mt-0.5" />
            <span>Baby's face is almost fully formed</span>
          </li>
          <li className="flex items-start gap-2">
            <Heart className="h-3 w-3 text-herhealth-peach-dark mt-0.5" />
            <span>Taste buds are developing</span>
          </li>
          <li className="flex items-start gap-2">
            <Heart className="h-3 w-3 text-herhealth-peach-dark mt-0.5" />
            <span>Lungs are developing rapidly</span>
          </li>
        </ul>
      </div>
    </div>
    
    <Link to="/pregnancy">
      <Button className="w-full bg-herhealth-peach-dark hover:bg-herhealth-peach text-white">
        View Pregnancy Journey
      </Button>
    </Link>
  </div>
);

const PostpartumContent = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-herhealth-blue-light flex items-center justify-center">
        <Baby className="h-5 w-5 text-herhealth-blue-dark" />
      </div>
      <div>
        <h4 className="font-medium">Postpartum Recovery</h4>
        <p className="text-sm text-gray-600">Week 6 - Early Recovery Phase</p>
      </div>
    </div>
    
    <div className="bg-herhealth-blue-light/30 p-4 rounded-md">
      <h4 className="font-medium mb-2">Your Recovery Journey</h4>
      <p className="text-sm mb-3">
        Your body is healing well. Remember that full recovery can take several months.
      </p>
      
      <div className="mb-3">
        <h5 className="text-sm font-medium">This Week's Focus:</h5>
        <ul className="text-xs space-y-1 mt-1">
          <li className="flex items-start gap-2">
            <Heart className="h-3 w-3 text-herhealth-blue-dark mt-0.5" />
            <span>Continue with gentle pelvic floor exercises</span>
          </li>
          <li className="flex items-start gap-2">
            <Heart className="h-3 w-3 text-herhealth-blue-dark mt-0.5" />
            <span>Schedule your 6-week postpartum check-up</span>
          </li>
          <li className="flex items-start gap-2">
            <Heart className="h-3 w-3 text-herhealth-blue-dark mt-0.5" />
            <span>Monitor your emotional wellbeing</span>
          </li>
        </ul>
      </div>
    </div>
    
    <Link to="/postpartum">
      <Button className="w-full bg-herhealth-blue-dark hover:bg-herhealth-blue text-white">
        Continue Recovery Plan
      </Button>
    </Link>
  </div>
);

const MenopauseContent = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-herhealth-purple-light flex items-center justify-center">
        <Clock className="h-5 w-5 text-herhealth-purple-dark" />
      </div>
      <div>
        <h4 className="font-medium">Menopause Tracker</h4>
        <p className="text-sm text-gray-600">Perimenopause Phase</p>
      </div>
    </div>
    
    <div className="bg-herhealth-purple-light/30 p-4 rounded-md">
      <h4 className="font-medium mb-2">Symptom Insights</h4>
      <p className="text-sm mb-3">
        Your most frequent symptoms this month:
      </p>
      
      <div className="space-y-2">
        <div className="bg-white p-2 rounded-md shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Hot Flashes</span>
            <span className="text-xs bg-herhealth-purple-dark text-white px-2 py-0.5 rounded-full">
              High
            </span>
          </div>
        </div>
        
        <div className="bg-white p-2 rounded-md shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Sleep Disruption</span>
            <span className="text-xs bg-herhealth-purple-dark text-white px-2 py-0.5 rounded-full">
              Medium
            </span>
          </div>
        </div>
        
        <div className="bg-white p-2 rounded-md shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Mood Changes</span>
            <span className="text-xs bg-herhealth-purple-dark text-white px-2 py-0.5 rounded-full">
              Low
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <Link to="/menopause">
      <Button className="w-full bg-herhealth-purple-dark hover:bg-herhealth-purple text-white">
        View Menopause Support
      </Button>
    </Link>
  </div>
);
