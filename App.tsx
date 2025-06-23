
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import AlertsPage from './pages/AlertsPage';
import HistoryPage from './pages/HistoryPage';
import ExpenseAnalysisPage from './pages/ExpenseAnalysisPage';
import ScanPagePlaceholder from './pages/ScanPagePlaceholder';
import BottomNavbar from './components/BottomNavbar';

const App: React.FC = () => {
  return (
    <HashRouter>
      <MainAppContent />
    </HashRouter>
  );
};

const MainAppContent: React.FC = () => {
  const location = useLocation();
  const showNavbar = !location.pathname.startsWith('/history/analysis');

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-lg">
      <div className="flex-grow overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/scan" element={<ScanPagePlaceholder />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/analysis" element={<ExpenseAnalysisPage />} />
        </Routes>
      </div>
      {showNavbar && <BottomNavbar />}
    </div>
  );
};

export default App;
    