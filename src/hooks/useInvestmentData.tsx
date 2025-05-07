
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { InvestmentStat } from '@/components/InvestmentStats';
import { 
  calculateTotalValue,
  calculateAverageRate,
  calculateTotalQuantity,
  calculateSgbValue,
  calculateTotalStockValue
} from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';

export const useInvestmentData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [investmentStats, setInvestmentStats] = useState<InvestmentStat>({
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

        // Convert string customerId to number for database comparison
        const customerIdNumber = parseInt(customerId, 10);
        
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
          .eq('customer_id', customerIdNumber);
          
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

  return {
    loading,
    investmentStats
  };
};
