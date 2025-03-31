
import React from "react";
import { WorkLifeData } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DemographicsFormProps {
  data: WorkLifeData;
  onChange: (updatedData: Partial<WorkLifeData>) => void;
  className?: string;
}

const DemographicsForm: React.FC<DemographicsFormProps> = ({ data, onChange, className }) => {
  return (
    <div className={cn("space-y-6 animate-fade-in", className)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Tell us about yourself</h2>
        <p className="text-gray-500 dark:text-gray-400">
          This information helps us understand your work context and provide personalized insights.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={data.age === null ? "" : data.age}
            onChange={(e) => {
              const value = e.target.value === "" ? null : parseInt(e.target.value);
              onChange({ age: value });
            }}
            placeholder="Your age"
            min={18}
            max={100}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={data.gender}
          onValueChange={(value: any) => onChange({ gender: value })}
        >
          <SelectTrigger id="gender">
            <SelectValue placeholder="Select your gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="non-binary">Non-binary</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jobRole">Job Role</Label>
          <Input
            id="jobRole"
            value={data.jobRole}
            onChange={(e) => onChange({ jobRole: e.target.value })}
            placeholder="e.g. Software Engineer, Manager"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={data.industry}
            onChange={(e) => onChange({ industry: e.target.value })}
            placeholder="e.g. Technology, Healthcare"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workSetup">Work Setup</Label>
        <Select
          value={data.workSetup}
          onValueChange={(value: any) => onChange({ workSetup: value })}
        >
          <SelectTrigger id="workSetup">
            <SelectValue placeholder="Select your work arrangement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="onsite">On-site</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select
            value={data.maritalStatus}
            onValueChange={(value: any) => onChange({ maritalStatus: value })}
          >
            <SelectTrigger id="maritalStatus">
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="partnered">Partnered</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="parentalStatus">Parental Status</Label>
          <Select
            value={data.parentalStatus}
            onValueChange={(value: any) => onChange({ parentalStatus: value })}
          >
            <SelectTrigger id="parentalStatus">
              <SelectValue placeholder="Select parental status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-children">No children</SelectItem>
              <SelectItem value="children-at-home">Children living at home</SelectItem>
              <SelectItem value="grown-children">Grown children</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="livingSituation">Living Situation</Label>
        <Select
          value={data.livingSituation}
          onValueChange={(value: any) => onChange({ livingSituation: value })}
        >
          <SelectTrigger id="livingSituation">
            <SelectValue placeholder="Select living situation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alone">Living alone</SelectItem>
            <SelectItem value="with-family">Living with family</SelectItem>
            <SelectItem value="with-roommates">Living with roommates</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DemographicsForm;
