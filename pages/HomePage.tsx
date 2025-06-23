
import React from 'react';
import { UserIcon, QuestionIcon, MobileOutlineIcon, BankIcon, MegaphoneIcon, RupeeIcon, MobileChargeIcon, HouseRupeeIcon, LightbulbIcon, MoneyBagIcon, ChevronRightIcon } from '../constants';

interface ServiceItemProps {
  icon: React.ElementType;
  label: string | React.ReactNode;
  iconBgClass: string;
  iconClass: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon: Icon, label, iconBgClass, iconClass }) => (
  <div className="flex flex-col items-center p-1 cursor-pointer group">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1.5 group-hover:opacity-80 transition-opacity ${iconBgClass}`}>
      <Icon className={`w-6 h-6 ${iconClass}`} />
    </div>
    <span className="text-xs text-center text-gray-700 leading-tight">{label}</span>
  </div>
);

interface InfoCardProps {
  title: string;
  subtitle: string | React.ReactNode;
  imageUrl: string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, subtitle, imageUrl, className = "" }) => (
  <div className={`bg-white p-3.5 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer ${className}`}>
    <div className="flex justify-between items-start">
        <div>
            <h3 className="font-semibold text-gray-800 mb-0.5 text-sm">{title}</h3>
            <div className="text-xs text-gray-500 leading-tight">{subtitle}</div>
        </div>
        <img src={imageUrl} alt={title} className="h-10 w-14 object-contain rounded-md self-start" />
    </div>
  </div>
);


const HomePage: React.FC = () => {
  return (
    <div className="bg-white min-h-full pb-16"> {/* Added pb-16 for bottom navbar space */}
      <header className="flex justify-between items-center py-3 px-4 mb-3 sticky top-0 bg-white z-50">
        <UserIcon src="https://picsum.photos/seed/useravatar1/40/40" className="w-9 h-9" />
        {/* Removed h1 title to match PhonePe UI */}
        <button type="button" className="text-gray-500 hover:text-brand-purple">
          <QuestionIcon className="w-7 h-7" />
        </button>
      </header>
      
      <div className="px-4 space-y-5">
        {/* Money Transfers Section */}
        <div className="pt-2">
          <h2 className="text-base font-semibold mb-3 text-gray-800">Money Transfers</h2>
          <div className="grid grid-cols-4 gap-x-2 gap-y-3 text-center">
            <ServiceItem icon={MobileOutlineIcon} label={<>To Mobile<br/>Number</>} iconBgClass="bg-brand-purple" iconClass="text-white" />
            <ServiceItem icon={BankIcon} label={<>To Bank &<br/>Self A/c</>} iconBgClass="bg-brand-purple" iconClass="text-white" />
            <ServiceItem icon={MegaphoneIcon} label={<>Refer & Get<br/>Upto ₹200</>} iconBgClass="bg-brand-purple" iconClass="text-white" />
            <ServiceItem icon={RupeeIcon} label={<>Check<br/>Balance</>} iconBgClass="bg-brand-purple" iconClass="text-white" />
          </div>
        </div>

        {/* Recharge & Bills Section */}
        <div className="pt-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-semibold text-gray-800">Recharge & Bills</h2>
            <button type="button" className="text-xs text-brand-purple font-medium hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-4 gap-x-2 gap-y-3 text-center bg-gray-50 p-4 rounded-xl">
            <ServiceItem icon={MobileChargeIcon} label="Recharge" iconBgClass="bg-brand-purple-light" iconClass="text-brand-purple" />
            <ServiceItem icon={HouseRupeeIcon} label="Rent" iconBgClass="bg-brand-purple-light" iconClass="text-brand-purple" />
            <ServiceItem icon={LightbulbIcon} label="Electricity" iconBgClass="bg-brand-purple-light" iconClass="text-brand-purple" />
            <ServiceItem icon={MoneyBagIcon} label="Loan EMI" iconBgClass="bg-brand-purple-light" iconClass="text-brand-purple" />
          </div>
        </div>

        {/* Other Sections Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <InfoCard 
            title="Loans" 
            subtitle="Personal, Gold and More" 
            imageUrl="https://picsum.photos/seed/LoansIllustration/100/70"
          />
          <InfoCard 
            title="Insurance" 
            subtitle={<span className="bg-purple-100 text-brand-purple px-1.5 py-0.5 rounded text-xs font-medium">Offer</span>} 
            imageUrl="https://picsum.photos/seed/InsuranceIllustration/100/70"
          />
          <InfoCard 
            title="Savings" 
            subtitle="Save Daily, Gold SIP" 
            imageUrl="https://picsum.photos/seed/SavingsIllustration/100/70"
          />
          <InfoCard 
            title="Travel & Transit" 
            subtitle={<><span className="block">Flight, Train, Bus,</span><span className="block">Hotel, Metro</span><span className="mt-1 inline-block bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded text-xs font-medium">Sale</span></>}
            imageUrl="https://picsum.photos/seed/TravelIllustration/100/70"
          />
          <InfoCard 
            title="Mutual Funds" 
            subtitle="SIPs & Investments" 
            imageUrl="https://picsum.photos/seed/MutualFundsIllustration/100/70"
            className="col-span-2" // Mutual Funds spans two columns
          />
        </div>
        
        {/* Placeholder for Bottom Banner */}
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg flex justify-between items-center shadow-lg cursor-pointer hover:opacity-90 transition-opacity">
            <div>
                <h3 className="font-semibold text-sm">Start SIP with just ₹100</h3>
                <p className="text-xs opacity-80">Invest regularly for a bright future.</p>
            </div>
            <ChevronRightIcon className="w-5 h-5"/>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
