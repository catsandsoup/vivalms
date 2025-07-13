import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  PlayCircle, 
  CheckCircle, 
  Download, 
  Clock, 
  Users, 
  FileText,
  Video,
  HelpCircle,
  ChevronRight,
  BookOpen,
  User,
  ChevronDown,
  Settings,
  LogOut
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "activity";
  duration: string;
  completed: boolean;
  content?: {
    description?: string;
    videoUrl?: string;
    resources?: Array<{
      title: string;
      url: string;
      type: string;
    }>;
    quiz?: {
      question: string;
      options: string[];
      correctAnswer: number;
    };
  };
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  totalDuration: string;
  lessons: Lesson[];
  objectives: string[];
}

const moduleData: ModuleData = {
  id: "nutrition-foundations",
  title: "Nutrition Foundations for Healthy Ageing",
  description: "Comprehensive training on osteosarcopenia, malnutrition prevention, and meal planning for older adults.",
  totalDuration: "2.5 hours",
  objectives: [
    "Understand the pathophysiology of osteosarcopenia in aging",
    "Identify early signs and risk factors for malnutrition",
    "Apply evidence-based meal planning strategies",
    "Use visual prompts and behaviour change techniques",
    "Implement nutrition screening tools effectively"
  ],
  lessons: [
    {
      id: "1",
      title: "Introduction to Osteosarcopenia",
      type: "video",
      duration: "15 min",
      completed: true,
      content: {
        description: "Understanding the intersection of osteoporosis and sarcopenia in older adults.",
        videoUrl: "/placeholder-video.mp4",
        resources: [
          { title: "Osteosarcopenia Fact Sheet", url: "/resources/fact-sheet.pdf", type: "PDF" },
          { title: "Visual Guide", url: "/resources/visual-guide.pdf", type: "PDF" }
        ]
      }
    },
    {
      id: "2",
      title: "Spotting Malnutrition",
      type: "video",
      duration: "20 min",
      completed: true,
      content: {
        description: "Learn to identify early warning signs and risk factors for malnutrition in your care recipients.",
        resources: [
          { title: "Malnutrition Screening Tool", url: "/resources/screening.pdf", type: "PDF" },
          { title: "Case Study Examples", url: "/resources/cases.pdf", type: "PDF" }
        ]
      }
    },
    {
      id: "3",
      title: "Meal Planning & Label Reading",
      type: "activity",
      duration: "25 min",
      completed: false,
      content: {
        description: "Interactive guide to creating nutritionally balanced meals and understanding food labels.",
        resources: [
          { title: "Meal Planning Template", url: "/resources/meal-plan.pdf", type: "PDF" },
          { title: "Label Reading Guide", url: "/resources/labels.pdf", type: "PDF" }
        ]
      }
    },
    {
      id: "4",
      title: "Cooking for Strength",
      type: "video",
      duration: "30 min",
      completed: false,
      content: {
        description: "Cooking demonstrations focusing on protein-rich, nutrient-dense meals for muscle health.",
        resources: [
          { title: "Recipe Collection", url: "/resources/recipes.pdf", type: "PDF" },
          { title: "Shopping List Template", url: "/resources/shopping.pdf", type: "PDF" }
        ]
      }
    },
    {
      id: "5",
      title: "Visual Prompts & Habit Building",
      type: "reading",
      duration: "15 min",
      completed: false,
      content: {
        description: "Evidence-based visual cues and behaviour change strategies to promote healthy eating.",
        resources: [
          { title: "Visual Prompt Posters", url: "/resources/posters.pdf", type: "PDF" },
          { title: "Habit Building Worksheets", url: "/resources/habits.pdf", type: "PDF" }
        ]
      }
    },
    {
      id: "6",
      title: "Cook & Share Challenge",
      type: "activity",
      duration: "30 min",
      completed: false,
      content: {
        description: "Practical cooking challenge with community sharing component.",
        resources: [
          { title: "Challenge Guidelines", url: "/resources/challenge.pdf", type: "PDF" }
        ]
      }
    },
    {
      id: "7",
      title: "Check-In & Reflect",
      type: "quiz",
      duration: "15 min",
      completed: false,
      content: {
        description: "Self-assessment and reflection on learning outcomes.",
        quiz: {
          question: "What are the key indicators of osteosarcopenia?",
          options: [
            "Muscle weakness and bone density loss",
            "Weight gain and fatigue",
            "Cognitive decline and vision problems",
            "Skin changes and hair loss"
          ],
          correctAnswer: 0
        }
      }
    }
  ]
};

interface ModuleInterfaceProps {
  moduleId: string;
  onBack: () => void;
}

