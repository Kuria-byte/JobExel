import { Calendar, CalendarDays, CheckCircle2, Clock, PlusCircle, Search, User2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { interviewsData as interviews } from "@/data/job-search"

export default function InterviewPrepPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Interview Preparation"
        description="Prepare for your upcoming interviews"
        backHref="/job-search"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Schedule Interview
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{interviews.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Preparation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(interviews.reduce((acc, i) => acc + i.prepared, 0) / interviews.length)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Interview</CardTitle>
          </CardHeader>
          <CardContent>
            {interviews.length > 0 ? (
              <div className="text-3xl font-bold">
                {new Date(interviews[0].date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            ) : (
              <div className="text-3xl font-bold">-</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Upcoming Interviews
            </CardTitle>
            <CardDescription>Your scheduled interviews</CardDescription>
          </CardHeader>
          <CardContent>
            {interviews.length > 0 ? (
              <div className="space-y-4">
                {interviews.map((interview) => {
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
                    <div key={interview.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{interview.company}</div>
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {formattedDate}, {formattedTime}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {interview.role} - {interview.type}
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Preparation Progress</span>
                          <span>{interview.prepared}%</span>
                        </div>
                        <Progress value={interview.prepared} className="h-2" />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" className="flex-1">
                          Continue Preparation
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium">No upcoming interviews</h3>
                <p className="text-sm text-muted-foreground">Schedule a mock interview to practice</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Schedule Practice
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User2 className="mr-2 h-5 w-5 text-primary" />
              Practice Sessions
            </CardTitle>
            <CardDescription>AI-powered interview practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search practice sessions..." className="pl-9" />
              </div>

              <Tabs defaultValue="recommended">
                <TabsList className="mb-4">
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
                </TabsList>

                <TabsContent value="recommended">
                  <div className="space-y-3">
                    <PracticeCard
                      title="System Design Interview"
                      description="Practice designing a scalable e-commerce platform"
                      duration="45 mins"
                      difficulty="Advanced"
                    />
                    <PracticeCard
                      title="React Technical Deep Dive"
                      description="React hooks, performance optimization, and architecture"
                      duration="30 mins"
                      difficulty="Intermediate"
                    />
                    <PracticeCard
                      title="Leadership Scenarios"
                      description="Behavioral questions about team leadership and conflict resolution"
                      duration="25 mins"
                      difficulty="Intermediate"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="technical">
                  <div className="space-y-3">
                    <PracticeCard
                      title="System Design Interview"
                      description="Practice designing a scalable e-commerce platform"
                      duration="45 mins"
                      difficulty="Advanced"
                    />
                    <PracticeCard
                      title="React Technical Deep Dive"
                      description="React hooks, performance optimization, and architecture"
                      duration="30 mins"
                      difficulty="Intermediate"
                    />
                    <PracticeCard
                      title="Data Structures & Algorithms"
                      description="Common coding interview problems and solutions"
                      duration="40 mins"
                      difficulty="Advanced"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="behavioral">
                  <div className="space-y-3">
                    <PracticeCard
                      title="Leadership Scenarios"
                      description="Behavioral questions about team leadership and conflict resolution"
                      duration="25 mins"
                      difficulty="Intermediate"
                    />
                    <PracticeCard
                      title="Problem Solving Stories"
                      description="Prepare STAR method responses for problem-solving questions"
                      duration="20 mins"
                      difficulty="Beginner"
                    />
                    <PracticeCard
                      title="Cultural Fit Assessment"
                      description="Practice answering questions about company values and culture"
                      duration="15 mins"
                      difficulty="Beginner"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interview Preparation Resources</CardTitle>
          <CardDescription>Helpful resources to ace your interviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border shadow-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Technical Interview Guide</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive guide covering common technical interview topics and questions.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>20 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Updated</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Behavioral Question Bank</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  100+ behavioral questions with example answers using the STAR method.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>15 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Updated</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Salary Negotiation Tactics</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to negotiate your compensation package effectively.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>10 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Updated</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

function PracticeCard({
  title,
  description,
  duration,
  difficulty,
}: {
  title: string
  description: string
  duration: string
  difficulty: string
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <div className="text-xs bg-muted px-2 py-1 rounded-full">{difficulty}</div>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{duration}</span>
        </div>
        <Button size="sm">Start Practice</Button>
      </div>
    </div>
  )
}

