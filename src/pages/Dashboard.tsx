
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { InvestmentGrid } from '@/components/InvestmentGrid';
import { InvestmentStats } from '@/components/InvestmentStats';
import { useInvestmentData } from '@/hooks/useInvestmentData';

const Dashboard = () => {
  const { loading, investmentStats } = useInvestmentData();

  return (
    <div className="min-h-screen bg-banking-darkBg pb-20">
      <Navbar />
      
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-banking-white mb-2">Investment Dashboard</h1>
        <p className="text-banking-silver mb-8">Manage and track your investments</p>
        
        <InvestmentStats stats={investmentStats} loading={loading} />
        {!loading && <InvestmentGrid stats={investmentStats} />}
      </div>
    </div>
  );
};

export default Dashboard;
