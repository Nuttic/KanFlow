import { User} from '@/store/AuthStore';
import { ChevronLeft, LayoutDashboard, Users, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  userData: User;
}

export function Sidebar({ isCollapsed, onToggle, userData }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'All Boards', active: false },
    { icon: Users, label: 'Team', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const navigate = useNavigate()

  const activeBoard = 'Product Launch';

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Profile Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3"
        onClick={()=> {navigate('/profile') }}
        >
          <img
            src="https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3MzcyNjcxNXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate text-sidebar-foreground">{userData.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Product Manager</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}

        {/* Active Board Section */}
        {!isCollapsed && (
          <div className="pt-6">
            <p className="px-3 text-xs uppercase tracking-wider text-sidebar-foreground/50 mb-2">
              Active Board
            </p>
            <div className="px-3 py-2.5 rounded-lg bg-sidebar-accent border-l-2 border-sidebar-primary">
              <p className="text-sm text-sidebar-foreground">{activeBoard}</p>
            </div>
          </div>
        )}
      </nav>

      {/* Collapse Button */}
      <button
        onClick={onToggle}
        className="p-4 border-t border-sidebar-border text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors flex items-center justify-center"
      >
        <ChevronLeft
          className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
        />
      </button>
    </aside>
  );
}
