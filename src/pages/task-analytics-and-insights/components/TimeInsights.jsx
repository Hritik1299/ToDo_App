import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeInsights = () => {
  const [viewType, setViewType] = useState('hourly');

  const hourlyData = [
    { time: '6 AM', tasks: 2, productivity: 60 },
    { time: '7 AM', tasks: 4, productivity: 75 },
    { time: '8 AM', tasks: 8, productivity: 85 },
    { time: '9 AM', tasks: 12, productivity: 90 },
    { time: '10 AM', tasks: 15, productivity: 95 },
    { time: '11 AM', tasks: 18, productivity: 88 },
    { time: '12 PM', tasks: 10, productivity: 70 },
    { time: '1 PM', tasks: 6, productivity: 65 },
    { time: '2 PM', tasks: 14, productivity: 85 },
    { time: '3 PM', tasks: 16, productivity: 90 },
    { time: '4 PM', tasks: 12, productivity: 80 },
    { time: '5 PM', tasks: 8, productivity: 75 },
    { time: '6 PM', tasks: 4, productivity: 60 },
    { time: '7 PM', tasks: 3, productivity: 55 }
  ];

  const weeklyData = [
    { day: 'Mon', tasks: 45, productivity: 85 },
    { day: 'Tue', tasks: 52, productivity: 88 },
    { day: 'Wed', tasks: 38, productivity: 82 },
    { day: 'Thu', tasks: 48, productivity: 90 },
    { day: 'Fri', tasks: 42, productivity: 78 },
    { day: 'Sat', tasks: 25, productivity: 70 },
    { day: 'Sun', tasks: 18, productivity: 65 }
  ];

  const currentData = viewType === 'hourly' ? hourlyData : weeklyData;
  const dataKey = viewType === 'hourly' ? 'time' : 'day';

  const peakHours = [
    { time: '9-11 AM', description: 'Peak productivity window', icon: 'Sunrise' },
    { time: '2-4 PM', description: 'Secondary productive period', icon: 'Sun' },
    { time: '12-1 PM', description: 'Lunch break dip', icon: 'Coffee' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-moderate">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tasks Completed:</span>
              <span className="text-sm font-medium text-foreground">{payload[0]?.value}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Productivity:</span>
              <span className="text-sm font-medium text-foreground">{payload[1]?.value}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Time-Based Insights</h3>
              <p className="text-sm text-muted-foreground">Productivity patterns throughout time</p>
            </div>
          </div>
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewType === 'hourly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('hourly')}
            >
              Hourly
            </Button>
            <Button
              variant={viewType === 'weekly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('weekly')}
            >
              Weekly
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="h-80 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey={dataKey} 
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="tasks" 
                fill="#2563EB" 
                name="Tasks Completed"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="productivity" 
                fill="#10B981" 
                name="Productivity %"
                radius={[2, 2, 0, 0]}
                opacity={0.7}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {viewType === 'hourly' && (
          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-semibold text-foreground mb-4">Peak Productivity Hours</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {peakHours.map((peak, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={peak.icon} size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{peak.time}</p>
                    <p className="text-xs text-muted-foreground">{peak.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm text-muted-foreground">Tasks Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full opacity-70" />
            <span className="text-sm text-muted-foreground">Productivity %</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeInsights;