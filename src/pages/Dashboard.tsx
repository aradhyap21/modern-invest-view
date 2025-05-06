
import React from 'react';
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

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-banking-darkBg pb-20">
      <Navbar />
      
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-banking-white mb-2">Investment Dashboard</h1>
        <p className="text-banking-silver mb-8">Manage and track your investments</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InvestmentCard 
            title="REIT" 
            description="Real Estate Investment Trusts" 
            icon={Building} 
            to="/reit" 
            stats={[
              { label: "Average Yield", value: "7.2%" },
              { label: "Holdings", value: "3" }
            ]}
          />
          
          <InvestmentCard 
            title="National Pension System" 
            description="Long-term retirement savings" 
            icon={ChartBarStacked} 
            to="/nps" 
            stats={[
              { label: "Total Value", value: "₹4,85,000" },
              { label: "YTD Return", value: "8.4%" }
            ]}
          />
          
          <InvestmentCard 
            title="FD/RD" 
            description="Fixed & Recurring Deposits" 
            icon={PiggyBank} 
            to="/fdrd" 
            stats={[
              { label: "Total Value", value: "₹3,50,000" },
              { label: "Avg. Interest", value: "6.8%" }
            ]}
          />
          
          <InvestmentCard 
            title="SGB" 
            description="Sovereign Gold Bonds" 
            icon={FileLock} 
            to="/sgb" 
            stats={[
              { label: "Quantity", value: "30g" },
              { label: "Current Value", value: "₹1,85,000" }
            ]}
          />
          
          <InvestmentCard 
            title="DEMAT" 
            description="Dematerialized Stocks & Securities" 
            icon={Briefcase} 
            to="/demat" 
            stats={[
              { label: "Holdings", value: "18" },
              { label: "Market Value", value: "₹7,25,000" }
            ]}
          />
          
          <InvestmentCard 
            title="Mutual Funds" 
            description="Diversified Fund Investments" 
            icon={ChartPie} 
            to="/mutual-fund" 
            stats={[
              { label: "Total Value", value: "₹5,60,000" },
              { label: "Funds", value: "7" }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
