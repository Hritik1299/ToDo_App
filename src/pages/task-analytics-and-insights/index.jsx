import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import ProductivityChart from './components/ProductivityChart';
import CategoryDistribution from './components/CategoryDistribution';
import TimeInsights from './components/TimeInsights';
import RecommendationCard from './components/RecommendationCard';
import ExportPanel from './components/ExportPanel';
import DashboardCustomizer from './components/DashboardCustomizer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const TaskAnalyticsAndInsights = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [dateRange, setDateRange] = useState('30d');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const keyMetrics = [
    {
      title: "Tasks Completed",
      value: "247",
      change: "+12%",
      changeType: "positive",
      icon: "CheckCircle",
      description: "vs last month"
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: "Target",
      description: "Above average"
    },
    {
      title: "Average Duration",
      value: "2.4h",
      change: "-15min",
      changeType: "positive",
      icon: "Clock",
      description: "Per task"
    },
    {
      title: "Productivity Streak",
      value: "12 days",
      change: "+3 days",
      changeType: "positive",
      icon: "Flame",
      description: "Current streak"
    }
  ];

  const recommendations = [
    {
      title: "Optimize Morning Productivity",
      description: "Your productivity peaks between 9-11 AM. Consider scheduling your most important tasks during this window to maximize efficiency and output.",
      type: "productivity",
      actionText: "View Schedule",
      icon: "Sunrise",
      priority: "high",
      onAction: () => console.log("Navigate to schedule optimization")
    },
    {
      title: "Consolidate Similar Categories",
      description: "You have 5 categories with less than 3 tasks each. Consider merging \'Quick Tasks\' and \'Miscellaneous\' to reduce cognitive overhead.",
      type: "organization",
      actionText: "Manage Categories",
      icon: "FolderOpen",
      priority: "medium",
      onAction: () => console.log("Navigate to category management")
    },
    {
      title: "Set Up Task Batching",
      description: "Based on your patterns, batching similar tasks could save you 45 minutes daily. Try grouping email responses and administrative work.",
      type: "efficiency",
      actionText: "Learn More",
      icon: "Layers",
      priority: "medium",
      onAction: () => console.log("Show batching tutorial")
    },
    {
      title: "Weekend Planning Session",
      description: "Your Monday productivity is 23% lower than other weekdays. A Sunday planning session could help you start the week stronger.",
      type: "planning",
      actionText: "Set Reminder",
      icon: "Calendar",
      priority: "low",
      onAction: () => console.log("Create planning reminder")
    }
  ];

  const dateRangeOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive productivity metrics and behavioral patterns to optimize your task management
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-muted rounded-lg p-1">
              {dateRangeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={dateRange === option.value ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setDateRange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={16}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                description={metric.description}
              />
            ))}
          </div>
        </section>

        {/* Productivity Trends Chart */}
        <section>
          <ProductivityChart />
        </section>

        {/* Category and Priority Distribution */}
        <section>
          <CategoryDistribution />
        </section>

        {/* Time-Based Insights */}
        <section>
          <TimeInsights />
        </section>

        {/* Actionable Recommendations */}
        <section>
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Lightbulb" size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Recommendations</h2>
                <p className="text-muted-foreground">Actionable insights to improve your productivity</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={index}
                title={recommendation.title}
                description={recommendation.description}
                type={recommendation.type}
                actionText={recommendation.actionText}
                onAction={recommendation.onAction}
                icon={recommendation.icon}
                priority={recommendation.priority}
              />
            ))}
          </div>
        </section>

        {/* Export Functionality */}
        <section>
          <ExportPanel />
        </section>

        {/* Quick Stats Summary */}
        <section className="bg-card rounded-lg border border-border shadow-subtle p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Quick Summary</h3>
              <p className="text-sm text-muted-foreground">Key insights at a glance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Award" size={24} className="text-success" />
              </div>
              <p className="text-2xl font-bold text-foreground">Top 15%</p>
              <p className="text-sm text-muted-foreground">Productivity ranking</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Calendar" size={24} className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">28 days</p>
              <p className="text-sm text-muted-foreground">Longest streak</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Zap" size={24} className="text-accent" />
              </div>
              <p className="text-2xl font-bold text-foreground">9-11 AM</p>
              <p className="text-sm text-muted-foreground">Peak hours</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Target" size={24} className="text-error" />
              </div>
              <p className="text-2xl font-bold text-foreground">3.2 hrs</p>
              <p className="text-sm text-muted-foreground">Focus time daily</p>
            </div>
          </div>
        </section>
      </main>

      {/* Dashboard Customizer */}
      <DashboardCustomizer />
    </div>
  );
};

export default TaskAnalyticsAndInsights;