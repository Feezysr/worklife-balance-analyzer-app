
import React, { useState } from "react";
import { JobListing, WorkLifeData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, CreditCard, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { getJobListings } from "@/lib/utils";

interface JobListingsProps {
  workLifeData: WorkLifeData;
  className?: string;
}

const JobListings: React.FC<JobListingsProps> = ({ workLifeData, className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "remote" | "hybrid" | "onsite">("all");
  
  const jobs = getJobListings(workLifeData);
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === "all" || job.workSetup === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className={`space-y-8 animate-fade-in ${className}`}>
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Recommended Job Listings</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Based on your work-life balance preferences, we've found these jobs that might be a good match for you.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <Input
            placeholder="Search jobs, companies, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={(value: any) => setFilter(value)}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="remote">Remote</TabsTrigger>
            <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
            <TabsTrigger value="onsite">On-site</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No matching jobs found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {filteredJobs.map(job => (
            <Card key={job.id} className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 font-medium">{job.company}</p>
                  </div>
                  <Badge variant={job.workSetup === "remote" ? "default" : "outline"} className="ml-2">
                    {job.workSetup.charAt(0).toUpperCase() + job.workSetup.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CreditCard className="mr-2 h-4 w-4 text-gray-400" />
                    {job.salary}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {job.description}
                </p>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Work-Life Balance Factors:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{job.flexibleHours ? "Flexible hours" : "Fixed hours"}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{job.vacationDays} vacation days</span>
                    </div>
                    <div className="flex items-center">
                      {job.weekendWork ? (
                        <XCircle className="mr-2 h-4 w-4 text-red-400" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                      )}
                      <span>{job.weekendWork ? "Weekend work" : "No weekend work"}</span>
                    </div>
                    <div className="flex items-center">
                      {job.overtimeExpected ? (
                        <XCircle className="mr-2 h-4 w-4 text-red-400" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                      )}
                      <span>{job.overtimeExpected ? "Overtime expected" : "No overtime"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skills.slice(0, 4).map((skill, i) => (
                    <Badge key={i} variant="secondary" className="font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="bg-gray-50 dark:bg-gray-800 pt-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4 text-frontlett" />
                  <span className="text-sm text-gray-500">Posted: {job.postedDate}</span>
                </div>
                <Button asChild>
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    Apply Now
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListings;
