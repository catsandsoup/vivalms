import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  Star,
  Users
} from "lucide-react";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  progress: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  isNew?: boolean;
  rating?: number;
  enrolledUsers?: number;
  onSelect: (moduleId: string) => void;
}

export default function ModuleCard({
  id,
  title,
  description,
  duration,
  lessons,
  progress,
  difficulty,
  category,
  isNew,
  rating,
  enrolledUsers,
  onSelect
}: ModuleCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "bg-gray-200";
    if (progress < 50) return "bg-yellow-500";
    if (progress < 100) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <Card className="card-viva overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        {/* Header Badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge className={`${getDifficultyColor(difficulty)} text-xs font-medium`}>
              {difficulty}
            </Badge>
            {isNew && (
              <Badge className="bg-accent text-accent-foreground text-xs">
                New
              </Badge>
            )}
          </div>
          
          {rating && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-heading font-semibold mb-3 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
          {description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{lessons} lessons</span>
          </div>
          {enrolledUsers && (
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{enrolledUsers}</span>
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(progress)} transition-all duration-500 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Category Tag */}
        <div className="mb-4">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>

        {/* Action Button */}
        <Button
          onClick={() => onSelect(id)}
          className="w-full btn-viva group-hover:scale-105 transition-all duration-200"
          size="lg"
        >
          {progress === 0 ? (
            <>
              <PlayCircle size={18} className="mr-2" />
              Start Module
            </>
          ) : progress === 100 ? (
            <>
              <CheckCircle size={18} className="mr-2" />
              Review Module
            </>
          ) : (
            <>
              <PlayCircle size={18} className="mr-2" />
              Continue Learning
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}