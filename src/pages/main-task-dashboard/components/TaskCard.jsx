import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskCard = ({ 
  task, 
  category, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  onDragStart, 
  onDragEnd,
  isDragging 
}) => {
  const [showActions, setShowActions] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error border-error bg-error/10';
      case 'medium':
        return 'text-warning border-warning bg-warning/10';
      case 'low':
        return 'text-success border-success bg-success/10';
      default:
        return 'text-muted-foreground border-border bg-muted';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Minus';
    }
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  const isDueSoon = (dueDate) => {
    if (!dueDate) return false;
    const date = new Date(dueDate);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const date = new Date(dueDate);
    const now = new Date();
    return date < now;
  };

  return (
    <div
      className={`bg-card rounded-lg p-4 shadow-subtle border border-border transition-all duration-200 hover:shadow-moderate ${
        isDragging ? 'opacity-50 scale-95' : ''
      } ${task.completed ? 'opacity-75' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1">
          <Checkbox
            checked={task.completed}
            onChange={(e) => onToggleComplete(task.id, e.target.checked)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-foreground ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1 ${task.completed ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                {task.description.length > 100 ? `${task.description.substring(0, 100)}...` : task.description}
              </p>
            )}
          </div>
        </div>
        
        {/* Drag Handle */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-grab active:cursor-grabbing opacity-50 hover:opacity-100"
            title="Drag to reorder"
          >
            <Icon name="GripVertical" size={16} />
          </Button>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Priority */}
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
            <Icon name={getPriorityIcon(task.priority)} size={12} />
            <span className="capitalize">{task.priority}</span>
          </div>

          {/* Category */}
          {category && (
            <div 
              className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs text-white"
              style={{ backgroundColor: category.color }}
            >
              <div 
                className="w-2 h-2 rounded-full bg-white/80"
              ></div>
              <span>{category.name}</span>
            </div>
          )}

          {/* Due Date */}
          {task.dueDate && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
              isOverdue(task.dueDate) ? 'text-error bg-error/10 border border-error' : isDueSoon(task.dueDate) ?'text-warning bg-warning/10 border border-warning': 'text-muted-foreground bg-muted'
            }`}>
              <Icon name="Calendar" size={12} />
              <span>{formatDueDate(task.dueDate)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`flex items-center space-x-1 transition-opacity duration-200 ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            title="Edit task"
            className="h-8 w-8"
          >
            <Icon name="Edit2" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            title="Delete task"
            className="h-8 w-8 text-error hover:text-error"
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;