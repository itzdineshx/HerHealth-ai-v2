
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCycleTracker } from "@/hooks/useCycleTracker";
import { format } from "date-fns";

export const CycleStatistics = () => {
  const { getCycleStatistics } = useCycleTracker();
  const stats = getCycleStatistics();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Cycle Summary</CardTitle>
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
            History
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Current Cycle Day</p>
            <p className="text-3xl font-bold text-herhealth-pink-dark">
              {stats.currentCycleDay}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Next Period in</p>
            <p className="text-xl font-bold">
              {stats.daysUntilNextPeriod} days
            </p>
            <p className="text-xs text-gray-500">
              Estimated: {stats.nextPeriodDate ? format(stats.nextPeriodDate, 'MMM d, yyyy') : 'Calculating...'}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Average Cycle Length</p>
            <p className="text-xl font-bold">{stats.averageCycleLength} days</p>
            <p className="text-xs text-gray-500">
              Based on {stats.cycleLengthHistory ? stats.cycleLengthHistory.length : 0} cycles
            </p>
          </div>
          
          <div className={`p-3 rounded-md ${getCyclePhaseStyle(stats.cyclePhase)}`}>
            <p className="text-sm font-medium">{getCyclePhaseText(stats.cyclePhase).title}</p>
            <p className="text-lg font-bold">{getCyclePhaseText(stats.cyclePhase).phase}</p>
            <p className="text-xs">{getCyclePhaseText(stats.cyclePhase).description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

function getCyclePhaseStyle(phase: string) {
  switch(phase) {
    case 'menstrual':
      return 'bg-herhealth-pink-light/30 text-herhealth-pink-dark';
    case 'follicular':
      return 'bg-herhealth-purple-light/30 text-herhealth-purple-dark';
    case 'ovulation':
      return 'bg-herhealth-blue-light/30 text-herhealth-blue-dark';
    case 'luteal':
      return 'bg-herhealth-peach-light/30 text-herhealth-peach-dark';
    default:
      return 'bg-herhealth-blue-light/30 text-herhealth-blue-dark';
  }
}

function getCyclePhaseText(phase: string) {
  switch(phase) {
    case 'menstrual':
      return {
        title: 'Current Phase',
        phase: 'Menstrual',
        description: 'Your period is happening now'
      };
    case 'follicular':
      return {
        title: 'Current Phase',
        phase: 'Follicular',
        description: 'Your body is preparing to ovulate'
      };
    case 'ovulation':
      return {
        title: 'Current Phase',
        phase: 'Ovulation',
        description: 'Fertile window active'
      };
    case 'luteal':
      return {
        title: 'Current Phase',
        phase: 'Luteal',
        description: 'Post-ovulation phase'
      };
    default:
      return {
        title: 'Current Phase',
        phase: 'Calculating',
        description: 'Log more cycles for accurate predictions'
      };
  }
}
