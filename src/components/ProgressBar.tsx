
import React from "react";
import { FormStep } from "@/types";

const steps: { id: FormStep; label: string }[] = [
  { id: "demographics", label: "Profile" },
  { id: "workDetails", label: "Work Details" },
  { id: "workSatisfaction", label: "Satisfaction" },
  { id: "workplaceCulture", label: "Culture" },
  { id: "personalWellbeing", label: "Wellbeing" },
  { id: "personalGoals", label: "Goals" },
  { id: "priorities", label: "Priorities" },
  { id: "finalFeedback", label: "Feedback" },
];

interface ProgressBarProps {
  currentStep: FormStep;
  completedSteps: FormStep[];
}

const ProgressBar = ({ currentStep, completedSteps }: ProgressBarProps) => {
  return (
    <div className="w-full mb-8 overflow-x-auto">
      <div className="flex items-center min-w-max">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id);
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? "step-active"
                    : isCompleted
                    ? "step-completed"
                    : "step-inactive"
                }`}
              >
                {isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              
              {/* Step Label */}
              <span
                className={`mx-2 text-sm hidden sm:block ${
                  isActive
                    ? "text-frontlett font-medium"
                    : isCompleted
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {step.label}
              </span>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-grow h-0.5 mx-2 ${
                    completedSteps.includes(step.id)
                      ? "bg-frontlett"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
