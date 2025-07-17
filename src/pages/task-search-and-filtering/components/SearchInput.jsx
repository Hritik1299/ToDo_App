import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchInput = ({ 
  searchQuery, 
  onSearchChange, 
  onSearchSubmit, 
  recentSearches, 
  onRecentSearchClick,
  onClearRecent,
  showSuggestions,
  onToggleSuggestions 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isFocused) {
        inputRef.current?.blur();
        onToggleSuggestions(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, onToggleSuggestions]);

  const handleFocus = () => {
    setIsFocused(true);
    onToggleSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      onToggleSuggestions(false);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
    inputRef.current?.blur();
  };

  const searchOperators = [
    { operator: 'category:', description: 'Search within specific category' },
    { operator: 'priority:', description: 'Filter by priority level' },
    { operator: 'due:', description: 'Filter by due date' },
    { operator: '"text"', description: 'Exact phrase search' }
  ];

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search tasks, categories, or use operators..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="pl-10 pr-12"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-micro"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (isFocused || searchQuery) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-moderate z-50 max-h-96 overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && !searchQuery && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">Recent Searches</h4>
                <button
                  onClick={onClearRecent}
                  className="text-xs text-muted-foreground hover:text-foreground transition-micro"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => onRecentSearchClick(search)}
                    className="flex items-center space-x-3 w-full p-2 rounded-md hover:bg-muted transition-micro text-left"
                  >
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Operators Help */}
          {!searchQuery && (
            <div className="p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Search Operators</h4>
              <div className="space-y-2">
                {searchOperators.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-primary">
                      {item.operator}
                    </code>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {!searchQuery && (
            <div className="p-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSearchChange('priority:high')}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-error/10 text-error rounded-full text-xs hover:bg-error/20 transition-micro"
                >
                  <Icon name="AlertCircle" size={12} />
                  <span>High Priority</span>
                </button>
                <button
                  onClick={() => onSearchChange('due:today')}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-warning/10 text-warning rounded-full text-xs hover:bg-warning/20 transition-micro"
                >
                  <Icon name="Calendar" size={12} />
                  <span>Due Today</span>
                </button>
                <button
                  onClick={() => onSearchChange('category:work')}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs hover:bg-primary/20 transition-micro"
                >
                  <Icon name="Briefcase" size={12} />
                  <span>Work Tasks</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;