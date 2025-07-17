import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductivityChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('7d');

  const productivityData = [
    { date: '07/09', completed: 12, created: 15, efficiency: 80 },
    { date: '07/10', completed: 18, created: 20, efficiency: 90 },
    { date: '07/11', completed: 8, created: 12, efficiency: 67 },
    { date: '07/12', completed: 22, created: 25, efficiency: 88 },
    { date: '07/13', completed: 16, created: 18, efficiency: 89 },
    { date: '07/14', completed: 14, created: 16, efficiency: 88 },
    { date: '07/15', completed: 20, created: 22, efficiency: 91 },
    { date: '07/16', completed: 10, created: 14, efficiency: 71 }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-moderate">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium text-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Productivity Trends</h3>
            <p className="text-sm text-muted-foreground mt-1">Task completion patterns over time</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={timeRange === range.value ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setTimeRange(range.value)}
                  className="text-xs"
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={chartType === 'line' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setChartType('line')}
                title="Line Chart"
              >
                <Icon name="TrendingUp" size={16} />
              </Button>
              <Button
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setChartType('bar')}
                title="Bar Chart"
              >
                <Icon name="BarChart3" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748B"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748B"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  name="Completed Tasks"
                  dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="created" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="Created Tasks"
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            ) : (
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748B"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748B"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="completed" 
                  fill="#2563EB" 
                  name="Completed Tasks"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="created" 
                  fill="#F59E0B" 
                  name="Created Tasks"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm text-muted-foreground">Completed Tasks</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-sm text-muted-foreground">Created Tasks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityChart;