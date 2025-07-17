import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CategoryCreator = ({ onCreateCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const colorOptions = [
    '#2563EB', '#DC2626', '#059669', '#D97706', 
    '#7C3AED', '#DB2777', '#0891B2', '#65A30D'
  ];

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      onCreateCategory({
        name: newCategoryName.trim(),
        color: randomColor
      });
      setNewCategoryName('');
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreateCategory();
    } else if (e.key === 'Escape') {
      setNewCategoryName('');
      setIsCreating(false);
    }
  };

  if (!isCreating) {
    return (
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => setIsCreating(true)}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          className="w-full justify-center"
        >
          Create New Category
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
      <div className="flex items-center space-x-3 mb-3">
        <Icon name="FolderPlus" size={20} className="text-primary" />
        <h3 className="font-medium text-foreground">Create New Category</h3>
      </div>
      
      <div className="space-y-3">
        <Input
          type="text"
          placeholder="Enter category name..."
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            onClick={handleCreateCategory}
            disabled={!newCategoryName.trim()}
            iconName="Check"
            iconPosition="left"
            iconSize={14}
          >
            Create
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => {
              setNewCategoryName('');
              setIsCreating(false);
            }}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreator;