import { useState } from 'react';
import { LayoutDashboard, Palette } from 'lucide-react';

interface AddBoardFormProps {
  onSubmit: (boardData: BoardData) => void;
  onCancel: () => void;
}

export interface BoardData {
  title: string;
  description: string;
  color: string;
}

const boardColors = [
  { name: 'Blue', value: 'blue', class: 'bg-blue-100 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800' },
  { name: 'Purple', value: 'purple', class: 'bg-purple-100 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800' },
  { name: 'Green', value: 'green', class: 'bg-emerald-100 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' },
  { name: 'Orange', value: 'orange', class: 'bg-orange-100 dark:bg-orange-950/30 border-orange-300 dark:border-orange-800' },
  { name: 'Pink', value: 'pink', class: 'bg-pink-100 dark:bg-pink-950/30 border-pink-300 dark:border-pink-800' },
  { name: 'Gray', value: 'gray', class: 'bg-gray-100 dark:bg-gray-950/30 border-gray-300 dark:border-gray-800' },
];

export function AddBoardForm({ onSubmit, onCancel }: AddBoardFormProps) {
  const [formData, setFormData] = useState<BoardData>({
    title: '',
    description: '',
    color: 'blue',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    
    onSubmit(formData);
  };

  const handleChange = (field: keyof BoardData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Board Name */}
      <div>
        <label htmlFor="boardName" className="block text-sm mb-2 text-foreground">
          Board Name
        </label>
        <div className="relative">
          <LayoutDashboard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            id="boardName"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Marketing Campaign"
            className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
            required
          />
        </div>
      </div>

      {/* Board Description */}
      <div>
        <label htmlFor="boardDescription" className="block text-sm mb-2 text-foreground">
          Description
        </label>
        <textarea
          id="boardDescription"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Brief description of this board's purpose..."
          rows={3}
          className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all resize-none"
        />
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm mb-3 text-foreground">
          <Palette className="inline w-4 h-4 mr-2" />
          Board Color
        </label>
        <div className="grid grid-cols-3 gap-3">
          {boardColors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleChange('color', color.value)}
              className={`p-3 rounded-lg border-2 transition-all ${
                formData.color === color.value
                  ? `${color.class} border-opacity-100`
                  : 'bg-muted/20 border-border/50 hover:border-border'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    color.value === 'blue' ? 'bg-blue-500' :
                    color.value === 'purple' ? 'bg-purple-500' :
                    color.value === 'green' ? 'bg-emerald-500' :
                    color.value === 'orange' ? 'bg-orange-500' :
                    color.value === 'pink' ? 'bg-pink-500' :
                    'bg-gray-500'
                  }`}
                />
                <span className="text-sm text-foreground">{color.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors text-foreground"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Create Board
        </button>
      </div>
    </form>
  );
}
