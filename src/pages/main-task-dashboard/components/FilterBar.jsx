import React from 'react';

import Button from '../../../components/ui/Button';

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  categories, 
  selectedCategory, 
  onCategoryChange,
  tasks 
}) => {
  const filterOptions = [
    { key: 'all', label: 'All', icon: 'List' },
    { key: 'active', label: 'Active', icon: 'Clock' },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ];

  const getTaskCountByFilter = (filter) => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed).length;
      case 'completed':
        return tasks.filter(task => task.completed).length;
      default:
        return tasks.length;
    }
  };

  const getTaskCountByCategory = (categoryId) => {
    if (!categoryId) return tasks.length;
    return tasks.filter(task => task.categoryId === categoryId).length;
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-subtle border border-border">
      {/* Status Filters */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-sm font-medium text-muted-foreground mr-2">Status:</span>
        <div className="flex space-x-1">
          {filterOptions.map((option) => (
            <Button
              key={option.key}
              variant={activeFilter === option.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onFilterChange(option.key)}
              iconName={option.icon}
              iconPosition="left"
              iconSize={16}
              className="text-xs"
            >
              {option.label} ({getTaskCountByFilter(option.key)})
            </Button>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-muted-foreground mr-2">Category:</span>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedCategory ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onCategoryChange(null)}
            className="text-xs"
          >
            All ({getTaskCountByCategory(null)})
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className="text-xs"
              style={{ 
                backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                borderColor: category.color,
                color: selectedCategory === category.id ? 'white' : category.color
              }}
            >
              <div 
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: category.color }}
              ></div>
              {category.name} ({getTaskCountByCategory(category.id)})
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;