export interface Board {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBoardDto {
  title: string;
  description?: string;
}