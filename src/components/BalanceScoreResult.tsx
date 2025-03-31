
import React from "react";
import { BalanceScore } from "@/types";
import { getScoreColor } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit, Calendar, Clock, Dumbbell, HeartPulse, Laptop } from "lucide-react";

interface BalanceScoreResultProps {
  score: BalanceScore;
  className?: string;
}

const BalanceScoreResult: React.FC<BalanceScoreResultProps> = ({ score, className }) => {
  const scoreColor = getScoreColor(score.overall);
  const categoryLabel = {
    poor: "Poor Balance",
    average: "Average Balance",
    good: "Good Balance",
  }[score.category];

  // Calculate the percentage for the circle
  const scorePercent = `${score.overall * 10}%`;

  return (
    <div className={`space-y-8 animate-fade-in ${className}`}>
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Your Work-Life Balance Score</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Based on your responses, we've calculated your overall work-life balance score.
          This score reflects how well you're balancing your professional and personal life.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center my-8">
        {/* Score Circle */}
        <div 
          className="balance-score-ring mb-6"
          style={{
            "--score-color": scoreColor,
            "--score-percent": scorePercent
          } as React.CSSProperties}
        >
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-5xl font-bold">{score.overall}</span>
            <span className="text-sm opacity-70">out of 10</span>
          </div>
        </div>
        
        <h3 
          className="text-2xl font-semibold mb-2"
          style={{ color: scoreColor }}
        >
          {categoryLabel}
        </h3>
        
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-md">
          {score.category === "poor" && "You're experiencing significant imbalance between work and personal life. Urgent changes are recommended."}
          {score.category === "average" && "You have a moderate balance between work and personal life, but there's room for improvement."}
          {score.category === "good" && "You're maintaining a healthy balance between your work and personal life. Keep up the good work!"}
        </p>
      </div>

      <h3 className="text-xl font-semibold text-center mt-10">Balance Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2 text-frontlett" />
              Work Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{score.breakdown.workHours}</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 rounded-full bg-frontlett"
                  style={{ width: `${score.breakdown.workHours * 10}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BrainCircuit className="w-4 h-4 mr-2 text-frontlett" />
              Stress Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{score.breakdown.stressLevel}</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 rounded-full bg-frontlett"
                  style={{ width: `${score.breakdown.stressLevel * 10}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-frontlett" />
              Personal Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{score.breakdown.personalTime}</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 rounded-full bg-frontlett"
                  style={{ width: `${score.breakdown.personalTime * 10}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Laptop className="w-4 h-4 mr-2 text-frontlett" />
              Boundaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{score.breakdown.boundaries}</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 rounded-full bg-frontlett"
                  style={{ width: `${score.breakdown.boundaries * 10}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <HeartPulse className="w-4 h-4 mr-2 text-frontlett" />
              Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{score.breakdown.satisfaction}</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 rounded-full bg-frontlett"
                  style={{ width: `${score.breakdown.satisfaction * 10}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Dumbbell className="w-4 h-4 mr-2 text-frontlett" />
              Wellbeing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{score.breakdown.wellbeing}</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 rounded-full bg-frontlett"
                  style={{ width: `${score.breakdown.wellbeing * 10}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
        <Card>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              {score.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-frontlett/10 text-frontlett flex items-center justify-center mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BalanceScoreResult;
