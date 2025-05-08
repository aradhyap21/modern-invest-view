
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/components/ui/use-toast';

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
    async function fetchProfileData() {
      setLoading(true);
      
      try {
        // Get customer ID from session storage
        const customerId = sessionStorage.getItem('customer_id');
        
        if (!customerId) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Could not find customer information",
          });
          setLoading(false);
          return;
        }
        
        // Convert string customerId to number for database comparison
        const customerIdNumber = parseInt(customerId, 10);
        
        // Fetch customer data
        const { data: customerData, error: customerError } = await supabase
          .from('customer')
          .select('*')
          .eq('customer_id', customerIdNumber)
          .single();
          
        if (customerError) {
          throw customerError;
        }
        
        // Fetch account data for this customer to get the account ID
        const { data: accountData, error: accountError } = await supabase
          .from('account')
          .select('account_id')
          .eq('customer_id', customerIdNumber)
          .maybeSingle();
          
        if (accountError && accountError.code !== 'PGRST116') {
          console.error("Account fetch error:", accountError);
        }
        
        if (customerData) {
          setCustomerData({
            name: customerData.name,
            accountId: accountData ? accountData.account_id.toString() : 'No account found',
            phone: customerData.mobile_number ? customerData.mobile_number.toString() : ''
          });
        }
        
        // Fetch branch data (using first branch as an example)
        const { data: branchData, error: branchError } = await supabase
          .from('branch')
          .select('*')
          .limit(1)
          .single();
        
        if (branchError && branchError.code !== 'PGRST116') {
          console.error("Branch error:", branchError);
        }
        
        if (branchData) {
          setBranchDetails({
            branchId: branchData.branch_id.toString(),
            name: branchData.name,
            ifscCode: branchData.ifsc_code
          });
        }
        
        // Fetch AMC data
        const { data: amcData, error: amcError } = await supabase
          .from('amc')
          .select('*')
          .limit(1)
          .single();
        
        if (amcError && amcError.code !== 'PGRST116') {
          console.error("AMC error:", amcError);
        }
        
        if (amcData) {
          setAmcDetails({
            amcId: amcData.amc_id.toString(),
            name: amcData.name,
            licenseId: amcData.license_id
          });
        }
        
        // Fetch regulatory data
        const { data: regulatoryData, error: regulatoryError } = await supabase
          .from('regulatory_body')
          .select('*')
          .limit(1)
          .single();
          
        if (regulatoryError && regulatoryError.code !== 'PGRST116') {
          console.error("Regulatory error:", regulatoryError);
        }
        
        if (regulatoryData) {
          setRegulatoryDetails({
            regulatoryId: regulatoryData.regulatory_id.toString(),
            name: regulatoryData.name,
            country: regulatoryData.country,
            regulations: regulatoryData.regulation
          });
        }
        
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
    
    fetchProfileData();
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
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-pulse text-banking-white">Loading profile data...</div>
          </div>
        ) : (
          <>
            <div className="mb-8">
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
