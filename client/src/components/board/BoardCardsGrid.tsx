import { LayoutDashboard, Plus } from 'lucide-react';
import { BoardCard } from './BoardCard';
import { useCollectionStore } from '@/store/BoardStore'
import {Collection} from '@/store/BoardStore'
import { useNavigate } from 'react-router-dom';
interface BoardCardsGridProps {
  boards: Collection[];
  onBoardClick?: (boardId: string) => void;
  onCreateBoard?: () => void;
}

export function BoardCardsGrid({ boards, onCreateBoard }: BoardCardsGridProps) {


const navigate = useNavigate()
const {setCurrentBoard} = useCollectionStore()

const changeCurrentBoard = async(board: Collection) => {
    setCurrentBoard(board)
    navigate(`/boards/${board.id}`)
}
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-foreground mb-1">Your Boards</h2>
          <p className="text-sm text-muted-foreground">
            {boards.length} {boards.length === 1 ? 'board' : 'boards'} total
          </p>
        </div>
        {onCreateBoard && (
          <button
            onClick={onCreateBoard}
            className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            New Board
          </button>
        )}
      </div>

      {/* Grid */}
      {boards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {boards.map((board) => (
            <BoardCard
            key={board.id}
              board={board}
              taskCount={0}
              onClick={() => changeCurrentBoard(board)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <LayoutDashboard className="w-8 h-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-foreground mb-2">No boards yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            Create your first board to start organizing your tasks and projects
          </p>
          {onCreateBoard && (
            <button
              onClick={onCreateBoard}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create First Board
            </button>
          )}
        </div>
      )}
    </div>
  );
}
