
import React from 'react';
import {
  Building,
  ChartBarStacked,
  PiggyBank,
  FileLock,
  Briefcase,
  ChartPie
} from 'lucide-react';
import { InvestmentCard } from '@/components/InvestmentCard';
import { InvestmentStat } from './InvestmentStats';

interface InvestmentGridProps {
  stats: InvestmentStat;
}

export const InvestmentGrid: React.FC<InvestmentGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InvestmentCard 
        title="REIT" 
        description="Real Estate Investment Trusts" 
        icon={Building} 
        to="/reit" 
        stats={[
          { label: "Average Yield", value: stats.reit.yield },
          { label: "Holdings", value: stats.reit.holdings }
        ]}
      />
      
      <InvestmentCard 
        title="National Pension System" 
        description="Long-term retirement savings" 
        icon={ChartBarStacked} 
        to="/nps" 
        stats={[
          { label: "Total Value", value: stats.nps.value },
          { label: "YTD Return", value: stats.nps.return }
        ]}
      />
      
      <InvestmentCard 
        title="FD/RD" 
        description="Fixed & Recurring Deposits" 
        icon={PiggyBank} 
        to="/fdrd" 
        stats={[
          { label: "Total Value", value: stats.fdrd.value },
          { label: "Avg. Interest", value: stats.fdrd.interest }
        ]}
      />
      
      <InvestmentCard 
        title="SGB" 
        description="Sovereign Gold Bonds" 
        icon={FileLock} 
        to="/sgb" 
        stats={[
          { label: "Quantity", value: stats.sgb.quantity },
          { label: "Current Value", value: stats.sgb.value }
        ]}
      />
      
      <InvestmentCard 
        title="DEMAT" 
        description="Dematerialized Stocks & Securities" 
        icon={Briefcase} 
        to="/demat" 
        stats={[
          { label: "Holdings", value: stats.demat.holdings },
          { label: "Market Value", value: stats.demat.value }
        ]}
      />
      
      <InvestmentCard 
        title="Mutual Funds" 
        description="Diversified Fund Investments" 
        icon={ChartPie} 
        to="/mutual-fund" 
        stats={[
          { label: "Total Value", value: stats.mutualFunds.value },
          { label: "Funds", value: stats.mutualFunds.funds }
        ]}
      />
    </div>
  );
};
