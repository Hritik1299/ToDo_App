import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskPreview = ({ selectedCategory, tasks, onTaskAction }) => {
  if (!selectedCategory) {
    return (
      <div className="hidden lg:block lg:w-1/3 bg-muted border-l border-border">
        <div className="p-6 text-center">
          <Icon name="MousePointer" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Category</h3>
          <p className="text-muted-foreground">
            Choose a category to preview its tasks and manage assignments
          </p>
        </div>
      </div>
    );
  }

  const categoryTasks = tasks.filter(task => task.categoryId === selectedCategory.id);

  return (
    <div className="hidden lg:block lg:w-1/3 bg-muted border-l border-border">
      <div className="p-6">
        {/* Category Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: selectedCategory.color }}
          />
          <div>
            <h3 className="text-lg font-semibold text-foreground">{selectedCategory.name}</h3>
            <p className="text-sm text-muted-foreground">
              {categoryTasks.length} tasks
            </p>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {categoryTasks.length > 0 ? (
            categoryTasks.map((task) => (
              <div
                key={task.id}
                className="bg-card border border-border rounded-lg p-3 hover:shadow-subtle transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      {task.priority && (
                        <span className={`px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-error text-error-foreground' :
                          task.priority === 'medium' ? 'bg-warning text-warning-foreground' :
                          'bg-success text-success-foreground'
                        }`}>
                          {task.priority}
                        </span>
                      )}
                      {task.dueDate && (
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onTaskAction('toggle', task.id)}
                      className="h-8 w-8"
                    >
                      <Icon 
                        name={task.completed ? "CheckCircle2" : "Circle"} 
                        size={16}
                        className={task.completed ? "text-success" : "text-muted-foreground"}
                      />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onTaskAction('edit', task.id)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit2" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Icon name="CheckSquare" size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No tasks in this category</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTaskAction('create', selectedCategory.id)}
                className="mt-3"
                iconName="Plus"
                iconPosition="left"
                iconSize={14}
              >
                Add Task
              </Button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTaskAction('create', selectedCategory.id)}
              iconName="Plus"
              iconPosition="left"
              iconSize={14}
              className="w-full justify-start"
            >
              Add New Task
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTaskAction('bulkComplete', selectedCategory.id)}
              iconName="CheckCircle2"
              iconPosition="left"
              iconSize={14}
              className="w-full justify-start"
            >
              Complete All Tasks
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTaskAction('export', selectedCategory.id)}
              iconName="Download"
              iconPosition="left"
              iconSize={14}
              className="w-full justify-start"
            >
              Export Category
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPreview;