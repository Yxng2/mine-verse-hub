
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, User, Gift } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AuthProps {
  onAuthSuccess: (userData: any) => void;
}

const Auth = ({ onAuthSuccess }: AuthProps) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    referralCode: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        email: formData.email,
        username: formData.username || formData.email.split('@')[0],
        balance: 0, // Start with 0 balance
        joinDate: new Date().toLocaleDateString(),
        profileImage: null,
        referralCode: 'XJR-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        usedReferral: formData.referralCode
      };

      localStorage.setItem('xjr_user', JSON.stringify(userData));
      
      toast({
        title: isSignup ? "Account Created!" : "Welcome Back!",
        description: isSignup ? "Your XJR COIN account has been created successfully." : "You've been logged in successfully.",
      });

      onAuthSuccess(userData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-mining-gradient flex items-center justify-center p-4">
      <Card className="mining-card mining-glow w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-mining-cyan-400 to-mining-blue-500 rounded-lg flex items-center justify-center animate-glow">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">XJR COIN</h1>
              <p className="text-xs text-mining-cyan-400">Decentralized Mining Hub</p>
            </div>
          </div>
          <CardTitle className="text-white">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-mining-dark-700/50 border-mining-cyan-500/20 text-white"
                required
              />
            </div>

            {isSignup && (
              <>
                <div>
                  <Label htmlFor="username" className="text-gray-300">Username (Optional)</Label>
                  <Input
                    id="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="bg-mining-dark-700/50 border-mining-cyan-500/20 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="referral" className="text-gray-300">Referral Code (Optional)</Label>
                  <Input
                    id="referral"
                    placeholder="Enter referral code"
                    value={formData.referralCode}
                    onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
                    className="bg-mining-dark-700/50 border-mining-cyan-500/20 text-white"
                  />
                  {formData.referralCode && (
                    <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                      <Gift className="w-3 h-3 mr-1" />
                      Bonus rewards available!
                    </Badge>
                  )}
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className="w-full mining-button"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : (isSignup ? 'Create Account' : 'Sign In')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <Button
              variant="ghost"
              onClick={() => setIsSignup(!isSignup)}
              className="text-mining-cyan-400 hover:text-mining-cyan-300"
            >
              {isSignup ? 'Sign In' : 'Create Account'}
            </Button>
          </div>

          {isSignup && (
            <div className="mt-6 p-4 bg-mining-dark-700/50 rounded-lg">
              <h3 className="text-sm font-semibold text-mining-cyan-400 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                Gmail OTP Verification
              </h3>
              <p className="text-xs text-gray-400">
                After signup, you'll receive an OTP code via Gmail for verification.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
