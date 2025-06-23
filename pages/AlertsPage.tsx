
import React from 'react';
import { QuestionIcon } from '../constants';

const AlertsPage: React.FC = () => {
  return (
    <div className="p-4 bg-white min-h-full flex flex-col">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Alerts</h1>
        <button type="button" className="text-gray-600">
          <QuestionIcon className="w-7 h-7" />
        </button>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <img src="https://picsum.photos/seed/mailbox/150/150" alt="Mailbox" className="w-36 h-36 mb-6 rounded-lg" />
        <h2 className="text-xl font-semibold text-gray-700">All caught up</h2>
        <p className="text-gray-500 mt-1">You have no new alerts.</p>
      </div>
    </div>
  );
};

export default AlertsPage;