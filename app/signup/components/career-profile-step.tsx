"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { CareerProfile } from "@/types/auth"
import { Briefcase, GraduationCap, LineChart, UserRound } from "lucide-react"

interface CareerProfileStepProps {
  careerProfile: CareerProfile
  updateCareerProfile: (data: CareerProfile) => void
  onNext: () => void
  onBack: () => void
}

export default function CareerProfileStep({
  careerProfile,
  updateCareerProfile,
  onNext,
  onBack,
}: CareerProfileStepProps) {
  const handleSelectCareerStage = (stage: CareerProfile["careerStage"]) => {
    updateCareerProfile({
      ...careerProfile,
      careerStage: stage,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Let's personalize your experience</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select your current career stage to help us tailor JobExel to your needs
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card
          className={`cursor-pointer transition-all hover:border-primary ${
            careerProfile.careerStage === "active-job-seeker" ? "border-2 border-primary" : ""
          }`}
          onClick={() => handleSelectCareerStage("active-job-seeker")}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 mt-2 rounded-full bg-primary/10 p-2">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Active Job Seeker</h3>
              <p className="mt-1 text-xs text-muted-foreground">Currently looking for new opportunities</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:border-primary ${
            careerProfile.careerStage === "career-developer" ? "border-2 border-primary" : ""
          }`}
          onClick={() => handleSelectCareerStage("career-developer")}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 mt-2 rounded-full bg-primary/10 p-2">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Career Developer</h3>
              <p className="mt-1 text-xs text-muted-foreground">Employed but focused on growth</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:border-primary ${
            careerProfile.careerStage === "career-changer" ? "border-2 border-primary" : ""
          }`}
          onClick={() => handleSelectCareerStage("career-changer")}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 mt-2 rounded-full bg-primary/10 p-2">
                <UserRound className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Career Changer</h3>
              <p className="mt-1 text-xs text-muted-foreground">Looking to transition to a new field</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:border-primary ${
            careerProfile.careerStage === "recent-graduate" ? "border-2 border-primary" : ""
          }`}
          onClick={() => handleSelectCareerStage("recent-graduate")}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 mt-2 rounded-full bg-primary/10 p-2">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Recent Graduate</h3>
              <p className="mt-1 text-xs text-muted-foreground">Starting your professional journey</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1" disabled={!careerProfile.careerStage}>
          Continue
        </Button>
      </div>
    </div>
  )
}

