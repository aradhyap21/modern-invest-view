
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MutualFundPage = () => {
  // Sample Mutual Fund data
  const fundData = [
    {
      id: "MF-001",
      category: "Large Cap Equity",
      riskLevel: "High"
    },
    {
      id: "MF-002",
      category: "Mid Cap Equity",
      riskLevel: "High"
    },
    {
      id: "MF-003",
      category: "Small Cap Equity",
      riskLevel: "Very High"
    },
    {
      id: "MF-004",
      category: "Debt Fund",
      riskLevel: "Low"
    },
    {
      id: "MF-005",
      category: "Balanced Advantage Fund",
      riskLevel: "Moderate"
    }
  ];

  return (
    <div className="min-h-screen bg-banking-darkBg pb-20">
      <Navbar />
      
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" className="mr-2 text-banking-silver hover:text-banking-white p-0">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-banking-white">Mutual Funds</h1>
        </div>
        
        <div className="grid gap-6">
          {fundData.map((fund) => (
            <Card key={fund.id} className="bg-banking-darkGray border-banking-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-banking-white text-xl">{fund.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <div className="text-sm text-banking-silver">Fund ID</div>
                    <div className="text-lg font-medium text-banking-white">{fund.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Category</div>
                    <div className="text-lg font-medium text-banking-white">{fund.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Risk Level</div>
                    <div className="text-lg font-medium text-banking-white">{fund.riskLevel}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MutualFundPage;
