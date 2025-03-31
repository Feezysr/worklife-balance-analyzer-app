
import React from "react";
import { WorkLifeData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface PersonalWellbeingFormProps {
  data: WorkLifeData;
  onChange: (updatedData: Partial<WorkLifeData>) => void;
  className?: string;
}

const PersonalWellbeingForm: React.FC<PersonalWellbeingFormProps> = ({ data, onChange, className }) => {
  return (
    <div className={cn("space-y-6 animate-fade-in", className)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Personal Well-being</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Let's assess aspects of your life outside of work that contribute to overall well-being.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sleepHours">
          Average hours of sleep per night
        </Label>
        <Input
          id="sleepHours"
          type="number"
          value={data.sleepHours === null ? "" : data.sleepHours}
          onChange={(e) => {
            const value = e.target.value === "" ? null : parseFloat(e.target.value);
            onChange({ sleepHours: value });
          }}
          placeholder="e.g. 7.5"
          min={0}
          max={24}
          step={0.5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="exerciseFrequency">Exercise Frequency</Label>
        <Select
          value={data.exerciseFrequency}
          onValueChange={(value: any) => onChange({ exerciseFrequency: value })}
        >
          <SelectTrigger id="exerciseFrequency">
            <SelectValue placeholder="How often do you exercise?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
            <SelectItem value="rarely">Rarely (few times a month)</SelectItem>
            <SelectItem value="sometimes">Sometimes (once a week)</SelectItem>
            <SelectItem value="often">Often (few times a week)</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dietQuality">Diet Quality</Label>
        <Select
          value={data.dietQuality}
          onValueChange={(value: any) => onChange({ dietQuality: value })}
        >
          <SelectTrigger id="dietQuality">
            <SelectValue placeholder="How would you rate your diet?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="poor">Poor (mostly processed foods)</SelectItem>
            <SelectItem value="average">Average (mix of healthy and processed)</SelectItem>
            <SelectItem value="excellent">Excellent (mostly whole foods)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="stressAnxiety">
          Stress/Anxiety Level (1-10)
          <span className="text-sm text-gray-500 ml-2">
            {data.stressAnxiety !== null ? data.stressAnxiety : "Not specified"}
          </span>
        </Label>
        <div className="px-2">
          <Slider
            id="stressAnxiety"
            defaultValue={[data.stressAnxiety !== null ? data.stressAnxiety : 5]}
            max={10}
            step={1}
            onValueChange={(value) => onChange({ stressAnxiety: value[0] })}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Low (1)</span>
          <span>High (10)</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="happiness">
          Overall Happiness (1-10)
          <span className="text-sm text-gray-500 ml-2">
            {data.happiness !== null ? data.happiness : "Not specified"}
          </span>
        </Label>
        <div className="px-2">
          <Slider
            id="happiness"
            defaultValue={[data.happiness !== null ? data.happiness : 5]}
            max={10}
            step={1}
            onValueChange={(value) => onChange({ happiness: value[0] })}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Unhappy (1)</span>
          <span>Very Happy (10)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="familyTime">
          Hours spent with family/friends per week
        </Label>
        <Input
          id="familyTime"
          type="number"
          value={data.familyTime === null ? "" : data.familyTime}
          onChange={(e) => {
            const value = e.target.value === "" ? null : parseInt(e.target.value);
            onChange({ familyTime: value });
          }}
          placeholder="e.g. 10"
          min={0}
          max={168}
        />
      </div>

      <div className="space-y-4">
        <Label>Do you regularly miss personal events due to work?</Label>
        <RadioGroup
          value={data.missingPersonalEvents}
          onValueChange={(value: any) => onChange({ missingPersonalEvents: value })}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="miss-yes" />
            <Label htmlFor="miss-yes" className="font-normal">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sometimes" id="miss-sometimes" />
            <Label htmlFor="miss-sometimes" className="font-normal">Sometimes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="miss-no" />
            <Label htmlFor="miss-no" className="font-normal">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hobbiesFrequency">How often do you engage in hobbies/leisure activities?</Label>
        <Select
          value={data.hobbiesFrequency}
          onValueChange={(value: any) => onChange({ hobbiesFrequency: value })}
        >
          <SelectTrigger id="hobbiesFrequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
            <SelectItem value="rarely">Rarely</SelectItem>
            <SelectItem value="sometimes">Sometimes</SelectItem>
            <SelectItem value="often">Often</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="selfCareTime">
          Hours per week dedicated to self-care/alone time
        </Label>
        <Input
          id="selfCareTime"
          type="number"
          value={data.selfCareTime === null ? "" : data.selfCareTime}
          onChange={(e) => {
            const value = e.target.value === "" ? null : parseInt(e.target.value);
            onChange({ selfCareTime: value });
          }}
          placeholder="e.g. 5"
          min={0}
          max={168}
        />
      </div>
    </div>
  );
};

export default PersonalWellbeingForm;
