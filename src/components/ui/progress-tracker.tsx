import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, BookOpen } from "lucide-react";

interface ProgressStep {
  id: string;
  title: string;
  completed: boolean;
  current?: boolean;
  type?: "lesson" | "quiz" | "activity";
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
  title?: string;
  showDetails?: boolean;
  className?: string;
}

export default function ProgressTracker({
  steps,
  title = "Learning Progress",
  showDetails = true,
  className = ""
}: ProgressTrackerProps) {
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);
  const currentStep = steps.find(step => step.current);

  return (
    <Card className={`card-viva p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Badge variant="outline" className="text-sm">
          {completedSteps} of {steps.length} complete
        </Badge>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Current Step Info */}
      {currentStep && (
        <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={14} className="text-primary" />
            <span className="text-sm font-medium text-primary">Currently Learning</span>
          </div>
          <p className="text-sm text-foreground">{currentStep.title}</p>
        </div>
      )}

      {/* Detailed Steps */}
      {showDetails && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground mb-3">Learning Steps</h4>
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                step.current ? 'bg-primary/5 border border-primary/20' : ''
              }`}
            >
              {/* Step Status */}
              <div className="flex-shrink-0">
                {step.completed ? (
                  <CheckCircle size={18} className="text-green-600" />
                ) : step.current ? (
                  <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary/20" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                )}
              </div>

              {/* Step Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground truncate">
                    {step.title}
                  </span>
                  {step.type && (
                    <Badge variant="outline" className="text-xs h-5">
                      {step.type === "lesson" && <BookOpen size={10} />}
                      {step.type === "quiz" && "?"}
                      {step.type === "activity" && "★"}
                      <span className="ml-1 capitalize">{step.type}</span>
                    </Badge>
                  )}
                </div>
              </div>

              {/* Step Number */}
              <div className="flex-shrink-0">
                <span className="text-xs text-muted-foreground">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">{completedSteps}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">
              {currentStep ? 1 : 0}
            </div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
          <div>
            <div className="text-lg font-bold text-muted-foreground">
              {steps.length - completedSteps - (currentStep ? 1 : 0)}
            </div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
        </div>
      </div>
    </Card>
  );
}