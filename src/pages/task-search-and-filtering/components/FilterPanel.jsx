import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onToggle,
  taskCounts 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    priority: true,
    category: true,
    dueDate: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const statusOptions = [
    { value: 'all', label: 'All Tasks', count: taskCounts.all },
    { value: 'active', label: 'Active', count: taskCounts.active },
    { value: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High Priority', color: 'text-error', count: taskCounts.high },
    { value: 'medium', label: 'Medium Priority', color: 'text-warning', count: taskCounts.medium },
    { value: 'low', label: 'Low Priority', color: 'text-success', count: taskCounts.low }
  ];

  const categoryOptions = [
    { value: 'work', label: 'Work', icon: 'Briefcase', count: taskCounts.work },
    { value: 'personal', label: 'Personal', icon: 'User', count: taskCounts.personal },
    { value: 'shopping', label: 'Shopping', icon: 'ShoppingCart', count: taskCounts.shopping },
    { value: 'health', label: 'Health', icon: 'Heart', count: taskCounts.health },
    { value: 'finance', label: 'Finance', icon: 'DollarSign', count: taskCounts.finance }
  ];

  const dueDateOptions = [
    { value: 'today', label: 'Due Today' },
    { value: 'tomorrow', label: 'Due Tomorrow' },
    { value: 'this-week', label: 'This Week' },
    { value: 'next-week', label: 'Next Week' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'no-due-date', label: 'No Due Date' }
  ];

  const handleStatusChange = (status) => {
    onFilterChange('status', status);
  };

  const handlePriorityChange = (priority, checked) => {
    const currentPriorities = filters.priority || [];
    const newPriorities = checked
      ? [...currentPriorities, priority]
      : currentPriorities.filter(p => p !== priority);
    onFilterChange('priority', newPriorities);
  };

  const handleCategoryChange = (category, checked) => {
    const currentCategories = filters.categories || [];
    const newCategories = checked
      ? [...currentCategories, category]
      : currentCategories.filter(c => c !== category);
    onFilterChange('categories', newCategories);
  };

  const handleDueDateChange = (dueDate) => {
    onFilterChange('dueDate', dueDate);
  };

  const FilterSection = ({ title, isExpanded, onToggle, children, count }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-micro"
      >
        <div className="flex items-center space-x-2">
          <span className="font-medium text-foreground">{title}</span>
          {count !== undefined && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
              {count}
            </span>
          )}
        </div>
        <Icon
          name={isExpanded ? "ChevronUp" : "ChevronDown"}
          size={16}
          className="text-muted-foreground"
        />
      </button>
      {isExpanded && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden md:block">
        <div className="bg-card border border-border rounded-lg shadow-subtle">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>

          {/* Status Filter */}
          <FilterSection
            title="Status"
            isExpanded={expandedSections.status}
            onToggle={() => toggleSection('status')}
          >
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  className={`flex items-center justify-between w-full p-2 rounded-md transition-micro ${
                    filters.status === option.value
                      ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                  }`}
                >
                  <span className="text-sm">{option.label}</span>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Priority Filter */}
          <FilterSection
            title="Priority"
            isExpanded={expandedSections.priority}
            onToggle={() => toggleSection('priority')}
          >
            <div className="space-y-2">
              {priorityOptions.map((option) => (
                <div key={option.value} className="flex items-center justify-between">
                  <Checkbox
                    label={
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${option.color}`}>{option.label}</span>
                      </div>
                    }
                    checked={(filters.priority || []).includes(option.value)}
                    onChange={(e) => handlePriorityChange(option.value, e.target.checked)}
                  />
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {option.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Category Filter */}
          <FilterSection
            title="Categories"
            isExpanded={expandedSections.category}
            onToggle={() => toggleSection('category')}
          >
            <div className="space-y-2">
              {categoryOptions.map((option) => (
                <div key={option.value} className="flex items-center justify-between">
                  <Checkbox
                    label={
                      <div className="flex items-center space-x-2">
                        <Icon name={option.icon} size={16} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">{option.label}</span>
                      </div>
                    }
                    checked={(filters.categories || []).includes(option.value)}
                    onChange={(e) => handleCategoryChange(option.value, e.target.checked)}
                  />
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {option.count}
                  </span>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Due Date Filter */}
          <FilterSection
            title="Due Date"
            isExpanded={expandedSections.dueDate}
            onToggle={() => toggleSection('dueDate')}
          >
            <div className="space-y-2">
              {dueDateOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleDueDateChange(option.value)}
                  className={`flex items-center w-full p-2 rounded-md transition-micro text-left ${
                    filters.dueDate === option.value
                      ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                  }`}
                >
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={onToggle}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-card rounded-t-xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Filter Tasks</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-muted-foreground"
                >
                  Clear All
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            {/* Mobile Filter Content - Same as desktop but optimized for touch */}
            <div className="pb-safe">
              {/* Status Filter */}
              <FilterSection
                title="Status"
                isExpanded={expandedSections.status}
                onToggle={() => toggleSection('status')}
              >
                <div className="grid grid-cols-1 gap-2">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        handleStatusChange(option.value);
                        onToggle();
                      }}
                      className={`flex items-center justify-between p-3 rounded-lg transition-micro ${
                        filters.status === option.value
                          ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                      }`}
                    >
                      <span>{option.label}</span>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Priority Filter */}
              <FilterSection
                title="Priority"
                isExpanded={expandedSections.priority}
                onToggle={() => toggleSection('priority')}
              >
                <div className="space-y-3">
                  {priorityOptions.map((option) => (
                    <div key={option.value} className="flex items-center justify-between">
                      <Checkbox
                        label={
                          <div className="flex items-center space-x-2">
                            <span className={`${option.color}`}>{option.label}</span>
                          </div>
                        }
                        checked={(filters.priority || []).includes(option.value)}
                        onChange={(e) => handlePriorityChange(option.value, e.target.checked)}
                        size="lg"
                      />
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Category Filter */}
              <FilterSection
                title="Categories"
                isExpanded={expandedSections.category}
                onToggle={() => toggleSection('category')}
              >
                <div className="space-y-3">
                  {categoryOptions.map((option) => (
                    <div key={option.value} className="flex items-center justify-between">
                      <Checkbox
                        label={
                          <div className="flex items-center space-x-2">
                            <Icon name={option.icon} size={16} className="text-muted-foreground" />
                            <span className="text-foreground">{option.label}</span>
                          </div>
                        }
                        checked={(filters.categories || []).includes(option.value)}
                        onChange={(e) => handleCategoryChange(option.value, e.target.checked)}
                        size="lg"
                      />
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </div>
                  ))}
                </div>
              </FilterSection>

              {/* Due Date Filter */}
              <FilterSection
                title="Due Date"
                isExpanded={expandedSections.dueDate}
                onToggle={() => toggleSection('dueDate')}
              >
                <div className="grid grid-cols-1 gap-2">
                  {dueDateOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        handleDueDateChange(option.value);
                        onToggle();
                      }}
                      className={`flex items-center p-3 rounded-lg transition-micro text-left ${
                        filters.dueDate === option.value
                          ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                      }`}
                    >
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </FilterSection>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;