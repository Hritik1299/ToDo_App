import React from 'react';
import Button from '../../../components/ui/Button';


const QuickActions = ({ onCreateTask, onViewAnalytics, onManageCategories }) => {
  const quickActions = [
    {
      label: 'Create Task',
      icon: 'Plus',
      onClick: onCreateTask,
      variant: 'default',
      description: 'Add a new task'
    },
    {
      label: 'Analytics',
      icon: 'BarChart3',
      onClick: onViewAnalytics,
      variant: 'outline',
      description: 'View productivity insights'
    },
    {
      label: 'Categories',
      icon: 'FolderOpen',
      onClick: onManageCategories,
      variant: 'outline',
      description: 'Organize task categories'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-4 shadow-subtle border border-border">
      <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            onClick={action.onClick}
            iconName={action.icon}
            iconPosition="left"
            className="justify-start h-auto p-3"
          >
            <div className="text-left">
              <div className="font-medium">{action.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;