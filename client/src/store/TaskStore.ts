import { create } from 'zustand';
import { tasksApi } from '@/api/tasks.api';
import { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from '@/types/task';

interface TaskStore {
  tasks: Map<string, Task>;
  tasksByBoard: Map<string, Task[]>;
  isLoading: boolean;
  error: string | null;
  
  fetchTasks: (boardId: string) => Promise<void>;
  createTask: (task: CreateTaskDto) => Promise<void>;
  updateTask: (id: string, updates: UpdateTaskDto) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTasksByStatus: (boardId: string, status: TaskStatus) => Task[];
  clearBoardTasks: (boardId: string) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: new Map(),
  tasksByBoard: new Map(),
  isLoading: false,
  error: null,
  
  fetchTasks: async (boardId: string) => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await tasksApi.getTasksByBoard(boardId);
      
      const tasksMap = new Map(get().tasks);
      tasks.forEach((task: Task) => tasksMap.set(task.id, task));
      
      const tasksByBoard = new Map(get().tasksByBoard);
      tasksByBoard.set(boardId, tasks);
      
      set({ tasks: tasksMap, tasksByBoard, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  createTask: async (taskDto: CreateTaskDto) => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await tasksApi.createTask(taskDto);
      
      const tasksMap = new Map(get().tasks);
      tasksMap.set(newTask.id, newTask);
      
      const tasksByBoard = new Map(get().tasksByBoard);
      const boardTasks = tasksByBoard.get(newTask.boardId) || [];
      tasksByBoard.set(newTask.boardId, [...boardTasks, newTask]);
      
      set({ tasks: tasksMap, tasksByBoard, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  updateTask: async (id: string, updates: UpdateTaskDto) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTask = await tasksApi.updateTask(id, updates);
      
      const tasksMap = new Map(get().tasks);
      const oldTask = tasksMap.get(id);
      tasksMap.set(id, updatedTask);
      
      if (oldTask) {
        const tasksByBoard = new Map(get().tasksByBoard);
        const boardTasks = tasksByBoard.get(oldTask.boardId) || [];
        const updatedBoardTasks = boardTasks.map(t => t.id === id ? updatedTask : t);
        tasksByBoard.set(oldTask.boardId, updatedBoardTasks);
        set({ tasks: tasksMap, tasksByBoard, isLoading: false });
      } else {
        set({ tasks: tasksMap, isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  deleteTask: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const task = get().tasks.get(id);
      await tasksApi.deleteTask(id);
      
      const tasksMap = new Map(get().tasks);
      tasksMap.delete(id);
      
      if (task) {
        const tasksByBoard = new Map(get().tasksByBoard);
        const boardTasks = tasksByBoard.get(task.boardId) || [];
        tasksByBoard.set(task.boardId, boardTasks.filter(t => t.id !== id));
        set({ tasks: tasksMap, tasksByBoard, isLoading: false });
      } else {
        set({ tasks: tasksMap, isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  getTasksByStatus: (boardId: string, status: TaskStatus) => {
    const tasks = get().tasksByBoard.get(boardId) || [];
    return tasks
      .filter(task => task.status === status)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  
  clearBoardTasks: (boardId: string) => {
    const tasksByBoard = new Map(get().tasksByBoard);
    tasksByBoard.delete(boardId);
    set({ tasksByBoard });
  }
}));