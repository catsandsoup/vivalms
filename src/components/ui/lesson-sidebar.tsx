import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  ChevronRight, 
  Clock, 
  Users, 
  Video, 
  FileText, 
  HelpCircle, 
  BookOpen 
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "activity";
  duration: string;
  completed: boolean;
}

interface LessonSidebarProps {
  moduleTitle: string;
  totalDuration: string;
  lessons: Lesson[];
  currentLessonId: string;
  onLessonSelect: (lessonId: string) => void;
  progress: number;
}

export default function LessonSidebar({
  moduleTitle,
  totalDuration,
  lessons,
  currentLessonId,
  onLessonSelect,
  progress
}: LessonSidebarProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video size={16} />;
      case "reading":
        return <FileText size={16} />;
      case "quiz":
        return <HelpCircle size={16} />;
      case "activity":
        return <BookOpen size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "reading":
        return "bg-green-100 text-green-800 border-green-200";
      case "quiz":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "activity":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-heading font-semibold mb-3 text-foreground line-clamp-2">
          {moduleTitle}
        </h2>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{totalDuration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{lessons.length} lessons</span>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              onClick={() => onLessonSelect(lesson.id)}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
                ${currentLessonId === lesson.id 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'hover:bg-muted/50'
                }
              `}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Completion Status */}
                <div className="flex-shrink-0">
                  {lesson.completed ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <div className={`
                      w-5 h-5 rounded-full border-2 
                      ${currentLessonId === lesson.id 
                        ? 'border-primary-foreground' 
                        : 'border-muted-foreground/30'
                      }
                    `} />
                  )}
                </div>
                
                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`
                      text-xs font-medium
                      ${currentLessonId === lesson.id 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                      }
                    `}>
                      Lesson {index + 1}
                    </span>
                    <Badge 
                      className={`
                        text-xs h-5 px-2
                        ${currentLessonId === lesson.id 
                          ? 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30' 
                          : getTypeColor(lesson.type)
                        }
                      `}
                    >
                      {getTypeIcon(lesson.type)}
                      <span className="ml-1 capitalize">{lesson.type}</span>
                    </Badge>
                  </div>
                  <h4 className={`
                    text-sm font-medium truncate
                    ${currentLessonId === lesson.id 
                      ? 'text-primary-foreground' 
                      : 'text-foreground'
                    }
                  `}>
                    {lesson.title}
                  </h4>
                  <p className={`
                    text-xs mt-1
                    ${currentLessonId === lesson.id 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                    }
                  `}>
                    {lesson.duration}
                  </p>
                </div>
              </div>
              
              {/* Active Indicator */}
              {currentLessonId === lesson.id && (
                <ChevronRight size={16} className="text-primary-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-foreground">
              {lessons.filter(l => l.completed).length}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">
              {lessons.length - lessons.filter(l => l.completed).length}
            </div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
}