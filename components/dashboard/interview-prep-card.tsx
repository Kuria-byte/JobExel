"use client"

import type React from "react"

import { Calendar, CalendarDays, PlayCircle, User2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample upcoming interviews
const upcomingInterviews = [
  {
    company: "Stripe",
    role: "Senior Software Engineer",
    type: "Technical Interview",
    date: "2023-06-20T14:00:00",
    prepared: 65,
  },
]

// Sample practice sessions
const practiceSessions = [
  {
    id: 1,
    title: "System Design Interview",
    description: "Practice designing a scalable e-commerce platform",
    duration: "45 mins",
    difficulty: "Advanced",
  },
  {
    id: 2,
    title: "React Technical Deep Dive",
    description: "React hooks, performance optimization, and architecture",
    duration: "30 mins",
    difficulty: "Intermediate",
  },
]

export function InterviewPrepCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <User2 className="h-4 w-4 text-primary" />
              Interview Preparation
            </CardTitle>
            <CardDescription className="text-xs">Prepare for upcoming interviews with AI guidance</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs defaultValue="upcoming">
          <TabsList className="h-8 w-full">
            <TabsTrigger value="upcoming" className="flex-1 text-xs">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex-1 text-xs">
              Practice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-3">
            {upcomingInterviews.length > 0 ? (
              <div className="rounded-lg border overflow-hidden">
                {upcomingInterviews.map((interview) => {
                  const interviewDate = new Date(interview.date)
                  const formattedDate = interviewDate.toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })
                  const formattedTime = interviewDate.toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })

                  return (
                    <div key={interview.company} className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <CalendarDays className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-xs font-medium">
                            {interview.company} - {interview.type}
                          </div>
                          <div className="text-xs text-muted-foreground">{interview.role}</div>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                            <Calendar className="h-2.5 w-2.5" />
                            {formattedDate} at {formattedTime}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div>Preparation progress</div>
                          <div className="font-medium">{interview.prepared}%</div>
                        </div>
                        <Progress value={interview.prepared} className="h-1.5" />
                      </div>

                      <div className="mt-2 flex gap-2">
                        <Button variant="default" size="sm" className="flex-1 gap-1 text-xs h-7">
                          <PlayCircle className="h-3.5 w-3.5" />
                          Start Practice
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-xs h-7">
                          View Materials
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-lg border bg-muted/10 flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">No upcoming interviews</p>
                  <Button variant="link" size="sm" className="mt-1 text-xs h-auto p-0">
                    Schedule mock interview
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="practice" className="mt-3">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted/50 px-2 py-1.5 text-xs font-medium">Practice Sessions</div>
              <div className="divide-y">
                {practiceSessions.map((session) => (
                  <div key={session.id} className="p-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-medium">{session.title}</div>
                      <Badge variant="outline" className="bg-background text-[10px] font-normal px-1 py-0 h-4">
                        {session.difficulty}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{session.description}</div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                      <Clock className="h-2.5 w-2.5" />
                      {session.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full text-xs h-7">
          View all practice sessions
        </Button>
      </CardFooter>
    </Card>
  )
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

