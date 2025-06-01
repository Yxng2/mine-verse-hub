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
      // Remove password from the state
      const { password, ...userDataWithoutPassword } = userData;
      setUser(userDataWithoutPassword);
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
    
    // Get the full user data from localStorage to preserve password
    const savedUser = localStorage.getItem('xjr_user');
    if (savedUser) {
      const fullUserData = JSON.parse(savedUser);
      const updatedFullUser = { ...fullUserData, balance: newBalance };
      localStorage.setItem('xjr_user', JSON.stringify(updatedFullUser));
    }
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
            // Get current user data from localStorage for accurate claim time
            const savedUser = localStorage.getItem('xjr_user');
            if (savedUser) {
              const userData = JSON.parse(savedUser);
              const getTimeUntilNextClaim = () => {
                if (!userData.lastClaimTime) return 0;
                const oneHour = 60 * 60 * 1000;
                const timeSinceLastClaim = Date.now() - new Date(userData.lastClaimTime).getTime();
                return Math.max(0, oneHour - timeSinceLastClaim);
              };
              
              const timeUntilNextClaim = getTimeUntilNextClaim();
              const canClaim = timeUntilNextClaim === 0;
              
              if (canClaim) {
                const newBalance = user.balance + 100;
                const updatedUser = { ...userData, balance: newBalance, lastClaimTime: new Date().toISOString() };
                updateUserBalance(newBalance);
                localStorage.setItem('xjr_user', JSON.stringify(updatedUser));
                
                toast({
                  title: "Reward Claimed!",
                  description: "You earned 100 XJR COIN!",
                });
              } else {
                const minutes = Math.floor(timeUntilNextClaim / (1000 * 60));
                const seconds = Math.floor((timeUntilNextClaim % (1000 * 60)) / 1000);
                toast({
                  title: "Claim Not Available",
                  description: `Please wait ${minutes}m ${seconds}s before claiming again.`,
                  variant: "destructive"
                });
              }
            }
          }}
          className="bg-gradient-to-r from-mining-cyan-500 to-mining-blue-500 hover:from-mining-cyan-400 hover:to-mining-blue-400 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-slow"
        >
          <div className="text-sm">Claim 100 XJR</div>
          <div className="text-xs opacity-75">Check timer for availability</div>
        </button>
      </div>
    </div>
  );
};

export default Index;
