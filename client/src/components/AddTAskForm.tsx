import { useState } from 'react';
import { FileText, AlignLeft, Tag, Calendar, User } from 'lucide-react';

interface AddTaskFormProps {
  onSubmit: (taskData: TaskData) => void;
  onCancel: () => void;
}

export interface TaskData {
  title: string;
  description: string;
  label: string;
  priority: string;
  dueDate: string;
  assignee: string;
  column: string;
}

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400' },
];

const columnOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'inProgress', label: 'In Progress' },
  { value: 'inReview', label: 'In Review' },
  { value: 'done', label: 'Done' },
];

const teamMembers = [
  { value: 'sarah', label: 'Sarah Chen' },
  { value: 'alex', label: 'Alex Johnson' },
  { value: 'maria', label: 'Maria Garcia' },
  { value: 'jordan', label: 'Jordan Lee' },
  { value: 'unassigned', label: 'Unassigned' },
];

export function AddTaskForm({ onSubmit, onCancel }: AddTaskFormProps) {
  const [formData, setFormData] = useState<TaskData>({
    title: '',
    description: '',
    label: '',
    priority: 'medium',
    dueDate: '',
    assignee: 'unassigned',
    column: 'todo',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof TaskData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Task Title */}
      <div>
        <label htmlFor="taskTitle" className="block text-sm mb-2 text-foreground">
          Task Title
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            id="taskTitle"
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Design new landing page"
            className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
            required
          />
        </div>
      </div>

      {/* Task Description */}
      <div>
        <label htmlFor="taskDescription" className="block text-sm mb-2 text-foreground">
          Description
        </label>
        <div className="relative">
          <AlignLeft className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <textarea
            id="taskDescription"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Add more details about this task..."
            rows={3}
            className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all resize-none"
            required
          />
        </div>
      </div>

      {/* Row: Label and Priority */}
      <div className="grid grid-cols-2 gap-4">
        {/* Label */}
        <div>
          <label htmlFor="taskLabel" className="block text-sm mb-2 text-foreground">
            Label
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="taskLabel"
              type="text"
              value={formData.label}
              onChange={(e) => handleChange('label', e.target.value)}
              placeholder="Design, Dev, etc."
              className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="taskPriority" className="block text-sm mb-2 text-foreground">
            Priority
          </label>
          <select
            id="taskPriority"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all appearance-none cursor-pointer"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row: Due Date and Assignee */}
      <div className="grid grid-cols-2 gap-4">
        {/* Due Date */}
        <div>
          <label htmlFor="taskDueDate" className="block text-sm mb-2 text-foreground">
            Due Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="taskDueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
            />
          </div>
        </div>

        {/* Assignee */}
        <div>
          <label htmlFor="taskAssignee" className="block text-sm mb-2 text-foreground">
            Assign To
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              id="taskAssignee"
              value={formData.assignee}
              onChange={(e) => handleChange('assignee', e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all appearance-none cursor-pointer"
            >
              {teamMembers.map((member) => (
                <option key={member.value} value={member.value}>
                  {member.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Column Selection */}
      <div>
        <label className="block text-sm mb-3 text-foreground">
          Add to Column
        </label>
        <div className="grid grid-cols-2 gap-3">
          {columnOptions.map((column) => (
            <button
              key={column.value}
              type="button"
              onClick={() => handleChange('column', column.value)}
              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                formData.column === column.value
                  ? 'bg-primary/10 border-primary text-foreground'
                  : 'bg-muted/20 border-border/50 hover:border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {column.label}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Preview */}
      <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
        <p className="text-sm text-muted-foreground mb-2">Task Preview</p>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-1 rounded-full ${
              priorityOptions.find((p) => p.value === formData.priority)?.color
            }`}
          >
            {priorityOptions.find((p) => p.value === formData.priority)?.label}
          </span>
          {formData.label && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
              {formData.label}
            </span>
          )}
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
          Create Task
        </button>
      </div>
    </form>
  );
}
