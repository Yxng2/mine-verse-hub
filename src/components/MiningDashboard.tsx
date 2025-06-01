import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, User, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface MiningDashboardProps {
  user: any;
  updateBalance: (newBalance: number) => void;
}

const MiningDashboard = ({ user, updateBalance }: MiningDashboardProps) => {
  const { toast } = useToast();

  const getTimeUntilNextClaim = () => {
    if (!user.lastClaimTime) return 0;
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    const timeSinceLastClaim = Date.now() - new Date(user.lastClaimTime).getTime();
    return Math.max(0, oneHour - timeSinceLastClaim);
  };

  const formatTimeRemaining = (milliseconds: number) => {
    if (milliseconds === 0) return "Available now!";
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const timeUntilNextClaim = getTimeUntilNextClaim();
  const canClaim = timeUntilNextClaim === 0;

  const handleClaimReward = () => {
    if (!canClaim) {
      toast({
        title: "Claim Not Available",
        description: `Please wait ${formatTimeRemaining(timeUntilNextClaim)} before claiming again.`,
        variant: "destructive"
      });
      return;
    }

    const newBalance = user.balance + 100;
    const updatedUser = { ...user, balance: newBalance, lastClaimTime: new Date().toISOString() };
    updateBalance(newBalance);
    
    // Update localStorage with the new claim time
    localStorage.setItem('xjr_user', JSON.stringify(updatedUser));
    
    toast({
      title: "Reward Claimed!",
      description: "You earned 100 XJR COIN!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="mining-card mining-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Earnings</CardTitle>
            <Activity className="h-4 w-4 text-mining-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{user?.balance || 0} XJR</div>
            <p className="text-xs text-mining-cyan-400">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="mining-card mining-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Hash Rate</CardTitle>
            <Activity className="h-4 w-4 text-mining-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1.2 TH/s</div>
            <p className="text-xs text-mining-cyan-400">+5.2% efficiency</p>
          </CardContent>
        </Card>

        <Card className="mining-card mining-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Tasks</CardTitle>
            <Activity className="h-4 w-4 text-mining-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">7</div>
            <p className="text-xs text-mining-cyan-400">3 completing soon</p>
          </CardContent>
        </Card>

        <Card className="mining-card mining-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Claim Timer</CardTitle>
            <Activity className="h-4 w-4 text-mining-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {canClaim ? "Ready!" : formatTimeRemaining(timeUntilNextClaim)}
            </div>
            <p className="text-xs text-mining-cyan-400">Next 100 XJR claim</p>
          </CardContent>
        </Card>
      </div>

      {/* Mining Progress and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="mining-card mining-glow">
          <CardHeader>
            <CardTitle className="text-white">Mining Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Current Block</span>
                <span className="text-mining-cyan-400">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Daily Target</span>
                <span className="text-mining-cyan-400">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Weekly Goal</span>
                <span className="text-mining-cyan-400">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="mining-card mining-glow">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className={`w-full ${canClaim ? 'mining-button' : 'bg-gray-600 cursor-not-allowed'}`}
              onClick={handleClaimReward}
              disabled={!canClaim}
            >
              <Activity className="mr-2 h-4 w-4" />
              {canClaim ? 'Claim 100 XJR (Available!)' : `Claim 100 XJR (${formatTimeRemaining(timeUntilNextClaim)})`}
            </Button>
            
            <Button variant="outline" className="w-full border-mining-cyan-500/30 text-mining-cyan-400 hover:bg-mining-cyan-500/10">
              <User className="mr-2 h-4 w-4" />
              View Mining Tasks
            </Button>
            
            <Button variant="outline" className="w-full border-mining-cyan-500/30 text-mining-cyan-400 hover:bg-mining-cyan-500/10">
              <Users className="mr-2 h-4 w-4" />
              Invite Friends (Referral)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mining-card mining-glow">
        <CardHeader>
          <CardTitle className="text-white">Recent Mining Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Completed validation task", reward: "+25 XJR", time: "2 hours ago", status: "success" },
              { action: "Block mining reward", reward: "+150 XJR", time: "5 hours ago", status: "success" },
              { action: "Referral bonus", reward: "+50 XJR", time: "1 day ago", status: "success" },
              { action: "Community challenge", reward: "+75 XJR", time: "2 days ago", status: "success" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-mining-dark-700/50 rounded-lg border border-mining-cyan-500/10">
                <div>
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
                <span className="text-mining-cyan-400 font-semibold">{activity.reward}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiningDashboard;
