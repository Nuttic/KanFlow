import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { usersControllerGetUserById } from '@/client/sdk.gen'; // Импортируем из SDK
import type { Task } from '@/types/task';
// Импортируем типы, которые HeyAPI создал для нас
// import type { UsersControllerGetUserByIdResponses } from '@/client/types.gen';

// Вытаскиваем тип пользователя из ответов Swagger (у тебя там был unknown, пока не добавишь @ApiProperty)
type UserFromApi = any; 

interface TaskWithUser extends Task {
  assignee?: UserFromApi | null;
}

export const useTaskWithUser = (task: Task) => {
  const [taskWithUser, setTaskWithUser] = useState<TaskWithUser>(task);
  
  // Кэш в сторе — это отличная идея, оставляем его, 
  // но метод getUserById теперь будем брать прямо из SDK
  const { usersCache, setUserInCache } = useAuthStore();
  
  useEffect(() => {
    const loadAssignee = async () => {
      if (!task.assigneeId) {
        setTaskWithUser(prev => ({ ...prev, assignee: null }));
        return;
      }
      
      // 1. Проверяем кэш в Zustand
      const cachedUser = usersCache[task.assigneeId];
      if (cachedUser) {
        setTaskWithUser({ ...task, assignee: cachedUser });
        return;
      }
      
      // 2. Если нет в кэше, загружаем через HeyAPI SDK
      try {
        const { data, error } = await usersControllerGetUserById({
          path: { id: String(task.assigneeId) } // HeyAPI сам подставит ID в URL /api/users/{id}
        });

        if (error) throw error;

        if (data) {
          // Сохраняем в кэш стора, чтобы не делать лишних запросов для других задач
          setUserInCache(String(task.assigneeId), data);
          
          setTaskWithUser({
            ...task,
            assignee: data as UserFromApi,
          });
        }
      } catch (err) {
        console.error(`Failed to load user ${task.assigneeId}:`, err);
        setTaskWithUser({ ...task, assignee: null });
      }
    };
    
    loadAssignee();
  }, [task.assigneeId, task]); // Следим конкретно за ID исполнителя
  
  return taskWithUser;
};