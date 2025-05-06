
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NpsPage = () => {
  // Sample NPS data
  const npsData = [
    {
      id: "NPS-001",
      customerId: "CUST-45782",
      accountId: "NPSA-78452",
      contribution: "₹2,000/month",
      maturityAge: "60 years",
      fundChoice: "Balanced"
    },
    {
      id: "NPS-002",
      customerId: "CUST-45782",
      accountId: "NPSA-78453",
      contribution: "₹5,000/month",
      maturityAge: "60 years",
      fundChoice: "Aggressive"
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
          <h1 className="text-3xl font-bold text-banking-white">National Pension System</h1>
        </div>
        
        <div className="grid gap-6">
          {npsData.map((nps) => (
            <Card key={nps.id} className="bg-banking-darkGray border-banking-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-banking-white text-xl">NPS {nps.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <div className="text-sm text-banking-silver">NPS ID</div>
                    <div className="text-lg font-medium text-banking-white">{nps.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Customer ID</div>
                    <div className="text-lg font-medium text-banking-white">{nps.customerId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Account ID</div>
                    <div className="text-lg font-medium text-banking-white">{nps.accountId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Contribution</div>
                    <div className="text-lg font-medium text-banking-white">{nps.contribution}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Maturity Age</div>
                    <div className="text-lg font-medium text-banking-white">{nps.maturityAge}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Fund Choice</div>
                    <div className="text-lg font-medium text-banking-white">{nps.fundChoice}</div>
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

export default NpsPage;
