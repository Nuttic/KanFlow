import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, 
});

// Универсальный обработчик ошибок
const handleError = (error: any) => {
  const message = error.response?.data?.message || 'Произошла непредвиденная ошибка';
  throw new Error(message);
};

export const authApi = {
  async register(data: any) {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  },

  async login(data: any) {
    try {
      const response = await api.post('/auth/login', data);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async logout() {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async getMe() {
    try {
      const response = await api.post('/auth/me');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  async refresh() {
    try {
      const response = await api.post('/auth/refresh');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }
};

export default api;