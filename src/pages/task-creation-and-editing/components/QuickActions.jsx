import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onNewTask, onTemplateSelect, recentTasks = [] }) => {
  const taskTemplates = [
    {
      id: 'meeting',
      name: 'Meeting',
      icon: 'Users',
      template: {
        title: 'Team Meeting',
        description: 'Discuss project progress and next steps',
        priority: 'medium',
        category: 'work',
        tags: ['meeting', 'team']
      }
    },
    {
      id: 'deadline',
      name: 'Deadline',
      icon: 'Clock',
      template: {
        title: 'Project Deadline',
        description: 'Complete and submit project deliverables',
        priority: 'high',
        category: 'work',
        tags: ['deadline', 'urgent']
      }
    },
    {
      id: 'personal',
      name: 'Personal',
      icon: 'User',
      template: {
        title: 'Personal Task',
        description: 'Personal activity or goal',
        priority: 'medium',
        category: 'personal',
        tags: ['personal']
      }
    },
    {
      id: 'health',
      name: 'Health',
      icon: 'Heart',
      template: {
        title: 'Health & Fitness',
        description: 'Exercise or health-related activity',
        priority: 'medium',
        category: 'health',
        tags: ['health', 'exercise']
      }
    }
  ];

  const handleTemplateClick = (template) => {
    onTemplateSelect(template.template);
  };

  const handleRecentTaskClick = (task) => {
    const duplicatedTask = {
      ...task,
      id: undefined,
      title: `Copy of ${task.title}`,
      isCompleted: false,
      createdAt: undefined,
      updatedAt: undefined
    };
    onTemplateSelect(duplicatedTask);
  };

  return (
    <div className="space-y-6">
      {/* Quick Start */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Start</h3>
        <Button
          variant="default"
          onClick={onNewTask}
          iconName="Plus"
          iconPosition="left"
          fullWidth
          className="mb-4"
        >
          Create New Task
        </Button>
      </div>

      {/* Task Templates */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Task Templates</h4>
        <div className="grid grid-cols-2 gap-3">
          {taskTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateClick(template)}
              className="p-3 border border-border rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-left group"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={template.icon} 
                  size={16} 
                  className="text-muted-foreground group-hover:text-foreground transition-colors" 
                />
                <span className="text-sm font-medium text-foreground">{template.name}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {template.template.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      {recentTasks.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Tasks</h4>
          <div className="space-y-2">
            {recentTasks.slice(0, 3).map((task) => (
              <button
                key={task.id}
                onClick={() => handleRecentTaskClick(task)}
                className="w-full p-3 border border-border rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-left group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {task.title}
                    </h5>
                    {task.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-md ${
                        task.priority === 'high' ? 'bg-red-50 text-red-600' :
                        task.priority === 'medium'? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
                      }`}>
                        {task.priority}
                      </span>
                      {task.category && (
                        <span className="text-xs text-muted-foreground capitalize">
                          {task.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <Icon 
                    name="Copy" 
                    size={14} 
                    className="text-muted-foreground group-hover:text-foreground transition-colors ml-2 flex-shrink-0" 
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Keyboard Shortcuts</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Save task</span>
            <kbd className="px-2 py-1 bg-background border border-border rounded text-foreground">
              Ctrl + Enter
            </kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cancel</span>
            <kbd className="px-2 py-1 bg-background border border-border rounded text-foreground">
              Esc
            </kbd>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">New task</span>
            <kbd className="px-2 py-1 bg-background border border-border rounded text-foreground">
              Ctrl + N
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;