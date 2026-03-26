import { create } from 'zustand';
import { authApi } from '@/api/auth.api';

export type UserType = {
  id: number | string;
  name: string;
  email: string;
  avatar?: string;
};

type UserStore = {
  currentUser: UserType | null;
  isLoading: boolean;
  usersCache: Map<string | number, UserType>; // ДОБАВЛЕНО: кэш пользователей
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: any) => Promise<void>;
  logOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
  getUserById: (userId: string | number) => Promise<UserType | null>; // ДОБАВЛЕНО
};

const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  isLoading: false,
  usersCache: new Map(), // ДОБАВЛЕНО

  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      const user = await authApi.login({ email, password });
      set({ currentUser: user, isLoading: false });
      get().usersCache.set(user.id, user); // ДОБАВЛЕНО
    } catch (error) {
      set({ currentUser: null, isLoading: false });
      throw error;
    }
  },

  signUp: async (userData) => {
    set({ isLoading: true });
    try {
      const user = await authApi.register(userData);
      set({ currentUser: user, isLoading: false });
      get().usersCache.set(user.id, user); // ДОБАВЛЕНО
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logOut: async () => {
    try {
      await authApi.logout();
      set({ currentUser: null });
      get().usersCache.clear(); // ДОБАВЛЕНО
    } catch (error) {
      console.error("Logout failed", error);
    }
  },

  checkAuth: async () => {
    try {
      const user = await authApi.getMe();
      set({ currentUser: user });
      if (user) {
        get().usersCache.set(user.id, user); // ДОБАВЛЕНО
      }
    } catch (error) {
      set({ currentUser: null });
    }
  },

  // ДОБАВЛЕНО: получение пользователя по ID с кэшированием
  getUserById: async (userId: string | number) => {
    const cached = get().usersCache.get(userId);
    if (cached) return cached;
    
    try {
      // Если нет эндпоинта /users/:id, можно вернуть null
      // или использовать другой способ получения пользователя
      const response = await fetch(`http://localhost:3000/api/users/${userId}`);
      const user = await response.json();
      get().usersCache.set(userId, user);
      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  }
}));

export default useUserStore;