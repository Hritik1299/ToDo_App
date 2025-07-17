import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CategoryDistribution = () => {
  const categoryData = [
    { name: 'Work Projects', value: 35, color: '#2563EB', icon: 'Briefcase' },
    { name: 'Personal Tasks', value: 28, color: '#10B981', icon: 'User' },
    { name: 'Learning', value: 18, color: '#F59E0B', icon: 'BookOpen' },
    { name: 'Health & Fitness', value: 12, color: '#EF4444', icon: 'Heart' },
    { name: 'Shopping', value: 7, color: '#8B5CF6', icon: 'ShoppingCart' }
  ];

  const priorityData = [
    { name: 'High Priority', value: 22, color: '#EF4444' },
    { name: 'Medium Priority', value: 45, color: '#F59E0B' },
    { name: 'Low Priority', value: 33, color: '#10B981' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-moderate">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.payload.color }}
            />
            <span className="text-sm font-medium text-foreground">{data.name}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{data.value}% of total tasks</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for very small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Distribution */}
      <div className="bg-card rounded-lg border border-border shadow-subtle">
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="PieChart" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Task Categories</h3>
              <p className="text-sm text-muted-foreground">Distribution by category</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="h-64 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <Icon name={category.icon} size={16} className="text-muted-foreground" />
                  </div>
                  <span className="text-sm text-foreground">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="bg-card rounded-lg border border-border shadow-subtle">
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Priority Levels</h3>
              <p className="text-sm text-muted-foreground">Task priority distribution</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="h-64 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
            {priorityData.map((priority, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: priority.color }}
                  />
                  <span className="text-sm text-foreground">{priority.name}</span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{priority.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDistribution;