"use client"

import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { StatsSection } from "@/components/stats-section"
import { JobFilters } from "@/components/job-filters"
import { JobCard } from "@/components/job-card"
import { ViewSwitcher } from "@/components/view-switcher"
import { KanbanView } from "@/components/kanban-view"
import { AddJobDialog } from "@/components/add-job-dialog"
import { Greeting } from "@/components/greeting"
import { SuccessFeedback } from "@/components/success-feedback"
import { CVGenerationModal } from "@/components/cv-builder/cv-generation-modal"
import { useRouter } from "next/navigation"
import { CVData as ImportedCVData } from "@/types"
import { NavBar } from '@/components/nav-bar'


// Define type for job status
export type JobStatus = "Not Started" | "Applied" | "Interviewing" | "Offered" | "Rejected";

// Define job interface
export interface Job {
  id: string;
  company: string;
  title: string;
  location: string;
  salary: string;
  status: JobStatus;
  daysAgo: number;
  jobUrl?: string; // Add jobUrl as an optional property to match AddJobDialog
}

// Sample job data
const initialJobs: Job[] = [
  {
    id: "1",
    company: "Co-op Bank",
    title: "Front-End Developer",
    location: "Nairobi",
    salary: "150000-210000",
    status: "Applied",
    daysAgo: 4,
  },
  {
    id: "2",
    company: "Microsoft",
    title: "Senior React Developer",
    location: "Remote",
    salary: "180000-250000",
    status: "Interviewing",
    daysAgo: 2,
  },
  {
    id: "3",
    company: "Google",
    title: "Full Stack Engineer",
    location: "New York",
    salary: "200000-280000",
    status: "Not Started",
    daysAgo: 1,
  },
  {
    id: "4",
    company: "Meta",
    title: "Software Engineer",
    location: "London",
    salary: "160000-230000",
    status: "Applied",
    daysAgo: 3,
  },
  {
    id: "5",
    company: "Apple",
    title: "UI Engineer",
    location: "California",
    salary: "190000-260000",
    status: "Offered",
    daysAgo: 5,
  },
  {
    id: "6",
    company: "Amazon",
    title: "Frontend Engineer",
    location: "Seattle",
    salary: "170000-240000",
    status: "Rejected",
    daysAgo: 6,
  },
];


// Define interface for success notification configuration
interface SuccessConfig {
  title: string;
  description: string;
  tip?: {
    text: string;
    action: string;
    onClick: () => void;
  };
}

// Create a new interface for jobs coming from AddJobDialog
interface AddJobFormData {
  company: string;
  title: string;
  location: string;
  salary: string;
  status: string;
  jobUrl?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  
  // Move window-dependent initializations to useEffect
  useEffect(() => {
    // Any window-dependent code goes here
    // For example, localStorage access or window measurements
  }, [])

