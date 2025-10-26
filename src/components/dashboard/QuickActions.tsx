import { Link } from "react-router-dom";
import { Beef, FileCheck, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Register New Cow",
    description: "Add a new cattle to the system",
    icon: Beef,
    href: "/register",
    variant: "default" as const,
  },
  {
    title: "Verify Cattle",
    description: "Verify nose print or tag",
    icon: FileCheck,
    href: "/verify",
    variant: "secondary" as const,
  },
  {
    title: "Browse All Cows",
    description: "View and manage cattle records",
    icon: Users,
    href: "/cattle",
    variant: "secondary" as const,
  },
  {
    title: "Manage Reports",
    description: "Review pending reports",
    icon: AlertCircle,
    href: "/reports",
    variant: "secondary" as const,
  },
];

export const QuickActions = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Button
                variant={action.variant}
                className="h-auto w-full flex-col gap-2 p-6 hover:scale-105 transition-transform"
              >
                <action.icon className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-xs opacity-80 font-normal mt-1">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
