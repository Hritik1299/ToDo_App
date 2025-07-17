import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchInput from './components/SearchInput';
import FilterPanel from './components/FilterPanel';
import ActiveFilters from './components/ActiveFilters';
import SearchResults from './components/SearchResults';
import SavedSearches from './components/SavedSearches';

const TaskSearchAndFiltering = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [filters, setFilters] = useState({
    status: 'all',
    priority: [],
    categories: [],
    dueDate: null
  });

  const [recentSearches, setRecentSearches] = useState([
    "priority:high category:work",
    "due:today",
    "meeting preparation",
    "category:personal",
    "overdue tasks"
  ]);

  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: "High Priority Work Tasks",
      query: "",
      filters: { status: 'active', priority: ['high'], categories: ['work'] },
      createdAt: "2025-01-10T10:00:00Z"
    },
    {
      id: 2,
      name: "Due This Week",
      query: "",
      filters: { status: 'active', dueDate: 'this-week' },
      createdAt: "2025-01-08T15:30:00Z"
    }
  ]);

  // Mock task data
  const mockTasks = [
    {
      id: 1,
      title: "Complete project proposal for Q2 marketing campaign",
      description: "Draft comprehensive proposal including budget allocation, timeline, and resource requirements for the upcoming marketing campaign targeting new customer segments.",
      completed: false,
      priority: "high",
      category: "work",
      dueDate: "2025-01-17",
      createdAt: "2025-01-10T09:00:00Z",
      tags: ["marketing", "proposal", "urgent"]
    },
    {
      id: 2,
      title: "Schedule dentist appointment",
      description: "Book routine dental checkup and cleaning appointment for next month.",
      completed: false,
      priority: "medium",
      category: "health",
      dueDate: "2025-01-20",
      createdAt: "2025-01-12T14:30:00Z",
      tags: ["health", "appointment"]
    },
    {
      id: 3,
      title: "Buy groceries for weekend dinner party",
      description: "Purchase ingredients for Italian dinner: pasta, tomatoes, basil, mozzarella, wine, and dessert items.",
      completed: false,
      priority: "medium",
      category: "shopping",
      dueDate: "2025-01-18",
      createdAt: "2025-01-13T11:15:00Z",
      tags: ["shopping", "dinner", "weekend"]
    },
    {
      id: 4,
      title: "Review and update investment portfolio",
      description: "Analyze current portfolio performance, rebalance asset allocation, and consider new investment opportunities.",
      completed: true,
      priority: "high",
      category: "finance",
      dueDate: "2025-01-15",
      createdAt: "2025-01-08T16:45:00Z",
      tags: ["finance", "investment", "portfolio"]
    },
    {
      id: 5,
      title: "Plan weekend hiking trip",
      description: "Research hiking trails, check weather forecast, pack equipment, and coordinate with friends.",
      completed: false,
      priority: "low",
      category: "personal",
      dueDate: "2025-01-19",
      createdAt: "2025-01-14T10:20:00Z",
      tags: ["personal", "hiking", "weekend", "friends"]
    },
    {
      id: 6,
      title: "Prepare presentation for team meeting",
      description: "Create slides covering project progress, upcoming milestones, and resource needs for Monday's team meeting.",
      completed: false,
      priority: "high",
      category: "work",
      dueDate: "2025-01-16",
      createdAt: "2025-01-11T13:00:00Z",
      tags: ["work", "presentation", "meeting"]
    },
    {
      id: 7,
      title: "Call insurance company about claim",
      description: "Follow up on pending insurance claim and provide additional documentation if required.",
      completed: false,
      priority: "medium",
      category: "finance",
      dueDate: null,
      createdAt: "2025-01-09T08:30:00Z",
      tags: ["finance", "insurance", "claim"]
    },
    {
      id: 8,
      title: "Organize home office workspace",
      description: "Declutter desk, organize files, update filing system, and improve workspace ergonomics.",
      completed: true,
      priority: "low",
      category: "personal",
      dueDate: "2025-01-12",
      createdAt: "2025-01-07T12:00:00Z",
      tags: ["personal", "organization", "office"]
    }
  ];

  // Initialize search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const queryParam = urlParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [location.search]);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...mockTasks];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      
      // Check for search operators
      if (query.includes('category:')) {
        const categoryMatch = query.match(/category:(\w+)/);
        if (categoryMatch) {
          const category = categoryMatch[1];
          filtered = filtered.filter(task => 
            task.category?.toLowerCase().includes(category)
          );
        }
      } else if (query.includes('priority:')) {
        const priorityMatch = query.match(/priority:(\w+)/);
        if (priorityMatch) {
          const priority = priorityMatch[1];
          filtered = filtered.filter(task => 
            task.priority?.toLowerCase().includes(priority)
          );
        }
      } else if (query.includes('due:')) {
        const dueDateMatch = query.match(/due:(\w+)/);
        if (dueDateMatch) {
          const dueDate = dueDateMatch[1];
          const today = new Date();
          
          filtered = filtered.filter(task => {
            if (!task.dueDate) return dueDate === 'none';
            const taskDate = new Date(task.dueDate);
            
            switch (dueDate) {
              case 'today':
                return taskDate.toDateString() === today.toDateString();
              case 'tomorrow':
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                return taskDate.toDateString() === tomorrow.toDateString();
              default:
                return false;
            }
          });
        }
      } else {
        // Regular text search
        filtered = filtered.filter(task =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.tags?.some(tag => tag.toLowerCase().includes(query))
        );
      }
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(task => 
        filters.status === 'active' ? !task.completed : task.completed
      );
    }

    // Apply priority filter
    if (filters.priority.length > 0) {
      filtered = filtered.filter(task => 
        filters.priority.includes(task.priority)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(task => 
        filters.categories.includes(task.category)
      );
    }

    // Apply due date filter
    if (filters.dueDate) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      filtered = filtered.filter(task => {
        if (!task.dueDate && filters.dueDate === 'no-due-date') return true;
        if (!task.dueDate) return false;
        
        const taskDate = new Date(task.dueDate);
        
        switch (filters.dueDate) {
          case 'today':
            return taskDate.toDateString() === today.toDateString();
          case 'tomorrow':
            return taskDate.toDateString() === tomorrow.toDateString();
          case 'this-week':
            const weekEnd = new Date(today);
            weekEnd.setDate(today.getDate() + 7);
            return taskDate >= today && taskDate <= weekEnd;
          case 'next-week':
            const nextWeekStart = new Date(today);
            nextWeekStart.setDate(today.getDate() + 7);
            const nextWeekEnd = new Date(today);
            nextWeekEnd.setDate(today.getDate() + 14);
            return taskDate >= nextWeekStart && taskDate <= nextWeekEnd;
          case 'overdue':
            return taskDate < today;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchQuery, filters]);

  // Calculate task counts for filters
  const taskCounts = useMemo(() => {
    const counts = {
      all: mockTasks.length,
      active: mockTasks.filter(t => !t.completed).length,
      completed: mockTasks.filter(t => t.completed).length,
      high: mockTasks.filter(t => t.priority === 'high').length,
      medium: mockTasks.filter(t => t.priority === 'medium').length,
      low: mockTasks.filter(t => t.priority === 'low').length,
      work: mockTasks.filter(t => t.category === 'work').length,
      personal: mockTasks.filter(t => t.category === 'personal').length,
      shopping: mockTasks.filter(t => t.category === 'shopping').length,
      health: mockTasks.filter(t => t.category === 'health').length,
      finance: mockTasks.filter(t => t.category === 'finance').length
    };
    return counts;
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      // Simulate adding to recent searches
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
    }
    setShowSuggestions(false);
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    setShowSuggestions(false);
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: 'all',
      priority: [],
      categories: [],
      dueDate: null
    });
  };

  const handleTaskToggle = (taskId) => {
    // Simulate task toggle
    console.log('Toggle task:', taskId);
  };

  const handleTaskDelete = (taskId) => {
    // Simulate task deletion
    console.log('Delete task:', taskId);
  };

  const handleTaskEdit = (taskId) => {
    window.location.href = `/task-creation-and-editing?edit=${taskId}`;
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for tasks:`, selectedTasks);
    setSelectedTasks([]);
  };

  const handleSaveSearch = (searchData) => {
    const newSearch = {
      ...searchData,
      id: Date.now()
    };
    setSavedSearches(prev => [newSearch, ...prev]);
  };

  const handleLoadSearch = (search) => {
    setSearchQuery(search.query || '');
    setFilters(search.filters || {
      status: 'all',
      priority: [],
      categories: [],
      dueDate: null
    });
  };

  const handleDeleteSavedSearch = (searchId) => {
    setSavedSearches(prev => prev.filter(s => s.id !== searchId));
  };

  const currentSearch = {
    query: searchQuery,
    filters: filters
  };

  const hasActiveFilters = () => {
    return searchQuery || 
           filters.status !== 'all' || 
           filters.priority.length > 0 || 
           filters.categories.length > 0 || 
           filters.dueDate;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Search" size={24} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Search & Filter Tasks</h1>
          </div>
          <p className="text-muted-foreground">
            Find and organize your tasks with powerful search and filtering capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Input */}
            <SearchInput
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              recentSearches={recentSearches}
              onRecentSearchClick={handleRecentSearchClick}
              onClearRecent={handleClearRecentSearches}
              showSuggestions={showSuggestions}
              onToggleSuggestions={setShowSuggestions}
            />

            {/* Mobile Filter Toggle */}
            <div className="md:hidden">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(true)}
                iconName="Filter"
                iconPosition="left"
                className="w-full"
              >
                Filters {hasActiveFilters() && `(${Object.values(filters).flat().filter(Boolean).length})`}
              </Button>
            </div>

            {/* Saved Searches */}
            <SavedSearches
              savedSearches={savedSearches}
              onSaveSearch={handleSaveSearch}
              onLoadSearch={handleLoadSearch}
              onDeleteSearch={handleDeleteSavedSearch}
              currentSearch={currentSearch}
            />

            {/* Active Filters */}
            {hasActiveFilters() && (
              <ActiveFilters
                filters={filters}
                onRemoveFilter={handleFilterChange}
                onClearAll={handleClearFilters}
                resultCount={filteredTasks.length}
              />
            )}

            {/* Search Results */}
            <SearchResults
              tasks={filteredTasks}
              searchQuery={searchQuery}
              onTaskToggle={handleTaskToggle}
              onTaskDelete={handleTaskDelete}
              onTaskEdit={handleTaskEdit}
              selectedTasks={selectedTasks}
              onTaskSelect={setSelectedTasks}
              onBulkAction={handleBulkAction}
              loading={loading}
            />
          </div>

          {/* Sidebar - Desktop Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isOpen={showMobileFilters}
              onToggle={() => setShowMobileFilters(false)}
              taskCounts={taskCounts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSearchAndFiltering;