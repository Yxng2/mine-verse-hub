import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, User, Users, Facebook, Instagram, UserCheck, Gift } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface MiningTasksProps {
  user: any;
  updateBalance: (newBalance: number) => void;
}

const MiningTasks = ({ user, updateBalance }: MiningTasksProps) => {
  const { toast } = useToast();

  const handleStartTask = (taskReward: number) => {
    const newBalance = user.balance + taskReward;
    updateBalance(newBalance);
    toast({
      title: "Task Completed!",
      description: `You earned ${taskReward} XJR COIN!`,
    });
  };

  const handleSocialTask = (taskId: string, taskReward: number, url?: string) => {
    // Get current user data from localStorage
    const savedUser = localStorage.getItem('xjr_user');
    if (!savedUser) return;

    const userData = JSON.parse(savedUser);
    const completedTasks = userData.completedTasks || [];

    // Check if task is already completed
    if (completedTasks.includes(taskId)) {
      toast({
        title: "Task Already Completed",
        description: "You have already claimed this reward.",
        variant: "destructive"
      });
      return;
    }

    // Open URL in new tab if provided
    if (url) {
      window.open(url, '_blank');
    }

    // Mark task as completed and update balance
    const updatedCompletedTasks = [...completedTasks, taskId];
    const newBalance = user.balance + taskReward;
    
    const updatedUser = {
      ...userData,
      balance: newBalance,
      completedTasks: updatedCompletedTasks
    };

    localStorage.setItem('xjr_user', JSON.stringify(updatedUser));
    updateBalance(newBalance);

    toast({
      title: "Task Completed!",
      description: `You earned ${taskReward} XJR COIN!`,
    });
  };

  const handleNameTask = () => {
    if (!user.username || user.username === user.email?.split('@')[0]) {
      toast({
        title: "Set Your Name First",
        description: "Please go to Profile and set a custom username to claim this reward.",
        variant: "destructive"
      });
      return;
    }

    handleSocialTask('set-name', 20);
  };

  const handleReferralTask = () => {
    const referralCount = user.referralCount || 0;
    if (referralCount < 5) {
      toast({
        title: "Need More Referrals",
        description: `You need ${5 - referralCount} more referrals to claim this reward.`,
        variant: "destructive"
      });
      return;
    }

    handleSocialTask('5-referrals', 100);
  };

  const isTaskCompleted = (taskId: string) => {
    const savedUser = localStorage.getItem('xjr_user');
    if (!savedUser) return false;
    const userData = JSON.parse(savedUser);
    return (userData.completedTasks || []).includes(taskId);
  };

  const socialTasks = [
    {
      id: 'follow-facebook',
      title: 'Follow Our Facebook',
      description: 'Follow our official Facebook page and stay updated',
      reward: 25,
      icon: Facebook,
      url: 'https://www.facebook.com/profile.php?id=61576961519749',
      action: () => handleSocialTask('follow-facebook', 25, 'https://www.facebook.com/profile.php?id=61576961519749')
    },
    {
      id: 'follow-instagram',
      title: 'Follow Our Instagram',
      description: 'Follow our Instagram for daily updates and news',
      reward: 50,
      icon: Instagram,
      url: 'https://www.instagram.com/xjr_coin?igsh=Zjdkajc0YmVqZm8y',
      action: () => handleSocialTask('follow-instagram', 50, 'https://www.instagram.com/xjr_coin?igsh=Zjdkajc0YmVqZm8y')
    },
    {
      id: 'set-name',
      title: 'Set Your Profile Name',
      description: 'Customize your profile with a unique username',
      reward: 20,
      icon: UserCheck,
      action: handleNameTask
    },
    {
      id: '5-referrals',
      title: 'Get 5 Referrals',
      description: 'Invite 5 friends to join XJR COIN',
      reward: 100,
      icon: Gift,
      action: handleReferralTask,
      progress: Math.min((user.referralCount || 0) / 5 * 100, 100),
      currentCount: user.referralCount || 0,
      targetCount: 5
    }
  ];

  const availableTasks = [
    {
      id: 1,
      title: "Transaction Validation",
      description: "Validate blockchain transactions and earn rewards",
      difficulty: "Easy",
      reward: 25,
      timeEstimate: "15 minutes",
      participants: 156,
      category: "validation"
    },
    {
      id: 2,
      title: "Network Security Challenge",
      description: "Contribute to network security through computational tasks",
      difficulty: "Medium",
      reward: 75,
      timeEstimate: "45 minutes",
      participants: 89,
      category: "security"
    },
    {
      id: 3,
      title: "Block Mining Competition",
      description: "Compete with others to solve cryptographic puzzles",
      difficulty: "Hard",
      reward: 200,
      timeEstimate: "2 hours",
      participants: 234,
      category: "mining"
    },
    {
      id: 4,
      title: "Community Verification",
      description: "Help verify community contributions and proposals",
      difficulty: "Easy",
      reward: 30,
      timeEstimate: "20 minutes",
      participants: 67,
      category: "community"
    }
  ];

  const activeTasks = [
    {
      id: 1,
      title: "Daily Hash Challenge",
      progress: 78,
      timeLeft: "2h 15m",
      reward: "100 XJR"
    },
    {
      id: 2,
      title: "Weekly Mining Goal",
      progress: 45,
      timeLeft: "4 days",
      reward: "500 XJR"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Social & Profile Tasks */}
      <Card className="mining-card mining-glow">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Gift className="mr-2 h-5 w-5 text-mining-cyan-400" />
            Social & Profile Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialTasks.map((task) => {
              const completed = isTaskCompleted(task.id);
              const IconComponent = task.icon;
              
              return (
                <div key={task.id} className="p-6 bg-mining-dark-700/50 rounded-lg border border-mining-cyan-500/20 hover:border-mining-cyan-500/40 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-6 w-6 text-mining-cyan-400" />
                      <h3 className="font-semibold text-white text-lg">{task.title}</h3>
                    </div>
                    <Badge className={completed ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-mining-cyan-500/20 text-mining-cyan-400 border-mining-cyan-500/30'}>
                      {completed ? 'Completed' : `${task.reward} XJR`}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{task.description}</p>
                  
                  {task.progress !== undefined && (
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-mining-cyan-400">{task.currentCount}/{task.targetCount}</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  )}
                  
                  <Button 
                    className={`w-full ${completed ? 'mining-button opacity-50 cursor-not-allowed' : 'mining-button'}`}
                    onClick={task.action}
                    disabled={completed}
                  >
                    {completed ? 'Completed' : 'Claim Reward'}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Tasks */}
      <Card className="mining-card mining-glow">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="mr-2 h-5 w-5 text-mining-cyan-400" />
            Active Mining Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTasks.map((task) => (
              <div key={task.id} className="p-4 bg-mining-dark-700/50 rounded-lg border border-mining-cyan-500/20">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-white">{task.title}</h3>
                  <Badge className="bg-mining-cyan-500/20 text-mining-cyan-400 border-mining-cyan-500/30">
                    {task.reward}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-mining-cyan-400">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                  <p className="text-xs text-gray-400">Time left: {task.timeLeft}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Tasks */}
      <Card className="mining-card mining-glow">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="mr-2 h-5 w-5 text-mining-cyan-400" />
            Available Mining Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableTasks.map((task) => (
              <div key={task.id} className="p-6 bg-mining-dark-700/50 rounded-lg border border-mining-cyan-500/20 hover:border-mining-cyan-500/40 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-white text-lg">{task.title}</h3>
                  <Badge className={getDifficultyColor(task.difficulty)}>
                    {task.difficulty}
                  </Badge>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{task.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-mining-cyan-400 font-semibold">{task.reward} XJR</span>
                    <span className="text-gray-400">⏱ {task.timeEstimate}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Users className="mr-1 h-3 w-3" />
                    {task.participants}
                  </div>
                </div>
                
                <Button 
                  className="w-full mining-button"
                  onClick={() => handleStartTask(task.reward)}
                >
                  Start Mining Task
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Challenges */}
      <Card className="mining-card mining-glow">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="mr-2 h-5 w-5 text-mining-cyan-400" />
            Community Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-mining-cyan-500/10 to-mining-blue-500/10 rounded-lg border border-mining-cyan-500/30">
              <h3 className="font-semibold text-white mb-2">Weekly Mining Marathon</h3>
              <p className="text-gray-300 text-sm mb-4">Mine 1000 XJR collectively as a community</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Progress</span>
                  <span className="text-mining-cyan-400">742/1000 XJR</span>
                </div>
                <Progress value={74.2} className="h-2" />
                <p className="text-xs text-gray-400">5 days remaining</p>
              </div>
              <Button className="w-full mt-4 mining-button">
                Join Challenge
              </Button>
            </div>

            <div className="p-6 bg-gradient-to-br from-mining-cyan-500/10 to-mining-blue-500/10 rounded-lg border border-mining-cyan-500/30">
              <h3 className="font-semibold text-white mb-2">Speed Mining Contest</h3>
              <p className="text-gray-300 text-sm mb-4">Complete tasks faster than other miners</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Your Rank</span>
                  <span className="text-mining-cyan-400">#12 of 156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Best Time</span>
                  <span className="text-mining-cyan-400">8m 34s</span>
                </div>
                <p className="text-xs text-gray-400">2 days remaining</p>
              </div>
              <Button className="w-full mt-4 mining-button">
                Compete Now
              </Button>
            </div>

            <div className="p-6 bg-gradient-to-br from-mining-cyan-500/10 to-mining-blue-500/10 rounded-lg border border-mining-cyan-500/30">
              <h3 className="font-semibold text-white mb-2">Referral Bonus Event</h3>
              <p className="text-gray-300 text-sm mb-4">Earn extra rewards for each successful referral</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Referrals</span>
                  <span className="text-mining-cyan-400">{user.referralCount || 0} this week</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Bonus Earned</span>
                  <span className="text-mining-cyan-400">{(user.referralCount || 0) * 50} XJR</span>
                </div>
                <p className="text-xs text-gray-400">Ongoing event</p>
              </div>
              <Button className="w-full mt-4 mining-button">
                Get Referral Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiningTasks;
