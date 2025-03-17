"use client"

import { Button } from "@/components/ui/button"
import type { SignUpData } from "@/types/auth"
import { CheckCircle2 } from "lucide-react"

interface CompletionStepProps {
  userData: SignUpData
  onComplete: () => void
}

export default function CompletionStep({ userData, onComplete }: CompletionStepProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="h-10 w-10 text-primary" />
      </div>

      <div>
        <h2 className="text-2xl font-bold">You're all set, {userData.fullName.split(" ")[0]}!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your JobExel account is ready. Let's start your career journey.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <div className="rounded-lg border bg-muted/20 p-4 text-left">
          <h3 className="font-medium">What's next?</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              <span>Explore your personalized dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              <span>Optimize your resume with AI-powered suggestions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              <span>Discover job opportunities that match your profile</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              <span>Track your applications and interviews in one place</span>
            </li>
          </ul>
        </div>

        <Button onClick={onComplete} className="w-full">
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
}

