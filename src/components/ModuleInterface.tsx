import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/ui/navigation";
import PageHeader from "@/components/ui/page-header";
import LessonSidebar from "@/components/ui/lesson-sidebar";
import VideoPlayer from "@/components/ui/video-player";
import { PlayCircle, CheckCircle, Download, ChevronRight, Video, FileText, HelpCircle, BookOpen } from "lucide-react";
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
  objectives: ["Understand the pathophysiology of osteosarcopenia in aging", "Identify early signs and risk factors for malnutrition", "Apply evidence-based meal planning strategies", "Use visual prompts and behaviour change techniques", "Implement nutrition screening tools effectively"],
  lessons: [{
    id: "1",
    title: "Introduction to Osteosarcopenia",
    type: "video",
    duration: "15 min",
    completed: true,
    content: {
      description: "Understanding the intersection of osteoporosis and sarcopenia in older adults.",
      videoUrl: "/placeholder-video.mp4",
      resources: [{
        title: "Osteosarcopenia Fact Sheet",
        url: "/resources/fact-sheet.pdf",
        type: "PDF"
      }, {
        title: "Visual Guide",
        url: "/resources/visual-guide.pdf",
        type: "PDF"
      }]
    }
  }, {
    id: "2",
    title: "Spotting Malnutrition",
    type: "video",
    duration: "20 min",
    completed: true,
    content: {
      description: "Learn to identify early warning signs and risk factors for malnutrition in your care recipients.",
      resources: [{
        title: "Malnutrition Screening Tool",
        url: "/resources/screening.pdf",
        type: "PDF"
      }, {
        title: "Case Study Examples",
        url: "/resources/cases.pdf",
        type: "PDF"
      }]
    }
  }, {
    id: "3",
    title: "Meal Planning & Label Reading",
    type: "activity",
    duration: "25 min",
    completed: false,
    content: {
      description: "Interactive guide to creating nutritionally balanced meals and understanding food labels.",
      resources: [{
        title: "Meal Planning Template",
        url: "/resources/meal-plan.pdf",
        type: "PDF"
      }, {
        title: "Label Reading Guide",
        url: "/resources/labels.pdf",
        type: "PDF"
      }]
    }
  }, {
    id: "4",
    title: "Cooking for Strength",
    type: "video",
    duration: "30 min",
    completed: false,
    content: {
      description: "Cooking demonstrations focusing on protein-rich, nutrient-dense meals for muscle health.",
      resources: [{
        title: "Recipe Collection",
        url: "/resources/recipes.pdf",
        type: "PDF"
      }, {
        title: "Shopping List Template",
        url: "/resources/shopping.pdf",
        type: "PDF"
      }]
    }
  }, {
    id: "5",
    title: "Visual Prompts & Habit Building",
    type: "reading",
    duration: "15 min",
    completed: false,
    content: {
      description: "Evidence-based visual cues and behaviour change strategies to promote healthy eating.",
      resources: [{
        title: "Visual Prompt Posters",
        url: "/resources/posters.pdf",
        type: "PDF"
      }, {
        title: "Habit Building Worksheets",
        url: "/resources/habits.pdf",
        type: "PDF"
      }]
    }
  }, {
    id: "6",
    title: "Cook & Share Challenge",
    type: "activity",
    duration: "30 min",
    completed: false,
    content: {
      description: "Practical cooking challenge with community sharing component.",
      resources: [{
        title: "Challenge Guidelines",
        url: "/resources/challenge.pdf",
        type: "PDF"
      }]
    }
  }, {
    id: "7",
    title: "Check-In & Reflect",
    type: "quiz",
    duration: "15 min",
    completed: false,
    content: {
      description: "Self-assessment and reflection on learning outcomes.",
      quiz: {
        question: "What are the key indicators of osteosarcopenia?",
        options: ["Muscle weakness and bone density loss", "Weight gain and fatigue", "Cognitive decline and vision problems", "Skin changes and hair loss"],
        correctAnswer: 0
      }
    }
  }]
};
interface ModuleInterfaceProps {
  moduleId: string;
  onBack: () => void;
}
export default function ModuleInterface({
  moduleId,
  onBack
}: ModuleInterfaceProps) {
  const [currentLessonId, setCurrentLessonId] = useState("1");
  
  const currentLesson = moduleData.lessons.find(lesson => lesson.id === currentLessonId);
  const completedLessons = moduleData.lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = Math.round(completedLessons / moduleData.lessons.length * 100);
  
  const currentLessonIndex = moduleData.lessons.findIndex(lesson => lesson.id === currentLessonId);
  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === moduleData.lessons.length - 1;

  const handlePreviousLesson = () => {
    if (!isFirstLesson) {
      setCurrentLessonId(moduleData.lessons[currentLessonIndex - 1].id);
    }
  };

  const handleNextLesson = () => {
    if (!isLastLesson) {
      setCurrentLessonId(moduleData.lessons[currentLessonIndex + 1].id);
    }
  };

  const handleMarkComplete = () => {
    // In a real app, this would update the lesson completion status
    console.log(`Marking lesson ${currentLessonId} as complete`);
  };

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <Navigation 
        showSearch={false}
        onBack={onBack}
        backLabel="Back to Dashboard"
        currentUser={{ name: "Arthur", role: "Admin" }}
      />

      <div className="flex flex-1">
        {/* Sidebar */}
        <LessonSidebar
          moduleTitle={moduleData.title}
          totalDuration={moduleData.totalDuration}
          lessons={moduleData.lessons}
          currentLessonId={currentLessonId}
          onLessonSelect={setCurrentLessonId}
          progress={progressPercentage}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Content Header */}
          <PageHeader
            title={currentLesson?.title || ""}
            subtitle={`Lesson ${currentLesson?.id} • ${currentLesson?.duration}`}
            description={currentLesson?.content?.description}
            badge={{
              text: currentLesson?.type || "lesson",
              variant: "outline"
            }}
            breadcrumbs={[
              { label: "Dashboard", onClick: onBack },
              { label: moduleData.title },
              { label: `Lesson ${currentLesson?.id}` }
            ]}
          />

          {/* Content Body */}
          <div className="flex-1 p-6 overflow-y-auto">
            {currentLesson?.type === "video" && (
              <div className="space-y-6">
                {/* Video Player */}
                <VideoPlayer
                  title={currentLesson.title}
                  duration={currentLesson.duration}
                  onComplete={handleMarkComplete}
                />

                {/* Learning Objectives for first lesson */}
                {currentLesson.id === "1" && (
                  <Card className="card-viva p-6">
                    <h3 className="text-lg font-semibold mb-4">Learning Objectives</h3>
                    <ul className="space-y-3">
                      {moduleData.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
            )}

            {currentLesson?.type === "quiz" && currentLesson.content?.quiz && (
              <Card className="card-viva p-6">
                <h3 className="text-lg font-semibold mb-6">Knowledge Check</h3>
                <div className="space-y-6">
                  <p className="text-foreground font-medium text-lg">
                    {currentLesson.content.quiz.question}
                  </p>
                  <div className="space-y-3">
                    {currentLesson.content.quiz.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start h-auto p-4 hover:bg-muted/50"
                      >
                        <span className="font-semibold mr-3 text-primary">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="text-sm">{option}</span>
                      </Button>
                    ))}
                  </div>
                  <Button className="btn-viva">
                    Submit Answer
                  </Button>
                </div>
              </Card>
            )}

            {(currentLesson?.type === "reading" || currentLesson?.type === "activity") && (
              <Card className="card-viva p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {currentLesson.type === "activity" ? "Interactive Activity" : "Reading Material"}
                </h3>
                <div className="prose max-w-none">
                  <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                    {currentLesson.content?.description}
                  </p>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p>
                      This lesson provides comprehensive coverage of the topic through 
                      {currentLesson.type === "activity" 
                        ? " interactive exercises and practical applications" 
                        : " detailed reading materials and evidence-based information"}.
                    </p>
                    <p>
                      The content is designed to be accessible and immediately applicable in your care practice,
                      ensuring you can implement these strategies effectively with your clients.
                    </p>
                    <p>
                      Take your time to review all materials and don't hesitate to revisit sections as needed.
                      Your understanding of these concepts is crucial for providing quality care.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Resources */}
            {currentLesson?.content?.resources && currentLesson.content.resources.length > 0 && (
              <Card className="card-viva p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Downloadable Resources</h3>
                <div className="grid gap-3">
                  {currentLesson.content.resources.map((resource, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Download size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground">{resource.type} Document</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                        <Download size={14} className="mr-1" />
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
              <Button 
                variant="outline" 
                onClick={handlePreviousLesson}
                disabled={isFirstLesson}
                className="hover:bg-muted"
              >
                ← Previous Lesson
              </Button>
              
              <div className="flex items-center gap-3">
                {!currentLesson?.completed && (
                  <Button 
                    onClick={handleMarkComplete}
                    className="btn-viva"
                  >
                    <CheckCircle size={16} className="mr-2" />
                    Mark Complete
                  </Button>
                )}
                
                <Button 
                  onClick={handleNextLesson}
                  disabled={isLastLesson}
                  className="btn-viva"
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