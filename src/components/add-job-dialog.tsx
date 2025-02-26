"use client"

import type React from "react"
import { useState } from "react"
import { LinkIcon, MapPin, Building2, Briefcase, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddJobDialogProps {
  onAddJob: (job: {
    company: string
    title: string
    location: string
    salary: string
    status: string
    jobUrl?: string
  }) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export function AddJobDialog({ onAddJob, open, setOpen }: AddJobDialogProps) {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    salary: "",
    status: "Not Started",
    jobUrl: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddJob(formData)
    setOpen(false)
    setFormData({
      company: "",
      title: "",
      location: "",
      salary: "",
      status: "Not Started",
      jobUrl: "",
    })
  
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Job</DialogTitle>
            <DialogDescription>Add a new job application to track. Enter the job details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="company"
                  className="pl-9"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Enter company name"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Job Title</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="title"
                  className="pl-9"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter job title"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  className="pl-9"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="salary">Salary Range</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="salary"
                  className="pl-9"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="e.g. 80000-100000"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Application Status</Label>
              <Select value={formData.status} onValueChange={(value: string) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Offered">Offered</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="jobUrl">Job URL</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="jobUrl"
                  type="url"
                  className="pl-9"
                  value={formData.jobUrl}
                  onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                  placeholder="Enter job posting URL"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

