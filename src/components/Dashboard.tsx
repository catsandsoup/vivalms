import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users, Star, CheckCircle, PlayCircle } from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  progress: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  isNew?: boolean;
}

const modules: Module[] = [
  {
    id: "nutrition-foundations",
    title: "Nutrition Foundations for Healthy Ageing",
    description: "Comprehensive training on osteosarcopenia, malnutrition prevention, and meal planning for older adults.",
    duration: "2.5 hours",
    lessons: 7,
    progress: 0,
    difficulty: "Beginner",
    category: "Core Training",
    isNew: true
  },
  {
    id: "advanced-nutrition",
    title: "Advanced Nutritional Assessment",
    description: "Deep dive into nutritional screening tools, risk assessment, and intervention strategies.",
    duration: "3 hours",
    lessons: 8,
    progress: 25,
    difficulty: "Advanced",
    category: "Specialist Training"
  },
  {
    id: "practical-cooking",
    title: "Practical Cooking & Meal Prep",
    description: "Hands-on cooking demonstrations, meal planning strategies, and kitchen safety for carers.",
    duration: "1.5 hours",
    lessons: 5,
    progress: 80,
    difficulty: "Beginner",
    category: "Practical Skills"
  },
  {
    id: "communication-skills",
    title: "Communication & Motivational Interviewing",
    description: "Effective communication techniques to encourage healthy eating habits in older adults.",
    duration: "2 hours",
    lessons: 6,
    progress: 100,
    difficulty: "Intermediate",
    category: "Soft Skills"
  }
];

interface DashboardProps {
  onModuleSelect: (moduleId: string) => void;
}

export default function Dashboard({ onModuleSelect }: DashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", "Core Training", "Specialist Training", "Practical Skills", "Soft Skills"];
  
  const filteredModules = selectedCategory === "All" 
    ? modules 
    : modules.filter(module => module.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[var(--gradient-viva)] text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Viva Mutual Learning Platform
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              Professional training for carers on osteosarcopenia and malnutrition prevention
            </p>
            <div className="flex flex-wrap gap-4 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <BookOpen size={20} />
                <span>{modules.length} Modules Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>Evidence-Based Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={20} />
                <span>CPD Accredited</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-semibold mb-4">Learning Modules</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "btn-viva" : "btn-viva-outline"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Card key={module.id} className="card-viva overflow-hidden group">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <Badge className={getDifficultyColor(module.difficulty)}>
                    {module.difficulty}
                  </Badge>
                  {module.isNew && (
                    <Badge className="bg-accent text-accent-foreground">
                      New
                    </Badge>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                  {module.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {module.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={16} />
                    <span>{module.lessons} lessons</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="progress-indicator">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${module.progress}%` }}
                    />
                  </Progress>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => onModuleSelect(module.id)}
                  className="w-full btn-viva group-hover:scale-105 transition-transform"
                >
                  {module.progress === 0 ? (
                    <>
                      <PlayCircle size={18} className="mr-2" />
                      Start Module
                    </>
                  ) : module.progress === 100 ? (
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
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-viva p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {modules.filter(m => m.progress === 100).length}
            </div>
            <div className="text-muted-foreground">Modules Completed</div>
          </Card>
          <Card className="card-viva p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {modules.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-muted-foreground">In Progress</div>
          </Card>
          <Card className="card-viva p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length)}%
            </div>
            <div className="text-muted-foreground">Overall Progress</div>
          </Card>
        </div>
      </div>
    </div>
  );
}