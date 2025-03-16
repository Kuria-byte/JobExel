import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Lightbulb,
  MessageSquare,
  PlusCircle,
  Search,
  Shield,
  User,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"
import { StatusBadge } from "@/components/status-badge"
import { AddJobDialog } from "@/components/modals/add-job-dialog"
import { applications, interviews } from "@/data/job-search"
import { skillGaps } from "@/data/career-path"
import { resumes } from "@/data/documentation"
import { onlinePresenceData } from "@/data/brand"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, Ian! Here's an overview of your career progress.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AddJobDialog 
            trigger={
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Job
              </Button>
            } 
          />
          <Button variant="outline" size="sm" className="gap-1">
            <Search className="h-4 w-4" />
            Find Jobs
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{applications.length}</div>
            <div className="text-sm text-muted-foreground">+3 this week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{interviews.filter(i => new Date(i.date) > new Date()).length}</div>
            <div className="text-sm text-muted-foreground">Next: Tomorrow, 2:00 PM</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Skills Gap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{skillGaps.length}</div>
            <div className="text-sm text-muted-foreground">Top priority: {skillGaps.find(s => s.priority === "High")?.name}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Brand Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(
                onlinePresenceData.platforms.reduce((acc, platform) => acc + platform.strength, 0) / 
                onlinePresenceData.platforms.length
              )}%
            </div>
            <div className="text-sm text-muted-foreground">LinkedIn: {onlinePresenceData.platforms.find(p => p.name === "LinkedIn")?.strength}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Application Tracker
            </CardTitle>
            <CardDescription>Track the status of your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Applied</span>
                    <span>{applications.filter(a => a.status === "applied").length}/{applications.length}</span>
                  </div>
                  <Progress 
                    value={(applications.filter(a => a.status === "applied").length / applications.length) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Interview</span>
                    <span>{applications.filter(a => a.status === "interview").length}/{applications.length}</span>
                  </div>
                  <Progress 
                    value={(applications.filter(a => a.status === "interview").length / applications.length) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Offer</span>
                    <span>{applications.filter(a => a.status === "offer").length}/{applications.length}</span>
                  </div>
                  <Progress 
                    value={(applications.filter(a => a.status === "offer").length / applications.length) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Rejected</span>
                    <span>{applications.filter(a => a.status === "rejected").length}/{applications.length}</span>
                  </div>
                  <Progress 
                    value={(applications.filter(a => a.status === "rejected").length / applications.length) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recent Applications</h3>
                <div className="space-y-2">
                  {applications.slice(0, 3).map((application) => (
                    <div key={application.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{application.company}</div>
                        <StatusBadge status={application.status} />
                      </div>
                      <div className="text-xs text-muted-foreground">{application.role}</div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <div>Applied: {application.dateApplied}</div>
                        <div>{application.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/job-search">View All Applications</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Skills Gap
            </CardTitle>
            <CardDescription>Top skills to develop</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillGaps.slice(0, 3).map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Gap: <span className="font-medium text-foreground">{skill.gap}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground w-10">Current</div>
                    <Progress value={(skill.currentLevel / skill.targetLevel) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground w-10 text-right">Target</div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>Priority: {skill.priority}</div>
                    <div>Category: {skill.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/career-path">View All Skills</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Upcoming Interviews
            </CardTitle>
            <CardDescription>Prepare for your interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interviews
                .filter(i => new Date(i.date) > new Date())
                .slice(0, 3)
                .map((interview) => (
                  <div key={interview.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{interview.company}</div>
                      <Badge variant="outline">{interview.type}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{interview.role}</div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {interview.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {interview.time}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-medium">Preparation Status:</div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                        <div 
                          className="h-1.5 rounded-full bg-primary" 
                          style={{ width: `${interview.preparationStatus}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/job-search/interviews">View All Interviews</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Resume Optimization
            </CardTitle>
            <CardDescription>Improve your resume for better results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Resume Versions</h3>
                <div className="space-y-2">
                  {resumes.slice(0, 3).map((resume) => (
                    <div key={resume.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{resume.name}</div>
                        <div className="text-xs bg-muted px-2 py-0.5 rounded-full">
                          Match: {resume.matchScore}%
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">Last updated: {resume.lastUpdated}</div>
                      <div className="mt-2">
                        <div className="text-xs font-medium">Top Feedback:</div>
                        <div className="text-xs text-muted-foreground">{resume.feedback[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/documentation/resumes">Optimize Resumes</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              Activity Feed
            </CardTitle>
            <CardDescription>Recent activity and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                  <AvatarFallback>JE</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm">
                    You applied for <span className="font-medium">Senior Frontend Developer</span> at <span className="font-medium">TechCorp</span>
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                  <AvatarFallback>JE</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm">
                    You completed <span className="font-medium">React Advanced Patterns</span> course
                  </p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                  <AvatarFallback>JE</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">InnovateTech</span> viewed your profile
                  </p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                  <AvatarFallback>JE</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm">
                    You updated your <span className="font-medium">LinkedIn</span> profile
                  </p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/analytics">View All Activity</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-primary" />
              Interview Prep
            </CardTitle>
            <CardDescription>Prepare for your upcoming interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="questions">
              <TabsList className="mb-4">
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="company">Company Research</TabsTrigger>
                <TabsTrigger value="technical">Technical Prep</TabsTrigger>
              </TabsList>

              <TabsContent value="questions">
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Tell me about yourself</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Prepare a concise 2-minute overview of your professional background, skills, and career goals.
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Button size="sm" variant="outline">View Answer</Button>
                      <Button size="sm">Practice</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Why do you want to work here?</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Research the company culture, values, and mission to craft a compelling answer.
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Button size="sm" variant="outline">View Answer</Button>
                      <Button size="sm">Practice</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">What is your greatest strength?</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Choose a strength relevant to the role and provide specific examples.
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Button size="sm" variant="outline">View Answer</Button>
                      <Button size="sm">Practice</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="company">
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Company Overview</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Research the company's history, mission, values, and recent news.
                    </div>
                    <div className="mt-2">
                      <Button size="sm">Research Now</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Products and Services</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Understand the company's main products, services, and target market.
                    </div>
                    <div className="mt-2">
                      <Button size="sm">Research Now</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Company Culture</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Learn about the company's work environment, values, and employee reviews.
                    </div>
                    <div className="mt-2">
                      <Button size="sm">Research Now</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical">
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Coding Challenges</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Practice common coding problems and algorithms relevant to the role.
                    </div>
                    <div className="mt-2">
                      <Button size="sm">Start Practice</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">System Design</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Review system design principles and practice designing scalable systems.
                    </div>
                    <div className="mt-2">
                      <Button size="sm">Start Practice</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Technical Concepts</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Refresh your knowledge on key technical concepts for your role.
                    </div>
                    <div className="mt-2">
                      <Button size="sm">Review Concepts</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/job-search/interviews">View All Interview Prep</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Career Resilience
            </CardTitle>
            <CardDescription>Build mental strength for your career journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Resilience Score</span>
                    <span>78/100</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium mb-2">Burnout Prevention</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-sm border flex items-center justify-center bg-primary border-primary text-primary-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Daily Mindfulness Practice</div>
                      <div className="text-xs text-muted-foreground">10 minutes of meditation each morning</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-sm border flex items-center justify-center bg-primary border-primary text-primary-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Weekly Exercise</div>
                      <div className="text-xs text-muted-foreground">At least 3 sessions of 30 minutes each</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 h-4 w-4 rounded-sm border border-muted-foreground"></div>
                    <div>
                      <div className="text-sm font-medium">Work Boundaries</div>
                      <div className="text-xs text-muted-foreground">No emails or work after 7pm</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium mb-2">Career Pivots</h3>
                <div className="text-sm">Explore alternative career paths based on your skills:</div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>Data Science</div>
                    <div className="text-xs bg-muted px-2 py-0.5 rounded-full">65% match</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>DevOps Engineer</div>
                    <div className="text-xs bg-muted px-2 py-0.5 rounded-full">72% match</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/resilience">Build Resilience</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5 text-primary" />
            Personal Brand
          </CardTitle>
          <CardDescription>Manage your professional online presence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Platform Strength</h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {onlinePresenceData.platforms.map((platform) => (
                  <div key={platform.name} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{platform.name}</div>
                      <div className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {platform.strength}%
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      <Progress value={platform.strength} className="h-1.5" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div>Last updated: {platform.lastUpdated}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Top Recommendations</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="text-sm">Update your LinkedIn profile header image</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="text-sm">Post technical content weekly on LinkedIn</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="text-sm">Complete your GitHub profile with bio and pinned repositories</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="text-sm">Add case studies of recent projects to your personal website</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href="/brand">Manage Personal Brand</Link>
          </Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  )
}

