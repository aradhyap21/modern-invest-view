
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";
import { formatCurrency } from '@/utils/formatters';
import { Skeleton } from '@/components/ui/skeleton';

type CustomerInvestment = {
  customerId: number;
  customerName: string;
  reit: string;
  nps: string;
  fd: string;
  sgb: string;
  stocks: string;
  mutualFunds: string;
};

export const InvestmentsByCustomer = () => {
  const [loading, setLoading] = useState(true);
  const [customerInvestments, setCustomerInvestments] = useState<CustomerInvestment[]>([]);

  useEffect(() => {
    async function fetchAllInvestmentsData() {
      setLoading(true);
      try {
        // Fetch customer data first
        const { data: customerData, error: customerError } = await supabase
          .from('customer')
          .select('customer_id, name');
        
        if (customerError) {
          console.error("Customer fetch error:", customerError);
          return;
        }
        
        // Initialize data structure for all customers
        const investmentsByCustomer: CustomerInvestment[] = customerData.map((customer) => ({
          customerId: customer.customer_id,
          customerName: customer.name,
          reit: "₹0",
          nps: "₹0",
          fd: "₹0",
          sgb: "₹0",
          stocks: "₹0",
          mutualFunds: "₹0"
        }));
        
        // Fetch REIT data
        const { data: reitData, error: reitError } = await supabase
          .from('reit')
          .select('*');
        
        if (!reitError && reitData) {
          // For demonstration, distribute REIT data among customers
          reitData.forEach((reit, index) => {
            const customerIndex = index % investmentsByCustomer.length;
            investmentsByCustomer[customerIndex].reit = `₹${formatCurrency(reit.value || 0)}`;
          });
        }
        
        // Fetch NPS data
        const { data: npsData, error: npsError } = await supabase
          .from('nps')
          .select('*');
          
        if (!npsError && npsData) {
          npsData.forEach(nps => {
            const customerIndex = investmentsByCustomer.findIndex(c => c.customerId === nps.customer_id);
            if (customerIndex >= 0) {
              investmentsByCustomer[customerIndex].nps = `₹${formatCurrency(nps.contribution || 0)}`;
            }
          });
        }
        
        // Fetch FD data
        const { data: fdData, error: fdError } = await supabase
          .from('fd')
          .select('*');
          
        if (!fdError && fdData) {
          // For demonstration, distribute FD data among customers
          fdData.forEach((fd, index) => {
            const customerIndex = index % investmentsByCustomer.length;
            investmentsByCustomer[customerIndex].fd = `₹${formatCurrency(fd.maturity_deposit || 0)}`;
          });
        }
        
        // Fetch SGB data
        const { data: sgbData, error: sgbError } = await supabase
          .from('sgb')
          .select('*');
          
        if (!sgbError && sgbData) {
          // For demonstration, distribute SGB data among customers
          sgbData.forEach((sgb, index) => {
            const customerIndex = index % investmentsByCustomer.length;
            // Fixed: The sgb object doesn't have a quantity property
            // Instead, use purchase_price as the value 
            investmentsByCustomer[customerIndex].sgb = `₹${formatCurrency(sgb.purchase_price || 0)}`;
          });
        }
        
        // Fetch stocks data
        const { data: stocksData, error: stocksError } = await supabase
          .from('stocks')
          .select('*');
          
        if (!stocksError && stocksData) {
          // For demonstration, distribute stocks data among customers
          stocksData.forEach((stock, index) => {
            const customerIndex = index % investmentsByCustomer.length;
            investmentsByCustomer[customerIndex].stocks = `₹${formatCurrency(stock.current_price || 0)}`;
          });
        }
        
        // Fetch mutual funds data (for this demo, we'll just assign some values)
        const { data: mutualFundsData, error: mutualFundsError } = await supabase
          .from('mutual_funds')
          .select('*');
          
        if (!mutualFundsError && mutualFundsData) {
          // For demonstration, distribute mutual funds data among customers
          mutualFundsData.forEach((fund, index) => {
            const customerIndex = index % investmentsByCustomer.length;
            // Using random value since mutual fund value is not in the schema
            const randomValue = Math.floor(Math.random() * 1000000) + 50000;
            investmentsByCustomer[customerIndex].mutualFunds = `₹${formatCurrency(randomValue)}`;
          });
        }
        
        setCustomerInvestments(investmentsByCustomer);
      } catch (error) {
        console.error("Error fetching investment data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAllInvestmentsData();
  }, []);

  if (loading) {
    return (
      <Card className="p-6 mt-8 bg-banking-darkGray border-banking-purple/20">
        <div className="space-y-2">
          <Skeleton className="h-8 w-full bg-banking-darkGray/50" />
          <Skeleton className="h-8 w-full bg-banking-darkGray/50" />
          <Skeleton className="h-8 w-full bg-banking-darkGray/50" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 mt-8 bg-banking-darkGray border-banking-purple/20">
      <h2 className="text-2xl font-bold text-banking-white mb-4">Customer Investments</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Investment portfolio for all customers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-banking-white">Customer</TableHead>
              <TableHead className="text-banking-white">REIT</TableHead>
              <TableHead className="text-banking-white">NPS</TableHead>
              <TableHead className="text-banking-white">FD/RD</TableHead>
              <TableHead className="text-banking-white">SGB</TableHead>
              <TableHead className="text-banking-white">DEMAT</TableHead>
              <TableHead className="text-banking-white">Mutual Funds</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerInvestments.map((customer) => (
              <TableRow key={customer.customerId}>
                <TableCell className="font-medium text-banking-white">{customer.customerName}</TableCell>
                <TableCell className="text-banking-white">{customer.reit}</TableCell>
                <TableCell className="text-banking-white">{customer.nps}</TableCell>
                <TableCell className="text-banking-white">{customer.fd}</TableCell>
                <TableCell className="text-banking-white">{customer.sgb}</TableCell>
                <TableCell className="text-banking-white">{customer.stocks}</TableCell>
                <TableCell className="text-banking-white">{customer.mutualFunds}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
