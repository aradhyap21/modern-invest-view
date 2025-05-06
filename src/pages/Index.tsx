
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [name, setName] = useState('');
  const [pan, setPan] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Query the customer table to find a matching user
      const { data, error } = await supabase
        .from('customer')
        .select('customer_id, name, pan')
        .eq('name', name)
        .eq('pan', pan)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        // Store the customer ID in session storage for reference across the app
        sessionStorage.setItem('customer_id', data.customer_id.toString());
        sessionStorage.setItem('customer_name', data.name);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${data.name}`,
        });
        
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid name or PAN. Please check your credentials.",
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid name or PAN. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-banking-darkBg">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-banking-purple h-12 w-12 rounded-md flex items-center justify-center">
              <span className="text-xl font-bold text-white">F</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-banking-white">FinanceHub</h1>
          <p className="text-banking-silver mt-2">Access your investment portfolio</p>
        </div>
        
        <div className="login-gradient backdrop-blur-md border border-white/10 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-banking-white">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-banking-darkGray/50 border-banking-purple/20 text-banking-white"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pan" className="text-banking-white">PAN Number</Label>
              <Input
                id="pan"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                className="bg-banking-darkGray/50 border-banking-purple/20 text-banking-white"
                placeholder="ABCDE1234F"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-banking-purple hover:bg-banking-purple/90" 
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-banking-silver">
            <p>Please enter your registered name and PAN to login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
