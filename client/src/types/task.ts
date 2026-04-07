export type TaskStatus = 'todo' | 'inProgress' | 'inReview' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  assigneeId?: string | number;
  label?: string;
  status: TaskStatus;
  boardId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  assigneeId?: string | number;
  label?: string;
  status: TaskStatus;
  boardId: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  assigneeId?: string | number;
  label?: string;
  status?: TaskStatus;
  order?: number;
}