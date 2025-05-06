
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login - in a real app, you'd validate with a backend
    setTimeout(() => {
      if (username && password) {
        toast({
          title: "Login Successful",
          description: "Welcome to your investment dashboard",
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Please check your credentials and try again",
        });
      }
      setLoading(false);
    }, 1000);
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
              <Label htmlFor="username" className="text-banking-white">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-banking-darkGray/50 border-banking-purple/20 text-banking-white"
                placeholder="Enter your username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-banking-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-banking-darkGray/50 border-banking-purple/20 text-banking-white"
                placeholder="••••••••"
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
            <p>Demo credentials: any username and password will work</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
