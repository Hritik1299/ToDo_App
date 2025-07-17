import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CategoryCreator from './components/CategoryCreator';
import CategoryStats from './components/CategoryStats';
import BulkActions from './components/BulkActions';
import CategoryList from './components/CategoryList';
import TaskPreview from './components/TaskPreview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TaskCategoriesAndOrganization = () => {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data initialization
  useEffect(() => {
    const mockCategories = [
      {
        id: 1,
        name: "Work Projects",
        color: "#2563EB",
        taskCount: 12,
        lastUsed: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: 2,
        name: "Personal Tasks",
        color: "#059669",
        taskCount: 8,
        lastUsed: new Date(Date.now() - 172800000) // 2 days ago
      },
      {
        id: 3,
        name: "Shopping",
        color: "#D97706",
        taskCount: 5,
        lastUsed: new Date(Date.now() - 259200000) // 3 days ago
      },
      {
        id: 4,
        name: "Health & Fitness",
        color: "#DC2626",
        taskCount: 7,
        lastUsed: new Date(Date.now() - 345600000) // 4 days ago
      },
      {
        id: 5,
        name: "Learning",
        color: "#7C3AED",
        taskCount: 15,
        lastUsed: new Date(Date.now() - 432000000) // 5 days ago
      },
      {
        id: 6,
        name: "Home Maintenance",
        color: "#DB2777",
        taskCount: 3,
        lastUsed: new Date(Date.now() - 518400000) // 6 days ago
      }
    ];

    const mockTasks = [
      {
        id: 1,
        title: "Complete quarterly report",
        description: "Finalize Q4 performance metrics and analysis",
        categoryId: 1,
        completed: false,
        priority: "high",
        dueDate: "2025-07-20"
      },
      {
        id: 2,
        title: "Team meeting preparation",
        description: "Prepare agenda and presentation slides",
        categoryId: 1,
        completed: true,
        priority: "medium",
        dueDate: "2025-07-18"
      },
      {
        id: 3,
        title: "Buy groceries",
        description: "Milk, bread, eggs, vegetables",
        categoryId: 3,
        completed: false,
        priority: "low",
        dueDate: "2025-07-17"
      },
      {
        id: 4,
        title: "Morning workout",
        description: "30-minute cardio session",
        categoryId: 4,
        completed: true,
        priority: "medium",
        dueDate: "2025-07-16"
      },
      {
        id: 5,
        title: "Read React documentation",
        description: "Study new hooks and performance optimization",
        categoryId: 5,
        completed: false,
        priority: "medium",
        dueDate: "2025-07-22"
      }
    ];

    setCategories(mockCategories);
    setTasks(mockTasks);
  }, []);

  const handleCreateCategory = (categoryData) => {
    const newCategory = {
      id: Date.now(),
      ...categoryData,
      taskCount: 0,
      lastUsed: new Date()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleEditCategory = (categoryId, newName) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, name: newName } : cat
    ));
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? All tasks will be moved to "Uncategorized".')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
      if (selectedCategory?.id === categoryId) {
        setSelectedCategory(null);
      }
    }
  };

  const handleColorChange = (categoryId, newColor) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, color: newColor } : cat
    ));
  };

  const handleReorderCategories = (dragIndex, hoverIndex) => {
    const draggedCategory = categories[dragIndex];
    const newCategories = [...categories];
    newCategories.splice(dragIndex, 1);
    newCategories.splice(hoverIndex, 0, draggedCategory);
    setCategories(newCategories);
  };

  const handleSelectCategory = (categoryId, isSelected) => {
    if (isSelected) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const handleSelectAll = (selectAll) => {
    if (selectAll) {
      setSelectedCategories(categories.map(cat => cat.id));
    } else {
      setSelectedCategories([]);
    }
  };

  const handleMergeCategories = (categoryIds, targetCategoryId) => {
    // Update tasks to use target category
    setTasks(prev => prev.map(task => 
      categoryIds.includes(task.categoryId) 
        ? { ...task, categoryId: targetCategoryId }
        : task
    ));

    // Remove merged categories
    setCategories(prev => prev.filter(cat => !categoryIds.includes(cat.id)));
    setSelectedCategories([]);
  };

  const handleArchiveCategories = (categoryIds) => {
    if (window.confirm(`Archive ${categoryIds.length} categories?`)) {
      setCategories(prev => prev.filter(cat => !categoryIds.includes(cat.id)));
      setSelectedCategories([]);
    }
  };

  const handleExportCategories = () => {
    const exportData = {
      categories,
      tasks,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow-categories-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const handleImportCategories = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importData = JSON.parse(e.target.result);
            if (importData.categories && importData.tasks) {
              setCategories(prev => [...prev, ...importData.categories]);
              setTasks(prev => [...prev, ...importData.tasks]);
            }
          } catch (error) {
            alert('Invalid file format');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleTaskAction = (action, taskId) => {
    switch (action) {
      case 'toggle':
        setTasks(prev => prev.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
        break;
      case 'edit':
        window.location.href = `/task-creation-and-editing?edit=${taskId}`;
        break;
      case 'create':
        window.location.href = `/task-creation-and-editing?category=${taskId}`;
        break;
      case 'bulkComplete':
        setTasks(prev => prev.map(task => 
          task.categoryId === taskId ? { ...task, completed: true } : task
        ));
        break;
      case 'export':
        const categoryTasks = tasks.filter(task => task.categoryId === taskId);
        const category = categories.find(cat => cat.id === taskId);
        const exportData = { category, tasks: categoryTasks };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${category.name.toLowerCase().replace(/\s+/g, '-')}-tasks.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        break;
    }
  };

  const totalTasks = categories.reduce((sum, cat) => sum + cat.taskCount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 ${selectedCategory ? 'lg:w-2/3' : 'w-full'}`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Categories & Organization</h1>
                <p className="text-muted-foreground mt-1">
                  Organize your tasks with custom categories and smart organization tools
                </p>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden"
                iconName="Menu"
                iconPosition="left"
                iconSize={16}
              >
                Menu
              </Button>
            </div>

            {/* Stats Overview */}
            <CategoryStats categories={categories} totalTasks={totalTasks} />

            {/* Category Creator */}
            <CategoryCreator onCreateCategory={handleCreateCategory} />

            {/* Bulk Actions */}
            <BulkActions
              categories={categories}
              selectedCategories={selectedCategories}
              onMergeCategories={handleMergeCategories}
              onArchiveCategories={handleArchiveCategories}
              onExportCategories={handleExportCategories}
              onImportCategories={handleImportCategories}
            />

            {/* Category List */}
            <CategoryList
              categories={categories}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
              onColorChange={handleColorChange}
              onReorderCategories={handleReorderCategories}
              selectedCategories={selectedCategories}
              onSelectCategory={handleSelectCategory}
              onSelectAll={handleSelectAll}
            />
          </div>
        </div>

        {/* Task Preview Sidebar */}
        <TaskPreview
          selectedCategory={selectedCategory}
          tasks={tasks}
          onTaskAction={handleTaskAction}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-80 bg-surface border-l border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/main-task-dashboard'}
                  iconName="LayoutDashboard"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full justify-start"
                >
                  Dashboard
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/task-creation-and-editing'}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full justify-start"
                >
                  Create Task
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/task-search-and-filtering'}
                  iconName="Search"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full justify-start"
                >
                  Search Tasks
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/task-analytics-and-insights'}
                  iconName="BarChart3"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full justify-start"
                >
                  Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCategoriesAndOrganization;