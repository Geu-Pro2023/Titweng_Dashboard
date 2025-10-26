import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { NotificationSystem } from "@/components/ui/notification-system";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-background/95 overflow-hidden">
      <Sidebar />
      <div className="ml-64 h-full flex flex-col transition-all duration-300">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-transparent to-muted/20">
          <div className="animate-in fade-in-0 duration-500">
            {children}
          </div>
        </main>
      </div>
      <FloatingActionButton />
      <NotificationSystem />
    </div>
  );
};