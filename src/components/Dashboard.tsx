import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/ui/navigation";
import PageHeader from "@/components/ui/page-header";
import ModuleCard from "@/components/ui/module-card";
import StatsCard from "@/components/ui/stats-card";
import { BookOpen, GraduationCap, TrendingUp } from "lucide-react";

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
  rating?: number;
  enrolledUsers?: number;
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
    isNew: true,
    rating: 4.8,
    enrolledUsers: 156
  },
  {
    id: "advanced-nutrition",
    title: "Advanced Nutritional Assessment",
    description: "Deep dive into nutritional screening tools, risk assessment, and intervention strategies.",
    duration: "3 hours",
    lessons: 8,
    progress: 25,
    difficulty: "Advanced",
    category: "Specialist Training",
    rating: 4.6,
    enrolledUsers: 89
  },
  {
    id: "practical-cooking",
    title: "Practical Cooking & Meal Prep",
    description: "Hands-on cooking demonstrations, meal planning strategies, and kitchen safety for carers.",
    duration: "1.5 hours",
    lessons: 5,
    progress: 80,
    difficulty: "Beginner",
    category: "Practical Skills",
    rating: 4.9,
    enrolledUsers: 203
  },
  {
    id: "communication-skills",
    title: "Communication & Motivational Interviewing",
    description: "Effective communication techniques to encourage healthy eating habits in older adults.",
    duration: "2 hours",
    lessons: 6,
    progress: 100,
    difficulty: "Intermediate",
    category: "Soft Skills",
    rating: 4.7,
    enrolledUsers: 134
  }
];

interface DashboardProps {
  onModuleSelect: (moduleId: string) => void;
}

export default function Dashboard({ onModuleSelect }: DashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Core Training", "Specialist Training", "Practical Skills", "Soft Skills"];
  
  const filteredModules = modules
    .filter(module => selectedCategory === "All" || module.category === selectedCategory)
    .filter(module => 
      searchQuery === "" || 
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      module.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Calculate stats
  const completedModules = modules.filter(m => m.progress === 100).length;
  const inProgressModules = modules.filter(m => m.progress > 0 && m.progress < 100).length;
  const overallProgress = Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation 
        onSearch={handleSearch}
        searchQuery={searchQuery}
        currentUser={{ name: "Arthur", role: "Admin" }}
      />

      {/* Page Header */}
      <PageHeader
        title="Learning Dashboard"
        subtitle="Professional Development for NDIS Care Workers"
        description="Access comprehensive training modules designed specifically for aged care and disability support professionals."
        breadcrumbs={[
          { label: "Home" },
          { label: "Learning Dashboard" }
        ]}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Modules Completed"
            value={completedModules}
            description="Training modules finished"
            icon={<GraduationCap size={24} />}
            trend={{ value: 12, isPositive: true, label: "vs last month" }}
          />
          <StatsCard
            title="In Progress"
            value={inProgressModules}
            description="Currently learning"
            icon={<BookOpen size={24} />}
          />
          <StatsCard
            title="Overall Progress"
            value={`${overallProgress}%`}
            description="Across all modules"
            icon={<TrendingUp size={24} />}
            trend={{ value: 8, isPositive: true, label: "this month" }}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-semibold mb-4 text-foreground">
            Training Modules
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
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
          {filteredModules.map(module => (
            <ModuleCard
              key={module.id}
              {...module}
              onSelect={onModuleSelect}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No modules found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}