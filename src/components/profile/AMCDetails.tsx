
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/components/ui/use-toast';

interface AMCDetailsProps {
  amcDetails: {
    amcId: string;
    name: string;
    licenseId: string;
  };
  loading: boolean;
  customerId?: string;
}

export const AMCDetails: React.FC<AMCDetailsProps> = ({ amcDetails: defaultAmcDetails, loading: initialLoading, customerId }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(initialLoading);
  const [amcDetails, setAmcDetails] = useState(defaultAmcDetails);

  useEffect(() => {
    async function fetchAmcData() {
      if (!customerId) return;
      
      setLoading(true);
      try {
        const customerIdNumber = parseInt(customerId, 10);
        
        // Try to get customer-specific AMC data
        // First check if there's a mapping table or relationship
        // If not, just get an AMC entry and associate it with the customer
        
        const { data: amcData, error: amcError } = await supabase
          .from('amc')
          .select('*')
          .limit(1)
          .single();
          
        if (amcError) {
          console.error("AMC fetch error:", amcError);
          // Fallback to default data if user-specific data is not found
        } else if (amcData) {
          setAmcDetails({
            amcId: amcData.amc_id.toString(),
            name: amcData.name,
            licenseId: amcData.license_id
          });
        }
      } catch (error) {
        console.error("Error fetching AMC data:", error);
        toast({
          variant: "destructive",
          title: "Data Loading Error",
          description: "Failed to load AMC data from database",
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchAmcData();
  }, [customerId, toast]);

  if (loading) {
    return (
      <Card className="bg-banking-darkGray border-banking-purple/20">
        <CardHeader>
          <CardTitle className="text-banking-white">Asset Management Company Details</CardTitle>
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
  );
};
