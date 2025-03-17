"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { CareerProfile } from "@/types/auth"
import { Building, MapPin, X } from "lucide-react"

interface JobPreferencesStepProps {
  careerProfile: CareerProfile
  updateCareerProfile: (data: CareerProfile) => void
  onNext: () => void
  onBack: () => void
}

// Sample data for industries and roles
const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Marketing",
  "Retail",
  "Manufacturing",
  "Consulting",
  "Media",
  "Non-profit",
]

const roles = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Marketing Manager",
  "Sales Representative",
  "Financial Analyst",
  "HR Specialist",
  "Customer Success",
  "Operations Manager",
]

export default function JobPreferencesStep({
  careerProfile,
  updateCareerProfile,
  onNext,
  onBack,
}: JobPreferencesStepProps) {
  const [matchingJobs, setMatchingJobs] = useState(120)

  const toggleIndustry = (industry: string) => {
    const updatedIndustries = careerProfile.industries.includes(industry)
      ? careerProfile.industries.filter((i) => i !== industry)
      : [...careerProfile.industries, industry]

    updateCareerProfile({
      ...careerProfile,
      industries: updatedIndustries,
    })

    // Update matching jobs count based on selections
    updateMatchingJobs(updatedIndustries, careerProfile.roles)
  }

  const toggleRole = (role: string) => {
    const updatedRoles = careerProfile.roles.includes(role)
      ? careerProfile.roles.filter((r) => r !== role)
      : [...careerProfile.roles, role]

    updateCareerProfile({
      ...careerProfile,
      roles: updatedRoles,
    })

    // Update matching jobs count based on selections
    updateMatchingJobs(careerProfile.industries, updatedRoles)
  }

  const setLocationPreference = (preference: CareerProfile["locationPreference"]) => {
    updateCareerProfile({
      ...careerProfile,
      locationPreference: preference,
    })
  }

  const updateMatchingJobs = (industries: string[], roles: string[]) => {
    // Simulate job matching algorithm
    const baseCount = 120
    const industryMultiplier = Math.max(1, industries.length * 0.8)
    const roleMultiplier = Math.max(1, roles.length * 0.7)

    const newCount = Math.round(baseCount * industryMultiplier * roleMultiplier)
    setMatchingJobs(Math.min(newCount, 500)) // Cap at 500 for realism
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">What jobs interest you?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select your preferences to help us find the right opportunities for you
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">Industries</Label>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <Badge
                key={industry}
                variant={careerProfile.industries.includes(industry) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleIndustry(industry)}
              >
                {industry}
                {careerProfile.industries.includes(industry) && <X className="ml-1 h-3 w-3" />}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Roles</Label>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <Badge
                key={role}
                variant={careerProfile.roles.includes(role) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleRole(role)}
              >
                {role}
                {careerProfile.roles.includes(role) && <X className="ml-1 h-3 w-3" />}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-2 block">Location Preference</Label>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={careerProfile.locationPreference === "remote" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setLocationPreference("remote")}
            >
              Remote
            </Badge>
            <Badge
              variant={careerProfile.locationPreference === "hybrid" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setLocationPreference("hybrid")}
            >
              Hybrid
            </Badge>
            <Badge
              variant={careerProfile.locationPreference === "on-site" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setLocationPreference("on-site")}
            >
              On-site
            </Badge>
            <Badge
              variant={careerProfile.locationPreference === "flexible" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setLocationPreference("flexible")}
            >
              Flexible
            </Badge>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/20 p-4">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          <span className="font-medium">Matching Jobs</span>
        </div>
        <p className="mt-2 text-sm">
          Based on your preferences, we found <span className="font-bold">{matchingJobs}</span> matching jobs.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {careerProfile.locationPreference === "remote"
              ? "Remote"
              : careerProfile.locationPreference === "hybrid"
                ? "Hybrid"
                : careerProfile.locationPreference === "on-site"
                  ? "On-site"
                  : "Flexible"}{" "}
            opportunities
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1"
          disabled={careerProfile.industries.length === 0 && careerProfile.roles.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

