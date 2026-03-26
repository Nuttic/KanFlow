import api from './auth.api';

export const boardsApi = {
  // Получить все доски пользователя
  getBoards: async () => {
    const response = await api.get('/boards');
    return response.data;
  },

  // Получить доску по ID
  getBoard: async (id: string) => {
    const response = await api.get(`/boards/${id}`);
    return response.data;
  },

  // Создать доску
  createBoard: async (boardData: any) => {
    const response = await api.post('/boards', boardData);
    return response.data;
  },

  // Обновить доску
  updateBoard: async (id: string, updates: any) => {
    const response = await api.patch(`/boards/${id}`, updates);
    return response.data;
  },

  // Удалить доску
  deleteBoard: async (id: string) => {
    const response = await api.delete(`/boards/${id}`);
    return response.data;
  },
};