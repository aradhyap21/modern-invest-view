
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import TaxDetails from "./pages/TaxDetails";
import Reit from "./pages/Reit";
import Nps from "./pages/Nps";
import FdRd from "./pages/FdRd";
import Sgb from "./pages/Sgb";
import Demat from "./pages/Demat";
import MutualFund from "./pages/MutualFund";
import NotFound from "./pages/NotFound";
import { AuthCheck } from "./components/AuthCheck";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={
            <AuthCheck>
              <Dashboard />
            </AuthCheck>
          } />
          <Route path="/profile" element={
            <AuthCheck>
              <Profile />
            </AuthCheck>
          } />
          <Route path="/tax-details" element={
            <AuthCheck>
              <TaxDetails />
            </AuthCheck>
          } />
          <Route path="/reit" element={
            <AuthCheck>
              <Reit />
            </AuthCheck>
          } />
          <Route path="/nps" element={
            <AuthCheck>
              <Nps />
            </AuthCheck>
          } />
          <Route path="/fdrd" element={
            <AuthCheck>
              <FdRd />
            </AuthCheck>
          } />
          <Route path="/sgb" element={
            <AuthCheck>
              <Sgb />
            </AuthCheck>
          } />
          <Route path="/demat" element={
            <AuthCheck>
              <Demat />
            </AuthCheck>
          } />
          <Route path="/mutual-fund" element={
            <AuthCheck>
              <MutualFund />
            </AuthCheck>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
