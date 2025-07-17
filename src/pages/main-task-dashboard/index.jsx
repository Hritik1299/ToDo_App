import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TaskCounter from './components/TaskCounter';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import FloatingActionButton from './components/FloatingActionButton';
import QuickActions from './components/QuickActions';

const MainTaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  // Mock data initialization
  useEffect(() => {
    const mockCategories = [
      { id: 1, name: 'Work', color: '#3B82F6', count: 8 },
      { id: 2, name: 'Personal', color: '#10B981', count: 5 },
      { id: 3, name: 'Shopping', color: '#F59E0B', count: 3 },
      { id: 4, name: 'Health', color: '#EF4444', count: 2 },
      { id: 5, name: 'Learning', color: '#8B5CF6', count: 4 }
    ];

    const mockTasks = [
      {
        id: 1,
        title: "Complete project proposal",
        description: "Finish the quarterly project proposal for the new client presentation. Include budget estimates, timeline, and resource allocation.",
        completed: false,
        priority: 'high',
        categoryId: 1,
        dueDate: '2025-07-17',
        tags: ['urgent', 'client'],
        createdAt: '2025-07-15T09:00:00Z'
      },
      {
        id: 2,
        title: "Review team performance",
        description: "Conduct quarterly performance reviews for all team members and prepare feedback reports.",
        completed: true,
        priority: 'medium',
        categoryId: 1,
        dueDate: '2025-07-16',
        tags: ['hr', 'quarterly'],
        createdAt: '2025-07-14T14:30:00Z'
      },
      {
        id: 3,
        title: "Buy groceries",
        description: "Weekly grocery shopping: milk, bread, eggs, vegetables, and fruits for the family.",
        completed: false,
        priority: 'low',
        categoryId: 3,
        dueDate: '2025-07-18',
        tags: ['weekly', 'family'],
        createdAt: '2025-07-16T08:15:00Z'
      },
      {
        id: 4,
        title: "Schedule doctor appointment",
        description: "Book annual health checkup with Dr. Smith. Call the clinic and confirm available slots.",
        completed: false,
        priority: 'medium',
        categoryId: 4,
        dueDate: '2025-07-20',
        tags: ['health', 'annual'],
        createdAt: '2025-07-15T16:45:00Z'
      },
      {
        id: 5,
        title: "Learn React hooks",
        description: "Complete the advanced React hooks tutorial series and practice with useState, useEffect, and custom hooks.",
        completed: false,
        priority: 'medium',
        categoryId: 5,
        dueDate: '2025-07-25',
        tags: ['programming', 'react'],
        createdAt: '2025-07-13T11:20:00Z'
      },
      {
        id: 6,
        title: "Plan weekend trip",
        description: "Research and plan a weekend getaway. Book accommodation, check weather, and create itinerary.",
        completed: false,
        priority: 'low',
        categoryId: 2,
        dueDate: '2025-07-22',
        tags: ['travel', 'weekend'],
        createdAt: '2025-07-16T10:00:00Z'
      },
      {
        id: 7,
        title: "Update resume",
        description: "Revise and update professional resume with recent projects and achievements.",
        completed: true,
        priority: 'medium',
        categoryId: 1,
        dueDate: '2025-07-15',
        tags: ['career', 'professional'],
        createdAt: '2025-07-12T13:30:00Z'
      },
      {
        id: 8,
        title: "Exercise routine",
        description: "Complete 30-minute workout session including cardio and strength training exercises.",
        completed: false,
        priority: 'high',
        categoryId: 4,
        dueDate: '2025-07-16',
        tags: ['fitness', 'daily'],
        createdAt: '2025-07-16T06:00:00Z'
      },
      {
        id: 9,
        title: "Read chapter 5",
        description: "Read and take notes on chapter 5 of \'Clean Code\' book. Focus on functions and error handling.",
        completed: false,
        priority: 'low',
        categoryId: 5,
        dueDate: '2025-07-19',
        tags: ['reading', 'programming'],
        createdAt: '2025-07-14T19:15:00Z'
      },
      {
        id: 10,
        title: "Call mom",
        description: "Weekly check-in call with mom to catch up on family news and see how she's doing.",
        completed: true,
        priority: 'medium',
        categoryId: 2,
        dueDate: '2025-07-16',
        tags: ['family', 'weekly'],
        createdAt: '2025-07-16T09:30:00Z'
      }
    ];

    setCategories(mockCategories);
    setTasks(mockTasks);
  }, []);

  // Filter tasks based on active filter and selected category
  useEffect(() => {
    let filtered = [...tasks];

    // Apply status filter
    switch (activeFilter) {
      case 'active':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        break;
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(task => task.categoryId === selectedCategory);
    }

    // Sort by priority and due date
    filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilteredTasks(filtered);
  }, [tasks, activeFilter, selectedCategory]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault();
            handleCreateTask();
            break;
          case 'k':
            e.preventDefault();
            // Focus search (handled by header)
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleComplete = (taskId, completed) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed } : task
    ));
  };

  const handleEditTask = (task) => {
    window.location.href = `/task-creation-and-editing?edit=${task.id}`;
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const handleReorderTasks = (dragIndex, dropIndex) => {
    const newTasks = [...tasks];
    const draggedTask = newTasks[dragIndex];
    newTasks.splice(dragIndex, 1);
    newTasks.splice(dropIndex, 0, draggedTask);
    setTasks(newTasks);
  };

  const handleBulkComplete = (taskIds) => {
    setTasks(prev => prev.map(task => 
      taskIds.includes(task.id) ? { ...task, completed: true } : task
    ));
  };

  const handleBulkDelete = (taskIds) => {
    setTasks(prev => prev.filter(task => !taskIds.includes(task.id)));
  };

  const handleCreateTask = () => {
    window.location.href = '/task-creation-and-editing';
  };

  const handleViewAnalytics = () => {
    window.location.href = '/task-analytics-and-insights';
  };

  const handleManageCategories = () => {
    window.location.href = '/task-categories-and-organization';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="text-center py-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back to TaskFlow
            </h1>
            <p className="text-muted-foreground">
              Stay organized and boost your productivity with smart task management
            </p>
          </div>

          {/* Task Overview */}
          <TaskCounter tasks={tasks} />

          {/* Quick Actions */}
          <QuickActions
            onCreateTask={handleCreateTask}
            onViewAnalytics={handleViewAnalytics}
            onManageCategories={handleManageCategories}
          />

          {/* Filter Bar */}
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            tasks={tasks}
          />

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            categories={categories}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onReorderTasks={handleReorderTasks}
            onBulkComplete={handleBulkComplete}
            onBulkDelete={handleBulkDelete}
          />
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleCreateTask} />
    </div>
  );
};

export default MainTaskDashboard;