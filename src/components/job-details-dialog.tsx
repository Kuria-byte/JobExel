"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Flag,
  FileText,
  MessageSquare,
  ExternalLink,
  Brain,
  Plus,
  Trash2,
  Upload,
} from "lucide-react"

interface JobDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  job: {
    company: string
    title: string
    location: string
    salary: string
    status: string
    daysAgo: number
  }
  onDelete?: () => void
  onStatusChange?: (status: string) => void
}

export function JobDetailsDialog({ open, onOpenChange, job, onDelete, onStatusChange }: JobDetailsDialogProps) {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Be ready to discuss how you optimize user interactions.", completed: true },
    { id: 2, text: "Prepare examples of past projects showcasing your work.", completed: true },
  ])
  const [newTask, setNewTask] = useState("")
  const [notes, setNotes] = useState(
    "Join a high-performing team as a Front-End Developer, focusing on enhancing user experiences for web and mobile applications. Collaborate with UI/UX designers and optimize applications for joyful user interactions.\nRequirements: 3+ yrs in front-end mobile-web dev, Exp in responsive/adaptive web dev, Proficient in Android & iOS dev",
  )

  const [documents, setDocuments] = useState<{ name: string; type: "resume" | "cover-letter" }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverLetterInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "resume" | "cover-letter") => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("File size too large. Please upload a file smaller than 5MB")
      return
    }

    setDocuments([...documents, { name: file.name, type }])
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask("")
    }
  }

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const progressSteps = [
    { label: "Not Started", completed: true },
    { label: "Applied", completed: true },
    { label: "Interviewing", completed: false },
    { label: "Got Offer", completed: false },
    { label: "Accepted", completed: false },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{job.title}</DialogTitle>
            <div className="flex items-center gap-2">
              <Select value={job.status} onValueChange={(value: string) => onStatusChange?.(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue defaultValue={job.status} placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Offered">Offered</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Job Application</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this job application? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onDelete?.()
                        onOpenChange(false)
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-blue-500/20 text-blue-500">
                {job.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {job.company}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {job.salary}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Added {job.daysAgo} days ago
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="relative flex justify-between">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted" />
            {progressSteps.map((step, index) => (
              <div key={step.label} className="relative flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-sm">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Info Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flag className="h-5 w-5 text-primary" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Prepare for technical interview scheduled for next week</p>
                <Button className="mt-4 w-full gap-2" variant="outline">
                  <Brain className="h-4 w-4" />
                  Start AI Interview Prep
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Resume</Label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, "resume")}
                      title="Upload Resume"
                      aria-label="Upload Resume"
                    />
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      Upload Resume
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cover Letter</Label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={coverLetterInputRef}
                      title="Upload Cover Letter"
                      placeholder="Upload Cover Letter"
                      aria-label="Upload Cover Letter"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, "cover-letter")}
                    />
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                      onClick={() => coverLetterInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      Upload Cover Letter
                    </Button>
                  </div>
                </div>

                {documents.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Documents</Label>
                    <div className="space-y-2">
                      {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm">{doc.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setDocuments(documents.filter((_, i) => i !== index))
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Key Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>3+ years of frontend development experience required</li>
                  <li>Strong focus on responsive design</li>
                  <li>Experience with React and modern JavaScript</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-primary" />
                  Job Posting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                <Input placeholder="Add a task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                <Button type="submit" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </form>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
                      <span className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.text}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Research Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Research & Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
                placeholder="Add your research notes here..."
              />
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

