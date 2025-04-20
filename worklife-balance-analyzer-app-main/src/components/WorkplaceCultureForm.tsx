
import React from "react";
import { WorkLifeData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface WorkplaceCultureFormProps {
  data: WorkLifeData;
  onChange: (updatedData: Partial<WorkLifeData>) => void;
  className?: string;
}

const WorkplaceCultureForm: React.FC<WorkplaceCultureFormProps> = ({ data, onChange, className }) => {
  return (
    <div className={cn("space-y-6 animate-fade-in", className)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Workplace Culture & Boundaries</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Help us understand the culture at your workplace and how you manage work boundaries.
        </p>
      </div>

      <div className="space-y-4">
        <Label>Can you disconnect from work after hours?</Label>
        <RadioGroup
          value={data.canDisconnect}
          onValueChange={(value: any) => onChange({ canDisconnect: value })}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="disconnect-yes" />
            <Label htmlFor="disconnect-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="disconnect-no" />
            <Label htmlFor="disconnect-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="afterHoursMessages">How often do you receive work messages after hours?</Label>
        <Select
          value={data.afterHoursMessages}
          onValueChange={(value: any) => onChange({ afterHoursMessages: value })}
        >
          <SelectTrigger id="afterHoursMessages">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
            <SelectItem value="sometimes">Sometimes</SelectItem>
            <SelectItem value="always">Always</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vacationDaysTaken">
          Vacation days taken in the past year
        </Label>
        <Input
          id="vacationDaysTaken"
          type="number"
          value={data.vacationDaysTaken === null ? "" : data.vacationDaysTaken}
          onChange={(e) => {
            const value = e.target.value === "" ? null : parseInt(e.target.value);
            onChange({ vacationDaysTaken: value });
          }}
          placeholder="e.g. 15"
          min={0}
          max={365}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="burnoutLevel">How often do you feel burnt out?</Label>
        <Select
          value={data.burnoutLevel}
          onValueChange={(value: any) => onChange({ burnoutLevel: value })}
        >
          <SelectTrigger id="burnoutLevel">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
            <SelectItem value="occasionally">Occasionally</SelectItem>
            <SelectItem value="often">Often</SelectItem>
            <SelectItem value="always">Always</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default WorkplaceCultureForm;
