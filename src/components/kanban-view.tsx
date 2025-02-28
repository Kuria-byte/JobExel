"use client"

import { JobCard } from "./job-card"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

interface KanbanViewProps {
  jobs: Array<{
    company: string
    title: string
    location: string
    salary: string
    status: "Applied" | "Not Started" | "Interviewing" | "Offered" | "Rejected"
    daysAgo: number
  }>
}

export function KanbanView({ jobs }: KanbanViewProps) {
  const columns = [
    { title: "Not Started", status: "Not Started" },
    { title: "Applied", status: "Applied" },
    { title: "Interviewing", status: "Interviewing" },
    { title: "Offered", status: "Offered" },
    { title: "Rejected", status: "Rejected" },
  ] as const

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => (
        <Card key={column.status} className="w-80 flex-shrink-0">
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-2">
              {jobs
                .filter((job) => job.status === column.status)
                .map((job) => (
                  <JobCard key= {`${job.company}- ${job.company}-${job.title}`}  id={`${job.company}-${job.title}`}  {...job} variant="compact" />
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

