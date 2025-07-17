import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/main-task-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Ctrl+D'
    },
    {
      label: 'Analytics',
      path: '/task-analytics-and-insights',
      icon: 'BarChart3',
      tooltip: 'Ctrl+A'
    },
    {
      label: 'Categories',
      path: '/task-categories-and-organization',
      icon: 'FolderOpen',
      tooltip: 'Ctrl+C'
    }
  ];

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('header-search')?.focus();
      }, 150);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/task-search-and-filtering?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleTaskCreation = () => {
    window.location.href = '/task-creation-and-editing';
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-100">
        <div className="flex items-center justify-between h-15 px-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="CheckSquare" size={20} color="white" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">TaskFlow</h1>
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                title={item.tooltip}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-micro hover-scale ${
                  isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Actions Section */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchToggle}
              className="relative"
              title="Search tasks (Ctrl+K)"
            >
              <Icon name="Search" size={20} />
            </Button>

            {/* Quick Add Task Button */}
            <Button
              variant="default"
              onClick={handleTaskCreation}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              className="hidden sm:flex"
            >
              Add Task
            </Button>

            {/* Mobile Quick Add */}
            <Button
              variant="default"
              size="icon"
              onClick={handleTaskCreation}
              className="sm:hidden"
              title="Add new task"
            >
              <Icon name="Plus" size={20} />
            </Button>

            {/* User Profile */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              title="User profile"
            >
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-surface border-b border-border shadow-moderate z-200">
            <div className="px-6 py-4">
              <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Input
                    id="header-search"
                    type="search"
                    placeholder="Search tasks, categories, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4"
                  />
                  <Icon
                    name="Search"
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                </div>
                <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                  <span>Press Enter to search or Escape to close</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-100">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-micro min-w-0 ${
                isActiveRoute(item.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-15"></div>
      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default Header;