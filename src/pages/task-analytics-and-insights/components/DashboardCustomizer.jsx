import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DashboardCustomizer = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [widgets, setWidgets] = useState([
    { id: 'metrics', name: 'Key Metrics', enabled: true, icon: 'BarChart3' },
    { id: 'productivity', name: 'Productivity Chart', enabled: true, icon: 'TrendingUp' },
    { id: 'categories', name: 'Category Distribution', enabled: true, icon: 'PieChart' },
    { id: 'time', name: 'Time Insights', enabled: true, icon: 'Clock' },
    { id: 'recommendations', name: 'Recommendations', enabled: true, icon: 'Lightbulb' },
    { id: 'export', name: 'Export Panel', enabled: true, icon: 'Download' },
    { id: 'streaks', name: 'Productivity Streaks', enabled: false, icon: 'Flame' },
    { id: 'goals', name: 'Goal Progress', enabled: false, icon: 'Target' }
  ]);

  const handleWidgetToggle = (widgetId) => {
    setWidgets(widgets.map(widget => 
      widget.id === widgetId 
        ? { ...widget, enabled: !widget.enabled }
        : widget
    ));
  };

  const handleSaveLayout = () => {
    console.log('Saving dashboard layout:', widgets);
    setIsCustomizing(false);
  };

  const handleResetLayout = () => {
    setWidgets(widgets.map(widget => ({ ...widget, enabled: true })));
  };

  if (!isCustomizing) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="default"
          onClick={() => setIsCustomizing(true)}
          iconName="Settings"
          iconPosition="left"
          iconSize={16}
          className="shadow-moderate"
        >
          Customize
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-moderate w-full max-w-md max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Layout" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Customize Dashboard</h3>
                <p className="text-sm text-muted-foreground">Choose which widgets to display</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCustomizing(false)}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-96">
          <div className="space-y-4">
            {widgets.map((widget) => (
              <div key={widget.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={widget.icon} size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{widget.name}</span>
                </div>
                <Checkbox
                  checked={widget.enabled}
                  onChange={(e) => handleWidgetToggle(widget.id)}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between space-x-3">
            <Button
              variant="outline"
              onClick={handleResetLayout}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
            >
              Reset
            </Button>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => setIsCustomizing(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSaveLayout}
                iconName="Check"
                iconPosition="left"
                iconSize={16}
              >
                Save Layout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomizer;