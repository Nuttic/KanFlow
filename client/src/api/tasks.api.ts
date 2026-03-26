import api from './auth.api';

export const tasksApi = {
  // Получить все задачи доски
  getTasksByBoard: async (boardId: string) => {
    const response = await api.get(`/boards/${boardId}/tasks`);
    return response.data;
  },

  // Получить задачу по ID
  getTask: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Создать задачу
  createTask: async (taskData: any) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Обновить задачу
  updateTask: async (id: string, updates: any) => {
    const response = await api.patch(`/tasks/${id}`, updates);
    return response.data;
  },

  // Удалить задачу
  deleteTask: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

};