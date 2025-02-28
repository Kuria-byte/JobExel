"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, User, Briefcase, GraduationCap, Code } from "lucide-react"

const steps = [
  { id: "upload", title: "Upload CV" },
  { id: "personal", title: "Personal Info" },
  { id: "experience", title: "Experience" },
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
  { id: "preview", title: "Preview" },
]

interface CVBuilderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CVBuilderDialog({ open, onOpenChange }: CVBuilderDialogProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedTheme, setSelectedTheme] = useState("modern")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
    },
    experience: [],
    education: [],
    skills: {
      technical: "",
      soft: "",
      languages: "",
    },
  })

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Here you would implement CV parsing logic
      // For now, we'll just move to the next step
      setCurrentStep(1)
    }
  }

  const updatePersonalInfo = (field: string, value: string) => {
    setFormData({
      ...formData,
      personal: {
        ...formData.personal,
        [field]: value,
      },
    })
  }

  const updateSkills = (field: string, value: string) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [field]: value,
      },
    })
  }

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case "upload":
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              aria-label="Upload CV"
            />
            <Button
              variant="outline"
              size="lg"
              className="h-32 w-full max-w-md flex-col gap-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8" />
              <div className="space-y-1 text-center">
                <p>Upload your existing CV</p>
                <p className="text-sm text-muted-foreground">PDF, DOC, or DOCX up to 10MB</p>
              </div>
            </Button>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">or</p>
              <Button variant="link" className="mt-2" onClick={() => setCurrentStep(1)}>
                Create from scratch
              </Button>
            </div>
          </div>
        )
      case "personal":
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
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.personal.firstName}
                    onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.personal.lastName}
                    onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.personal.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.personal.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="New York, NY"
                  value={formData.personal.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/johndoe"
                  value={formData.personal.linkedin}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                />
              </div>
            </div>
          </div>
        )
      case "experience":
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
      case "education":
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
      case "skills":
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
                  value={formData.skills.technical}
                  onChange={(e) => updateSkills("technical", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Separate skills with commas</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="softSkills">Soft Skills</Label>
                <Textarea
                  id="softSkills"
                  placeholder="Communication, Leadership, Problem Solving..."
                  rows={3}
                  value={formData.skills.soft}
                  onChange={(e) => updateSkills("soft", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Separate skills with commas</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages">Languages</Label>
                <Input
                  id="languages"
                  placeholder="English, Spanish, French..."
                  value={formData.skills.languages}
                  onChange={(e) => updateSkills("languages", e.target.value)}
                />
              </div>
            </div>
          </div>
        )
      case "preview":
        return (
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="themes">Themes</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <div className="border rounded-lg p-6 bg-white text-black">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {formData.personal.firstName} {formData.personal.lastName}
                  </h2>
                  <p className="text-gray-600">
                    {formData.personal.location} • {formData.personal.email} • {formData.personal.phone}
                  </p>
                  {formData.personal.linkedin && <p className="text-blue-600">{formData.personal.linkedin}</p>}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Skills</h3>
                  {formData.skills.technical && (
                    <div className="mb-2">
                      <p className="font-semibold">Technical Skills:</p>
                      <p>{formData.skills.technical}</p>
                    </div>
                  )}
                  {formData.skills.soft && (
                    <div className="mb-2">
                      <p className="font-semibold">Soft Skills:</p>
                      <p>{formData.skills.soft}</p>
                    </div>
                  )}
                  {formData.skills.languages && (
                    <div>
                      <p className="font-semibold">Languages:</p>
                      <p>{formData.skills.languages}</p>
                    </div>
                  )}
                </div>

                <p className="text-center text-gray-500 italic">
                  This is a preview of your CV. Complete all sections for a full preview.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="themes" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${selectedTheme === "modern" ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedTheme("modern")}
                >
                  <div className="aspect-[8.5/11] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <p className="font-medium">Modern</p>
                  </div>
                  <p className="text-center mt-2 text-sm">Clean and professional</p>
                </div>
                <div
                  className={`border rounded-lg p-4 cursor-pointer ${selectedTheme === "classic" ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedTheme("classic")}
                >
                  <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <p className="font-medium">Classic</p>
                  </div>
                  <p className="text-center mt-2 text-sm">Traditional and elegant</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Build Your CV</DialogTitle>
          <DialogDescription>
            Create a professional CV in minutes. Fill in your details or upload an existing CV to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="relative mb-8">
            <Progress value={progress} className="h-2" />
            <div className="absolute top-4 left-0 right-0 flex justify-between">
              {steps.map((step, index) => (
                <motion.button
                  key={step.id}
                  className={`flex flex-col items-center ${
                    index <= currentStep ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => index <= currentStep && setCurrentStep(index)}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-medium">{step.title}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 0}>
              Previous
            </Button>
            {currentStep < steps.length - 1 && <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>}
            {currentStep === steps.length - 1 && (
              <Button onClick={() => console.log("Generate CV", formData)}>Generate CV</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

