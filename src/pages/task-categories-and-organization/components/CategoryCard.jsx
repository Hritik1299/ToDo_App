import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CategoryCard = ({ 
  category, 
  onEdit, 
  onDelete, 
  onColorChange, 
  onDragStart, 
  onDragEnd,
  isDragging 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(category.name);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorOptions = [
    '#2563EB', '#DC2626', '#059669', '#D97706', 
    '#7C3AED', '#DB2777', '#0891B2', '#65A30D'
  ];

  const handleSaveEdit = () => {
    if (editName.trim()) {
      onEdit(category.id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditName(category.name);
    setIsEditing(false);
  };

  const handleColorSelect = (color) => {
    onColorChange(category.id, color);
    setShowColorPicker(false);
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'hover:shadow-moderate'
      }`}
      draggable
      onDragStart={() => onDragStart(category)}
      onDragEnd={onDragEnd}
    >
      {/* Category Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div
            className="w-4 h-4 rounded-full cursor-pointer"
            style={{ backgroundColor: category.color }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          />
          {isEditing ? (
            <div className="flex-1">
              <Input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                autoFocus
              />
            </div>
          ) : (
            <h3 
              className="font-medium text-foreground cursor-pointer hover:text-primary"
              onClick={() => setIsEditing(true)}
            >
              {category.name}
            </h3>
          )}
        </div>

        <div className="flex items-center space-x-1">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveEdit}
                className="h-8 w-8"
              >
                <Icon name="Check" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancelEdit}
                className="h-8 w-8"
              >
                <Icon name="X" size={14} />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 opacity-0 group-hover:opacity-100"
              >
                <Icon name="Edit2" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(category.id)}
                className="h-8 w-8 opacity-0 group-hover:opacity-100 text-error hover:text-error"
              >
                <Icon name="Trash2" size={14} />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Task Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{category.taskCount} tasks</span>
        <div className="flex items-center space-x-1">
          <Icon name="GripVertical" size={14} className="cursor-move" />
        </div>
      </div>

      {/* Color Picker */}
      {showColorPicker && (
        <div className="absolute z-10 mt-2 p-2 bg-popover border border-border rounded-lg shadow-moderate">
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full border-2 border-transparent hover:border-ring"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;