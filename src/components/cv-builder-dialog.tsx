"use client"

import { useState } from "react"
import {
  FileText,
  ChevronRight,
  ChevronLeft,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Code,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

export function CVBuilderDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const totalSteps = 5

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-4">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-center">Personal Information</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="New York, NY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input id="linkedin" placeholder="https://linkedin.com/in/johndoe" />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-4">
              <Briefcase className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-center">Work Experience</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" placeholder="Senior Frontend Developer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Inc." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="month" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="month" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                />
              </div>
              <Button variant="outline" type="button" className="w-full">
                + Add Another Experience
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-4">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-center">Education</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" placeholder="Bachelor of Science in Computer Science" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <Input id="school" placeholder="University of Technology" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eduStartDate">Start Date</Label>
                  <Input id="eduStartDate" type="month" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eduEndDate">End Date</Label>
                  <Input id="eduEndDate" type="month" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <Input id="gpa" placeholder="3.8/4.0" />
              </div>
              <Button variant="outline" type="button" className="w-full">
                + Add Another Education
              </Button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-4">
              <Code className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-center">Skills</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="technicalSkills">Technical Skills</Label>
                <Textarea
                  id="technicalSkills"
                  placeholder="JavaScript, React, Node.js, TypeScript, CSS, HTML..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">Separate skills with commas</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="softSkills">Soft Skills</Label>
                <Textarea id="softSkills" placeholder="Communication, Leadership, Problem Solving..." rows={3} />
                <p className="text-xs text-muted-foreground">Separate skills with commas</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages">Languages</Label>
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <Input id="languages" placeholder="English, Spanish, French..." />
                </div>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-4">
              <Award className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-center">CV Style & Preferences</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>CV Template Style</Label>
                <RadioGroup defaultValue="modern">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="modern" id="modern" />
                    <Label htmlFor="modern">Modern</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="classic" id="classic" />
                    <Label htmlFor="classic">Classic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="creative" id="creative" />
                    <Label htmlFor="creative">Creative</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <Label htmlFor="minimal">Minimal</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" className="h-8 w-8 rounded-full bg-blue-500 p-0" />
                  <Button type="button" variant="outline" className="h-8 w-8 rounded-full bg-green-500 p-0" />
                  <Button type="button" variant="outline" className="h-8 w-8 rounded-full bg-purple-500 p-0" />
                  <Button type="button" variant="outline" className="h-8 w-8 rounded-full bg-red-500 p-0" />
                  <Button type="button" variant="outline" className="h-8 w-8 rounded-full bg-gray-500 p-0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Any specific requirements or preferences for your CV..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2 text-sm font-medium">
          <FileText className="h-4 w-4" />
          CV Builder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Build Your CV</DialogTitle>
          <DialogDescription>
            Create a professional CV in minutes. Complete each section to generate your personalized CV.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <Progress value={(step / totalSteps) * 100} className="h-2" />
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </p>
          </div>

          {renderStepContent()}
        </div>

        <DialogFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {step < totalSteps ? (
            <Button type="button" onClick={nextStep}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="button">Generate CV</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

