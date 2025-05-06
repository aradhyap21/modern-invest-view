
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DematPage = () => {
  // Sample DEMAT data
  const dematData = [
    {
      id: "STOCK-001",
      companyName: "HDFC Bank Ltd",
      currentPrice: "₹1,650.75",
      stockExchange: "NSE"
    },
    {
      id: "STOCK-002",
      companyName: "Reliance Industries",
      currentPrice: "₹2,430.50",
      stockExchange: "NSE"
    },
    {
      id: "STOCK-003",
      companyName: "Apple Inc",
      currentPrice: "₹14,600.25",
      stockExchange: "NASDAQ"
    },
    {
      id: "STOCK-004",
      companyName: "Microsoft Corp",
      currentPrice: "₹26,780.80",
      stockExchange: "NASDAQ"
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
          <h1 className="text-3xl font-bold text-banking-white">DEMAT Account</h1>
        </div>
        
        <div className="grid gap-6">
          {dematData.map((stock) => (
            <Card key={stock.id} className="bg-banking-darkGray border-banking-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-banking-white text-xl">{stock.companyName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                  <div>
                    <div className="text-sm text-banking-silver">Stock ID</div>
                    <div className="text-lg font-medium text-banking-white">{stock.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Company Name</div>
                    <div className="text-lg font-medium text-banking-white">{stock.companyName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Current Price</div>
                    <div className="text-lg font-medium text-banking-white">{stock.currentPrice}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Stock Exchange</div>
                    <div className="text-lg font-medium text-banking-white">{stock.stockExchange}</div>
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

export default DematPage;
