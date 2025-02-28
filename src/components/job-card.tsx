"use client"

import { useState } from "react"
import { Building2, MapPin, FileText, PenLine, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { JobDetailsDialog } from "@/components/job-details-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface JobCardProps {
  id: string
  company: string
  title: string
  location: string
  salary: string
  status: "Applied" | "Not Started" | "Interviewing" | "Offered" | "Rejected"
  daysAgo: number
  variant?: "default" | "compact" | "list"
  onDelete?: (id: string) => void
  onStatusChange?: (id: string, status: string) => void
}

export function JobCard({
  id,
  company,
  title,
  location,
  salary,
  status,
  daysAgo,
  variant = "default",
  onDelete,
  onStatusChange,
}: JobCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const statusColors = {
    Applied: "bg-amber-600/20 text-amber-600",
    "Not Started": "bg-slate-600/20 text-slate-400",
    Interviewing: "bg-blue-600/20 text-blue-400",
    Offered: "bg-green-600/20 text-green-400",
    Rejected: "bg-red-600/20 text-red-400",
  }

  const statusOptions = [
    { value: "Not Started", label: "Not Started" },
    { value: "Applied", label: "Applied" },
    { value: "Interviewing", label: "Interviewing" },
    { value: "Offered", label: "Offered" },
    { value: "Rejected", label: "Rejected" },
  ]

  if (variant === "list") {
    return (
      <>
        <Card className="relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500" />
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{company}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                <MapPin className="mr-1 inline-block h-4 w-4" />
                {location}
              </div>
              <Badge variant="outline" className={statusColors[status]}>
                {status}
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => setShowDetails(true)}>
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <JobDetailsDialog
          open={showDetails}
          onOpenChange={setShowDetails}
          job={{ company, title, location, salary, status, daysAgo }}
          onDelete={() => onDelete?.(id)}
          onStatusChange={(newStatus) => onStatusChange?.(id, newStatus)}
        />
      </>
    )
  }

  if (variant === "compact") {
    return (
      <>
        <Card className="relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{title}</h3>
              <Badge variant="outline" className={statusColors[status]}>
                {status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{company}</p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => setShowDetails(true)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </CardContent>
        </Card>
        <JobDetailsDialog
          open={showDetails}
          onOpenChange={setShowDetails}
          job={{ company, title, location, salary, status, daysAgo }}
          onDelete={() => onDelete?.(id)}
          onStatusChange={(newStatus) => onStatusChange?.(id, newStatus)}
        />
      </>
    )
  }

  return (
    <>
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{company}</p>
              <p className="text-xs text-muted-foreground">
                Added {daysAgo} {daysAgo === 1 ? "day" : "days"} ago
              </p>
            </div>
          </div>
          <Badge variant="outline" className={statusColors[status]}>
            {status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {location}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">$</span>
                {salary}
              </div>
            </div>
          </div>
          <Select
            value={status}
            onValueChange={(newStatus) => {
              onStatusChange?.(id, newStatus)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="space-y-2">
            <Button variant="secondary" className="w-full gap-2">
              <FileText className="h-4 w-4" />
              Generate Cover Letter
            </Button>
            <Button variant="secondary" className="w-full gap-2">
              <PenLine className="h-4 w-4" />
              Generate CV
            </Button>
            <Button variant="outline" className="w-full gap-2" onClick={() => setShowDetails(true)}>
              <Eye className="h-4 w-4" />
              View details
            </Button>
          </div>
        </CardContent>
      </Card>
      <JobDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        job={{ company, title, location, salary, status, daysAgo }}
        onDelete={() => onDelete?.(id)}
        onStatusChange={(newStatus) => onStatusChange?.(id, newStatus)}
      />
    </>
  )
}

