import React from 'react';
import Icon from '../../../components/AppIcon';

const TaskPreview = ({ task, onEdit }) => {
  if (!task || !task.title) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'Minus';
      default: return 'Circle';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return 'Briefcase';
      case 'personal': return 'User';
      case 'health': return 'Heart';
      case 'learning': return 'BookOpen';
      case 'finance': return 'DollarSign';
      case 'home': return 'Home';
      case 'creative': return 'Palette';
      case 'social': return 'Users';
      default: return 'Folder';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {task.description}
            </p>
          )}
        </div>
        
        <button
          onClick={onEdit}
          className="ml-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          title="Edit task"
        >
          <Icon name="Edit2" size={16} />
        </button>
      </div>

      {/* Task Details */}
      <div className="space-y-3">
        {/* Priority */}
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-md border text-xs font-medium ${getPriorityColor(task.priority)}`}>
            <Icon name={getPriorityIcon(task.priority)} size={12} />
            <span className="capitalize">{task.priority} Priority</span>
          </div>
        </div>

        {/* Due Date and Category */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {task.dueDate && (
            <div className={`flex items-center space-x-1 ${isOverdue(task.dueDate) ? 'text-red-600' : 'text-muted-foreground'}`}>
              <Icon name="Calendar" size={14} />
              <span>Due: {formatDate(task.dueDate)}</span>
              {isOverdue(task.dueDate) && (
                <Icon name="AlertCircle" size={14} className="text-red-500" />
              )}
            </div>
          )}

          {task.category && (
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name={getCategoryIcon(task.category)} size={14} />
              <span className="capitalize">{task.category}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Completion Status */}
        {task.isCompleted && (
          <div className="flex items-center space-x-2 text-green-600">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Completed</span>
          </div>
        )}
      </div>

      {/* Timestamps */}
      <div className="pt-3 border-t border-border text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Created: {formatDate(task.createdAt)}</span>
          {task.updatedAt && task.updatedAt !== task.createdAt && (
            <span>Updated: {formatDate(task.updatedAt)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPreview;