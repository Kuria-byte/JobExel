import Link from "next/link"
import { Calendar, Clock, FileText, Filter, MessageSquare, PlusCircle, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { AddJobDialog } from "@/components/modals/add-job-dialog"
import {
  jobApplicationsData as applications,
  interviewsData as interviews,
  followUpsData as followUps,
} from "@/data/job-search"
import { ResponsiveTable } from "@/components/ui/responsive-table"

export default function JobSearchPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Job Search"
        description="Track and manage your job applications"
        actions={
          <AddJobDialog
            trigger={
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Job
              </Button>
            }
          />
        }
      />

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{applications.length}</div>
            <div className="text-sm text-muted-foreground">+3 this week</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">33%</div>
            <div className="text-sm text-muted-foreground">8 responses</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{interviews.filter((i) => new Date(i.date) > new Date()).length}</div>
            <div className="text-sm text-muted-foreground">Next: Tomorrow, 2:00 PM</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Follow-ups Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{followUps.filter((f) => f.status === "pending").length}</div>
            <div className="text-sm text-muted-foreground">3 overdue</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
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
                    <span>
                      {applications.filter((a) => a.status === "applied").length}/{applications.length}
                    </span>
                  </div>
                  <Progress
                    value={(applications.filter((a) => a.status === "applied").length / applications.length) * 100}
                    className="h-2"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Interview</span>
                    <span>
                      {applications.filter((a) => a.status === "interview").length}/{applications.length}
                    </span>
                  </div>
                  <Progress
                    value={(applications.filter((a) => a.status === "interview").length / applications.length) * 100}
                    className="h-2"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Offer</span>
                    <span>
                      {applications.filter((a) => a.status === "offer").length}/{applications.length}
                    </span>
                  </div>
                  <Progress
                    value={(applications.filter((a) => a.status === "offer").length / applications.length) * 100}
                    className="h-2"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Rejected</span>
                    <span>
                      {applications.filter((a) => a.status === "rejected").length}/{applications.length}
                    </span>
                  </div>
                  <Progress
                    value={(applications.filter((a) => a.status === "rejected").length / applications.length) * 100}
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
              <Link href="/job-search/applications">View All Applications</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Interview Schedule
            </CardTitle>
            <CardDescription>Manage your upcoming interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Upcoming Interviews</h3>
                <div className="space-y-2">
                  {interviews
                    .filter((i) => new Date(i.date) > new Date())
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
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Past Interviews</h3>
                <div className="space-y-2">
                  {interviews
                    .filter((i) => new Date(i.date) <= new Date())
                    .slice(0, 2)
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
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/job-search/interviews">Manage Interviews</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Follow-up Manager
          </CardTitle>
          <CardDescription>Track and manage follow-ups with recruiters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search follow-ups..." className="pl-9" />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="pending">
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                <ResponsiveTable>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Company</th>
                        <th className="text-left p-3 font-medium">Contact</th>
                        <th className="text-left p-3 font-medium">Due Date</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-center p-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {followUps
                        .filter((f) => f.status === "pending")
                        .map((followUp) => (
                          <tr key={followUp.id} className="border-t">
                            <td className="p-3 font-medium">{followUp.company}</td>
                            <td className="p-3">{followUp.contact}</td>
                            <td className="p-3">{followUp.dueDate}</td>
                            <td className="p-3">
                              <Badge
                                variant="outline"
                                className={
                                  new Date(followUp.dueDate) < new Date()
                                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                }
                              >
                                {new Date(followUp.dueDate) < new Date() ? "Overdue" : "Pending"}
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Button size="sm">Mark Complete</Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </ResponsiveTable>
              </TabsContent>

              <TabsContent value="completed">
                <ResponsiveTable>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Company</th>
                        <th className="text-left p-3 font-medium">Contact</th>
                        <th className="text-left p-3 font-medium">Completed Date</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-center p-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {followUps
                        .filter((f) => f.status === "completed")
                        .map((followUp) => (
                          <tr key={followUp.id} className="border-t">
                            <td className="p-3 font-medium">{followUp.company}</td>
                            <td className="p-3">{followUp.contact}</td>
                            <td className="p-3">{followUp.completedDate || "-"}</td>
                            <td className="p-3">
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                Completed
                              </Badge>
                            </td>
                            <td className="p-3 text-center">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </ResponsiveTable>
              </TabsContent>

              <TabsContent value="all">
                <ResponsiveTable>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Company</th>
                        <th className="text-left p-3 font-medium">Contact</th>
                        <th className="text-left p-3 font-medium">Due Date</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-center p-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {followUps.map((followUp) => (
                        <tr key={followUp.id} className="border-t">
                          <td className="p-3 font-medium">{followUp.company}</td>
                          <td className="p-3">{followUp.contact}</td>
                          <td className="p-3">{followUp.dueDate}</td>
                          <td className="p-3">
                            <Badge
                              variant="outline"
                              className={
                                followUp.status === "completed"
                                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                                  : new Date(followUp.dueDate) < new Date()
                                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              }
                            >
                              {followUp.status === "completed"
                                ? "Completed"
                                : new Date(followUp.dueDate) < new Date()
                                  ? "Overdue"
                                  : "Pending"}
                            </Badge>
                          </td>
                          <td className="p-3 text-center">
                            {followUp.status === "pending" ? (
                              <Button size="sm">Mark Complete</Button>
                            ) : (
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ResponsiveTable>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

