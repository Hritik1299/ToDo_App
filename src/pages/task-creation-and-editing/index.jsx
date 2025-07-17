import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TaskForm from './components/TaskForm';
import TaskPreview from './components/TaskPreview';
import QuickActions from './components/QuickActions';

const TaskCreationAndEditing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [currentTask, setCurrentTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Mock recent tasks data
  const recentTasks = [
    {
      id: 1,
      title: "Review quarterly reports",
      description: "Analyze Q3 performance metrics and prepare summary for stakeholders",
      priority: "high",
      category: "work",
      tags: ["review", "deadline", "reports"],
      dueDate: "2025-07-20",
      isCompleted: false,
      createdAt: "2025-07-15T09:00:00.000Z",
      updatedAt: "2025-07-15T09:00:00.000Z"
    },
    {
      id: 2,
      title: "Morning workout routine",
      description: "30-minute cardio session followed by strength training",
      priority: "medium",
      category: "health",
      tags: ["exercise", "health", "routine"],
      dueDate: "2025-07-17",
      isCompleted: true,
      createdAt: "2025-07-14T06:00:00.000Z",
      updatedAt: "2025-07-16T07:30:00.000Z"
    },
    {
      id: 3,
      title: "Plan weekend family trip",
      description: "Research destinations, book accommodations, and create itinerary",
      priority: "low",
      category: "personal",
      tags: ["family", "planning", "travel"],
      dueDate: "2025-07-25",
      isCompleted: false,
      createdAt: "2025-07-13T14:00:00.000Z",
      updatedAt: "2025-07-13T14:00:00.000Z"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if editing existing task from URL params
    const urlParams = new URLSearchParams(location.search);
    const taskId = urlParams.get('edit');
    
    if (taskId) {
      // In a real app, fetch task by ID
      const taskToEdit = recentTasks.find(task => task.id.toString() === taskId);
      if (taskToEdit) {
        setCurrentTask(taskToEdit);
        setIsEditing(true);
      }
    }

    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        handleNewTask();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [location.search]);

  const handleNewTask = () => {
    setCurrentTask(null);
    setIsEditing(false);
    setShowPreview(false);
  };

  const handleTemplateSelect = (template) => {
    setCurrentTask(template);
    setIsEditing(false);
    setShowPreview(false);
  };

  const handleSaveTask = (taskData) => {
    // In a real app, save to backend/localStorage
    console.log('Saving task:', taskData);
    
    // Show success message
    alert(isEditing ? 'Task updated successfully!' : 'Task created successfully!');
    
    // Navigate back to dashboard
    navigate('/main-task-dashboard');
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/main-task-dashboard');
    }
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleEditFromPreview = () => {
    setShowPreview(false);
  };

  const renderMobileView = () => (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="px-4 py-6">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/main-task-dashboard')}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">
              {isEditing ? 'Edit Task' : 'New Task'}
            </h1>
          </div>
          
          {currentTask && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              iconName={showPreview ? "Edit" : "Eye"}
              iconPosition="left"
            >
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          )}
        </div>

        {/* Content */}
        {showPreview && currentTask ? (
          <TaskPreview 
            task={currentTask} 
            onEdit={handleEditFromPreview}
          />
        ) : currentTask || isEditing ? (
          <TaskForm
            task={currentTask}
            onSave={handleSaveTask}
            onCancel={handleCancel}
            isEditing={isEditing}
          />
        ) : (
          <QuickActions
            onNewTask={handleNewTask}
            onTemplateSelect={handleTemplateSelect}
            recentTasks={recentTasks}
          />
        )}
      </div>
    </div>
  );

  const renderDesktopView = () => (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Quick Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <QuickActions
                onNewTask={handleNewTask}
                onTemplateSelect={handleTemplateSelect}
                recentTasks={recentTasks}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg shadow-subtle">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name={isEditing ? "Edit" : "Plus"} size={18} color="white" />
                  </div>
                  <h1 className="text-xl font-semibold text-foreground">
                    {isEditing ? 'Edit Task' : 'Create New Task'}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-2">
                  {currentTask && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreview}
                      iconName={showPreview ? "Edit" : "Eye"}
                      iconPosition="left"
                    >
                      {showPreview ? 'Edit' : 'Preview'}
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/main-task-dashboard')}
                    title="Close"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {showPreview && currentTask ? (
                  <TaskPreview 
                    task={currentTask} 
                    onEdit={handleEditFromPreview}
                  />
                ) : (
                  <TaskForm
                    task={currentTask}
                    onSave={handleSaveTask}
                    onCancel={handleCancel}
                    isEditing={isEditing}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? renderMobileView() : renderDesktopView();
};

export default TaskCreationAndEditing;