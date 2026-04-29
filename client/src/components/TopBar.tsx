import { Search, Filter, Settings, Moon, Sun } from 'lucide-react';

interface TopBarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  entity: string;
}

export function TopBar({ isDark, onThemeToggle,entity }: TopBarProps) {
  return (
    <div className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${entity}...`}
            className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all text-sm"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-foreground/70 hover:text-foreground"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-foreground/70 hover:text-foreground"
          aria-label="Filter"
        >
          <Filter className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-foreground/70 hover:text-foreground"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
