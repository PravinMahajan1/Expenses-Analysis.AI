
import React, { useState } from 'react';
import { SearchIcon as SearchInputIcon, QuestionIcon } from '../constants'; // Renamed to avoid conflict

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const suggestions = ['Mobile Recharge', 'Loan Repayment', 'Rent', 'Free Credit Score', 'Refer & Earn ₹200', 'Electricity', 'FASTag', 'Mutual Funds'];

  return (
    <div className="p-4 bg-white min-h-full">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Search</h1>
        <button type="button" className="text-gray-600">
          <QuestionIcon className="w-7 h-7" />
        </button>
      </header>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchInputIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for 'contacts'"
          className="w-full pl-10 pr-4 py-3 bg-purple-50 text-gray-700 rounded-xl border border-transparent focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none"
        />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Search For</h2>
        <div className="flex flex-wrap gap-3">
          {suggestions.map((suggestion) => (
            <button 
              key={suggestion}
              type="button"
              className="bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-purple"
              onClick={() => setSearchTerm(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;