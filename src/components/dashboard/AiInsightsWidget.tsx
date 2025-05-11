
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Lightbulb, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchPersonalizedInsights } from "@/services/aiService";
import { useAuth } from "@/context/AuthContext";

export const AiInsightsWidget = () => {
  const { user } = useAuth();
  
  const { data: insights, isLoading, isError } = useQuery({
    queryKey: ['insights', user?.id],
    queryFn: () => fetchPersonalizedInsights(user?.id || ''),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="bg-herhealth-blue-light/30 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Wellness Insights
          </CardTitle>
          <CardDescription>Analyzing your patterns...</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError || !insights) {
    return (
      <Card>
        <CardHeader className="bg-herhealth-blue-light/30 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Wellness Insights
          </CardTitle>
          <CardDescription>Personalized for you</CardDescription>
        </CardHeader>
        <CardContent className="pt-4 text-center">
          <p className="text-sm text-gray-600 mb-4">
            We couldn't generate your insights at this time.
          </p>
          <Button variant="outline" size="sm">
            <Brain className="h-4 w-4 mr-2" /> Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="bg-herhealth-blue-light/30 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Wellness Insights
        </CardTitle>
        <CardDescription>Updated {new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-3 rounded-lg border bg-white">
              <div className="flex items-start gap-3">
                {insight.type === 'prediction' ? (
                  <TrendingUp className="h-5 w-5 text-herhealth-blue-dark mt-0.5" />
                ) : (
                  <Lightbulb className="h-5 w-5 text-herhealth-pink-dark mt-0.5" />
                )}
                <div>
                  <h4 className="text-sm font-medium mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
