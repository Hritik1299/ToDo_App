import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExportPanel = () => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('30d');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'png', label: 'PNG Images' },
    { value: 'json', label: 'JSON Data' }
  ];

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'all', label: 'All Time' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock download trigger
    const filename = `task-analytics-${dateRange}.${exportFormat}`;
    console.log(`Exporting ${filename}...`);
    
    setIsExporting(false);
  };

  const exportStats = [
    { label: 'Total Tasks', value: '1,247', icon: 'CheckSquare' },
    { label: 'Categories', value: '12', icon: 'Folder' },
    { label: 'Time Period', value: dateRange === '7d' ? '7 Days' : dateRange === '30d' ? '30 Days' : dateRange === '90d' ? '90 Days' : 'All Time', icon: 'Calendar' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Download" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Export Analytics</h3>
            <p className="text-sm text-muted-foreground">Download your productivity data</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Export Configuration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Select
              label="Export Format"
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />
          </div>
          <div>
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
        </div>

        {/* Export Stats Preview */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Export Preview</h4>
          <div className="grid grid-cols-3 gap-4">
            {exportStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Icon name={stat.icon} size={16} className="text-primary" />
                </div>
                <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Export includes all charts and detailed metrics</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left"
              iconSize={16}
            >
              Preview
            </Button>
            <Button
              variant="default"
              onClick={handleExport}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>
        </div>

        {/* Quick Export Options */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Quick Export</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              iconSize={14}
              className="justify-start"
            >
              PDF Report
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Table"
              iconPosition="left"
              iconSize={14}
              className="justify-start"
            >
              CSV Data
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Image"
              iconPosition="left"
              iconSize={14}
              className="justify-start"
            >
              Chart Images
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Share"
              iconPosition="left"
              iconSize={14}
              className="justify-start"
            >
              Share Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;