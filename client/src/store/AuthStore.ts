// src/store/useAuthStore.ts
import { create } from 'zustand';
import { 
  authControllerLogin, 
  authControllerRegister, 
  authControllerGetMe, 
  authControllerLogout 
} from '@/client/sdk.gen'; 
// import { client } from '@/client/client.gen'; // Пробуем импорт отсюда
import type { LoginDto, RegisterDto } from '@/client/types.gen';

// Временный интерфейс, пока бэк не отдает нормальный UserDto
export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  usersCache: Record<string, any>;
  setUserInCache: (id: string, user: any) => void;
  signIn: (data: LoginDto) => Promise<void>;
  signUp: (data: RegisterDto) => Promise<void>;
  logOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  isLoading: false,
  error: null,
  usersCache: {},

  setUserInCache: (id, user) => set((state) => ({
  usersCache: { ...state.usersCache, [id]: user }
  })),
  signIn: async (loginData) => {
    set({ isLoading: true, error: null });
    // Типизация сработает автоматически для body
    const { data, error } = await authControllerLogin({
      body: loginData,
    });

    if (error) {
      set({ error: (error as any).message || 'Login failed', isLoading: false });
      throw error;
    }

    if (data) {
      set({ user: data as User, isAuth: true, isLoading: false });
    }
  },

  signUp: async (registerData) => {
    set({ isLoading: true, error: null });
    const { data, error } = await authControllerRegister({
      body: registerData,
    });

    if (error) {
      set({ error: (error as any).message || 'Registration failed', isLoading: false });
      throw error;
    }

    if (data) {
      set({ user: data as User, isAuth: true, isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await authControllerGetMe();
      if (data && !error) {
        set({ user: data as User, isAuth: true, isLoading: false });
      } else {
        set({ isAuth: false, isLoading: false });
      }
    } catch {
      set({ isAuth: false, isLoading: false });
    }
  },

  logOut: async () => {
    await authControllerLogout();
    set({ user: null, isAuth: false });
  },
}));