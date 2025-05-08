
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BranchDetailsProps {
  branchDetails: {
    branchId: string;
    name: string;
    ifscCode: string;
  };
  loading: boolean;
}

export const BranchDetails: React.FC<BranchDetailsProps> = ({ branchDetails, loading }) => {
  if (loading) {
    return (
      <Card className="bg-banking-darkGray border-banking-purple/20">
        <CardHeader>
          <CardTitle className="text-banking-white">Branch Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div className="text-sm text-banking-silver">Field {item}</div>
                <div className="h-5 bg-banking-purple/30 rounded w-24 mt-1"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
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
  );
};