export default function ModuleInterface({ moduleId, onBack }: ModuleInterfaceProps) {
  const [currentLessonId, setCurrentLessonId] = useState("1");
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const currentLesson = moduleData.lessons.find(lesson => lesson.id === currentLessonId);
  const completedLessons = moduleData.lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = Math.round((completedLessons / moduleData.lessons.length) * 100);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video size={16} />;
      case "reading": return <FileText size={16} />;
      case "quiz": return <HelpCircle size={16} />;
      case "activity": return <BookOpen size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-blue-100 text-blue-800";
      case "reading": return "bg-green-100 text-green-800";
      case "quiz": return "bg-purple-100 text-purple-800";
      case "activity": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <div className="bg-card border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Back */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--gradient-viva)] rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-bold text-sm">VM</span>
                </div>
                <span className="font-heading font-bold text-foreground">Viva Mutual</span>
              </div>
              <Button 
                variant="ghost" 
                onClick={onBack}
                size="sm"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
              </Button>
            </div>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="text-xs"
              >
                <User size={14} className="mr-1" />
                Arthur (Admin)
                <ChevronDown size={14} className="ml-1" />
              </Button>
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-1">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded flex items-center gap-2">
                      <User size={14} />
                      Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded flex items-center gap-2">
                      <Settings size={14} />
                      Settings
                    </button>
                    <hr className="my-1 border-border" />
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded flex items-center gap-2 text-destructive">
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - Lesson List */}
        <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          
          <h2 className="text-lg font-heading font-semibold mb-2 text-foreground">
            {moduleData.title}
          </h2>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{moduleData.totalDuration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{moduleData.lessons.length} lessons</span>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="progress-indicator">
              <div 
                className="progress-bar" 
                style={{ width: `${progressPercentage}%` }}
              />
            </Progress>
          </div>
        </div>

        {/* Lessons List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {moduleData.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                onClick={() => setCurrentLessonId(lesson.id)}
                className={`sidebar-lesson ${currentLessonId === lesson.id ? 'active' : ''}`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-shrink-0">
                    {lesson.completed ? (
                      <CheckCircle size={20} className="text-green-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">
                        Lesson {index + 1}
                      </span>
                      <Badge className={`text-xs ${getTypeColor(lesson.type)}`}>
                        {getTypeIcon(lesson.type)}
                        <span className="ml-1 capitalize">{lesson.type}</span>
                      </Badge>
                    </div>
                    <h4 className="text-sm font-medium truncate">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {lesson.duration}
                    </p>
                  </div>
                </div>
                
                {currentLessonId === lesson.id && (
                  <ChevronRight size={16} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access Resources */}
        <div className="p-4 border-t border-border">
          <h4 className="text-sm font-semibold mb-3 text-foreground">Quick Downloads</h4>
          <div className="space-y-2">
            {currentLesson?.content?.resources?.map((resource, index) => (
              <button 
                key={index}
                className="w-full flex items-center gap-2 p-2 text-left hover:bg-muted rounded text-xs"
              >
                <Download size={14} className="text-primary flex-shrink-0" />
                <span className="truncate">{resource.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
        {/* Content Header */}
        <div className="bg-card border-b border-border p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getTypeColor(currentLesson?.type || "reading")}>
                  {getTypeIcon(currentLesson?.type || "reading")}
                  <span className="ml-1 capitalize">{currentLesson?.type}</span>
                </Badge>
                <Badge variant="outline">
                  Lesson {currentLesson?.id}
                </Badge>
              </div>
              <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                {currentLesson?.title}
              </h1>
              <p className="text-muted-foreground">
                {currentLesson?.content?.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Duration</div>
              <div className="text-lg font-semibold">{currentLesson?.duration}</div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6">
          {currentLesson?.type === "video" && (
            <div className="space-y-6">
              {/* Video Player Placeholder */}
              <Card className="card-viva h-64 flex items-center justify-center bg-muted">
                <div className="text-center">
                  <PlayCircle size={64} className="mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Video Content</h3>
                  <p className="text-muted-foreground">
                    Interactive video player would be embedded here
                  </p>
                </div>
              </Card>

              {/* Learning Objectives */}
              {currentLesson.id === "1" && (
                <Card className="card-viva p-6">
                  <h3 className="text-lg font-semibold mb-4">Learning Objectives</h3>
                  <ul className="space-y-2">
                    {moduleData.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          )}

          {currentLesson?.type === "quiz" && currentLesson.content?.quiz && (
            <Card className="card-viva p-6">
              <h3 className="text-lg font-semibold mb-4">Knowledge Check</h3>
              <div className="space-y-4">
                <p className="text-foreground font-medium">
                  {currentLesson.content.quiz.question}
                </p>
                <div className="space-y-2">
                  {currentLesson.content.quiz.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-4"
                    >
                      <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {(currentLesson?.type === "reading" || currentLesson?.type === "activity") && (
            <Card className="card-viva p-6">
              <h3 className="text-lg font-semibold mb-4">
                {currentLesson.type === "activity" ? "Interactive Activity" : "Reading Material"}
              </h3>
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-4">
                  {currentLesson.content?.description}
                </p>
                <p>
                  This lesson provides comprehensive coverage of the topic through 
                  {currentLesson.type === "activity" ? " interactive exercises and practical applications" : " detailed reading materials and evidence-based information"}.
                  The content is designed to be accessible and immediately applicable in your care practice.
                </p>
              </div>
            </Card>
          )}

          {/* Resources */}
          {currentLesson?.content?.resources && currentLesson.content.resources.length > 0 && (
            <Card className="card-viva p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Downloadable Resources</h3>
              <div className="grid gap-3">
                {currentLesson.content.resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Download size={20} className="text-primary" />
                      <div>
                        <h4 className="font-medium text-sm">{resource.title}</h4>
                        <p className="text-xs text-muted-foreground">{resource.type}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Action Bar */}
        <div className="bg-card border-t border-border p-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" disabled={currentLesson?.id === "1"}>
              Previous Lesson
            </Button>
            
            <div className="flex items-center gap-3">
              {!currentLesson?.completed && (
                <Button className="btn-viva">
                  <CheckCircle size={16} className="mr-2" />
                  Mark Complete
                </Button>
              )}
              
              <Button 
                className="btn-viva" 
                disabled={currentLesson?.id === moduleData.lessons.length.toString()}
              >
                Next Lesson
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}