  // For localStorage-dependent initial states, use lazy initialization
  const [jobList, setJobList] = useState<Job[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jobList')
      return saved ? JSON.parse(saved) : initialJobs
    }
    return initialJobs
  })
  
  // View state
  const [currentView, setCurrentView] = useState<"grid" | "list" | "kanban">("grid");
  const [selectedStatus, setSelectedStatus] = useState("All");
  
  // Dialog state
  const [isAddJobDialogOpen, setIsAddJobDialogOpen] = useState(false);
  const [isCVGenerationOpen, setIsCVGenerationOpen] = useState(false);
  
  // Success notification state
  const [showSuccess, setShowSuccess] = useState(false);
  const [successConfig, setSuccessConfig] = useState<SuccessConfig>({
    title: "",
    description: "",
  });
  
  // CV data state - using it in the CVGenerationModal component
  const [cvData] = useState<ImportedCVData>({
    personal: {
      name: "Ian Kuria",
      email: "mwitumi21@gmail.com",
      phone: "+1 (555) 123-4567",
      location: "Nairobi, Kenya",
    },
    experience: [
      {
        title: "Frontend Developer",
        company: "Tech Solutions Inc.",
        duration: "2020 - Present",
        description: "Developed responsive web applications using React and TypeScript.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Nairobi",
        year: "2016 - 2020",
      },
    ],
    skills: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Node.js"],
  });

  // Filter jobs based on selected status
  const filteredJobs = selectedStatus === "All" 
    ? jobList 
    : jobList.filter(job => job.status === selectedStatus);

  // Handle adding a new job - Modified to accept AddJobFormData
  const handleAddJob = (formData: AddJobFormData) => {
    const newId = `job-${Date.now()}`;
    const jobWithId: Job = {
      ...formData,
      id: newId,
      daysAgo: 0,
      status: formData.status as JobStatus, // Cast the string to JobStatus enum
    };

    setJobList(prevJobs => [jobWithId, ...prevJobs]);
    showSuccessNotification({
      title: "Job Added",
      description: "Your job application has been added successfully",
      tip: {
        text: "Keep track of your application by updating its status as you progress.",
        action: "View Job Details",
        onClick: () => {
          // Logic to view job details
        },
      },
    });
  };

  // Handle deleting a job
  const handleDeleteJob = (jobId: string) => {
    setJobList(prevJobs => prevJobs.filter(job => job.id !== jobId));
  };

  // Handle changing a job's status
  const handleStatusChange = (jobId: string, newStatus: string) => {
    setJobList(prevJobs => 
      prevJobs.map(job => (job.id === jobId ? { ...job, status: newStatus as JobStatus } : job))
    );

    // Determine tip content based on new status
    const getTipForStatus = (status: string) => {
      switch(status) {
        case "Applied":
          return "Keep track of your application by adding notes and important dates.";
        case "Interviewing":
          return "Prepare for your interview with our AI interview coach.";
        default:
          return "Update your CV to improve your chances of success.";
      }
    };

    showSuccessNotification({
      title: "Status Updated",
      description: `Job application status updated to ${newStatus}`,
      tip: {
        text: getTipForStatus(newStatus),
        action: newStatus === "Interviewing" ? "Start Interview Prep" : "Update CV",
        onClick: () => setIsCVGenerationOpen(true),
      },
    });
  };

  // Helper to show success notification
  const showSuccessNotification = (config: SuccessConfig) => {
    setSuccessConfig(config);
    setShowSuccess(true);
  };

  // Navigate to browse jobs page
  const handleBrowseJobs = () => {
    router.push("/browse-jobs");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 space-y-6 p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 w-full max-w-full overflow-hidden">
          <div className="space-y-2">
            <Greeting name="Ian Kuria" />
            <p className="text-muted-foreground text-sm md:text-base">
              Track and manage your job applications
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full">
            <Button 
              className="flex-1 sm:flex-none gap-2 min-w-[140px]" 
              onClick={() => setIsAddJobDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Job
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none gap-2 min-w-[140px]"
              onClick={handleBrowseJobs}
            >
              <Search className="h-4 w-4" />
              Browse Jobs
            </Button>
          </div>
        
          <AddJobDialog 
            onAddJob={handleAddJob} 
            open={isAddJobDialogOpen} 
            setOpen={setIsAddJobDialogOpen} 
          />
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Jobs Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <JobFilters 
              selectedStatus={selectedStatus} 
              onStatusChange={setSelectedStatus} 
            />
            <ViewSwitcher 
              currentView={currentView} 
              onViewChange={setCurrentView} 
            />
          </div>

          {currentView === "kanban" ? (
            <KanbanView jobs={filteredJobs} />
          ) : (
            <div className={currentView === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-2"}>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    {...job}
                    variant={currentView === "grid" ? "default" : "list"}
                    onDelete={handleDeleteJob}
                    onStatusChange={handleStatusChange}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No jobs found matching your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setSelectedStatus("All")}>
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Feedback and Modals */}
      <SuccessFeedback 
        show={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        title={successConfig.title} 
        description={successConfig.description} 
        tip={successConfig.tip} 
      />

      <CVGenerationModal 
        open={isCVGenerationOpen} 
        onOpenChange={setIsCVGenerationOpen} 
        data={cvData} 
      />
    </div>
  );
}