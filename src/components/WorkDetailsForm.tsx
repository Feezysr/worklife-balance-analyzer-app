
import React from "react";
import { WorkLifeData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface WorkDetailsFormProps {
  data: WorkLifeData;
  onChange: (updatedData: Partial<WorkLifeData>) => void;
  className?: string;
}

const WorkDetailsForm: React.FC<WorkDetailsFormProps> = ({ data, onChange, className }) => {
  return (
    <div className={cn("space-y-6 animate-fade-in", className)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Your Work Schedule</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Tell us about your typical work hours and arrangements.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="weeklyWorkHours">Average Weekly Work Hours</Label>
        <Input
          id="weeklyWorkHours"
          type="number"
          value={data.weeklyWorkHours === null ? "" : data.weeklyWorkHours}
          onChange={(e) => {
            const value = e.target.value === "" ? null : parseInt(e.target.value);
            onChange({ weeklyWorkHours: value });
          }}
          placeholder="e.g. 40"
          min={1}
          max={168}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="workStartTime">Typical Work Start Time</Label>
          <Input
            id="workStartTime"
            type="time"
            value={data.workStartTime}
            onChange={(e) => onChange({ workStartTime: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workEndTime">Typical Work End Time</Label>
          <Input
            id="workEndTime"
            type="time"
            value={data.workEndTime}
            onChange={(e) => onChange({ workEndTime: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="overtimeFrequency">Overtime Frequency</Label>
          <Select
            value={data.overtimeFrequency}
            onValueChange={(value: any) => onChange({ overtimeFrequency: value })}
          >
            <SelectTrigger id="overtimeFrequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
              <SelectItem value="sometimes">Sometimes</SelectItem>
              <SelectItem value="often">Often</SelectItem>
              <SelectItem value="always">Always</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weekendWorkFrequency">Weekend Work Frequency</Label>
          <Select
            value={data.weekendWorkFrequency}
            onValueChange={(value: any) => onChange({ weekendWorkFrequency: value })}
          >
            <SelectTrigger id="weekendWorkFrequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
              <SelectItem value="sometimes">Sometimes</SelectItem>
              <SelectItem value="often">Often</SelectItem>
              <SelectItem value="always">Always</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="commuteTime">
          Daily Commute Time (minutes, one way)
        </Label>
        <Input
          id="commuteTime"
          type="number"
          value={data.commuteTime === null ? "" : data.commuteTime}
          onChange={(e) => {
            const value = e.target.value === "" ? null : parseInt(e.target.value);
            onChange({ commuteTime: value });
          }}
          placeholder="e.g. 30"
          min={0}
          max={300}
        />
        <p className="text-sm text-gray-500 mt-1">
          If you work remotely, enter 0
        </p>
      </div>
    </div>
  );
};

export default WorkDetailsForm;
