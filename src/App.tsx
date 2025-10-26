import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Cattle from "./pages/Cattle";
import Owners from "./pages/Owners";
import Verify from "./pages/Verify";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import VerificationLogs from "./pages/VerificationLogs";
import Settings from "./pages/Settings";
import System from "./pages/System";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('admin_token');
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute><DashboardLayout><Register /></DashboardLayout></ProtectedRoute>} />
          <Route path="/cattle" element={<ProtectedRoute><DashboardLayout><Cattle /></DashboardLayout></ProtectedRoute>} />
          <Route path="/owners" element={<ProtectedRoute><DashboardLayout><Owners /></DashboardLayout></ProtectedRoute>} />
          <Route path="/verify" element={<ProtectedRoute><DashboardLayout><Verify /></DashboardLayout></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><DashboardLayout><Reports /></DashboardLayout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><DashboardLayout><Analytics /></DashboardLayout></ProtectedRoute>} />
          <Route path="/logs" element={<ProtectedRoute><DashboardLayout><VerificationLogs /></DashboardLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
          <Route path="/system" element={<ProtectedRoute><DashboardLayout><System /></DashboardLayout></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
