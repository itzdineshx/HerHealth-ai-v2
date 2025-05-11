
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, Clock, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "reminder" | "alert" | "info" | "message";
  timestamp: string;
  read: boolean;
}

const NotificationsPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      navigate("/login");
      return;
    }
    
    fetchNotifications();
  }, [user, isLoading, navigate]);

  const fetchNotifications = async () => {
    setIsLoadingNotifications(true);
    try {
      // This would normally fetch from Supabase, but we'll use mock data for now
      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "Period Prediction",
          message: "Your next period is predicted to start in 3 days. Track symptoms to improve predictions.",
          type: "reminder",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          read: false
        },
        {
          id: "2",
          title: "New Wellness Article",
          message: "We've published a new article about managing stress during menopause.",
          type: "info",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          read: false
        },
        {
          id: "3",
          title: "Appointment Reminder",
          message: "Don't forget your annual check-up this Friday at 10:00 AM.",
          type: "reminder",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          read: true
        },
        {
          id: "4",
          title: "Important Health Alert",
          message: "New study shows benefits of regular exercise for managing hot flashes.",
          type: "alert",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
          read: true
        },
        {
          id: "5",
          title: "Message from Dr. Smith",
          message: "Your lab results are ready. Please schedule a follow-up appointment.",
          type: "message",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
          read: false
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast({
        title: "Error",
        description: "Failed to fetch notifications",
        variant: "destructive"
      });
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read",
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "info":
        return <Bell className="h-5 w-5 text-purple-500" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  if (isLoading) {
    return <AppLayout><div className="flex justify-center items-center min-h-[calc(100vh-200px)]">Loading...</div></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Bell className="mr-2" />
              Notifications
            </h1>
            <p className="text-gray-600">Stay updated with important health reminders and updates</p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            disabled={notifications.every(n => n.read)}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
        
        <div className="space-y-4">
          {isLoadingNotifications ? (
            <div className="text-center py-10">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Bell className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-xl font-medium text-gray-700">No notifications yet</p>
                <p className="text-gray-500 mt-1">We'll notify you when there's something important</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card 
                key={notification.id}
                className={notification.read ? "bg-gray-50" : "bg-white border-l-4 border-herhealth-pink-dark"}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <Badge className="ml-2 bg-herhealth-pink-dark">New</Badge>
                          )}
                        </div>
                        <p className="mt-1 text-gray-700">{notification.message}</p>
                        <p className="mt-2 text-sm text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => markAsRead(notification.id)}
                        className="text-herhealth-pink-dark hover:text-herhealth-pink-dark/80"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationsPage;
