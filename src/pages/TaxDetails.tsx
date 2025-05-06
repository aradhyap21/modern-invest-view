
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TaxDetailsPage = () => {
  // Sample tax data
  const taxDetails = {
    panNumber: "ABCDE1234F",
    taxBracket: "30%",
    deadline: "31 July 2023"
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
          <h1 className="text-3xl font-bold text-banking-white">Tax Details</h1>
        </div>
        
        <Card className="bg-banking-darkGray border-banking-purple/20 mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-banking-white text-xl">Tax Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-banking-silver">PAN Number</div>
                <div className="text-lg font-medium text-banking-white">{taxDetails.panNumber}</div>
              </div>
              <div>
                <div className="text-sm text-banking-silver">Tax Bracket</div>
                <div className="text-lg font-medium text-banking-white">{taxDetails.taxBracket}</div>
              </div>
              <div>
                <div className="text-sm text-banking-silver">Filing Deadline</div>
                <div className="flex items-center">
                  <div className="text-lg font-medium text-banking-white mr-2">{taxDetails.deadline}</div>
                  <Calendar className="h-4 w-4 text-banking-purple" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-banking-darkGray border-banking-purple/20 animate-pulse-subtle">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-banking-purple/20 p-3 rounded-lg mr-4">
                <Calendar className="h-6 w-6 text-banking-purple" />
              </div>
              <div>
                <h3 className="text-banking-white font-semibold">Important Reminder</h3>
                <p className="text-banking-silver text-sm mt-1">
                  Your tax filing deadline is approaching. Please ensure all documents are submitted before {taxDetails.deadline}.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaxDetailsPage;
