import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description:
      'We are looking for a Senior Software Engineer to join our team. The ideal candidate will have experience with React, TypeScript, and Node.js.',
    tags: ['React', 'TypeScript', 'Node.js'],
    workLifeBalance: 4.5,
    posted: '2 days ago',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovate Inc',
    location: 'Remote',
    type: 'Full-time',
    salary: '$100,000 - $130,000',
    description:
      'Join our product team to help shape the future of our platform. Experience with agile methodologies and user research required.',
    tags: ['Product Management', 'Agile', 'User Research'],
    workLifeBalance: 4.8,
    posted: '1 week ago',
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$80 - $100/hr',
    description:
      'Looking for a talented UX Designer to create beautiful and intuitive user experiences for our clients.',
    tags: ['UX Design', 'Figma', 'User Research'],
    workLifeBalance: 4.2,
    posted: '3 days ago',
  },
];

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLocation = !location || job.location.includes(location);
    const matchesType = !jobType || job.type === jobType;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <p className="text-muted-foreground">
          Find your next opportunity with work-life balance in mind
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            <SelectItem value="San Francisco">San Francisco</SelectItem>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
          </SelectContent>
        </Select>
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>{job.company}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-1 h-4 w-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {job.salary}
                  </div>
                </div>
                <p className="text-sm">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {job.posted}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Balance Score: {job.workLifeBalance}/5
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 