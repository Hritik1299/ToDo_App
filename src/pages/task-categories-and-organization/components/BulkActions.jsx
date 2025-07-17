import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ 
  categories, 
  selectedCategories, 
  onMergeCategories, 
  onArchiveCategories,
  onExportCategories,
  onImportCategories 
}) => {
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [targetCategory, setTargetCategory] = useState('');

  const handleMergeCategories = () => {
    if (targetCategory && selectedCategories.length > 0) {
      onMergeCategories(selectedCategories, targetCategory);
      setShowMergeDialog(false);
      setTargetCategory('');
    }
  };

  const categoryOptions = categories
    .filter(cat => !selectedCategories.includes(cat.id))
    .map(cat => ({
      value: cat.id,
      label: cat.name
    }));

  const hasSelectedCategories = selectedCategories.length > 0;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Button
          variant="outline"
          onClick={() => setShowMergeDialog(true)}
          disabled={selectedCategories.length < 2}
          iconName="Merge"
          iconPosition="left"
          iconSize={16}
        >
          Merge ({selectedCategories.length})
        </Button>

        <Button
          variant="outline"
          onClick={() => onArchiveCategories(selectedCategories)}
          disabled={!hasSelectedCategories}
          iconName="Archive"
          iconPosition="left"
          iconSize={16}
        >
          Archive
        </Button>

        <Button
          variant="outline"
          onClick={onExportCategories}
          iconName="Download"
          iconPosition="left"
          iconSize={16}
        >
          Export
        </Button>

        <Button
          variant="outline"
          onClick={onImportCategories}
          iconName="Upload"
          iconPosition="left"
          iconSize={16}
        >
          Import
        </Button>
      </div>

      {/* Merge Dialog */}
      {showMergeDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Merge" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Merge Categories</h3>
            </div>

            <p className="text-muted-foreground mb-4">
              Select the target category to merge {selectedCategories.length} selected categories into:
            </p>

            <Select
              label="Target Category"
              placeholder="Choose target category..."
              options={categoryOptions}
              value={targetCategory}
              onChange={setTargetCategory}
              className="mb-4"
            />

            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                onClick={handleMergeCategories}
                disabled={!targetCategory}
              >
                Merge Categories
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => {
                  setShowMergeDialog(false);
                  setTargetCategory('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;