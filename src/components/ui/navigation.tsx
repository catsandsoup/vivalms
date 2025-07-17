import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ChevronDown, 
  Settings, 
  BarChart3, 
  MessageSquare, 
  User, 
  LogOut,
  Bell,
  HelpCircle
} from "lucide-react";

interface NavigationProps {
  showSearch?: boolean;
  showAdminMenu?: boolean;
  currentUser?: {
    name: string;
    role: string;
    avatar?: string;
  };
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onBack?: () => void;
  backLabel?: string;
}

export default function Navigation({
  showSearch = true,
  showAdminMenu = true,
  currentUser = { name: "Arthur", role: "Admin" },
  onSearch,
  searchQuery = "",
  onBack,
  backLabel
}: NavigationProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Back Button */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="font-heading font-bold text-2xl text-foreground">
                  Viva Mutual
                </h1>
                <p className="text-xs text-muted-foreground">
                  Learning Platform
                </p>
              </div>
            </div>
            
            {onBack && (
              <Button variant="ghost" onClick={onBack} size="sm">
                ← {backLabel || "Back"}
              </Button>
            )}
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search modules, lessons..."
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>

            {/* Help */}
            <Button variant="ghost" size="sm">
              <HelpCircle size={18} />
            </Button>

            {/* Admin Menu */}
            {showAdminMenu && currentUser.role === "Admin" && (
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  className="text-xs"
                >
                  <Settings size={14} className="mr-1" />
                  Admin
                  <ChevronDown size={14} className="ml-1" />
                </Button>
                {showAdminDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-1">
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded flex items-center gap-2">
                        <BarChart3 size={14} />
                        Analytics
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded flex items-center gap-2">
                        <MessageSquare size={14} />
                        View Feedback
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded flex items-center gap-2">
                        <Settings size={14} />
                        Manage Content
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="text-xs"
              >
                <User size={14} className="mr-1" />
                {currentUser.name} ({currentUser.role})
                <ChevronDown size={14} className="ml-1" />
              </Button>
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-1">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded flex items-center gap-2">
                      <User size={14} />
                      Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded flex items-center gap-2">
                      <Settings size={14} />
                      Settings
                    </button>
                    <hr className="my-1 border-border" />
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded flex items-center gap-2 text-destructive">
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}