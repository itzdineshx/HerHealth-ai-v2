
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Heart, Moon, Battery } from "lucide-react";

export const ReadinessScore = () => {
  // Mock data for readiness score
  const readinessScore = 82;
  const recovery = 90;
  const sleep = 75;
  const cycleImpact = -5; // Negative impact due to premenstrual phase
  
  return (
    <Card className="w-full border-herhealth-green-light">
      <CardHeader className="bg-herhealth-green-light/40 pb-2">
        <CardTitle>Today's Readiness</CardTitle>
        <CardDescription>Based on your biometrics and cycle phase</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-herhealth-green-dark bg-herhealth-green-light mb-2">
            <span className="text-3xl font-bold text-herhealth-green-dark">{readinessScore}</span>
          </div>
          <h4 className="font-medium">Great</h4>
          <p className="text-xs text-gray-500">You're ready for moderate activity</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-herhealth-green-dark" />
                <span className="text-sm font-medium">Recovery</span>
              </div>
              <span className="text-sm font-medium">{recovery}%</span>
            </div>
            <Progress value={recovery} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-herhealth-green-dark" />
                <span className="text-sm font-medium">Sleep</span>
              </div>
              <span className="text-sm font-medium">{sleep}%</span>
            </div>
            <Progress value={sleep} className="h-2" />
          </div>
          
          <div className="p-3 bg-herhealth-pink-light/50 rounded-md">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-herhealth-pink-dark mt-1" />
              <div>
                <p className="text-sm font-medium">Cycle Impact: {cycleImpact > 0 ? '+' : ''}{cycleImpact}%</p>
                <p className="text-xs text-gray-600">Premenstrual phase may affect energy levels</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button variant="outline" className="w-full border-herhealth-green-dark text-herhealth-green-dark hover:bg-herhealth-green-light/50">
            View Detailed Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
