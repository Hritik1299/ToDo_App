import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedSearches = ({ 
  savedSearches, 
  onSaveSearch, 
  onLoadSearch, 
  onDeleteSearch,
  currentSearch 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchName, setSearchName] = useState('');

  const handleSaveSearch = () => {
    if (searchName.trim() && currentSearch) {
      onSaveSearch({
        name: searchName.trim(),
        query: currentSearch.query,
        filters: currentSearch.filters,
        createdAt: new Date().toISOString()
      });
      setSearchName('');
      setShowSaveDialog(false);
    }
  };

  const canSaveCurrentSearch = () => {
    return currentSearch && (
      currentSearch.query || 
      (currentSearch.filters && Object.keys(currentSearch.filters).some(key => {
        const value = currentSearch.filters[key];
        return value && (
          (Array.isArray(value) && value.length > 0) ||
          (!Array.isArray(value) && value !== 'all' && value !== null)
        );
      }))
    );
  };

  if (savedSearches.length === 0 && !canSaveCurrentSearch()) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-micro"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={16} className="text-muted-foreground" />
          <span className="font-medium text-foreground">Saved Searches</span>
          {savedSearches.length > 0 && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
              {savedSearches.length}
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
        <div className="px-4 pb-4 border-t border-border">
          {/* Save Current Search */}
          {canSaveCurrentSearch() && (
            <div className="mb-4 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Current Search</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSaveDialog(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Save
                </Button>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
                {currentSearch.query && (
                  <div className="mb-1">
                    <strong>Query:</strong> "{currentSearch.query}"
                  </div>
                )}
                {currentSearch.filters && Object.keys(currentSearch.filters).length > 0 && (
                  <div>
                    <strong>Filters:</strong> {Object.entries(currentSearch.filters)
                      .filter(([key, value]) => {
                        return value && (
                          (Array.isArray(value) && value.length > 0) ||
                          (!Array.isArray(value) && value !== 'all' && value !== null)
                        );
                      })
                      .map(([key, value]) => {
                        if (Array.isArray(value)) {
                          return `${key}: ${value.join(', ')}`;
                        }
                        return `${key}: ${value}`;
                      })
                      .join(', ')
                    }
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Saved Searches List */}
          {savedSearches.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground mb-3">Your Saved Searches</h4>
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-micro"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Icon name="Search" size={14} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground truncate">
                        {search.name}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Saved {new Date(search.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onLoadSearch(search)}
                      className="text-primary hover:text-primary"
                    >
                      Load
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteSearch(search.id)}
                      className="text-muted-foreground hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Save Search Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Save Search</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSaveDialog(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Search Name"
                type="text"
                placeholder="Enter a name for this search..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                required
              />
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleSaveSearch}
                  disabled={!searchName.trim()}
                  className="flex-1"
                >
                  Save Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;