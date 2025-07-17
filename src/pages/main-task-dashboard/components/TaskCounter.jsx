import React from 'react';
import Icon from '../../../components/AppIcon';

const TaskCounter = ({ tasks }) => {
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const counterItems = [
    {
      label: 'Active',
      count: activeTasks,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Completed',
      count: completedTasks,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Total',
      count: totalTasks,
      icon: 'List',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Task Overview</h2>
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {counterItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mx-auto mb-2`}>
              <Icon name={item.icon} size={20} className={item.color} />
            </div>
            <div className="text-2xl font-bold text-foreground">{item.count}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{completionPercentage}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TaskCounter;