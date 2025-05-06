
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FdRdPage = () => {
  const [activeTab, setActiveTab] = useState("fd");
  
  // Sample FD data
  const fdData = [
    {
      id: "FD-001",
      depositId: "DEP-78451",
      rate: "6.8%",
      maturityDeposit: "₹1,05,000",
      maturityDate: "15 Dec 2025"
    },
    {
      id: "FD-002",
      depositId: "DEP-78452",
      rate: "7.2%",
      maturityDeposit: "₹2,25,000",
      maturityDate: "22 Mar 2026"
    }
  ];
  
  // Sample RD data
  const rdData = [
    {
      id: "RD-001",
      depositId: "DEP-91234",
      monthlyDeposit: "₹5,000",
      rate: "6.5%",
      maturityDate: "10 Apr 2026"
    },
    {
      id: "RD-002",
      depositId: "DEP-91235",
      monthlyDeposit: "₹10,000",
      rate: "6.7%",
      maturityDate: "18 Jul 2025"
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
          <h1 className="text-3xl font-bold text-banking-white">Fixed & Recurring Deposits</h1>
        </div>
        
        <Tabs defaultValue="fd" className="mb-6">
          <TabsList className="bg-banking-darkGray border border-banking-purple/20">
            <TabsTrigger value="fd" className="data-[state=active]:bg-banking-purple">Fixed Deposits</TabsTrigger>
            <TabsTrigger value="rd" className="data-[state=active]:bg-banking-purple">Recurring Deposits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fd" className="mt-6">
            <div className="grid gap-6">
              {fdData.map((fd) => (
                <Card key={fd.id} className="bg-banking-darkGray border-banking-purple/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-banking-white text-xl">Fixed Deposit {fd.id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
                      <div>
                        <div className="text-sm text-banking-silver">FD ID</div>
                        <div className="text-lg font-medium text-banking-white">{fd.id}</div>
                      </div>
                      <div>
                        <div className="text-sm text-banking-silver">Deposit ID</div>
                        <div className="text-lg font-medium text-banking-white">{fd.depositId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-banking-silver">Rate</div>
                        <div className="text-lg font-medium text-banking-white">{fd.rate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-banking-silver">Maturity Deposit</div>
                        <div className="text-lg font-medium text-banking-white">{fd.maturityDeposit}</div>
                      </div>
                      <div>
                        <div className="text-sm text-banking-silver">Maturity Date</div>
                        <div className="text-lg font-medium text-banking-white">{fd.maturityDate}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="rd" className="mt-6">
            <div className="grid gap-6">
              {rdData.map((rd) => (
                <Card key={rd.id} className="bg-banking-darkGray border-banking-purple/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-banking-white text-xl">Recurring Deposit {rd.id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
                      <div>
                        <div className="text-sm text-banking-silver">RD ID</div>
                        <div className="text-lg font-medium text-banking-white">{rd.id}</div>
                      </div>
                      <div>
                        <div className="text-sm text-banking-silver">Deposit ID</div>
                        <div className="text-lg font-medium text-banking-white">{rd.depositId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-banking-silver">Monthly Deposit</div>
                        <div className="text-lg font-medium text-banking-white">{rd.monthlyDeposit}</div>
                      </div>
                      <div>
                        <div className="text-sm text-banking-silver">Rate</div>
                        <div className="text-lg font-medium text-banking-white">{rd.rate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-banking-silver">Maturity Date</div>
                        <div className="text-lg font-medium text-banking-white">{rd.maturityDate}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FdRdPage;
