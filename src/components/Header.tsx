
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, Settings, Activity, Users } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header = ({ activeTab, setActiveTab }: HeaderProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'tasks', label: 'Mining Tasks', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'community', label: 'Community', icon: Users }
  ];

  return (
    <header className="bg-mining-dark-800/90 backdrop-blur-md border-b border-mining-cyan-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-mining-cyan-400 to-mining-blue-500 rounded-lg flex items-center justify-center animate-glow">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DMH</h1>
              <p className="text-xs text-mining-cyan-400">Decentralized Mining Hub</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${
                    activeTab === item.id 
                      ? 'bg-mining-cyan-500/20 text-mining-cyan-400 border border-mining-cyan-500/30' 
                      : 'text-gray-300 hover:text-mining-cyan-400'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">1,247 DMH</p>
              <p className="text-xs text-mining-cyan-400">Available Balance</p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-mining-cyan-500/30">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="bg-mining-cyan-500/20 text-mining-cyan-400">
                      MR
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 bg-mining-dark-800/95 backdrop-blur-md border border-mining-cyan-500/20"
                align="end"
              >
                <DropdownMenuItem 
                  className="text-gray-300 hover:text-mining-cyan-400 hover:bg-mining-cyan-500/10"
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-mining-cyan-400 hover:bg-mining-cyan-500/10">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
