import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
  };
  actions?: ReactNode;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

export default function PageHeader({
  title,
  subtitle,
  description,
  badge,
  actions,
  breadcrumbs
}: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-background to-muted/30 border-b border-border">
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {crumb.href || crumb.onClick ? (
                    <button
                      onClick={crumb.onClick}
                      className="hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Title Section */}
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-heading font-bold text-foreground">
                {title}
              </h1>
              {badge && (
                <Badge variant={badge.variant || "default"}>
                  {badge.text}
                </Badge>
              )}
            </div>

            {/* Subtitle */}
            {subtitle && (
              <h2 className="text-xl text-muted-foreground font-medium mb-2">
                {subtitle}
              </h2>
            )}

            {/* Description */}
            {description && (
              <p className="text-muted-foreground max-w-2xl">
                {description}
              </p>
            )}
          </div>

          {/* Actions */}
          {actions && (
            <div className="flex items-center gap-2 ml-6">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}