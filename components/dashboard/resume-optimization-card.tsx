"use client"

import { useState } from "react"
import { ArrowRight, Check, FileText, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Sample job description for demo
const jobDescription = `
Senior Software Engineer

About the role:
We're looking for a Senior Software Engineer to join our team. You will be responsible for designing, developing, and maintaining our web applications.

Requirements:
- 4+ years of experience in software development
- Strong proficiency in JavaScript/TypeScript and React
- Experience with Node.js and API development
- Understanding of cloud services (AWS/GCP/Azure)
`

export function ResumeOptimizationCard({ className }: { className?: string }) {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleOptimize = () => {
    setIsOptimizing(true)
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-primary" />
              Resume Optimization
            </CardTitle>
            <CardDescription className="text-xs">Tailor your resume for specific job descriptions</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {!showResults ? (
          <div className="space-y-3">
            <div className="rounded-lg border p-2">
              <div className="text-xs font-medium mb-1">Job Description</div>
              <div className="text-xs text-muted-foreground whitespace-pre-line line-clamp-4">{jobDescription}</div>
              <Button variant="link" size="sm" className="mt-0 h-auto p-0 text-xs">
                View full description
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-md">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="Resume"
                  className="aspect-square h-full w-full"
                />
              </div>
              <div className="grid gap-0.5">
                <div className="text-sm font-medium">Ian_Kuria_Resume.pdf</div>
                <div className="text-xs text-muted-foreground">Last updated 3 days ago</div>
              </div>
              <Button variant="outline" size="sm" className="ml-auto gap-1 text-xs h-7 px-2">
                <Upload className="h-3 w-3" />
                Update
              </Button>
            </div>

            {isOptimizing && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div>Optimizing resume...</div>
                  <div>65%</div>
                </div>
                <Progress value={65} className="h-1.5" />
                <div className="text-xs text-muted-foreground">
                  Analyzing job requirements and matching with your skills...
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-lg bg-success/10 border-success/20 border p-2">
              <div className="flex items-start gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 text-success" />
                <div>
                  <div className="text-xs font-medium">Resume optimized for Senior Software Engineer</div>
                  <div className="text-xs text-muted-foreground">Match score: 87%</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium">Key Improvements:</div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border p-2">
                  <div className="text-xs font-medium">Skills Highlighted</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Badge variant="secondary" className="bg-background text-xs px-1 py-0 h-5">
                      JavaScript
                    </Badge>
                    <Badge variant="secondary" className="bg-background text-xs px-1 py-0 h-5">
                      React
                    </Badge>
                    <Badge variant="secondary" className="bg-background text-xs px-1 py-0 h-5">
                      Node.js
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border p-2">
                  <div className="text-xs font-medium">Keywords Added</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Added 12 relevant keywords to improve ATS matching
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {!showResults ? (
          <Button onClick={handleOptimize} disabled={isOptimizing} className="w-full text-sm h-8">
            {isOptimizing ? "Optimizing..." : "Optimize Resume"}
          </Button>
        ) : (
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={() => setShowResults(false)} className="flex-1 text-sm h-8">
              Start Over
            </Button>
            <Button className="flex-1 gap-1 text-sm h-8">
              Download
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

