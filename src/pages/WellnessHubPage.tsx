
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRight, Moon, Utensils, Heart, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const WellnessHubPage = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <AppLayout>
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Wellness Hub</h1>
            <p className="text-gray-600">Track and optimize your fitness, sleep, and nutrition</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <WellnessSummary />
            <WearableConnections />
            <CycleAwareSuggestions />
          </div>
          
          <Tabs defaultValue="fitness">
            <TabsList className="mb-6">
              <TabsTrigger value="fitness">
                <Activity className="h-4 w-4 mr-1" />
                Fitness
              </TabsTrigger>
              <TabsTrigger value="sleep">
                <Moon className="h-4 w-4 mr-1" />
                Sleep
              </TabsTrigger>
              <TabsTrigger value="nutrition">
                <Utensils className="h-4 w-4 mr-1" />
                Nutrition
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="fitness">
              <FitnessContent />
            </TabsContent>
            
            <TabsContent value="sleep">
              <SleepContent />
            </TabsContent>
            
            <TabsContent value="nutrition">
              <NutritionContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

const WellnessSummary = () => {
  return (
    <Card>
      <CardHeader className="bg-herhealth-green-light/30 pb-2">
        <CardTitle>Today's Summary</CardTitle>
        <CardDescription>May 10, 2025</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-herhealth-green-dark" />
                <span className="text-sm font-medium">Steps</span>
              </div>
              <span className="text-sm font-medium">7,845 / 10,000</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-herhealth-blue-dark" />
                <span className="text-sm font-medium">Sleep</span>
              </div>
              <span className="text-sm font-medium">6.5h / 8h</span>
            </div>
            <Progress value={81} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-herhealth-pink-dark" />
                <span className="text-sm font-medium">Resting HR</span>
              </div>
              <span className="text-sm font-medium">68 bpm</span>
            </div>
            <Progress value={70} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-herhealth-purple-dark" />
                <span className="text-sm font-medium">Water</span>
              </div>
              <span className="text-sm font-medium">4 / 8 glasses</span>
            </div>
            <Progress value={50} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WearableConnections = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Connected Devices</CardTitle>
        <CardDescription>Sync your wearables and apps</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center p-3 rounded-md border border-gray-100 bg-white">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-3">
              <Activity className="h-4 w-4" />
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-medium">Apple Health</h4>
              <p className="text-xs text-green-600">Connected</p>
            </div>
            <Button size="sm" variant="ghost" className="h-7">
              Sync
            </Button>
          </div>
          
          <div className="flex items-center p-3 rounded-md border border-gray-100 bg-white">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-3">
              <Activity className="h-4 w-4" />
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-medium">Fitbit</h4>
              <p className="text-xs text-gray-500">Not connected</p>
            </div>
            <Button size="sm" variant="outline" className="h-7">
              Connect
            </Button>
          </div>
          
          <div className="flex items-center p-3 rounded-md border border-gray-100 bg-white">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-3">
              <Moon className="h-4 w-4" />
            </div>
            <div className="flex-grow">
              <h4 className="text-sm font-medium">Oura Ring</h4>
              <p className="text-xs text-gray-500">Not connected</p>
            </div>
            <Button size="sm" variant="outline" className="h-7">
              Connect
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="w-full mt-2">
            <Plus className="h-3 w-3 mr-1" />
            Add More Devices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CycleAwareSuggestions = () => {
  return (
    <Card>
      <CardHeader className="bg-herhealth-pink-light/30 pb-2">
        <CardTitle>Cycle-Aware Wellness</CardTitle>
        <CardDescription>Personalized for your cycle day 14</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="p-3 bg-herhealth-blue-light/30 rounded-md">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-herhealth-blue-dark" />
              <h4 className="text-sm font-medium text-herhealth-blue-dark">Workout Suggestion</h4>
            </div>
            <p className="text-sm mt-2">
              You're in your ovulation phase - a great time for high-intensity workouts. Your energy levels are naturally higher.
            </p>
            <Button className="w-full mt-3 bg-herhealth-blue-dark hover:bg-herhealth-blue text-white text-xs h-8">
              View Workout Routine
            </Button>
          </div>
          
          <div className="p-3 bg-herhealth-green-light/30 rounded-md">
            <div className="flex items-center gap-2">
              <Utensils className="h-4 w-4 text-herhealth-green-dark" />
              <h4 className="text-sm font-medium text-herhealth-green-dark">Nutrition Tip</h4>
            </div>
            <p className="text-sm mt-2">
              Focus on protein and complex carbs today to support energy levels and muscle recovery after workouts.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FitnessContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Steps</p>
                  <p className="text-2xl font-bold">7,845</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="text-2xl font-bold">3.2 mi</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="text-2xl font-bold">348</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <p className="text-gray-400">Activity chart placeholder</p>
              </div>
              
              <Button className="w-full bg-herhealth-green-dark hover:bg-herhealth-green text-white">
                <Plus className="h-4 w-4 mr-1" />
                Log Workout
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Weekly Trends</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 gap-1">
                Monthly
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md text-center h-48">
                <p className="text-gray-400">Weekly trends chart placeholder</p>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="p-2 bg-herhealth-green-light/30 rounded-md text-center">
                  <p className="text-xs text-gray-500">Avg Steps</p>
                  <p className="text-lg font-bold">8,234</p>
                </div>
                <div className="p-2 bg-herhealth-green-light/30 rounded-md text-center">
                  <p className="text-xs text-gray-500">Active Days</p>
                  <p className="text-lg font-bold">5/7</p>
                </div>
                <div className="p-2 bg-herhealth-green-light/30 rounded-md text-center">
                  <p className="text-xs text-gray-500">Workouts</p>
                  <p className="text-lg font-bold">3</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recommended Workouts</CardTitle>
          <CardDescription>Based on your cycle phase and fitness level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md overflow-hidden">
              <div className="h-32 bg-gray-100 flex items-center justify-center">
                <Activity className="h-8 w-8 text-gray-300" />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">HIIT Cardio</h4>
                  <span className="text-xs bg-herhealth-green-dark text-white px-2 py-0.5 rounded-full">25 min</span>
                </div>
                <p className="text-xs text-gray-500">Perfect for your ovulation phase when energy levels are high.</p>
                <Button className="w-full mt-3 text-xs h-8" variant="outline">Start Workout</Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="h-32 bg-gray-100 flex items-center justify-center">
                <Activity className="h-8 w-8 text-gray-300" />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Strength Training</h4>
                  <span className="text-xs bg-herhealth-green-dark text-white px-2 py-0.5 rounded-full">40 min</span>
                </div>
                <p className="text-xs text-gray-500">Build muscle during this optimal hormone window.</p>
                <Button className="w-full mt-3 text-xs h-8" variant="outline">Start Workout</Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="h-32 bg-gray-100 flex items-center justify-center">
                <Activity className="h-8 w-8 text-gray-300" />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Yoga Flow</h4>
                  <span className="text-xs bg-herhealth-green-dark text-white px-2 py-0.5 rounded-full">30 min</span>
                </div>
                <p className="text-xs text-gray-500">Balance your workout routine with flexibility training.</p>
                <Button className="w-full mt-3 text-xs h-8" variant="outline">Start Workout</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SleepContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Last Night's Sleep</CardTitle>
            <CardDescription>May 9, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="text-2xl font-bold">6h 30m</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quality</p>
                  <p className="text-2xl font-bold">82%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deep Sleep</p>
                  <p className="text-2xl font-bold">1h 45m</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md text-center">
                <p className="text-gray-400">Sleep stages chart placeholder</p>
              </div>
              
              <Button className="w-full bg-herhealth-blue-dark hover:bg-herhealth-blue text-white">
                <Plus className="h-4 w-4 mr-1" />
                Log Sleep Manually
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Sleep Trends</CardTitle>
              <Button variant="ghost" size="sm" className="h-7 gap-1">
                Monthly
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md text-center h-48">
                <p className="text-gray-400">Weekly sleep trends chart placeholder</p>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="p-2 bg-herhealth-blue-light/30 rounded-md text-center">
                  <p className="text-xs text-gray-500">Avg Duration</p>
                  <p className="text-lg font-bold">7.2h</p>
                </div>
                <div className="p-2 bg-herhealth-blue-light/30 rounded-md text-center">
                  <p className="text-xs text-gray-500">Avg Quality</p>
                  <p className="text-lg font-bold">78%</p>
                </div>
                <div className="p-2 bg-herhealth-blue-light/30 rounded-md text-center">
                  <p className="text-xs text-gray-500">Bedtime</p>
                  <p className="text-lg font-bold">11:30 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="bg-herhealth-blue-light/30">
          <CardTitle>Sleep Optimization</CardTitle>
          <CardDescription>Based on your cycle phase and sleep patterns</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="p-3 border rounded-md">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-herhealth-blue-dark" />
                <h4 className="text-sm font-medium">Sleep Schedule Recommendation</h4>
              </div>
              <p className="text-sm mt-2">
                During ovulation, you may experience slight temperature increases at night. Consider setting your bedroom temperature 1-2 degrees cooler.
              </p>
            </div>
            
            <div className="p-3 border rounded-md">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-herhealth-purple-dark" />
                <h4 className="text-sm font-medium">Sleep Quality Insight</h4>
              </div>
              <p className="text-sm mt-2">
                Your deep sleep has decreased by 15% this week. This may be related to your cycle phase. Consider reducing screen time before bed.
              </p>
            </div>
            
            <Button variant="outline" className="w-full">
              View Full Sleep Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const NutritionContent = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Nutrition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="text-2xl font-bold">1,450</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Water</p>
                  <p className="text-2xl font-bold">4 / 8</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Meals</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="mb-3">
                  <p className="text-sm font-medium mb-2">Macronutrient Breakdown</p>
                  <div className="flex h-4 rounded-full overflow-hidden">
                    <div className="bg-herhealth-green-dark h-full" style={{ width: "30%" }}></div>
                    <div className="bg-herhealth-blue-dark h-full" style={{ width: "45%" }}></div>
                    <div className="bg-herhealth-pink-dark h-full" style={{ width: "25%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span>Protein: 30%</span>
                    <span>Carbs: 45%</span>
                    <span>Fat: 25%</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-herhealth-purple-dark hover:bg-herhealth-purple text-white">
                <Plus className="h-4 w-4 mr-1" />
                Log Meal
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cycle-Aware Nutrition</CardTitle>
            <CardDescription>Ovulation Phase (Day 14)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-herhealth-pink-light/30 rounded-md">
                <h4 className="text-sm font-medium text-herhealth-pink-dark">Recommended Focus</h4>
                <p className="text-sm mt-2">
                  During ovulation, focus on foods rich in antioxidants and magnesium to support hormone balance.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs bg-white px-2 py-1 rounded-full border">Leafy greens</span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full border">Nuts and seeds</span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full border">Berries</span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full border">Dark chocolate</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                View Meal Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Meal Suggestions</CardTitle>
          <CardDescription>Personalized for your preferences and cycle phase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md overflow-hidden">
              <div className="h-32 bg-gray-100 flex items-center justify-center">
                <Utensils className="h-8 w-8 text-gray-300" />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Breakfast Bowl</h4>
                  <span className="text-xs bg-herhealth-green-dark text-white px-2 py-0.5 rounded-full">450 cal</span>
                </div>
                <p className="text-xs text-gray-500">Greek yogurt with berries, nuts, and honey.</p>
                <Button className="w-full mt-3 text-xs h-8" variant="outline">View Recipe</Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="h-32 bg-gray-100 flex items-center justify-center">
                <Utensils className="h-8 w-8 text-gray-300" />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Quinoa Salad</h4>
                  <span className="text-xs bg-herhealth-green-dark text-white px-2 py-0.5 rounded-full">380 cal</span>
                </div>
                <p className="text-xs text-gray-500">With avocado, chickpeas, and lemon dressing.</p>
                <Button className="w-full mt-3 text-xs h-8" variant="outline">View Recipe</Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="h-32 bg-gray-100 flex items-center justify-center">
                <Utensils className="h-8 w-8 text-gray-300" />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Grilled Salmon</h4>
                  <span className="text-xs bg-herhealth-green-dark text-white px-2 py-0.5 rounded-full">520 cal</span>
                </div>
                <p className="text-xs text-gray-500">With roasted vegetables and quinoa.</p>
                <Button className="w-full mt-3 text-xs h-8" variant="outline">View Recipe</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessHubPage;
