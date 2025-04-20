export type FormStep = 
  | 'demographics'
  | 'workDetails'
  | 'workSatisfaction'
  | 'workplaceCulture'
  | 'personalWellbeing'
  | 'personalGoals'
  | 'priorities'
  | 'finalFeedback';

export type WorkLifeData = {
  // Basic Demographics
  name: string;
  age: number | null;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | '';
  jobRole: string;
  industry: string;
  workSetup: 'remote' | 'hybrid' | 'onsite' | '';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'partnered' | '';
  parentalStatus: 'no-children' | 'children-at-home' | 'grown-children' | '';
  livingSituation: 'alone' | 'with-family' | 'with-roommates' | 'other' | '';
  
  // Work Hours & Setup
  weeklyWorkHours: number | null;
  workStartTime: string;
  workEndTime: string;
  overtimeFrequency: 'never' | 'rarely' | 'sometimes' | 'often' | 'always' | '';
  weekendWorkFrequency: 'never' | 'rarely' | 'sometimes' | 'often' | 'always' | '';
  commuteTime: number | null;
  
  // Work Satisfaction & Stress
  stressLevel: number | null;
  jobSatisfaction: number | null;
  workloadPerception: 'too-little' | 'manageable' | 'too-much' | '';
  scheduleFlexibility: 'rigid' | 'some-flexibility' | 'fully-flexible' | '';
  breakFrequency: 'never' | 'rarely' | 'sometimes' | 'often' | 'always' | '';
  
  // Workplace Culture & Boundaries
  canDisconnect: 'yes' | 'no' | '';
  afterHoursMessages: 'never' | 'sometimes' | 'always' | '';
  vacationDaysTaken: number | null;
  burnoutLevel: 'never' | 'occasionally' | 'often' | 'always' | '';
  
  // Personal Well-being
  sleepHours: number | null;
  exerciseFrequency: 'never' | 'rarely' | 'sometimes' | 'often' | 'daily' | '';
  dietQuality: 'poor' | 'average' | 'excellent' | '';
  stressAnxiety: number | null;
  happiness: number | null;
  familyTime: number | null;
  missingPersonalEvents: 'yes' | 'sometimes' | 'no' | '';
  hobbiesFrequency: 'never' | 'rarely' | 'sometimes' | 'often' | 'daily' | '';
  selfCareTime: number | null;
  
  // Personal Goals & Fulfillment
  careerGrowthSatisfaction: number | null;
  learningSatisfaction: number | null;
  fitnessProgressSatisfaction: number | null;
  workInterfereWithPersonalLife: 'yes' | 'sometimes' | 'no' | '';
  lifeControlFeeling: number | null;
  
  // Custom Priorities (ranked 1-6)
  priorities: {
    careerGrowth: number | null;
    familyTime: number | null;
    health: number | null;
    socialLife: number | null;
    financialStability: number | null;
    personalDevelopment: number | null;
  };
  
  // Open-Ended Feedback
  changeWishWorkLifeBalance: string;
  biggestStruggle: string;
};

export type ScoreCategory = 'poor' | 'average' | 'good';

export type BalanceScore = {
  overall: number;
  category: ScoreCategory;
  breakdown: {
    workHours: number;
    stressLevel: number;
    personalTime: number;
    boundaries: number;
    satisfaction: number;
    wellbeing: number;
  };
  recommendations: string[];
};

export type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  workSetup: 'remote' | 'hybrid' | 'onsite';
  salary: string;
  description: string;
  flexibleHours: boolean;
  weekendWork: boolean;
  overtimeExpected: boolean;
  vacationDays: number;
  skills: string[];
  postedDate: string;
  balanceScore: number;
  link: string;
};

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  tags: string[];
  workLifeBalance: number;
  posted: string;
}

export interface WorkLifeMetrics {
  workHours: number;
  stressLevel: number;
  balanceScore: number;
  productivity: number;
}

export interface AnalyticsData {
  workLifeData: {
    name: string;
    work: number;
    life: number;
  }[];
  stressData: {
    name: string;
    stress: number;
  }[];
  balanceData: {
    name: string;
    value: number;
  }[];
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  jobTitle: string;
  company: string;
  industry: string;
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
}
