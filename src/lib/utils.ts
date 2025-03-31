
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BalanceScore, JobListing, ScoreCategory, WorkLifeData } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateWorkLifeBalanceScore(data: WorkLifeData): BalanceScore {
  // Initialize score components
  let workHoursScore = 0;
  let stressLevelScore = 0;
  let personalTimeScore = 0;
  let boundariesScore = 0;
  let satisfactionScore = 0;
  let wellbeingScore = 0;
  
  // Work Hours Calculation (lower is better, with ideal around 40)
  if (data.weeklyWorkHours !== null) {
    if (data.weeklyWorkHours <= 35) workHoursScore = 10;
    else if (data.weeklyWorkHours <= 40) workHoursScore = 8;
    else if (data.weeklyWorkHours <= 45) workHoursScore = 6;
    else if (data.weeklyWorkHours <= 50) workHoursScore = 4;
    else if (data.weeklyWorkHours <= 60) workHoursScore = 2;
    else workHoursScore = 0;
  }
  
  // Commute adjustment
  if (data.commuteTime !== null) {
    if (data.commuteTime > 60) workHoursScore -= 2;
    else if (data.commuteTime > 30) workHoursScore -= 1;
  }
  
  // Stress Level (lower is better)
  if (data.stressLevel !== null) {
    stressLevelScore = 10 - data.stressLevel;
  }
  
  // Job satisfaction (higher is better)
  if (data.jobSatisfaction !== null) {
    satisfactionScore = data.jobSatisfaction;
  }
  
  // Personal Time
  personalTimeScore = 0;
  
  // Sleep hours
  if (data.sleepHours !== null) {
    if (data.sleepHours >= 7) personalTimeScore += 2;
    else if (data.sleepHours >= 6) personalTimeScore += 1;
  }
  
  // Exercise frequency
  switch (data.exerciseFrequency) {
    case 'daily': personalTimeScore += 3; break;
    case 'often': personalTimeScore += 2; break;
    case 'sometimes': personalTimeScore += 1; break;
    default: break;
  }
  
  // Hobbies frequency
  switch (data.hobbiesFrequency) {
    case 'daily': personalTimeScore += 3; break;
    case 'often': personalTimeScore += 2; break;
    case 'sometimes': personalTimeScore += 1; break;
    default: break;
  }
  
  // Self care time
  if (data.selfCareTime !== null && data.selfCareTime > 3) {
    personalTimeScore += 2;
  }
  
  // Normalize to 0-10
  personalTimeScore = Math.min(10, personalTimeScore);
  
  // Boundaries Score
  boundariesScore = 0;
  
  // Can disconnect
  if (data.canDisconnect === 'yes') boundariesScore += 3;
  
  // After hours messages
  switch (data.afterHoursMessages) {
    case 'never': boundariesScore += 3; break;
    case 'sometimes': boundariesScore += 1; break;
    default: break;
  }
  
  // Vacation days
  if (data.vacationDaysTaken !== null) {
    if (data.vacationDaysTaken >= 15) boundariesScore += 4;
    else if (data.vacationDaysTaken >= 10) boundariesScore += 3;
    else if (data.vacationDaysTaken >= 5) boundariesScore += 2;
    else if (data.vacationDaysTaken > 0) boundariesScore += 1;
  }
  
  // Normalize to 0-10
  boundariesScore = Math.min(10, boundariesScore);
  
  // Wellbeing Score
  wellbeingScore = 0;
  
  // Diet quality
  switch (data.dietQuality) {
    case 'excellent': wellbeingScore += 3; break;
    case 'average': wellbeingScore += 2; break;
    case 'poor': wellbeingScore += 0; break;
    default: break;
  }
  
  // Happiness
  if (data.happiness !== null) {
    wellbeingScore += data.happiness / 2;
  }
  
  // Stress/anxiety (lower is better)
  if (data.stressAnxiety !== null) {
    wellbeingScore += (10 - data.stressAnxiety) / 2;
  }
  
  // Normalize to 0-10
  wellbeingScore = Math.min(10, Math.max(0, wellbeingScore));
  
  // Calculate overall score (weighted average)
  const overall = (
    workHoursScore * 0.2 +
    stressLevelScore * 0.2 +
    personalTimeScore * 0.15 +
    boundariesScore * 0.15 +
    satisfactionScore * 0.15 +
    wellbeingScore * 0.15
  );
  
  // Determine category
  let category: ScoreCategory = 'average';
  if (overall <= 3) category = 'poor';
  else if (overall >= 7) category = 'good';
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (workHoursScore < 5) {
    recommendations.push("Consider negotiating for reduced work hours or more efficient work practices.");
  }
  
  if (stressLevelScore < 5) {
    recommendations.push("Explore stress management techniques such as meditation, regular breaks, or talking to a professional.");
  }
  
  if (personalTimeScore < 5) {
    recommendations.push("Prioritize personal activities by scheduling dedicated time for hobbies, exercise, and self-care.");
  }
  
  if (boundariesScore < 5) {
    recommendations.push("Establish clearer work-life boundaries by setting designated work hours and communication expectations.");
  }
  
  if (satisfactionScore < 5) {
    recommendations.push("Reflect on your career goals and discuss growth opportunities with your manager or consider exploring new roles.");
  }
  
  if (wellbeingScore < 5) {
    recommendations.push("Focus on your physical and mental health through regular exercise, better nutrition, and sufficient sleep.");
  }
  
  // If score is good, add sustaining recommendations
  if (category === 'good') {
    recommendations.push("You're maintaining a good work-life balance! Continue your current practices and consider mentoring others.");
  }
  
  // Ensure we have at least 3 recommendations
  if (recommendations.length < 3) {
    recommendations.push("Set regular check-ins with yourself to assess your work-life balance.");
    recommendations.push("Consider discussing flexible work arrangements with your employer.");
    recommendations.push("Connect with others who have successfully managed work-life balance in your industry.");
  }
  
  return {
    overall: parseFloat(overall.toFixed(1)),
    category,
    breakdown: {
      workHours: workHoursScore,
      stressLevel: stressLevelScore,
      personalTime: personalTimeScore,
      boundaries: boundariesScore,
      satisfaction: satisfactionScore,
      wellbeing: wellbeingScore
    },
    recommendations: recommendations.slice(0, 5) // Limit to top 5 recommendations
  };
}

