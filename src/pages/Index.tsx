
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormStep, WorkLifeData, BalanceScore } from "@/types";
import { calculateWorkLifeBalanceScore } from "@/lib/utils";
import FrontlettLogo from "@/components/FrontlettLogo";
import ProgressBar from "@/components/ProgressBar";
import DemographicsForm from "@/components/DemographicsForm";
import WorkDetailsForm from "@/components/WorkDetailsForm";
import WorkSatisfactionForm from "@/components/WorkSatisfactionForm";
import WorkplaceCultureForm from "@/components/WorkplaceCultureForm";
import PersonalWellbeingForm from "@/components/PersonalWellbeingForm";
import PersonalGoalsForm from "@/components/PersonalGoalsForm";
import PrioritiesForm from "@/components/PrioritiesForm";
import FinalFeedbackForm from "@/components/FinalFeedbackForm";
import BalanceScoreResult from "@/components/BalanceScoreResult";
import JobListings from "@/components/JobListings";
import ThemeToggle from "@/components/ThemeToggle";

const initialFormData: WorkLifeData = {
  // Basic Demographics
  name: "",
  age: null,
  gender: "",
  jobRole: "",
  industry: "",
  workSetup: "",
  maritalStatus: "",
  parentalStatus: "",
  livingSituation: "",
  
  // Work Hours & Setup
  weeklyWorkHours: null,
  workStartTime: "",
  workEndTime: "",
  overtimeFrequency: "",
  weekendWorkFrequency: "",
  commuteTime: null,
  
  // Work Satisfaction & Stress
  stressLevel: null,
  jobSatisfaction: null,
  workloadPerception: "",
  scheduleFlexibility: "",
  breakFrequency: "",
  
  // Workplace Culture & Boundaries
  canDisconnect: "",
  afterHoursMessages: "",
  vacationDaysTaken: null,
  burnoutLevel: "",
  
  // Personal Well-being
  sleepHours: null,
  exerciseFrequency: "",
  dietQuality: "",
  stressAnxiety: null,
  happiness: null,
  familyTime: null,
  missingPersonalEvents: "",
  hobbiesFrequency: "",
  selfCareTime: null,
  
  // Personal Goals & Fulfillment
  careerGrowthSatisfaction: null,
  learningSatisfaction: null,
  fitnessProgressSatisfaction: null,
  workInterfereWithPersonalLife: "",
  lifeControlFeeling: null,
  
  // Custom Priorities
  priorities: {
    careerGrowth: null,
    familyTime: null,
    health: null,
    socialLife: null,
    financialStability: null,
    personalDevelopment: null,
  },
  
  // Open-Ended Feedback
  changeWishWorkLifeBalance: "",
  biggestStruggle: "",
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>("demographics");
  const [formData, setFormData] = useState<WorkLifeData>(initialFormData);
  const [completedSteps, setCompletedSteps] = useState<FormStep[]>([]);
  const [balanceScore, setBalanceScore] = useState<BalanceScore | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<"score" | "jobs">("score");

  const updateFormData = (updates: Partial<WorkLifeData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const steps: FormStep[] = [
    "demographics",
    "workDetails",
    "workSatisfaction",
    "workplaceCulture",
    "personalWellbeing",
    "personalGoals",
    "priorities",
    "finalFeedback",
  ];

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      // Move to next step
      setCurrentStep(steps[currentIndex + 1]);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // This is the last step, submit form
      handleSubmit();
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    // Mark all steps as completed
    setCompletedSteps(steps);
    setIsSubmitting(true);
    
    // Calculate balance score
    const score = calculateWorkLifeBalanceScore(formData);
    setBalanceScore(score);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowResults(true);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCompletedSteps([]);
    setCurrentStep("demographics");
    setBalanceScore(null);
    setShowResults(false);
    setActiveTab("score");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderCurrentStepForm = () => {
    switch (currentStep) {
      case "demographics":
        return <DemographicsForm data={formData} onChange={updateFormData} />;
      case "workDetails":
        return <WorkDetailsForm data={formData} onChange={updateFormData} />;
      case "workSatisfaction":
        return <WorkSatisfactionForm data={formData} onChange={updateFormData} />;
      case "workplaceCulture":
        return <WorkplaceCultureForm data={formData} onChange={updateFormData} />;
      case "personalWellbeing":
        return <PersonalWellbeingForm data={formData} onChange={updateFormData} />;
      case "personalGoals":
        return <PersonalGoalsForm data={formData} onChange={updateFormData} />;
      case "priorities":
        return <PrioritiesForm data={formData} onChange={updateFormData} />;
      case "finalFeedback":
        return <FinalFeedbackForm data={formData} onChange={updateFormData} />;
      default:
        return null;
    }
  };

  const isFirstStep = currentStep === steps[0];
  const isLastStep = currentStep === steps[steps.length - 1];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="w-full py-4 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm fixed top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <FrontlettLogo />
          <ThemeToggle />
        </div>
      </header>

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <>
              <ProgressBar currentStep={currentStep} completedSteps={completedSteps} />
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8">
                {renderCurrentStepForm()}
                
                <div className="flex justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={goToPreviousStep}
                    disabled={isFirstStep}
                  >
                    Previous
                  </Button>
                  
                  <Button
                    onClick={goToNextStep}
                    disabled={isSubmitting}
                  >
                    {isLastStep ? (
                      isSubmitting ? "Calculating..." : "Submit"
                    ) : (
                      "Next"
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 relative overflow-hidden">
                {/* Background animated gradient */}
                <div className="absolute top-0 left-0 right-0 h-2 animated-gradient-bg"></div>
                
                <div className="tabs border-b border-gray-200 dark:border-gray-700 mb-6 flex">
                  <button 
                    className={`py-2 px-4 font-medium text-sm transition-colors ${
                      activeTab === "score" 
                        ? "text-frontlett border-b-2 border-frontlett" 
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab("score")}
                  >
                    Balance Score
                  </button>
                  <button 
                    className={`py-2 px-4 font-medium text-sm transition-colors ${
                      activeTab === "jobs" 
                        ? "text-frontlett border-b-2 border-frontlett" 
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab("jobs")}
                  >
                    Job Listings
                  </button>
                </div>
                
                {activeTab === "score" && balanceScore && (
                  <BalanceScoreResult score={balanceScore} />
                )}
                
                {activeTab === "jobs" && (
                  <JobListings workLifeData={formData} />
                )}
                
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                  <Button variant="outline" onClick={resetForm}>
                    Start a New Assessment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 px-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="max-w-7xl mx-auto">
          <p>© 2023 Frontlett Inc. All rights reserved.</p>
          <p className="mt-2">
            The Work-Life Balance Analyzer helps job seekers understand their current balance
            and find jobs that align with their preferences.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
