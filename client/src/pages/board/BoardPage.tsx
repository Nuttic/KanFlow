import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import {useAuthStore} from '@/store/AuthStore';
import { Modal } from '@/components/shared/Modal';
import { AddBoardForm } from '@/components/AddBoardForm';
import { AddTaskForm } from '@/components/AddTAskForm';
import { useCollectionStore } from '@/store/BoardStore';
import Board from '@/components/board/Board';
import loadingGif from '@/assets/media/g0R9.gif'
export default function BoardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const actions = {
    isAddBoardModalOpen,
    setIsAddBoardModalOpen,
    isAddTaskModalOpen,
    setIsAddTaskModalOpen
  }

  // const { 
  //   getTasksByStatus, 
  //   fetchTasks, 
  //   isLoading 
  // } = useTaskStore();
  const {currentBoard, isLoading} = useCollectionStore()
  const {currentUser: user} = useAuthStore()
  // const { currentBoard, fetchBoard } = useBoardStore();

  // ID доски (пока временно, потом можно из URL или выбора доски)
  // const boardId = 'your-board-id';

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
        {isLoading 
            ? 
            <div className='flex-1 overflow-y-auto bg-000'
            style={{backgroundColor: '#000'}}>
               
                <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
               
                <img src={loadingGif} alt="Загрузка..." width="180" />
                <h1>Loading....</h1>
                </div>
            </div> 
            :  
            <Board board={currentBoard!} actions={actions}/>}
       
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