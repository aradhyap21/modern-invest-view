
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, LogOut, User } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';

export const Navbar: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 nav-gradient border-b border-banking-purple/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center">
          <div className="bg-banking-purple h-8 w-8 rounded-md flex items-center justify-center mr-3">
            <span className="font-bold text-white">F</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-banking-white">FinanceHub</span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <Link to="/tax-details">
            <Button variant="outline" className="border-banking-purple/30 bg-transparent text-banking-white hover:bg-banking-purple/10" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              <span>Tax Details</span>
            </Button>
          </Link>
          
          <div className="relative">
            <Button 
              variant="outline" 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="border-banking-purple/30 bg-transparent text-banking-white hover:bg-banking-purple/10"
              size="sm"
            >
              <User className="h-4 w-4 mr-2" />
              <span>Profile</span>
            </Button>
            {isProfileOpen && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </nav>
  );
};
