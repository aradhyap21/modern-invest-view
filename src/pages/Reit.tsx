
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ReitPage = () => {
  // Sample REIT data
  const reitData = [
    {
      id: "REIT-001",
      value: "₹2,50,000",
      regulationCountry: "India",
      dividendYield: "7.2%"
    },
    {
      id: "REIT-002",
      value: "₹1,75,000",
      regulationCountry: "USA",
      dividendYield: "6.5%"
    },
    {
      id: "REIT-003",
      value: "₹3,20,000",
      regulationCountry: "Singapore",
      dividendYield: "8.1%"
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
          <h1 className="text-3xl font-bold text-banking-white">Real Estate Investment Trusts</h1>
        </div>
        
        <div className="grid gap-6">
          {reitData.map((reit) => (
            <Card key={reit.id} className="bg-banking-darkGray border-banking-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-banking-white text-xl">REIT {reit.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div>
                    <div className="text-sm text-banking-silver">REIT ID</div>
                    <div className="text-lg font-medium text-banking-white">{reit.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Value</div>
                    <div className="text-lg font-medium text-banking-white">{reit.value}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Regulation Country</div>
                    <div className="text-lg font-medium text-banking-white">{reit.regulationCountry}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Dividend Yield</div>
                    <div className="text-lg font-medium text-banking-white">{reit.dividendYield}</div>
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

export default ReitPage;
