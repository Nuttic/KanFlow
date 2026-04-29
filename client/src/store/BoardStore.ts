import { create } from 'zustand';
import { 
  collectionControllerCreate, 
  collectionControllerFindOne, 
  collectionControllerRemove, 
  collectionControllerUpdate,
} from '@/client/sdk.gen'; 
import type { 
  CollectionControllerCreateData,
  CollectionControllerUpdateData,
} from '@/client/types.gen';

export interface Collection {
  id: number;
  user_: string; // Поле для фильтрации
  title: string;
  description: string;
  team_: null;
  type: string;
  color: string;
}

interface CollectionState {
  collections: Collection[];
  currentBoard: Collection | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  // Метод, который сразу достает доски юзера
  fetchUserCollections: (currentUserId: string | number) => Promise<void>;
  
  // Для выбора конкретной доски из уже загруженных (или с бэка)
  fetchOneCollection: (id: number) => Promise<void>;
  
  createCollection: (body: CollectionControllerCreateData['body']) => Promise<void>;
  updateCollection: (id: number, body: CollectionControllerUpdateData['body']) => Promise<void>;
  deleteCollection: (id: number) => Promise<void>;
  
  setCurrentBoard: (board: Collection | null) => void;
}

export const useCollectionStore = create<CollectionState>((set, get) => ({
  collections: [],
  currentBoard: null,
  isLoading: true,
  error: null,

  setCurrentBoard: (board) => set({ currentBoard: board }),

  // Использование вашего метода для получения досок юзера
  fetchUserCollections: async (currentUserId) => {
    set({ isLoading: true, error: null });
    
    // Внимание: передаем currentUserId в path.id, как требует метод
    const { data, error } = await collectionControllerFindOne({ 
      path: { id: currentUserId as number } 
    });

    if (data && !error) {
      // Предполагаем, что бэк возвращает массив досок
      set({ collections: data as Collection[], isLoading: false });
    } else {
      set({ 
        error: (error as any)?.message || 'Не удалось загрузить ваши доски', 
        isLoading: false 
      });
    }
  },

  // Получение деталей конкретной доски
  fetchOneCollection: async (id) => {
    set({ isLoading: true, error: null });
    const { data, error } = await collectionControllerFindOne({ path: { id } });
    
    if (data && !error) {
      set({ currentBoard: data as Collection, isLoading: false });
    } else {
      set({ error: (error as any)?.message || 'Ошибка загрузки доски', isLoading: false });
    }
  },

  createCollection: async (body) => {
    set({ isLoading: true, error: null });
    console.log(body);
    
    const { data, error } = await collectionControllerCreate({ body });

    if (data && !error) {
      const newCol = data as Collection;
      set((state) => ({ 
        collections: [...state.collections, newCol],
        isLoading: false 
      }));
    } else {
      set({ error: (error as any)?.message || 'Ошибка создания', isLoading: false });
    }
  },

  updateCollection: async (id, body) => {
    set({ isLoading: true });
    const { data, error } = await collectionControllerUpdate({ path: { id }, body });

    if (data && !error) {
      const updated = data as Collection;
      set((state) => ({
        collections: state.collections.map(c => c.id === id ? updated : c),
        currentBoard: state.currentBoard?.id === id ? updated : state.currentBoard,
        isLoading: false
      }));
    }
  },

  deleteCollection: async (id) => {
    const { error } = await collectionControllerRemove({ path: { id } });
    if (!error) {
      set((state) => ({
        collections: state.collections.filter(c => c.id !== id),
        currentBoard: state.currentBoard?.id === id ? null : state.currentBoard,
      }));
    }
  }
}));