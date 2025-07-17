import React, { useState } from 'react';
import TaskCard from './TaskCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TaskList = ({ 
  tasks, 
  categories, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask, 
  onReorderTasks,
  onBulkComplete,
  onBulkDelete 
}) => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [bulkMode, setBulkMode] = useState(false);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedTask) {
      const dragIndex = tasks.findIndex(task => task.id === draggedTask.id);
      if (dragIndex !== dropIndex) {
        onReorderTasks(dragIndex, dropIndex);
      }
    }
    setDragOverIndex(null);
  };

  const handleTaskSelect = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };

  const handleBulkComplete = () => {
    onBulkComplete(selectedTasks);
    setSelectedTasks([]);
    setBulkMode(false);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTasks.length} task(s)?`)) {
      onBulkDelete(selectedTasks);
      setSelectedTasks([]);
      setBulkMode(false);
    }
  };

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId);
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-card rounded-lg p-12 text-center shadow-subtle border border-border">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckSquare" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
        <p className="text-muted-foreground mb-6">Create your first task to get started with your productivity journey.</p>
        <Button
          variant="default"
          onClick={() => window.location.href = '/task-creation-and-editing'}
          iconName="Plus"
          iconPosition="left"
        >
          Create First Task
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions Header */}
      {bulkMode && (
        <div className="bg-card rounded-lg p-4 shadow-subtle border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                iconName={selectedTasks.length === tasks.length ? "CheckSquare" : "Square"}
                iconPosition="left"
              >
                {selectedTasks.length === tasks.length ? 'Deselect All' : 'Select All'}
              </Button>
              <span className="text-sm text-muted-foreground">
                {selectedTasks.length} of {tasks.length} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkComplete}
                disabled={selectedTasks.length === 0}
                iconName="Check"
                iconPosition="left"
              >
                Complete Selected
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                disabled={selectedTasks.length === 0}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete Selected
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setBulkMode(false);
                  setSelectedTasks([]);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Mode Toggle */}
      {!bulkMode && tasks.length > 1 && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBulkMode(true)}
            iconName="CheckSquare"
            iconPosition="left"
          >
            Bulk Actions
          </Button>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`relative ${dragOverIndex === index ? 'border-t-2 border-primary' : ''}`}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
          >
            {bulkMode && (
              <div className="absolute top-4 left-4 z-10">
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleTaskSelect(task.id)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </div>
            )}
            <div className={bulkMode ? 'ml-8' : ''}>
              <TaskCard
                task={task}
                category={getCategoryById(task.categoryId)}
                onToggleComplete={onToggleComplete}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                onDragStart={(e) => handleDragStart(e, task)}
                onDragEnd={handleDragEnd}
                isDragging={draggedTask?.id === task.id}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;