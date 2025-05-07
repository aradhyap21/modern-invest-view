
import React from 'react';

export interface InvestmentStat {
  reit: { yield: string; holdings: string };
  nps: { value: string; return: string };
  fdrd: { value: string; interest: string };
  sgb: { quantity: string; value: string };
  demat: { holdings: string; value: string };
  mutualFunds: { value: string; funds: string };
}

interface InvestmentStatsProps {
  stats: InvestmentStat;
  loading: boolean;
}

export const InvestmentStats: React.FC<InvestmentStatsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-pulse text-banking-white">Loading investment data...</div>
      </div>
    );
  }
  
  return null; // This is just a container for the data, not rendering anything
};
