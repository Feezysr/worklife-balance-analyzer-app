
import React from "react";
import { WorkLifeData } from "@/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FinalFeedbackFormProps {
  data: WorkLifeData;
  onChange: (updatedData: Partial<WorkLifeData>) => void;
  className?: string;
}

const FinalFeedbackForm: React.FC<FinalFeedbackFormProps> = ({ data, onChange, className }) => {
  return (
    <div className={cn("space-y-6 animate-fade-in", className)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Final Thoughts</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please share any additional insights about your work-life balance.
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="changeWishWorkLifeBalance">
          What's one thing you'd change about your work-life balance?
        </Label>
        <Textarea
          id="changeWishWorkLifeBalance"
          value={data.changeWishWorkLifeBalance}
          onChange={(e) => onChange({ changeWishWorkLifeBalance: e.target.value })}
          placeholder="I wish I could..."
          className="min-h-24"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="biggestStruggle">
          What's your biggest struggle right now related to balancing work and personal life?
        </Label>
        <Textarea
          id="biggestStruggle"
          value={data.biggestStruggle}
          onChange={(e) => onChange({ biggestStruggle: e.target.value })}
          placeholder="My biggest challenge is..."
          className="min-h-24"
        />
      </div>
    </div>
  );
};

export default FinalFeedbackForm;
