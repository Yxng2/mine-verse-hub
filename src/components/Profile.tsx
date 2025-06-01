
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Users, Activity } from 'lucide-react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: 'CryptoMiner2024',
    email: 'miner@example.com',
    bio: 'Passionate about decentralized mining and blockchain technology',
    referralCode: 'DMH-MR2024-XYZ',
    joinDate: 'January 2024'
  });

  const [referralLink] = useState('https://dmh.app/ref/DMH-MR2024-XYZ');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, you'd show a toast notification here
    console.log('Copied to clipboard:', text);
  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="mining-card mining-glow lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="mr-2 h-5 w-5 text-mining-cyan-400" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-20 w-20 border-2 border-mining-cyan-500/30">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="bg-mining-cyan-500/20 text-mining-cyan-400 text-lg">
                  MR
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-white">{profileData.username}</h2>
                <p className="text-mining-cyan-400">Member since {profileData.joinDate}</p>
                <Badge className="mt-2 bg-mining-cyan-500/20 text-mining-cyan-400 border-mining-cyan-500/30">
                  Active Miner
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username" className="text-gray-300">Username</Label>
                <Input
                  id="username"
                  value={profileData.username}
                  onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                  className="bg-mining-dark-700/50 border-mining-cyan-500/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="bg-mining-dark-700/50 border-mining-cyan-500/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-gray-300">Bio</Label>
              <Input
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                className="bg-mining-dark-700/50 border-mining-cyan-500/20 text-white"
              />
            </div>

            <Button className="mining-button">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="mining-card mining-glow">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="mr-2 h-5 w-5 text-mining-cyan-400" />
              Mining Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-mining-dark-700/50 rounded-lg">
              <div className="text-2xl font-bold text-white">2,847</div>
              <div className="text-sm text-mining-cyan-400">Total DMH Earned</div>
            </div>
            
            <div className="text-center p-4 bg-mining-dark-700/50 rounded-lg">
              <div className="text-2xl font-bold text-white">156</div>
              <div className="text-sm text-mining-cyan-400">Tasks Completed</div>
            </div>
            
            <div className="text-center p-4 bg-mining-dark-700/50 rounded-lg">
              <div className="text-2xl font-bold text-white">42</div>
              <div className="text-sm text-mining-cyan-400">Days Active</div>
            </div>

            <div className="text-center p-4 bg-mining-dark-700/50 rounded-lg">
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-sm text-mining-cyan-400">Successful Referrals</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral System */}
      <Card className="mining-card mining-glow">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="mr-2 h-5 w-5 text-mining-cyan-400" />
            Referral System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Your Referral Code</h3>
              <div className="flex space-x-2">
                <Input
                  value={profileData.referralCode}
                  readOnly
                  className="bg-mining-dark-700/50 border-mining-cyan-500/20 text-white"
                />
                <Button 
                  onClick={() => copyToClipboard(profileData.referralCode)}
                  variant="outline"
                  className="border-mining-cyan-500/30 text-mining-cyan-400 hover:bg-mining-cyan-500/10"
                >
                  Copy
                </Button>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-4 mt-6">Referral Link</h3>
              <div className="flex space-x-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="bg-mining-dark-700/50 border-mining-cyan-500/20 text-white text-sm"
                />
                <Button 
                  onClick={() => copyToClipboard(referralLink)}
                  variant="outline"
                  className="border-mining-cyan-500/30 text-mining-cyan-400 hover:bg-mining-cyan-500/10"
                >
                  Copy
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Referral Rewards</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-mining-dark-700/50 rounded-lg">
                  <span className="text-gray-300">Each Referral</span>
                  <span className="text-mining-cyan-400 font-semibold">50 DMH</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-mining-dark-700/50 rounded-lg">
                  <span className="text-gray-300">Referral Bonus (5+ refs)</span>
                  <span className="text-mining-cyan-400 font-semibold">100 DMH</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-mining-dark-700/50 rounded-lg">
                  <span className="text-gray-300">Monthly Bonus (10+ refs)</span>
                  <span className="text-mining-cyan-400 font-semibold">500 DMH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Referrals */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Referrals</h3>
            <div className="space-y-2">
              {[
                { name: 'User123', date: '2 days ago', status: 'Active', reward: '50 DMH' },
                { name: 'MinerPro', date: '5 days ago', status: 'Active', reward: '50 DMH' },
                { name: 'CryptoFan', date: '1 week ago', status: 'Active', reward: '50 DMH' },
              ].map((referral, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-mining-dark-700/50 rounded-lg">
                  <div>
                    <span className="text-white font-medium">{referral.name}</span>
                    <span className="text-gray-400 text-sm ml-2">joined {referral.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {referral.status}
                    </Badge>
                    <span className="text-mining-cyan-400 font-semibold">{referral.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="mining-card mining-glow">
        <CardHeader>
          <CardTitle className="text-white">Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline"
              className="border-mining-cyan-500/30 text-mining-cyan-400 hover:bg-mining-cyan-500/10"
            >
              Enable Two-Factor Authentication
            </Button>
            <Button 
              variant="outline"
              className="border-mining-cyan-500/30 text-mining-cyan-400 hover:bg-mining-cyan-500/10"
            >
              Change Password
            </Button>
            <Button 
              variant="outline"
              className="border-mining-cyan-500/30 text-mining-cyan-400 hover:bg-mining-cyan-500/10"
            >
              Backup Wallet
            </Button>
            <Button 
              variant="outline"
              className="border-mining-cyan-500/30 text-mining-cyan-400 hover:bg-mining-cyan-500/10"
            >
              Privacy Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
