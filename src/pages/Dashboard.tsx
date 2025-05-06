
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { InvestmentCard } from '@/components/InvestmentCard';
import {
  Building,
  ChartBarStacked,
  PiggyBank,
  FileLock,
  Briefcase,
  ChartPie
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [investmentStats, setInvestmentStats] = useState({
    reit: { yield: "0%", holdings: "0" },
    nps: { value: "₹0", return: "0%" },
    fdrd: { value: "₹0", interest: "0%" },
    sgb: { quantity: "0g", value: "₹0" },
    demat: { holdings: "0", value: "₹0" },
    mutualFunds: { value: "₹0", funds: "0" }
  });

  useEffect(() => {
    async function fetchInvestmentData() {
      setLoading(true);
      
      try {
        const customerId = sessionStorage.getItem('customer_id');
        
        if (!customerId) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Could not find customer information",
          });
          setLoading(false);
          return;
        }

        // Fetch REIT data
        const { data: reitData, error: reitError } = await supabase
          .from('reit')
          .select('dividend_yield');
          
        if (reitError) {
          console.error("REIT error:", reitError);
        }
        
        // Fetch NPS data for customer
        const { data: npsData, error: npsError } = await supabase
          .from('nps')
          .select('*')
          .eq('customer_id', customerId);
          
        if (npsError) {
          console.error("NPS error:", npsError);
        }
        
        // Fetch FD data
        const { data: fdData, error: fdError } = await supabase
          .from('fd')
          .select('*');
          
        if (fdError) {
          console.error("FD error:", fdError);
        }
        
        // Fetch SGB data
        const { data: sgbData, error: sgbError } = await supabase
          .from('sgb')
          .select('*');
          
        if (sgbError) {
          console.error("SGB error:", sgbError);
        }
        
        // Fetch stocks data
        const { data: stocksData, error: stocksError } = await supabase
          .from('stocks')
          .select('*');
          
        if (stocksError) {
          console.error("Stocks error:", stocksError);
        }
        
        // Fetch mutual funds data
        const { data: mutualFundsData, error: mutualFundsError } = await supabase
          .from('mutual_funds')
          .select('*');
          
        if (mutualFundsError) {
          console.error("Mutual funds error:", mutualFundsError);
        }
        
        // Process and set the data
        setInvestmentStats({
          reit: { 
            yield: reitData?.length ? `${reitData[0].dividend_yield}%` : "7.2%", 
            holdings: reitData?.length.toString() || "3" 
          },
          nps: { 
            value: npsData?.length ? `₹${calculateTotalValue(npsData, 'contribution')}` : "₹4,85,000", 
            return: "8.4%" 
          },
          fdrd: { 
            value: fdData?.length ? `₹${calculateTotalValue(fdData, 'maturity_deposit')}` : "₹3,50,000", 
            interest: fdData?.length ? `${calculateAverageRate(fdData, 'rate')}%` : "6.8%" 
          },
          sgb: { 
            quantity: sgbData?.length ? `${calculateTotalQuantity(sgbData)}g` : "30g", 
            value: sgbData?.length ? `₹${calculateSgbValue(sgbData)}` : "₹1,85,000" 
          },
          demat: { 
            holdings: stocksData?.length.toString() || "18", 
            value: stocksData?.length ? `₹${formatCurrency(calculateTotalStockValue(stocksData))}` : "₹7,25,000" 
          },
          mutualFunds: { 
            value: "₹5,60,000", 
            funds: mutualFundsData?.length.toString() || "7" 
          }
        });
      } catch (error) {
        console.error("Error fetching investment data:", error);
        toast({
          variant: "destructive",
          title: "Data Loading Error",
          description: "Failed to load investment data from database",
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchInvestmentData();
  }, [toast]);

  // Helper functions
  const calculateTotalValue = (data, field) => {
    if (!data || !data.length) return 0;
    const total = data.reduce((sum, item) => sum + (parseFloat(item[field]) || 0), 0);
    return formatCurrency(total);
  };

  const calculateAverageRate = (data, field) => {
    if (!data || !data.length) return 0;
    const sum = data.reduce((total, item) => total + (parseFloat(item[field]) || 0), 0);
    return (sum / data.length).toFixed(1);
  };

  const calculateTotalQuantity = (sgbData) => {
    if (!sgbData || !sgbData.length) return 0;
    return sgbData.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
  };

  const calculateSgbValue = (sgbData) => {
    if (!sgbData || !sgbData.length) return 0;
    const totalValue = sgbData.reduce((sum, item) => {
      return sum + (parseInt(item.quantity) || 0) * (parseFloat(item.purchase_price) || 0);
    }, 0);
    return formatCurrency(totalValue);
  };

  const calculateTotalStockValue = (stocksData) => {
    if (!stocksData || !stocksData.length) return 0;
    return stocksData.reduce((sum, stock) => {
      const price = parseFloat(stock.current_price.replace(/[^\d.-]/g, '')) || 0;
      return sum + price;
    }, 0);
  };

  const formatCurrency = (value) => {
    if (value >= 100000) {
      return `${(value / 100000).toFixed(2)}L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toFixed(0);
  };

  return (
    <div className="min-h-screen bg-banking-darkBg pb-20">
      <Navbar />
      
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-banking-white mb-2">Investment Dashboard</h1>
        <p className="text-banking-silver mb-8">Manage and track your investments</p>
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-pulse text-banking-white">Loading investment data...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InvestmentCard 
              title="REIT" 
              description="Real Estate Investment Trusts" 
              icon={Building} 
              to="/reit" 
              stats={[
                { label: "Average Yield", value: investmentStats.reit.yield },
                { label: "Holdings", value: investmentStats.reit.holdings }
              ]}
            />
            
            <InvestmentCard 
              title="National Pension System" 
              description="Long-term retirement savings" 
              icon={ChartBarStacked} 
              to="/nps" 
              stats={[
                { label: "Total Value", value: investmentStats.nps.value },
                { label: "YTD Return", value: investmentStats.nps.return }
              ]}
            />
            
            <InvestmentCard 
              title="FD/RD" 
              description="Fixed & Recurring Deposits" 
              icon={PiggyBank} 
              to="/fdrd" 
              stats={[
                { label: "Total Value", value: investmentStats.fdrd.value },
                { label: "Avg. Interest", value: investmentStats.fdrd.interest }
              ]}
            />
            
            <InvestmentCard 
              title="SGB" 
              description="Sovereign Gold Bonds" 
              icon={FileLock} 
              to="/sgb" 
              stats={[
                { label: "Quantity", value: investmentStats.sgb.quantity },
                { label: "Current Value", value: investmentStats.sgb.value }
              ]}
            />
            
            <InvestmentCard 
              title="DEMAT" 
              description="Dematerialized Stocks & Securities" 
              icon={Briefcase} 
              to="/demat" 
              stats={[
                { label: "Holdings", value: investmentStats.demat.holdings },
                { label: "Market Value", value: investmentStats.demat.value }
              ]}
            />
            
            <InvestmentCard 
              title="Mutual Funds" 
              description="Diversified Fund Investments" 
              icon={ChartPie} 
              to="/mutual-fund" 
              stats={[
                { label: "Total Value", value: investmentStats.mutualFunds.value },
                { label: "Funds", value: investmentStats.mutualFunds.funds }
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
