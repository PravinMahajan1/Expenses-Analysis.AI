
import React from 'react';
import { Transaction, TransactionStatus, TransactionType } from './types';

// SVG Icons as React Components
export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const ScanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h10.5v10.5h-10.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5h3v3h-3zM16.5 4.5h3v3h-3zM4.5 16.5h3v3h-3zM16.5 16.5h3v3h-3z" />
  </svg>
);

export const AlertsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const QuestionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4h-1.024M10.25 15.75L9 17.001M15 17.001L13.75 15.75M9 12a2.25 2.25 0 004.5 0M12 17.25v.007" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string; src?: string }> = ({ className, src }) => (
  src ? <img src={src} alt="User" className={`rounded-full object-cover ${className}`} /> :
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16.5c2.572 0 4.985.655 7.029 1.738M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);


export const FilterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

export const TrendingUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export const TrendingDownIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
   <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// --- New Icons for HomePage Replication ---
export const MobileOutlineIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m-3-3a3 3 0 00-3 3m3-3h.008v.008h-.008v-.008zm0 3a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);

export const BankIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M8.25 21V10.5h7.5V21h-7.5zm1.5-12.75V3m4.5 5.25V3M12 21V10.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75L15.75 3H8.25L12 6.75z" />
    </svg>
);

export const MegaphoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 3.94A2.25 2.25 0 0112 3.75h0a2.25 2.25 0 011.66.19l5.223 3.822a2.82 2.82 0 01.667 4.095l-.348.478A2.82 2.82 0 0118.003 13H5.997a2.82 2.82 0 01-1.196-.957L4.453 12.05a2.82 2.82 0 01.667-4.095l5.223-3.822zM15 13h-3v4.25A2.25 2.25 0 0014.25 19.5h0A2.25 2.25 0 0016.5 17.25V13z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13H6.75A2.25 2.25 0 004.5 15.25v2A2.25 2.25 0 006.75 19.5H9v-6.5z" />
    </svg>
);

export const RupeeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 10h12M6 14h5.25A3.75 3.75 0 0015 10.25V8.5A2.5 2.5 0 0012.5 6H12m0 0V4.5M12 6v13.5m0-13.5C10.686 6 9.75 6.936 9.75 8S10.686 10 12 10s2.25-.936 2.25-2S13.314 6 12 6z" />
    </svg>
);

export const MobileChargeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3l1.5-1.5-1.5-1.5zm-1.5 4.5l3-3-3-3" /> {/* Simplified lightning */}
    </svg>
);

export const HouseRupeeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M2.25 12v7.5A2.25 2.25 0 004.5 21.75h15A2.25 2.25 0 0021.75 19.5V12M12 21.75V12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5H12m0-1.5v1.5m1.5 0H12m-1.5 3H12" /> {/* Simplified Rupee in circle */}
    </svg>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-3.75 0-7.5 2.625-7.5 6 0 2.148 1.284 4.072 3.195 5.087L6.75 18H9.75v1.5a.75.75 0 00.75.75h3a.75.75 0 00.75-.75V18h3l-1.055-4.663A6.002 6.002 0 0019.5 8.25c0-3.375-3.75-6-7.5-6zM9 21h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a.75.75 0 01-.75-.75V8.25a.75.75 0 011.5 0v6a.75.75 0 01-.75.75z" />
    </svg>
);

export const MoneyBagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 10.125V17.25m4.5-7.125V17.25M3.75 7.5L6 3.75m12 3.75L15.75 3.75M3 13.5h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 016 5.25h12a2.25 2.25 0 012.25 2.25v6.75A2.25 2.25 0 0118 16.5H6a2.25 2.25 0 01-2.25-2.25V7.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 8.25h1.5M11.25 15h1.5" />
    </svg>
);

// --- End of New Icons ---


