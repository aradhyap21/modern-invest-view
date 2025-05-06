
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export const ProfileDropdown: React.FC = () => {
  const [customerName, setCustomerName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = sessionStorage.getItem('customer_name');
    if (name) {
      setCustomerName(name);
    }
  }, []);

  const handleSignOut = () => {
    // Clear session storage
    sessionStorage.removeItem('customer_id');
    sessionStorage.removeItem('customer_name');
    
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-banking-darkGray rounded-md shadow-lg overflow-hidden z-50">
      <div className="px-4 py-2 border-b border-banking-purple/20">
        <p className="text-sm font-medium text-banking-white">{customerName}</p>
      </div>
      <div className="py-1">
        <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-banking-white hover:bg-banking-purple/20">
          <User className="h-4 w-4 mr-2" />
          <span>My Profile</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center px-4 py-2 text-sm text-banking-white hover:bg-banking-purple/20"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