export function getJobListings(workLifeData: WorkLifeData): JobListing[] {
  // This would typically be an API call, but for demo purposes we'll create mock data
  const mockJobs: JobListing[] = [
    {
      id: "1",
      title: "Remote Software Engineer",
      company: "TechFlow Solutions",
      location: "Remote",
      workSetup: "remote",
      salary: "$120,000 - $150,000",
      description: "Join our distributed team of engineers building the next generation of cloud infrastructure tools. Flexible hours and focus on results, not hours worked.",
      flexibleHours: true,
      weekendWork: false,
      overtimeExpected: false,
      vacationDays: 25,
      skills: ["JavaScript", "React", "Node.js", "AWS"],
      postedDate: "2023-11-15",
      balanceScore: 8.5,
      link: "https://frontlett.com/jobs/remote-software-engineer"
    },
    {
      id: "2",
      title: "Product Manager",
      company: "Harmony Tech",
      location: "San Francisco, CA (Hybrid)",
      workSetup: "hybrid",
      salary: "$130,000 - $160,000",
      description: "Lead product development for our consumer app. 3 days in office, 2 days remote. Collaborative environment with emphasis on work-life balance.",
      flexibleHours: true,
      weekendWork: false,
      overtimeExpected: true,
      vacationDays: 20,
      skills: ["Product Strategy", "User Research", "Agile", "Roadmapping"],
      postedDate: "2023-11-20",
      balanceScore: 7.2,
      link: "https://frontlett.com/jobs/product-manager"
    },
    {
      id: "3",
      title: "Marketing Director",
      company: "GrowthLabs",
      location: "New York, NY",
      workSetup: "onsite",
      salary: "$140,000 - $180,000",
      description: "Direct our marketing efforts across digital and traditional channels. Fast-paced environment with results-oriented culture.",
      flexibleHours: false,
      weekendWork: true,
      overtimeExpected: true,
      vacationDays: 15,
      skills: ["Digital Marketing", "Brand Strategy", "Team Leadership", "Budget Management"],
      postedDate: "2023-11-10",
      balanceScore: 5.8,
      link: "https://frontlett.com/jobs/marketing-director"
    },
    {
      id: "4",
      title: "UX Designer",
      company: "DesignFirst Co",
      location: "Remote",
      workSetup: "remote",
      salary: "$90,000 - $120,000",
      description: "Create beautiful, intuitive interfaces for our enterprise clients. Fully remote position with focus on quality output.",
      flexibleHours: true,
      weekendWork: false,
      overtimeExpected: false,
      vacationDays: 22,
      skills: ["UI Design", "User Research", "Figma", "Design Systems"],
      postedDate: "2023-11-25",
      balanceScore: 9.0,
      link: "https://frontlett.com/jobs/ux-designer"
    },
    {
      id: "5",
      title: "Financial Analyst",
      company: "Precision Capital",
      location: "Chicago, IL",
      workSetup: "hybrid",
      salary: "$85,000 - $110,000",
      description: "Analyze financial data and prepare reports for executive team. Hybrid schedule with occasional quarter-end overtime.",
      flexibleHours: false,
      weekendWork: true,
      overtimeExpected: true,
      vacationDays: 18,
      skills: ["Financial Modeling", "Excel", "Data Analysis", "Reporting"],
      postedDate: "2023-11-18",
      balanceScore: 6.5,
      link: "https://frontlett.com/jobs/financial-analyst"
    },
    {
      id: "6",
      title: "Customer Success Manager",
      company: "SupportHero",
      location: "Remote",
      workSetup: "remote",
      salary: "$75,000 - $95,000",
      description: "Ensure our customers get maximum value from our platform. Work with a globally distributed team with flexible hours.",
      flexibleHours: true,
      weekendWork: false,
      overtimeExpected: false,
      vacationDays: 20,
      skills: ["Customer Relations", "SaaS", "Problem Solving", "Communication"],
      postedDate: "2023-11-22",
      balanceScore: 8.2,
      link: "https://frontlett.com/jobs/customer-success-manager"
    }
  ];
  
  // Filter jobs based on preferences
  const preferredSetup = workLifeData.workSetup;
  const overtimeSensitive = workLifeData.overtimeFrequency === 'never' || workLifeData.overtimeFrequency === 'rarely';
  const weekendSensitive = workLifeData.weekendWorkFrequency === 'never' || workLifeData.weekendWorkFrequency === 'rarely';
  const flexibilityImportant = workLifeData.scheduleFlexibility === 'fully-flexible' || workLifeData.scheduleFlexibility === 'some-flexibility';
  
  return mockJobs
    .filter(job => {
      // Filter by work setup preference if specified
      if (preferredSetup && preferredSetup !== '' && preferredSetup !== undefined) {
        if (job.workSetup !== preferredSetup) return false;
      }
      
      // Filter by overtime sensitivity
      if (overtimeSensitive && job.overtimeExpected) return false;
      
      // Filter by weekend sensitivity
      if (weekendSensitive && job.weekendWork) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Sort by balance score descending
      return b.balanceScore - a.balanceScore;
    });
}

export function getScoreColor(score: number): string {
  if (score <= 3) return "#EF4444"; // Red for poor
  if (score <= 6) return "#F97316"; // Orange for average
  return "#22C55E"; // Green for good
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
