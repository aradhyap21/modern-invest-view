
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileInfoProps {
  customerData: {
    name: string;
    accountId: string;
    phone: string;
  };
  loading: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ customerData, loading }) => {
  if (loading) {
    return (
      <Card className="bg-banking-darkGray border-banking-purple/20">
        <CardHeader>
          <CardTitle className="text-banking-white">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse flex items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-banking-purple/30 mr-6"></div>
            <div className="space-y-2">
              <div className="h-4 bg-banking-purple/30 rounded w-32"></div>
              <div className="h-3 bg-banking-purple/30 rounded w-24"></div>
              <div className="h-3 bg-banking-purple/30 rounded w-20"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-banking-darkGray border-banking-purple/20">
      <CardHeader>
        <CardTitle className="text-banking-white">Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-6">
          <div className="h-20 w-20 rounded-full bg-banking-purple flex items-center justify-center text-2xl font-bold text-white mr-6">
            {customerData.name.split(' ').map(name => name[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-banking-white">{customerData.name}</h2>
            <p className="text-banking-silver">Account ID: {customerData.accountId}</p>
            <p className="text-banking-silver">+{customerData.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
