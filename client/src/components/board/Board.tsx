import { KanbanColumn } from '@/components/KanbanColumn';
import { Plus } from 'lucide-react';
import { Modal } from '@/components/shared/Modal';
import { AddBoardForm } from '@/components/AddBoardForm';
import { AddTaskForm } from '@/components/AddTAskForm';
import { Collection } from '@/store/BoardStore';

type BoardProps ={
    board: Collection;
    actions: any
}

export default function Board({board, actions}:BoardProps ) {

  

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
    <>
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h1 className="mb-6 text-foreground">
              {board?.title || "Загрузка..."}
            </h1>
            <div className="flex gap-3">
                <button
                  onClick={() => actions.setIsAddBoardModalOpen(true)}
                  className="px-4 py-2 bg-muted/50 text-foreground rounded-lg hover:bg-muted transition-colors flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  New Board
                </button>
                <button
                  onClick={() => actions.setIsAddTaskModalOpen(true)}
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
       <Modal
        isOpen={actions.isAddBoardModalOpen}
        onClose={() => actions.setIsAddBoardModalOpen(false)}
        title="Create New Board"
        size="md"
      >
        <AddBoardForm
          onSubmit={()=>{}}
          onCancel={() => actions.setIsAddBoardModalOpen(false)}
        />
      </Modal>

      {/* Add Task Modal */}
      <Modal
        isOpen={actions.isAddTaskModalOpen}
        onClose={() => actions.setIsAddTaskModalOpen(false)}
        title="Create New Task"
        size="lg"
      >
        <AddTaskForm
          onSubmit={()=>{}}
          onCancel={() => actions.setIsAddTaskModalOpen(false)}
        />
      </Modal>
    </>
  );
}