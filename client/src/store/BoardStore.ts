import { create } from 'zustand';
import { boardsApi } from '@/api/board.api';
import { Board, CreateBoardDto } from '@/types/board';

interface BoardStore {
  boards: Board[];
  currentBoard: Board | null;
  isLoading: boolean;
  error: string | null;
  
  fetchBoards: () => Promise<void>;
  fetchBoard: (id: string) => Promise<void>;
  createBoard: (board: CreateBoardDto) => Promise<void>;
  updateBoard: (id: string, updates: Partial<Board>) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  setCurrentBoard: (board: Board | null) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [],
  currentBoard: null,
  isLoading: false,
  error: null,
  
  fetchBoards: async () => {
    set({ isLoading: true, error: null });
    try {
      const boards = await boardsApi.getBoards();
      set({ boards, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  fetchBoard: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const board = await boardsApi.getBoard(id);
      set({ currentBoard: board, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  createBoard: async (boardDto: CreateBoardDto) => {
    set({ isLoading: true, error: null });
    try {
      const newBoard = await boardsApi.createBoard(boardDto);
      set(state => ({ 
        boards: [...state.boards, newBoard],
        isLoading: false 
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  updateBoard: async (id: string, updates: Partial<Board>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBoard = await boardsApi.updateBoard(id, updates);
      set(state => ({
        boards: state.boards.map(board => board.id === id ? updatedBoard : board),
        currentBoard: state.currentBoard?.id === id ? updatedBoard : state.currentBoard,
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  deleteBoard: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await boardsApi.deleteBoard(id);
      set(state => ({
        boards: state.boards.filter(board => board.id !== id),
        currentBoard: state.currentBoard?.id === id ? null : state.currentBoard,
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  setCurrentBoard: (board) => set({ currentBoard: board })
}));