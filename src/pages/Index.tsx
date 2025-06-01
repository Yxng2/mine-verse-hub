
import { useState } from 'react';
import Header from '@/components/Header';
import MiningDashboard from '@/components/MiningDashboard';
import MiningTasks from '@/components/MiningTasks';
import Profile from '@/components/Profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <MiningDashboard />;
      case 'tasks':
        return <MiningTasks />;
      case 'profile':
        return <Profile />;
      case 'community':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">Community Hub Coming Soon</h2>
            <p className="text-gray-400">Connect with fellow miners, share strategies, and participate in group challenges.</p>
          </div>
        );
      default:
        return <MiningDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-mining-gradient">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-8 md:hidden">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'tasks', label: 'Tasks' },
            { id: 'profile', label: 'Profile' },
            { id: 'community', label: 'Community' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-mining-cyan-500/20 text-mining-cyan-400 border border-mining-cyan-500/30'
                  : 'bg-mining-dark-800/50 text-gray-300 hover:text-mining-cyan-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>

      {/* Floating Claim Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-mining-cyan-500 to-mining-blue-500 hover:from-mining-cyan-400 hover:to-mining-blue-400 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-slow">
          <div className="text-sm">Claim 100 DMH</div>
          <div className="text-xs opacity-75">Available in 2h 34m</div>
        </button>
      </div>
    </div>
  );
};

export default Index;
