import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  className?: string;
}

export default function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className = ""
}: StatsCardProps) {
  return (
    <Card className={`card-viva p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-foreground">
              {value}
            </h3>
            {trend && (
              <span className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">
              {description}
            </p>
          )}
          {trend && (
            <p className="text-xs text-muted-foreground mt-1">
              {trend.label}
            </p>
          )}
        </div>
        
        {icon && (
          <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
            <div className="text-primary">
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}