import { Collection } from '@/store/BoardStore';
import { LayoutDashboard, MoreVertical } from 'lucide-react';

interface BoardCardProps {
  board: Collection,
  taskCount: number;
  onClick?: () => void;
}

const colorStyles = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-200 dark:border-blue-900/50',
    accent: 'bg-blue-500',
    dot: 'bg-blue-500',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    border: 'border-purple-200 dark:border-purple-900/50',
    accent: 'bg-purple-500',
    dot: 'bg-purple-500',
  },
  green: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    border: 'border-emerald-200 dark:border-emerald-900/50',
    accent: 'bg-emerald-500',
    dot: 'bg-emerald-500',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950/20',
    border: 'border-orange-200 dark:border-orange-900/50',
    accent: 'bg-orange-500',
    dot: 'bg-orange-500',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-950/20',
    border: 'border-pink-200 dark:border-pink-900/50',
    accent: 'bg-pink-500',
    dot: 'bg-pink-500',
  },
  gray: {
    bg: 'bg-gray-50 dark:bg-gray-950/20',
    border: 'border-gray-200 dark:border-gray-900/50',
    accent: 'bg-gray-500',
    dot: 'bg-gray-500',
  },
};

export function BoardCard({ board, taskCount = 0, onClick }: BoardCardProps) {
  const styles = colorStyles[board?.color as keyof typeof colorStyles] || colorStyles.blue;

  return (
    <div
      onClick={onClick}
      className="group relative bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Color accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.accent} transition-all duration-300 group-hover:w-1.5`} />

      <div className="p-5 pl-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${styles.bg} border ${styles.border} transition-colors`}>
              <LayoutDashboard className="w-4 h-4 text-foreground/70" />
            </div>
            <div className={`w-2 h-2 rounded-full ${styles.dot} opacity-60`} />
          </div>
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-muted/50 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              // Handle menu click
            }}
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-foreground mb-1.5 line-clamp-1">{board.title}</h3>
          {board.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {board.description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <span className="text-xs text-muted-foreground">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
          </span>
          <div className={`px-2.5 py-1 rounded-full text-xs ${styles.bg} border ${styles.border}`}>
            Active
          </div>
        </div>
      </div>
    </div>
  );
}
