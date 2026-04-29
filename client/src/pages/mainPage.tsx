import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { KanbanColumn } from '@/components/KanbanColumn';
import { Plus } from 'lucide-react';
import {useAuthStore} from '@/store/AuthStore';
import { Modal } from '@/components/shared/Modal';
import { AddBoardForm } from '@/components/AddBoardForm';
import { AddTaskForm } from '@/components/AddTAskForm';
export default function HomePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // const { 
  //   getTasksByStatus, 
  //   fetchTasks, 
  //   isLoading 
  // } = useTaskStore();
  const {currentUser: user} = useAuthStore()
  // const { currentBoard, fetchBoard } = useBoardStore();

  // ID доски (пока временно, потом можно из URL или выбора доски)
  // const boardId = 'your-board-id';

  // useEffect(() => {
  //   // Загружаем доску и задачи
  //   if (boardId) {
  //     fetchBoard(boardId);
  //     // fetchTasks(boardId);
  //   }
  // }, [boardId, fetchBoard]);

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
  // const todoTasks = getTasksByStatus(boardId, 'todo');
  // const inProgressTasks = getTasksByStatus(boardId, 'inProgress');
  // const inReviewTasks = getTasksByStatus(boardId, 'inReview');
  // const doneTasks = getTasksByStatus(boardId, 'done');

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center bg-background">
  //       <div className="text-foreground">Loading tasks...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        userData={user!}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopBar isDark={isDark} onThemeToggle={toggleTheme} entity='task'/>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h1 className="mb-6 text-foreground">
              {'Product Launch Tasks'}
            </h1>
            <div className="flex gap-3">
                <button
                  onClick={() => setIsAddBoardModalOpen(true)}
                  className="px-4 py-2 bg-muted/50 text-foreground rounded-lg hover:bg-muted transition-colors flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  New Board
                </button>
                <button
                  onClick={() => setIsAddTaskModalOpen(true)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  New Task
                </button>
              </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              <KanbanColumn 
                title="To Do" 
                tasks={[]} 
                color="gray" 
              />
              <KanbanColumn 
                title="In Progress" 
                tasks={[]} 
                color="blue" 
              />
              <KanbanColumn 
                title="In Review" 
                tasks={[]} 
                color="yellow" 
              />
              <KanbanColumn 
                title="Done" 
                tasks={[]} 
                color="green" 
              />
            </div>
          </div>
        </div>
      </main>
       <Modal
        isOpen={isAddBoardModalOpen}
        onClose={() => setIsAddBoardModalOpen(false)}
        title="Create New Board"
        size="md"
      >
        <AddBoardForm
          onSubmit={()=>{}}
          onCancel={() => setIsAddBoardModalOpen(false)}
        />
      </Modal>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        title="Create New Task"
        size="lg"
      >
        <AddTaskForm
          onSubmit={()=>{}}
          onCancel={() => setIsAddTaskModalOpen(false)}
        />
      </Modal>
    </div>
  );
}