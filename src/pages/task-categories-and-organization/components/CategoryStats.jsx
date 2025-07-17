import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryStats = ({ categories, totalTasks }) => {
  const totalCategories = categories.length;
  const averageTasksPerCategory = totalCategories > 0 ? Math.round(totalTasks / totalCategories) : 0;
  const mostUsedCategory = categories.reduce((prev, current) => 
    (prev.taskCount > current.taskCount) ? prev : current, categories[0] || {}
  );

  const stats = [
    {
      label: 'Total Categories',
      value: totalCategories,
      icon: 'FolderOpen',
      color: 'text-primary'
    },
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: 'CheckSquare',
      color: 'text-success'
    },
    {
      label: 'Avg Tasks/Category',
      value: averageTasksPerCategory,
      icon: 'BarChart3',
      color: 'text-accent'
    },
    {
      label: 'Most Used',
      value: mostUsedCategory?.name || 'None',
      icon: 'TrendingUp',
      color: 'text-warning'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-2">
            <Icon name={stat.icon} size={20} className={stat.color} />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryStats;