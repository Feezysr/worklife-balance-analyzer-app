
import React from "react";
import { WorkLifeData } from "@/types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface PersonalGoalsFormProps {
  data: WorkLifeData;
  onChange: (updatedData: Partial<WorkLifeData>) => void;
  className?: string;
}

const PersonalGoalsForm: React.FC<PersonalGoalsFormProps> = ({ data, onChange, className }) => {
  return (
    <div className={cn("space-y-6 animate-fade-in", className)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Personal Goals & Fulfillment</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Tell us about your personal and professional goals and how well you're able to pursue them.
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="careerGrowthSatisfaction">
          Satisfaction with Career Growth (1-10)
          <span className="text-sm text-gray-500 ml-2">
            {data.careerGrowthSatisfaction !== null ? data.careerGrowthSatisfaction : "Not specified"}
          </span>
        </Label>
        <div className="px-2">
          <Slider
            id="careerGrowthSatisfaction"
            defaultValue={[data.careerGrowthSatisfaction !== null ? data.careerGrowthSatisfaction : 5]}
            max={10}
            step={1}
            onValueChange={(value) => onChange({ careerGrowthSatisfaction: value[0] })}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Unsatisfied (1)</span>
          <span>Very satisfied (10)</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="learningSatisfaction">
          Satisfaction with Learning Opportunities (1-10)
          <span className="text-sm text-gray-500 ml-2">
            {data.learningSatisfaction !== null ? data.learningSatisfaction : "Not specified"}
          </span>
        </Label>
        <div className="px-2">
          <Slider
            id="learningSatisfaction"
            defaultValue={[data.learningSatisfaction !== null ? data.learningSatisfaction : 5]}
            max={10}
            step={1}
            onValueChange={(value) => onChange({ learningSatisfaction: value[0] })}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Unsatisfied (1)</span>
          <span>Very satisfied (10)</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="fitnessProgressSatisfaction">
          Satisfaction with Fitness/Health Progress (1-10)
          <span className="text-sm text-gray-500 ml-2">
            {data.fitnessProgressSatisfaction !== null ? data.fitnessProgressSatisfaction : "Not specified"}
          </span>
        </Label>
        <div className="px-2">
          <Slider
            id="fitnessProgressSatisfaction"
            defaultValue={[data.fitnessProgressSatisfaction !== null ? data.fitnessProgressSatisfaction : 5]}
            max={10}
            step={1}
            onValueChange={(value) => onChange({ fitnessProgressSatisfaction: value[0] })}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Unsatisfied (1)</span>
          <span>Very satisfied (10)</span>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Does your work interfere with your personal life goals?</Label>
        <RadioGroup
          value={data.workInterfereWithPersonalLife}
          onValueChange={(value: any) => onChange({ workInterfereWithPersonalLife: value })}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="interfere-yes" />
            <Label htmlFor="interfere-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sometimes" id="interfere-sometimes" />
            <Label htmlFor="interfere-sometimes" className="font-normal">Sometimes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="interfere-no" />
            <Label htmlFor="interfere-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label htmlFor="lifeControlFeeling">
          Feeling of Control Over Your Life (1-10)
          <span className="text-sm text-gray-500 ml-2">
            {data.lifeControlFeeling !== null ? data.lifeControlFeeling : "Not specified"}
          </span>
        </Label>
        <div className="px-2">
          <Slider
            id="lifeControlFeeling"
            defaultValue={[data.lifeControlFeeling !== null ? data.lifeControlFeeling : 5]}
            max={10}
            step={1}
            onValueChange={(value) => onChange({ lifeControlFeeling: value[0] })}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>No control (1)</span>
          <span>Complete control (10)</span>
        </div>
      </div>
    </div>
  );
};

export default PersonalGoalsForm;
