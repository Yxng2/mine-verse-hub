
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MiningDashboard from '@/components/MiningDashboard';
import MiningTasks from '@/components/MiningTasks';
import Profile from '@/components/Profile';
import Auth from '@/components/Auth';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('xjr_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('xjr_user');
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const updateUserBalance = (newBalance: number) => {
    const updatedUser = { ...user, balance: newBalance };
    setUser(updatedUser);
    localStorage.setItem('xjr_user', JSON.stringify(updatedUser));
  };

  const updateUserProfile = (updatedData: any) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('xjr_user', JSON.stringify(updatedUser));
  };

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <MiningDashboard user={user} updateBalance={updateUserBalance} />;
      case 'tasks':
        return <MiningTasks user={user} updateBalance={updateUserBalance} />;
      case 'profile':
        return <Profile user={user} updateProfile={updateUserProfile} />;
      case 'community':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">Community Hub Coming Soon</h2>
            <p className="text-gray-400">Connect with fellow miners, share strategies, and participate in group challenges.</p>
          </div>
        );
      default:
        return <MiningDashboard user={user} updateBalance={updateUserBalance} />;
    }
  };

  return (
    <div className="min-h-screen bg-mining-gradient">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        onLogout={handleLogout}
      />
      
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
        <button 
          onClick={() => {
            // Claim reward logic
            const newBalance = user.balance + 100;
            updateUserBalance(newBalance);
            toast({
              title: "Reward Claimed!",
              description: "You earned 100 XJR COIN!",
            });
          }}
          className="bg-gradient-to-r from-mining-cyan-500 to-mining-blue-500 hover:from-mining-cyan-400 hover:to-mining-blue-400 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-slow"
        >
          <div className="text-sm">Claim 100 XJR</div>
          <div className="text-xs opacity-75">Available in 2h 34m</div>
        </button>
      </div>
    </div>
  );
};

export default Index;
