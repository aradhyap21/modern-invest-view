
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tax-details" element={<TaxDetails />} />
          <Route path="/reit" element={<Reit />} />
          <Route path="/nps" element={<Nps />} />
          <Route path="/fdrd" element={<FdRd />} />
          <Route path="/sgb" element={<Sgb />} />
          <Route path="/demat" element={<Demat />} />
          <Route path="/mutual-fund" element={<MutualFund />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
