
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Heart, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { fetchMoodPredictions } from "@/services/aiService";
import { useAuth } from "@/context/AuthContext";

type MoodLevel = {
  day: string;
  energy: number;
  mood: number;
};

export const MoodPredictionWidget = () => {
  const { user } = useAuth();
  
  const { data: predictions, isLoading } = useQuery({
    queryKey: ['mood-predictions', user?.id],
    queryFn: () => fetchMoodPredictions(user?.id || ''),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
  
  const getCurrentDayIndex = (): number => {
    if (!predictions || predictions.length === 0) return 0;
    
    const today = new Date().toISOString().split('T')[0];
    const index = predictions.findIndex(p => p.day === today);
    
    return index >= 0 ? index : 0;
  };
  
  const currentIndex = getCurrentDayIndex();
  const currentDay = predictions?.[currentIndex];
  
  if (isLoading || !predictions || predictions.length === 0) {
    return (
      <Card>
        <CardHeader className="bg-herhealth-pink-light/30 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Mood & Energy Forecast
          </CardTitle>
          <CardDescription>Loading predictions...</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-40 flex items-center justify-center">
            <div className="text-sm text-gray-500">Generating predictions...</div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };
  
  return (
    <Card>
      <CardHeader className="bg-herhealth-pink-light/30 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Mood & Energy Forecast
        </CardTitle>
        <CardDescription>AI-powered predictions based on your cycle</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="text-center py-2">
            <h4 className="font-medium">{formatDate(currentDay.day)}</h4>
            <p className="text-sm text-gray-500">Today's Forecast</p>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-1 text-herhealth-pink-dark" />
                  Mood
                </span>
                <span>{currentDay.mood}%</span>
              </div>
              <Progress value={currentDay.mood} className="h-2" />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <TrendingUp className="h-3.5 w-3.5 mr-1 text-herhealth-blue-dark" />
                  Energy
                </span>
                <span>{currentDay.energy}%</span>
              </div>
              <Progress value={currentDay.energy} className="h-2" />
            </div>
          </div>
          
          <div className="pt-2 pb-1">
            <h5 className="text-sm font-medium mb-2">Next 7 Days Forecast</h5>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {predictions.slice(0, 7).map((day, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col items-center p-1 rounded
                    ${i === currentIndex ? 'bg-herhealth-pink-light/30 ring-1 ring-herhealth-pink' : ''}
                  `}
                >
                  <span>{formatDate(day.day).split(' ')[0]}</span>
                  <div className="my-1">
                    {day.mood > 70 ? (
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    ) : day.mood > 40 ? (
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full">
            <CalendarClock className="h-3.5 w-3.5 mr-2" />
            View Full Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
