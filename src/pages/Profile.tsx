
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { fetchProfileData } from '@/services/profileService';

const ProfilePage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [branchDetails, setBranchDetails] = useState({
    branchId: "",
    name: "",
    ifscCode: ""
  });
  
  const [amcDetails, setAmcDetails] = useState({
    amcId: "",
    name: "",
    licenseId: ""
  });
  
  const [regulatoryDetails, setRegulatoryDetails] = useState({
    regulatoryId: "",
    name: "",
    country: "",
    regulations: ""
  });
  
  const [customerData, setCustomerData] = useState({
    name: "",
    accountId: "",
    phone: ""
  });

  useEffect(() => {
    async function loadProfileData() {
      setLoading(true);
      
      try {
        const data = await fetchProfileData();
        
        setCustomerData(data.customerData);
        setBranchDetails(data.branchData);
        setAmcDetails(data.amcData);
        setRegulatoryDetails(data.regulatoryData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast({
          variant: "destructive",
          title: "Data Loading Error",
          description: "Failed to load profile data from database",
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadProfileData();
  }, [toast]);

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
          <ProfileInfo customerData={customerData} loading={loading} />
        </div>
        
        <ProfileTabs 
          branchDetails={branchDetails}
          amcDetails={amcDetails}
          regulatoryDetails={regulatoryDetails}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
