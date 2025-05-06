
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  // Sample profile data
  const branchDetails = {
    branchId: "BR-00789",
    name: "Financial District Branch",
    ifscCode: "FINB0001234"
  };
  
  const amcDetails = {
    amcId: "AMC-10245",
    name: "Quantum Asset Management",
    licenseId: "SEBI/AMC/0121/2008"
  };
  
  const regulatoryDetails = {
    regulatoryId: "REG-11578",
    name: "Securities and Exchange Board of India",
    country: "India",
    regulations: "SEBI Regulations, 1996"
  };

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
          <h1 className="text-3xl font-bold text-banking-white">User Profile</h1>
        </div>
        
        <div className="mb-8">
          <Card className="bg-banking-darkGray border-banking-purple/20">
            <CardHeader>
              <CardTitle className="text-banking-white">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-6">
                <div className="h-20 w-20 rounded-full bg-banking-purple flex items-center justify-center text-2xl font-bold text-white mr-6">
                  JD
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-banking-white">John Doe</h2>
                  <p className="text-banking-silver">john.doe@example.com</p>
                  <p className="text-banking-silver">+91 98765 43210</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="branch" className="mb-6">
          <TabsList className="bg-banking-darkGray border border-banking-purple/20">
            <TabsTrigger value="branch" className="data-[state=active]:bg-banking-purple">Branch Details</TabsTrigger>
            <TabsTrigger value="amc" className="data-[state=active]:bg-banking-purple">AMC Details</TabsTrigger>
            <TabsTrigger value="regulatory" className="data-[state=active]:bg-banking-purple">Regulatory Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="branch" className="mt-6">
            <Card className="bg-banking-darkGray border-banking-purple/20">
              <CardHeader>
                <CardTitle className="text-banking-white">Branch Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-banking-silver">Branch ID</div>
                    <div className="text-lg font-medium text-banking-white">{branchDetails.branchId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Name</div>
                    <div className="text-lg font-medium text-banking-white">{branchDetails.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">IFSC Code</div>
                    <div className="text-lg font-medium text-banking-white">{branchDetails.ifscCode}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="amc" className="mt-6">
            <Card className="bg-banking-darkGray border-banking-purple/20">
              <CardHeader>
                <CardTitle className="text-banking-white">Asset Management Company Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-banking-silver">AMC ID</div>
                    <div className="text-lg font-medium text-banking-white">{amcDetails.amcId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Name</div>
                    <div className="text-lg font-medium text-banking-white">{amcDetails.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">License ID</div>
                    <div className="text-lg font-medium text-banking-white">{amcDetails.licenseId}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regulatory" className="mt-6">
            <Card className="bg-banking-darkGray border-banking-purple/20">
              <CardHeader>
                <CardTitle className="text-banking-white">Regulatory Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-banking-silver">Regulatory ID</div>
                    <div className="text-lg font-medium text-banking-white">{regulatoryDetails.regulatoryId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Name</div>
                    <div className="text-lg font-medium text-banking-white">{regulatoryDetails.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Country</div>
                    <div className="text-lg font-medium text-banking-white">{regulatoryDetails.country}</div>
                  </div>
                  <div>
                    <div className="text-sm text-banking-silver">Regulations</div>
                    <div className="text-lg font-medium text-banking-white">{regulatoryDetails.regulations}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
