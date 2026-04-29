import { TaskCard } from './TaskCard';
import { Task } from '@/types/task'; 
// import { useTaskWithUser } from '@/hooks/useTaskWithUser';

interface KanbanColumnProps {
  title: string;
  tasks: Task[]; 
  color: 'gray' | 'blue' | 'yellow' | 'green';
}

const colorClasses = {
  gray: 'bg-muted/20',
  blue: 'bg-blue-50/50 dark:bg-blue-950/20',
  yellow: 'bg-amber-50/50 dark:bg-amber-950/20',
  green: 'bg-emerald-50/50 dark:bg-emerald-950/20',
};

export function KanbanColumn({ title, tasks, color }: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-80">
      <div className={`${colorClasses[color]} rounded-2xl p-4 h-full`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">{title}</h3>
          <span className="text-sm text-muted-foreground bg-background/50 px-2.5 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}