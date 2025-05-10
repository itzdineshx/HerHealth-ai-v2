
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns";
import { useCycleTracker } from "@/hooks/useCycleTracker";
import { cn } from "@/lib/utils";

export const CycleCalendarVisualization = () => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const { cycles, isLoadingCycles } = useCycleTracker();

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const firstDayOfMonth = startOfMonth(currentMonth).getDay();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const getCycleStatus = (date: Date) => {
    if (isLoadingCycles) return null;

    // Check if this date is in any cycle
    const dateStr = format(date, 'yyyy-MM-dd');
    const cycleOnThisDate = cycles.find(cycle => {
      const cycleDate = format(new Date(cycle.startDate), 'yyyy-MM-dd');
      
      // Additional logic to check for days after the cycle start (period duration)
      const cycleStartDate = new Date(cycle.startDate);
      const fiveDaysAfter = new Date(cycleStartDate);
      fiveDaysAfter.setDate(fiveDaysAfter.getDate() + 5); // Assuming 5 day period
      
      return (
        dateStr === cycleDate ||
        (date >= cycleStartDate && date <= fiveDaysAfter)
      );
    });

    if (cycleOnThisDate) {
      return {
        isCycle: true,
        intensity: cycleOnThisDate.flowIntensity,
        isFirstDay: format(new Date(cycleOnThisDate.startDate), 'yyyy-MM-dd') === dateStr
      };
    }

    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between bg-herhealth-pink-light/30 pb-2">
        <CardTitle>{format(currentMonth, 'MMMM yyyy')}</CardTitle>
        <div className="flex gap-1">
          <button 
            onClick={goToPreviousMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            &lt;
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            &gt;
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-xs font-medium py-2">
              {day}
            </div>
          ))}
          
          {/* Empty cells for days before the first of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-10 rounded-md"></div>
          ))}
          
          {/* Days of the month */}
          {daysInMonth.map(day => {
            const cycleStatus = getCycleStatus(day);
            
            return (
              <div 
                key={day.toString()}
                className={cn(
                  "h-10 rounded-md flex items-center justify-center text-sm relative",
                  !isSameMonth(day, currentMonth) && "text-gray-300",
                  isToday(day) && "border border-herhealth-blue-dark"
                )}
              >
                <div
                  className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center",
                    cycleStatus?.isCycle && "bg-herhealth-pink text-white",
                    cycleStatus?.isFirstDay && "ring-2 ring-herhealth-pink-dark",
                    cycleStatus?.intensity === "heavy" && "bg-herhealth-pink-dark text-white",
                    cycleStatus?.intensity === "medium" && "bg-herhealth-pink text-white",
                    cycleStatus?.intensity === "light" && "bg-herhealth-pink-light text-herhealth-pink-dark",
                    cycleStatus?.intensity === "spotting" && "bg-herhealth-pink-light/50 text-herhealth-pink-dark"
                  )}
                >
                  {format(day, 'd')}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-herhealth-pink-dark"></div>
            <span className="text-xs">Heavy</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-herhealth-pink"></div>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-herhealth-pink-light"></div>
            <span className="text-xs">Light</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-herhealth-pink-light/50"></div>
            <span className="text-xs">Spotting</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
