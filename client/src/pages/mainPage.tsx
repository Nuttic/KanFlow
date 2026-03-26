import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { KanbanColumn } from '@/components/KanbanColumn';
import { useTaskStore } from '@/store/TaskStore'; // исправил путь (taskStore с маленькой буквы)
import { useBoardStore } from '@/store/BoardStore';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const { 
    getTasksByStatus, 
    fetchTasks, 
    isLoading 
  } = useTaskStore();
  
  const { currentBoard, fetchBoard } = useBoardStore();

  // ID доски (пока временно, потом можно из URL или выбора доски)
  const boardId = 'your-board-id';

  useEffect(() => {
    // Загружаем доску и задачи
    if (boardId) {
      fetchBoard(boardId);
      fetchTasks(boardId);
    }
  }, [boardId, fetchBoard, fetchTasks]);

  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Получаем задачи по статусам
  const todoTasks = getTasksByStatus(boardId, 'todo');
  const inProgressTasks = getTasksByStatus(boardId, 'inProgress');
  const inReviewTasks = getTasksByStatus(boardId, 'inReview');
  const doneTasks = getTasksByStatus(boardId, 'done');

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-foreground">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopBar isDark={isDark} onThemeToggle={toggleTheme} />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h1 className="mb-6 text-foreground">
              {currentBoard?.title || 'Product Launch Tasks'}
            </h1>
            
            <div className="flex gap-4 overflow-x-auto pb-4">
              <KanbanColumn 
                title="To Do" 
                tasks={todoTasks} 
                color="gray" 
              />
              <KanbanColumn 
                title="In Progress" 
                tasks={inProgressTasks} 
                color="blue" 
              />
              <KanbanColumn 
                title="In Review" 
                tasks={inReviewTasks} 
                color="yellow" 
              />
              <KanbanColumn 
                title="Done" 
                tasks={doneTasks} 
                color="green" 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}