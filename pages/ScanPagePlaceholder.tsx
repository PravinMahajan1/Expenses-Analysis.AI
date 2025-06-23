
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ScanIcon } from '../constants';

const ScanPagePlaceholder: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-900 text-white">
       <button type="button" onClick={() => navigate(-1)} className="absolute top-4 left-4 text-white p-2 bg-black bg-opacity-20 rounded-full">
        <ArrowLeftIcon className="w-6 h-6" />
      </button>
      <ScanIcon className="w-24 h-24 text-brand-purple mb-6" />
      <h1 className="text-2xl font-bold mb-2">Scan & Pay</h1>
      <p className="text-gray-400 text-center">This is a placeholder for the QR code scanning functionality.</p>
      <p className="text-gray-400 text-center mt-2">In a real app, this would open the camera to scan QR codes.</p>
      <button 
        type="button"
        onClick={() => navigate('/')}
        className="mt-8 bg-brand-purple hover:bg-brand-purple-dark text-white font-semibold py-3 px-6 rounded-lg"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ScanPagePlaceholder;