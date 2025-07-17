import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ title, description, type, actionText, onAction, icon, priority = 'medium' }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'high':
        return 'border-l-error bg-error/5';
      case 'medium':
        return 'border-l-accent bg-accent/5';
      case 'low':
        return 'border-l-success bg-success/5';
      default:
        return 'border-l-primary bg-primary/5';
    }
  };

  const getPriorityIcon = () => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Info';
      case 'low':
        return 'CheckCircle';
      default:
        return 'Lightbulb';
    }
  };

  return (
    <div className={`bg-card rounded-lg border border-border border-l-4 ${getPriorityStyles()} shadow-subtle p-6 hover-scale transition-micro`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name={icon || getPriorityIcon()} size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-foreground mb-2">{title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name={getPriorityIcon()} size={14} />
          <span className="capitalize">{priority}</span>
        </div>
      </div>
      
      {actionText && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Target" size={14} />
            <span>Recommendation</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onAction}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={14}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;