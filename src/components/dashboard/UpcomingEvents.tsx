
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Check, ArrowRight, User, Pill, Stethoscope, TestTube } from "lucide-react";
import { Link } from "react-router-dom";

export const UpcomingEvents = () => {
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: "1",
      type: "period",
      title: "Period Expected",
      date: "May 15, 2025",
      daysAway: 5,
      icon: <Calendar className="h-4 w-4" />,
      color: "text-herhealth-pink-dark",
      bgColor: "bg-herhealth-pink-light",
    },
    {
      id: "2",
      type: "appointment",
      title: "Dr. Smith - Annual Checkup",
      date: "May 20, 2025",
      daysAway: 10,
      icon: <User className="h-4 w-4" />,
      color: "text-herhealth-blue-dark",
      bgColor: "bg-herhealth-blue-light",
    },
    {
      id: "3",
      type: "medication",
      title: "Refill Prescription",
      date: "May 12, 2025",
      daysAway: 2,
      icon: <Pill className="h-4 w-4" />,
      color: "text-herhealth-purple-dark",
      bgColor: "bg-herhealth-purple-light",
    },
  ];
  
  return (
    <Card className="w-full border-herhealth-blue-light">
      <CardHeader className="bg-herhealth-blue-light/40 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Upcoming</CardTitle>
            <CardDescription>Your events for the next 14 days</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <span className="text-xs">View All</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="flex items-center p-3 rounded-md border border-gray-100 bg-white hover:shadow-sm transition-all"
            >
              <div className={`h-8 w-8 rounded-full ${event.bgColor} flex items-center justify-center ${event.color} mr-3`}>
                {event.icon}
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium">{event.title}</h4>
                <p className="text-xs text-gray-500">{event.date} • {event.daysAway} days away</p>
              </div>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            <Calendar className="h-3 w-3 mr-1" />
            + Appointment
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            <TestTube className="h-3 w-3 mr-1" />
            + Screening
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
