import React, { useState } from 'react';
import CategoryCard from './CategoryCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const CategoryList = ({ 
  categories, 
  onEditCategory, 
  onDeleteCategory, 
  onColorChange,
  onReorderCategories,
  selectedCategories,
  onSelectCategory,
  onSelectAll
}) => {
  const [draggedCategory, setDraggedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, taskCount, recent

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'taskCount':
        return b.taskCount - a.taskCount;
      case 'recent':
        return new Date(b.lastUsed) - new Date(a.lastUsed);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleDragStart = (category) => {
    setDraggedCategory(category);
  };

  const handleDragEnd = () => {
    setDraggedCategory(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    if (draggedCategory && draggedCategory.id !== targetCategory.id) {
      const draggedIndex = categories.findIndex(cat => cat.id === draggedCategory.id);
      const targetIndex = categories.findIndex(cat => cat.id === targetCategory.id);
      onReorderCategories(draggedIndex, targetIndex);
    }
    setDraggedCategory(null);
  };

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'taskCount', label: 'Task Count' },
    { value: 'recent', label: 'Recently Used' }
  ];

  return (
    <div className="space-y-4">
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Selection */}
      {categories.length > 0 && (
        <div className="flex items-center space-x-3 mb-4">
          <Checkbox
            checked={selectedCategories.length === categories.length}
            onChange={(e) => onSelectAll(e.target.checked)}
            label={`Select All (${selectedCategories.length}/${categories.length})`}
          />
        </div>
      )}

      {/* Categories Grid */}
      {sortedCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCategories.map((category) => (
            <div
              key={category.id}
              className="group relative"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, category)}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onChange={(e) => onSelectCategory(category.id, e.target.checked)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <CategoryCard
                category={category}
                onEdit={onEditCategory}
                onDelete={onDeleteCategory}
                onColorChange={onColorChange}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                isDragging={draggedCategory?.id === category.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            {searchQuery ? 'No categories found' : 'No categories yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery 
              ? 'Try adjusting your search terms' :'Create your first category to organize your tasks'
            }
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryList;