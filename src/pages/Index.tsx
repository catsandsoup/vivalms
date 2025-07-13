import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import ModuleInterface from "@/components/ModuleInterface";

const Index = () => {
  const [currentView, setCurrentView] = useState<"dashboard" | "module">("dashboard");
  const [selectedModuleId, setSelectedModuleId] = useState<string>("");

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setCurrentView("module");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedModuleId("");
  };

  if (currentView === "module") {
    return (
      <ModuleInterface 
        moduleId={selectedModuleId} 
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <Dashboard onModuleSelect={handleModuleSelect} />
  );
};

export default Index;
