
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/components/ui/use-toast';

export type CustomerData = {
  name: string;
  accountId: string;
  phone: string;
}

export type BranchDetails = {
  branchId: string;
  name: string;
  ifscCode: string;
}

export type AMCDetails = {
  amcId: string;
  name: string;
  licenseId: string;
}

export type RegulatoryDetails = {
  regulatoryId: string;
  name: string;
  country: string;
  regulations: string;
}

export async function fetchProfileData() {
  // Get customer ID from session storage
  const customerId = sessionStorage.getItem('customer_id');
  
  if (!customerId) {
    throw new Error("Could not find customer information");
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
  
  // Fetch branch data
  const { data: branchData, error: branchError } = await supabase
    .from('branch')
    .select('*')
    .limit(1)
    .single();
  
  if (branchError && branchError.code !== 'PGRST116') {
    console.error("Branch error:", branchError);
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
  
  // Fetch regulatory data
  const { data: regulatoryData, error: regulatoryError } = await supabase
    .from('regulatory_body')
    .select('*')
    .limit(1)
    .single();
    
  if (regulatoryError && regulatoryError.code !== 'PGRST116') {
    console.error("Regulatory error:", regulatoryError);
  }

  return {
    customerData: {
      name: customerData?.name || "",
      accountId: accountData ? accountData.account_id.toString() : 'No account found',
      phone: customerData?.mobile_number ? customerData.mobile_number.toString() : ''
    },
    branchData: branchData ? {
      branchId: branchData.branch_id.toString(),
      name: branchData.name,
      ifscCode: branchData.ifsc_code
    } : {
      branchId: "",
      name: "",
      ifscCode: ""
    },
    amcData: amcData ? {
      amcId: amcData.amc_id.toString(),
      name: amcData.name,
      licenseId: amcData.license_id
    } : {
      amcId: "",
      name: "",
      licenseId: ""
    },
    regulatoryData: regulatoryData ? {
      regulatoryId: regulatoryData.regulatory_id.toString(),
      name: regulatoryData.name,
      country: regulatoryData.country,
      regulations: regulatoryData.regulation
    } : {
      regulatoryId: "",
      name: "",
      country: "",
      regulations: ""
    }
  };
}
