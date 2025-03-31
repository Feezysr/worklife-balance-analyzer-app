
import React, { useState } from "react";
import { WorkLifeData } from "@/types";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

interface PrioritiesFormProps {
  data: WorkLifeData;
  onChange: (updatedData: Partial<WorkLifeData>) => void;
  className?: string;
}

type PriorityItem = {
  key: keyof WorkLifeData["priorities"];
  label: string;
  rank: number | null;
};

const PrioritiesForm: React.FC<PrioritiesFormProps> = ({ data, onChange, className }) => {
  const [priorities, setPriorities] = useState<PriorityItem[]>([
    { key: "careerGrowth", label: "Career Growth", rank: data.priorities.careerGrowth },
    { key: "familyTime", label: "Family Time", rank: data.priorities.familyTime },
    { key: "health", label: "Health", rank: data.priorities.health },
    { key: "socialLife", label: "Social Life", rank: data.priorities.socialLife },
    { key: "financialStability", label: "Financial Stability", rank: data.priorities.financialStability },
    { key: "personalDevelopment", label: "Personal Development", rank: data.priorities.personalDevelopment },
  ]);

  const handleRank = (index: number, direction: "up" | "down") => {
    const newPriorities = [...priorities];
    
    if (direction === "up" && index > 0) {
      const temp = newPriorities[index - 1].rank;
      newPriorities[index - 1].rank = newPriorities[index].rank;
      newPriorities[index].rank = temp;
    } else if (direction === "down" && index < newPriorities.length - 1) {
      const temp = newPriorities[index + 1].rank;
      newPriorities[index + 1].rank = newPriorities[index].rank;
      newPriorities[index].rank = temp;
    }
    
    // Sort by rank
    newPriorities.sort((a, b) => {
      if (a.rank === null) return 1;
      if (b.rank === null) return -1;
      return a.rank - b.rank;
    });
    
    setPriorities(newPriorities);
    
    // Update parent state
    const prioritiesUpdate = newPriorities.reduce((acc, item) => {
      acc[item.key] = item.rank;
      return acc;
    }, {} as Record<keyof WorkLifeData["priorities"], number | null>);
    
    onChange({ priorities: prioritiesUpdate as WorkLifeData["priorities"] });
  };

  const autoRank = () => {
    const newPriorities = [...priorities];
    
    // Auto assign ranks 1-6
    newPriorities.forEach((priority, index) => {
      priority.rank = index + 1;
    });
    
    setPriorities(newPriorities);
    
    // Update parent state
    const prioritiesUpdate = newPriorities.reduce((acc, item) => {
      acc[item.key] = item.rank;
      return acc;
    }, {} as Record<keyof WorkLifeData["priorities"], number | null>);
    
    onChange({ priorities: prioritiesUpdate as WorkLifeData["priorities"] });
  };

  // Initialize rankings if not set
  React.useEffect(() => {
    const allNull = priorities.every(p => p.rank === null);
    if (allNull) {
      autoRank();
    }
  }, []);

  return (
    <div className={cn("space-y-6 animate-fade-in", className)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Your Life Priorities</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Rank these aspects of your life from 1 (most important) to 6 (least important).
          Drag and drop or use the arrow buttons to reorder.
        </p>
      </div>

      <Button 
        variant="outline" 
        onClick={autoRank}
        className="mb-4"
      >
        Reset Rankings
      </Button>

      <div className="space-y-3">
        {priorities.map((priority, index) => (
          <div 
            key={priority.key}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-frontlett text-white flex items-center justify-center mr-3">
                {priority.rank || "-"}
              </div>
              <Label className="font-medium">{priority.label}</Label>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRank(index, "up")}
                disabled={index === 0}
                className="h-8 w-8"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRank(index, "down")}
                disabled={index === priorities.length - 1}
                className="h-8 w-8"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrioritiesForm;
