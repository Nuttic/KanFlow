import { useState, useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { TopBar } from '../../components/TopBar';
import { BoardCardsGrid } from '../../components/board/BoardCardsGrid';
import { Modal } from '../../components/shared/Modal';
import { AddBoardForm, BoardData } from '../../components/AddBoardForm';
import { useAuthStore } from '@/store/AuthStore';
import { useCollectionStore } from '@/store/BoardStore';



function AllBoards() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);

  const {currentUser: user} = useAuthStore()
  const {createCollection, collections, fetchUserCollections} = useCollectionStore()
  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
    fetchUserCollections(user?.id!)
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleCreateBoard = async (formData: BoardData) => {
    if (!user?.id) {
      console.error("Пользователь не найден");
      return;
    }


    console.log(user, user.id);
    
    // Собираем данные для API. 
    // Поскольку у тебя в типах [key: string]: unknown, 
    // мы можем передать любые нужные поля.
    const data = {
      title: formData.title,
      description: formData.description,
      color: formData.color,
      user_: Number(user.id),
      team_: null,
      type: 'Board' // Привязываем доску к текущему юзеру
    }

    console.log(data);
    await createCollection(data);
    setIsAddBoardModalOpen(false)
    // Тут можно добавить логику закрытия модалки, если нужно
  };

//   const handleBoardClick = (boardId: string) => {
//     console.log('Board clicked:', boardId);
    // In a real app, you would navigate to the board detail page
    // For example: navigate(`/board/${boardId}`)


  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        userData={user!}
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopBar isDark={isDark} onThemeToggle={toggleTheme} entity='board'/>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-[1600px] mx-auto">
            <BoardCardsGrid
              boards={collections}
              // onBoardClick={handleBoardClick}
              onCreateBoard={() => setIsAddBoardModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Add Board Modal */}
      <Modal
        isOpen={isAddBoardModalOpen}
        onClose={() => setIsAddBoardModalOpen(false)}
        title="Create New Board"
        size="md"
      >
        <AddBoardForm
          onSubmit={handleCreateBoard}
          onCancel={() => setIsAddBoardModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default AllBoards