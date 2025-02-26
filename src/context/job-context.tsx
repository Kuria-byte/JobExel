"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Job = {
  id: string
  company: string
  title: string
  location: string
  salary: string
  status: string
  daysAgo: number
}

interface JobContextType {
  jobs: Job[]
  addJob: (job: Omit<Job, "id" | "daysAgo">) => void
  updateJobStatus: (id: string, status: string) => void
  deleteJob: (id: string) => void
  savedJobIds: string[]
  saveJob: (id: string) => void
}

const JobContext = createContext<JobContextType | undefined>(undefined)

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([
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
  ])

  const [savedJobIds, setSavedJobIds] = useState<string[]>([])

  const addJob = (job: Omit<Job, "id" | "daysAgo">) => {
    const newJob = {
      ...job,
      id: `job-${Date.now()}`,
      daysAgo: 0,
    }
    setJobs([newJob, ...jobs])
  }

  const updateJobStatus = (id: string, status: string) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, status } : job)))
  }

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((job) => job.id !== id))
  }

  const saveJob = (id: string) => {
    if (!savedJobIds.includes(id)) {
      setSavedJobIds([...savedJobIds, id])
    }
  }

  return (
    <JobContext.Provider
      value={{
        jobs,
        addJob,
        updateJobStatus,
        deleteJob,
        savedJobIds,
        saveJob,
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export function useJobs() {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider")
  }
  return context
}

