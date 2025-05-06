
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';

interface AuthCheckProps {
  children: React.ReactNode;
}

export const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const customerID = sessionStorage.getItem('customer_id');
    
    if (!customerID) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to access this page",
      });
      navigate('/');
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, toast]);

  if (isAuthenticated === null) {
    // Still checking authentication
    return <div className="min-h-screen bg-banking-darkBg flex items-center justify-center">
      <div className="animate-pulse text-banking-white">Loading...</div>
    </div>;
  }

  return isAuthenticated ? <>{children}</> : null;
};
