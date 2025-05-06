
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export const ProfileDropdown: React.FC = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-banking-darkGray rounded-md shadow-lg overflow-hidden z-50">
      <div className="py-1">
        <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-banking-white hover:bg-banking-purple/20">
          <User className="h-4 w-4 mr-2" />
          <span>My Profile</span>
        </Link>
        <Link to="/" className="flex items-center px-4 py-2 text-sm text-banking-white hover:bg-banking-purple/20">
          <LogOut className="h-4 w-4 mr-2" />
          <span>Sign Out</span>
        </Link>
      </div>
    </div>
  );
};