const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Saanvi", "Aanya", "Aadhya", "Aaradhya", "Ananya", "Pari", "Diya", "Myra", "Anika", "Avni", "Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "Elijah", "Charlotte", "William", "Sophia", "James", "Amelia", "Benjamin", "Isabella", "Lucas", "Mia", "Henry", "Evelyn", "Alexander", "Harper"];
const lastNames = ["Sharma", "Verma", "Gupta", "Singh", "Kumar", "Patel", "Shah", "Mehta", "Joshi", "Das", "Chopra", "Malhotra", "Reddy", "Nair", "Iyer", "Menon", "Smith", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker"];
const businessNames = ["Enterprises", "Solutions", "Group", "Corp", "Inc.", "Services", "Store", "Agency", "Consulting", "Ventures"];
const foodPlaces = ["Cafe", "Restaurant", "Diner", "Eatery", "Bistro", "Grill", "Kitchen", "Bakery", "Pizzeria", "Cantina"];

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomFullName = () => `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
const getRandomBusinessName = () => `${getRandomElement(firstNames)} ${getRandomElement(businessNames)}`;
const getRandomFoodPlace = () => `The ${getRandomElement(firstNames)} ${getRandomElement(foodPlaces)}`;


export const MOCK_TRANSACTIONS: Transaction[] = [
  { 
    id: 'tx1', 
    type: TransactionType.CREDIT, 
    description: `Received from ${getRandomFullName()}`, 
    payeePayer: getRandomFullName(), 
    amount: 250, 
    date: '2025-06-16T18:44:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Transfer', 
    iconUrl: 'https://picsum.photos/seed/person1/40/40',
    transactionId: 'T2506161844157644654579',
    utr: '516717424815',
    accountIdentifier: 'XXXXXX0219'
  },
  { 
    id: 'tx2', 
    type: TransactionType.DEBIT, 
    description: `Paid to ${getRandomBusinessName()}`, 
    payeePayer: getRandomBusinessName(), 
    amount: 100, 
    date: '2025-06-16T06:22:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Payment', 
    iconUrl: 'https://picsum.photos/seed/business1/40/40',
    transactionId: 'T2506160622391126816138',
    utr: '413955190458',
    accountIdentifier: 'XXXXXX0219' 
  },
  { 
    id: 'tx3', 
    type: TransactionType.CREDIT, 
    description: `Received from ${getRandomFullName()}`, 
    payeePayer: getRandomFullName(), 
    amount: 100, 
    date: '2025-06-16T06:11:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Transfer',
    iconUrl: 'https://picsum.photos/seed/person2/40/40',
    transactionId: 'T25061606111430454759809',
    utr: '197700592996',
    accountIdentifier: 'XXXXXX0219' 
  },
  { 
    id: 'tx4', 
    type: TransactionType.DEBIT, 
    description: `Paid to ${getRandomBusinessName()}`, 
    payeePayer: getRandomBusinessName(), 
    amount: 60, 
    date: '2025-06-14T09:18:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Business', 
    iconUrl: 'https://picsum.photos/seed/business2/40/40',
    transactionId: 'T2506140918072610135622',
    utr: '106524620284',
    accountIdentifier: 'XXXXXX4374'
  },
  { 
    id: 'tx5', 
    type: TransactionType.DEBIT, 
    description: `Transfer to ${getRandomFullName()}`, 
    payeePayer: getRandomFullName(), 
    amount: 10, 
    date: '2025-06-14T09:02:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Transfer',
    iconUrl: 'https://picsum.photos/seed/person3/40/40',
    transactionId: 'T2506140902432876114261',
    utr: '660882245261',
    accountIdentifier: 'XXXXXX7498'
  },
  { 
    id: 'tx6', 
    type: TransactionType.DEBIT, 
    description: `Transfer to ${getRandomFullName()}`, 
    payeePayer: getRandomFullName(), 
    amount: 11, 
    date: '2025-06-14T09:02:00Z', 
    status: TransactionStatus.FAILED, 
    category: 'Transfer',
    iconUrl: 'https://picsum.photos/seed/person4/40/40',
    transactionId: 'T25061409021581912736032',
    utr: '968224268169',
    accountIdentifier: 'XXXXXX0219'
  },
  { 
    id: 'tx7', 
    type: TransactionType.CREDIT, 
    description: `Received from ${getRandomFullName()}`, 
    payeePayer: getRandomFullName(), 
    amount: 22000, 
    date: '2025-06-14T12:59:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Payment',
    iconUrl: 'https://picsum.photos/seed/person5/40/40',
    transactionId: 'T2506141259007691410407',
    utr: '125698838397',
    accountIdentifier: 'XXXXXX0219'
  },
  { 
    id: 'tx8', 
    type: TransactionType.DEBIT, 
    description: `Paid to ${getRandomBusinessName()}`, 
    payeePayer: getRandomBusinessName(), 
    amount: 70, 
    date: '2025-06-13T08:20:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Business',
    iconUrl: 'https://picsum.photos/seed/business3/40/40',
    transactionId: 'T2506130820320358107343957',
    utr: '651412281058',
    accountIdentifier: 'XXXXXX4374'
  },
  { 
    id: 'tx9', 
    type: TransactionType.DEBIT, 
    description: `Paid to ${getRandomFoodPlace()}`, 
    payeePayer: getRandomFoodPlace(), 
    amount: 70, 
    date: '2025-06-13T05:19:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Food',
    iconUrl: 'https://picsum.photos/seed/food1/40/40',
    transactionId: 'T250613051918196018706495',
    utr: '524489630081',
    accountIdentifier: 'XXXXXX4374'
  },
  { 
    id: '1', 
    type: TransactionType.DEBIT, 
    description: 'Mobile Recharge', 
    payeePayer: 'Jio', 
    amount: 99, 
    date: '2024-07-15T10:00:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Bills', 
    iconUrl: 'https://picsum.photos/seed/jio/40/40', 
    transactionId: 'T2407151000001', 
    utr: 'UTR001', 
    accountIdentifier: 'XXXXXX1111' 
  },
  { 
    id: '3', 
    type: TransactionType.CREDIT, 
    description: 'Salary Deposit', 
    payeePayer: 'Work Solutions Inc.', 
    amount: 50000, 
    date: '2024-07-01T09:00:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Salary', 
    iconUrl: 'https://picsum.photos/seed/work/40/40', 
    transactionId: 'T2407010900003', 
    utr: 'UTR003', 
    accountIdentifier: 'XXXXXX2222' 
  },
  { 
    id: '4', 
    type: TransactionType.DEBIT, 
    description: 'Rent Payment', 
    payeePayer: `${getRandomFullName()}`, 
    amount: 15000, 
    date: '2024-07-05T11:00:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Rent', 
    iconUrl: 'https://picsum.photos/seed/landlord/40/40',
    transactionId: 'T2407051100004', 
    utr: 'UTR004', 
    accountIdentifier: 'XXXXXX1111' 
  },
  { 
    id: '6', 
    type: TransactionType.DEBIT, 
    description: 'Online Shopping', 
    payeePayer: 'Ecomm Retailers', 
    amount: 2500, 
    date: '2024-07-12T18:45:00Z', 
    status: TransactionStatus.SUCCESS, 
    category: 'Shopping', 
    iconUrl: 'https://picsum.photos/seed/ecomm/40/40', 
    transactionId: 'T2407121845006', 
    utr: 'UTR006', 
    accountIdentifier: 'XXXXXX3333' 
  },
];

export const CHART_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28', '#FF8042', '#0088FE'];
