import { Task } from '@/types/task';
import { useTaskWithUser } from '@/hooks/useTaskWithUser';

interface TaskCardProps {
  task: Task; 
}

export function TaskCard({ task }: TaskCardProps) {
  const taskWithUser = useTaskWithUser(task);
  
  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
      <h4 className="font-medium text-card-foreground mb-2">
        {taskWithUser.title}
      </h4>
      
      {taskWithUser.description && (
        <p className="text-sm text-muted-foreground mb-3">
          {taskWithUser.description}
        </p>
      )}
      
      <div className="flex items-center justify-between">
        {taskWithUser.label && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            {taskWithUser.label}
          </span>
        )}
        
        {taskWithUser.assignee && (
          <div className="flex items-center gap-2">
            {taskWithUser.assignee.avatar && (
              <img 
                src={taskWithUser.assignee.avatar} 
                alt={taskWithUser.assignee.name}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="text-xs text-muted-foreground">
              {taskWithUser.assignee.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}