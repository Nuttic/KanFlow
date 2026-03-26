import { useEffect, useState } from 'react';
import useUserStore, { UserType } from '@/store/UserStore';
import { Task } from '@/types/task';

interface TaskWithUser extends Task {
  assignee?: UserType | null;
}

export const useTaskWithUser = (task: Task) => {
  const [taskWithUser, setTaskWithUser] = useState<TaskWithUser>(task);
  const { getUserById, usersCache } = useUserStore();
  
  useEffect(() => {
    const loadAssignee = async () => {
      if (!task.assigneeId) {
        setTaskWithUser(task);
        return;
      }
      
      // Проверяем кэш
      const cachedUser = usersCache.get(task.assigneeId);
      if (cachedUser) {
        setTaskWithUser({
          ...task,
          assignee: cachedUser,
        });
        return;
      }
      
      // Если нет в кэше, загружаем
      const assignee = await getUserById(task.assigneeId);
      setTaskWithUser({
        ...task,
        assignee: assignee || undefined,
      });
    };
    
    loadAssignee();
  }, [task, getUserById, usersCache]);
  
  return taskWithUser;
};