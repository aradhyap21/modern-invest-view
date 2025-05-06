
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SgbPage = () => {
  // Sample SGB data
  const sgbData = [
    {
      id: "SGB-001",
      issuer: "Reserve Bank of India",
      quantity: "10g",
      purchasePrice: "₹5,100/g",
      deadline: "15 Apr 2028"
    },
    {
      id: "SGB-002",
      issuer: "Reserve Bank of India",
      quantity: "20g",
      purchasePrice: "₹4,950/g",
      deadline: "22 Oct 2027"
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
          <h1 className="text-3xl font-bold text-banking-white">Sovereign Gold Bonds</h1>
        </div>
        
        <div className="grid gap-6">
          {sgbData.map((sgb) => (
            <Card key={sgb.id} className="bg-banking-darkGray border-banking-purple/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-banking-white text-xl">Bond {sgb.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
                  <div>
                    <div className="text-sm text-banking-silver">SGB ID</div>
                    <div className="text-lg font-medium text-banking-white">{sgb.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Issuer</div>
                    <div className="text-lg font-medium text-banking-white">{sgb.issuer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Quantity</div>
                    <div className="text-lg font-medium text-banking-white">{sgb.quantity}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Purchase Price</div>
                    <div className="text-lg font-medium text-banking-white">{sgb.purchasePrice}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Deadline</div>
                    <div className="text-lg font-medium text-banking-white">{sgb.deadline}</div>
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

export default SgbPage;
