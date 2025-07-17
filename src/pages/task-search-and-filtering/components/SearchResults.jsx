import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchResults = ({ 
  tasks, 
  searchQuery, 
  onTaskToggle, 
  onTaskDelete, 
  onTaskEdit,
  selectedTasks,
  onTaskSelect,
  onBulkAction,
  loading 
}) => {
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-warning/30 text-warning-foreground rounded px-1">
          {part}
        </mark>
      ) : part
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      work: 'Briefcase',
      personal: 'User',
      shopping: 'ShoppingCart',
      health: 'Heart',
      finance: 'DollarSign'
    };
    return iconMap[category] || 'Tag';
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return { text: 'Today', color: 'text-warning' };
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return { text: 'Tomorrow', color: 'text-primary' };
    } else if (date < today) {
      return { text: 'Overdue', color: 'text-error' };
    } else {
      return { 
        text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
        color: 'text-muted-foreground' 
      };
    }
  };

  const allSelected = tasks.length > 0 && selectedTasks.length === tasks.length;
  const someSelected = selectedTasks.length > 0 && selectedTasks.length < tasks.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-muted-foreground">Searching tasks...</span>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No tasks found</h3>
        <p className="text-muted-foreground mb-6">
          {searchQuery 
            ? `No tasks match "${searchQuery}". Try adjusting your search or filters.`
            : 'No tasks match your current filters. Try adjusting your filter criteria.'
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/task-creation-and-editing'}
            iconName="Plus"
            iconPosition="left"
          >
            Create New Task
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.location.href = '/main-task-dashboard'}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions Bar */}
      {selectedTasks.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={(e) => {
                  if (e.target.checked) {
                    onTaskSelect(tasks.map(task => task.id));
                  } else {
                    onTaskSelect([]);
                  }
                }}
              />
              <span className="text-sm font-medium text-foreground">
                {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBulkAction('complete')}
                iconName="Check"
                iconPosition="left"
              >
                Mark Complete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBulkAction('delete')}
                iconName="Trash2"
                iconPosition="left"
                className="text-error hover:text-error"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={(e) => {
              if (e.target.checked) {
                onTaskSelect(tasks.map(task => task.id));
              } else {
                onTaskSelect([]);
              }
            }}
          />
          <span className="text-sm text-muted-foreground">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => {
          const dueDate = formatDueDate(task.dueDate);
          const isSelected = selectedTasks.includes(task.id);
          
          return (
            <div
              key={task.id}
              className={`bg-card border border-border rounded-lg p-4 transition-micro hover:shadow-subtle ${
                isSelected ? 'ring-2 ring-primary/20 bg-primary/5' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={isSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onTaskSelect([...selectedTasks, task.id]);
                    } else {
                      onTaskSelect(selectedTasks.filter(id => id !== task.id));
                    }
                  }}
                  className="mt-1"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium transition-micro ${
                        task.completed 
                          ? 'text-muted-foreground line-through' 
                          : 'text-foreground'
                      }`}>
                        {highlightText(task.title, searchQuery)}
                      </h3>
                      
                      {task.description && (
                        <p className={`text-sm mt-1 ${
                          task.completed 
                            ? 'text-muted-foreground line-through' 
                            : 'text-muted-foreground'
                        }`}>
                          {highlightText(task.description, searchQuery)}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-3">
                        {/* Priority */}
                        <div className="flex items-center space-x-1">
                          <Icon 
                            name="AlertCircle" 
                            size={14} 
                            className={getPriorityColor(task.priority)} 
                          />
                          <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)}
                          </span>
                        </div>
                        
                        {/* Category */}
                        <div className="flex items-center space-x-1">
                          <Icon 
                            name={getCategoryIcon(task.category)} 
                            size={14} 
                            className="text-muted-foreground" 
                          />
                          <span className="text-xs text-muted-foreground">
                            {task.category?.charAt(0).toUpperCase() + task.category?.slice(1)}
                          </span>
                        </div>
                        
                        {/* Due Date */}
                        {dueDate && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} className={dueDate.color} />
                            <span className={`text-xs ${dueDate.color}`}>
                              {dueDate.text}
                            </span>
                          </div>
                        )}
                        
                        {/* Created Date */}
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onTaskToggle(task.id)}
                        className={task.completed ? 'text-success' : 'text-muted-foreground'}
                        title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        <Icon name={task.completed ? "CheckCircle2" : "Circle"} size={18} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onTaskEdit(task.id)}
                        className="text-muted-foreground hover:text-foreground"
                        title="Edit task"
                      >
                        <Icon name="Edit2" size={16} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onTaskDelete(task.id)}
                        className="text-muted-foreground hover:text-error"
                        title="Delete task"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResults;