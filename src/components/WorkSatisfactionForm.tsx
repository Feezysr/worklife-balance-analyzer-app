
import React from "react";
import { WorkLifeData } from "@/types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface WorkSatisfactionFormProps {
  data: WorkLifeData;
  onChange: (updatedData: Partial<WorkLifeData>) => void;
  className?: string;
}

const WorkSatisfactionForm: React.FC<WorkSatisfactionFormProps> = ({ data, onChange, className }) => {
  return (
    <div className={cn("space-y-6 animate-fade-in", className)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Work Satisfaction & Stress</h2>
        <p className="text-gray-500 dark:text-gray-400">
          How do you feel about your current job and workload?
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="stressLevel">
          Work-related Stress Level (1-10)
          <span className="text-sm text-gray-500 ml-2">
            {data.stressLevel !== null ? data.stressLevel : "Not specified"}
          </span>
        </Label>
        <div className="px-2">
          <Slider
            id="stressLevel"
            defaultValue={[data.stressLevel !== null ? data.stressLevel : 5]}
            max={10}
            step={1}
            onValueChange={(value) => onChange({ stressLevel: value[0] })}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Low Stress (1)</span>
          <span>High Stress (10)</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="jobSatisfaction">
          Job Satisfaction (1-10)
          <span className="text-sm text-gray-500 ml-2">
            {data.jobSatisfaction !== null ? data.jobSatisfaction : "Not specified"}
          </span>
        </Label>
        <div className="px-2">
          <Slider
            id="jobSatisfaction"
            defaultValue={[data.jobSatisfaction !== null ? data.jobSatisfaction : 5]}
            max={10}
            step={1}
            onValueChange={(value) => onChange({ jobSatisfaction: value[0] })}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Not Satisfied (1)</span>
          <span>Very Satisfied (10)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workloadPerception">Workload Perception</Label>
        <Select
          value={data.workloadPerception}
          onValueChange={(value: any) => onChange({ workloadPerception: value })}
        >
          <SelectTrigger id="workloadPerception">
            <SelectValue placeholder="How do you perceive your workload?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="too-little">Too little work</SelectItem>
            <SelectItem value="manageable">Manageable amount of work</SelectItem>
            <SelectItem value="too-much">Too much work</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="scheduleFlexibility">Schedule Flexibility</Label>
        <Select
          value={data.scheduleFlexibility}
          onValueChange={(value: any) => onChange({ scheduleFlexibility: value })}
        >
          <SelectTrigger id="scheduleFlexibility">
            <SelectValue placeholder="How flexible is your work schedule?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rigid">Rigid (fixed hours, no flexibility)</SelectItem>
            <SelectItem value="some-flexibility">Some flexibility (occasional adjustments allowed)</SelectItem>
            <SelectItem value="fully-flexible">Fully flexible (I set my own hours)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="breakFrequency">Break Frequency During Work</Label>
        <Select
          value={data.breakFrequency}
          onValueChange={(value: any) => onChange({ breakFrequency: value })}
        >
          <SelectTrigger id="breakFrequency">
            <SelectValue placeholder="How often do you take breaks?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
            <SelectItem value="rarely">Rarely</SelectItem>
            <SelectItem value="sometimes">Sometimes</SelectItem>
            <SelectItem value="often">Often</SelectItem>
            <SelectItem value="always">Regular scheduled breaks</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default WorkSatisfactionForm;
