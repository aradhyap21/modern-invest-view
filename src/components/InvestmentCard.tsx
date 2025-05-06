
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface InvestmentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  to,
  stats
}) => {
  return (
    <Link to={to} className="group">
      <div className="card-gradient rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:shadow-banking-purple/10 hover:-translate-y-1 border border-banking-purple/20">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-banking-white mb-2">{title}</h3>
            <p className="text-sm text-banking-silver mb-4">{description}</p>
            
            {stats && (
              <div className="grid grid-cols-2 gap-4 mt-2">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-xs text-banking-silver">{stat.label}</div>
                    <div className="text-sm font-medium text-banking-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-banking-purple/20 p-3 rounded-lg">
            <Icon className="h-6 w-6 text-banking-purple" />
          </div>
        </div>
      </div>
    </Link>
  );
};
