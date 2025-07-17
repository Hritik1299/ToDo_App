import React from 'react';
import Button from '../../../components/ui/Button';

const FloatingActionButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-20 right-6 md:bottom-6 z-50">
      <Button
        variant="default"
        size="lg"
        onClick={onClick}
        iconName="Plus"
        className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        title="Create new task (Ctrl+N)"
      />
    </div>
  );
};

export default FloatingActionButton;