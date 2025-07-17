import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll, resultCount }) => {
  const getFilterChips = () => {
    const chips = [];

    // Status filter
    if (filters.status && filters.status !== 'all') {
      chips.push({
        type: 'status',
        value: filters.status,
        label: `Status: ${filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}`,
        color: 'bg-primary/10 text-primary'
      });
    }

    // Priority filters
    if (filters.priority && filters.priority.length > 0) {
      filters.priority.forEach(priority => {
        const colorMap = {
          high: 'bg-error/10 text-error',
          medium: 'bg-warning/10 text-warning',
          low: 'bg-success/10 text-success'
        };
        chips.push({
          type: 'priority',
          value: priority,
          label: `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`,
          color: colorMap[priority] || 'bg-muted text-muted-foreground'
        });
      });
    }

    // Category filters
    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach(category => {
        chips.push({
          type: 'categories',
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1),
          color: 'bg-accent/10 text-accent'
        });
      });
    }

    // Due date filter
    if (filters.dueDate) {
      const dueDateLabels = {
        'today': 'Due Today',
        'tomorrow': 'Due Tomorrow',
        'this-week': 'This Week',
        'next-week': 'Next Week',
        'overdue': 'Overdue',
        'no-due-date': 'No Due Date'
      };
      chips.push({
        type: 'dueDate',
        value: filters.dueDate,
        label: dueDateLabels[filters.dueDate] || filters.dueDate,
        color: 'bg-secondary/10 text-secondary'
      });
    }

    return chips;
  };

  const filterChips = getFilterChips();

  if (filterChips.length === 0) {
    return null;
  }

  const handleRemoveFilter = (type, value) => {
    if (type === 'priority') {
      const newPriorities = filters.priority.filter(p => p !== value);
      onRemoveFilter('priority', newPriorities);
    } else if (type === 'categories') {
      const newCategories = filters.categories.filter(c => c !== value);
      onRemoveFilter('categories', newCategories);
    } else {
      onRemoveFilter(type, type === 'status' ? 'all' : null);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Active Filters</span>
          {resultCount !== undefined && (
            <span className="text-sm text-muted-foreground">
              ({resultCount} {resultCount === 1 ? 'result' : 'results'})
            </span>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground self-start sm:self-auto"
        >
          Clear All Filters
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {filterChips.map((chip, index) => (
          <div
            key={`${chip.type}-${chip.value}-${index}`}
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${chip.color} transition-micro`}
          >
            <span>{chip.label}</span>
            <button
              onClick={() => handleRemoveFilter(chip.type, chip.value)}
              className="hover:bg-black/10 rounded-full p-0.5 transition-micro"
              aria-label={`Remove ${chip.label} filter`}
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;