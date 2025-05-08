
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BranchDetails } from './BranchDetails';
import { AMCDetails } from './AMCDetails';
import { RegulatoryDetails } from './RegulatoryDetails';

interface ProfileTabsProps {
  branchDetails: {
    branchId: string;
    name: string;
    ifscCode: string;
  };
  amcDetails: {
    amcId: string;
    name: string;
    licenseId: string;
  };
  regulatoryDetails: {
    regulatoryId: string;
    name: string;
    country: string;
    regulations: string;
  };
  loading: boolean;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  branchDetails,
  amcDetails,
  regulatoryDetails,
  loading
}) => {
  return (
    <Tabs defaultValue="branch" className="mb-6">
      <TabsList className="bg-banking-darkGray border border-banking-purple/20">
        <TabsTrigger value="branch" className="data-[state=active]:bg-banking-purple">Branch Details</TabsTrigger>
        <TabsTrigger value="amc" className="data-[state=active]:bg-banking-purple">AMC Details</TabsTrigger>
        <TabsTrigger value="regulatory" className="data-[state=active]:bg-banking-purple">Regulatory Info</TabsTrigger>
      </TabsList>
      
      <TabsContent value="branch" className="mt-6">
        <BranchDetails branchDetails={branchDetails} loading={loading} />
      </TabsContent>
      
      <TabsContent value="amc" className="mt-6">
        <AMCDetails amcDetails={amcDetails} loading={loading} />
      </TabsContent>
      
      <TabsContent value="regulatory" className="mt-6">
        <RegulatoryDetails regulatoryDetails={regulatoryDetails} loading={loading} />
      </TabsContent>
    </Tabs>
  );
};
