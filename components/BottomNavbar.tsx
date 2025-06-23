
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, SearchIcon, ScanIcon, AlertsIcon, HistoryIcon } from '../constants';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCentral?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isCentral }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  if (isCentral) {
    return (
      <Link to={to} className="flex flex-col items-center justify-center -mt-6" aria-label="Scan and Pay">
        <div className={`p-4 rounded-full shadow-lg ${isActive ? 'bg-brand-purple-dark' : 'bg-brand-purple'} text-white`}>
          <Icon className="w-7 h-7" />
        </div>
        {/* Central button usually doesn't have a label or it's part of the icon design */}
      </Link>
    );
  }

  return (
    <Link to={to} className={`flex flex-col items-center justify-center flex-1 p-2 ${isActive ? 'text-brand-purple' : 'text-gray-500'}`}>
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-xs">{label}</span>
      {label === 'Alerts' && ( /* Example notification badge */
        <span className="absolute top-1 right-10 block h-4 w-4 transform translate-x-1/2 -translate-y-1/2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-red-500 text-white text-[10px]">1</span>
        </span>
      )}
    </Link>
  );
};

const BottomNavbar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-t-lg">
      <div className="flex justify-around items-center h-16">
        <NavItem to="/" icon={HomeIcon} label="Home" />
        <NavItem to="/search" icon={SearchIcon} label="Search" />
        <NavItem to="/scan" icon={ScanIcon} label="Scan & Pay" isCentral />
        <NavItem to="/alerts" icon={AlertsIcon} label="Alerts" />
        <NavItem to="/history" icon={HistoryIcon} label="History" />
      </div>
    </div>
  );
};

export default BottomNavbar;