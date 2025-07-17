import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskForm = ({ task, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: '',
    tags: [],
    isCompleted: false
  });

  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState('saved'); // saved, saving, error
  const [autoSaveTimeout, setAutoSaveTimeout] = useState(null);

  const priorityOptions = [
    { value: 'high', label: 'High Priority', description: 'Urgent and important' },
    { value: 'medium', label: 'Medium Priority', description: 'Important but not urgent' },
    { value: 'low', label: 'Low Priority', description: 'Nice to have' }
  ];

  const categoryOptions = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'health', label: 'Health & Fitness' },
    { value: 'learning', label: 'Learning' },
    { value: 'finance', label: 'Finance' },
    { value: 'home', label: 'Home & Family' },
    { value: 'creative', label: 'Creative Projects' },
    { value: 'social', label: 'Social & Events' }
  ];

  const availableTags = [
    'urgent', 'meeting', 'deadline', 'review', 'planning', 'research',
    'development', 'design', 'testing', 'documentation', 'client',
    'team', 'personal-growth', 'health', 'exercise', 'reading'
  ];

  useEffect(() => {
    if (task && isEditing) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate || '',
        category: task.category || '',
        tags: task.tags || [],
        isCompleted: task.isCompleted || false
      });
    }
  }, [task, isEditing]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Auto-save functionality
    setSaveStatus('saving');
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }

    const timeout = setTimeout(() => {
      handleAutoSave();
    }, 1000);
    setAutoSaveTimeout(timeout);
  };

  const handleAutoSave = () => {
    if (formData.title.trim()) {
      // Simulate auto-save
      setTimeout(() => {
        setSaveStatus('saved');
      }, 500);
    }
  };

  const handleTagToggle = (tag) => {
    const updatedTags = formData.tags.includes(tag)
      ? formData.tags.filter(t => t !== tag)
      : [...formData.tags, tag];
    
    handleInputChange('tags', updatedTags);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const taskData = {
        ...formData,
        id: task?.id || Date.now(),
        createdAt: task?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      onSave(taskData);
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

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

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
      {/* Auto-save Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          {saveStatus === 'saving' && (
            <>
              <Icon name="Loader2" size={16} className="animate-spin text-blue-500" />
              <span className="text-muted-foreground">Saving...</span>
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <Icon name="Check" size={16} className="text-green-500" />
              <span className="text-muted-foreground">Saved</span>
            </>
          )}
          {saveStatus === 'error' && (
            <>
              <Icon name="AlertCircle" size={16} className="text-red-500" />
              <span className="text-red-500">Save failed</span>
            </>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          Ctrl+Enter to save • Esc to cancel
        </div>
      </div>

      {/* Title Input */}
      <div>
        <Input
          label="Task Title"
          type="text"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          error={errors.title}
          required
          maxLength={100}
          className="text-lg"
        />
        <div className="mt-1 text-xs text-muted-foreground text-right">
          {formData.title.length}/100 characters
        </div>
      </div>

      {/* Description Textarea */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          placeholder="Add more details about this task..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          maxLength={500}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
            errors.description ? 'border-red-300' : 'border-border'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <div className="mt-1 text-xs text-muted-foreground text-right">
          {formData.description.length}/500 characters
        </div>
      </div>

      {/* Priority Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Priority Level
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {priorityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleInputChange('priority', option.value)}
              className={`p-3 border-2 rounded-lg transition-all hover:shadow-sm ${
                formData.priority === option.value
                  ? getPriorityColor(option.value)
                  : 'border-border hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getPriorityIcon(option.value)} 
                  size={18}
                  className={formData.priority === option.value ? '' : 'text-muted-foreground'}
                />
                <div className="text-left">
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs opacity-75">{option.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Due Date and Category Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleInputChange('dueDate', e.target.value)}
          error={errors.dueDate}
          min={new Date().toISOString().split('T')[0]}
        />

        <Select
          label="Category"
          placeholder="Select a category"
          options={categoryOptions}
          value={formData.category}
          onChange={(value) => handleInputChange('category', value)}
          searchable
        />
      </div>

      {/* Tags Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                formData.tags.includes(tag)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-gray-300'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
        {formData.tags.length > 0 && (
          <div className="mt-2 text-sm text-muted-foreground">
            Selected: {formData.tags.join(', ')}
          </div>
        )}
      </div>

      {/* Completion Status (for editing) */}
      {isEditing && (
        <div>
          <Checkbox
            label="Mark as completed"
            description="This task has been finished"
            checked={formData.isCompleted}
            onChange={(e) => handleInputChange('isCompleted', e.target.checked)}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          type="submit"
          variant="default"
          iconName="Save"
          iconPosition="left"
          className="sm:order-2"
          disabled={!formData.title.trim()}
        >
          {isEditing ? 'Update Task' : 'Create Task'}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="sm:order-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;