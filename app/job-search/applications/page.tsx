import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  MoreHorizontal,
  PlusCircle,
  Search,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { jobApplicationsData } from "@/data/job-search"

export default function ApplicationTrackerPage() {
  // Count applications by status
  const applicationCounts = jobApplicationsData.reduce(
    (acc, app) => {
      acc.total += 1
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    },
    { total: 0, applied: 0, interview: 0, offer: 0, rejected: 0 } as Record<string, number>,
  )

  return (
    <DashboardLayout>
      <PageHeader
        title="Application Tracker"
        description="Track and manage your job applications"
        backHref="/job-search"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Application
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{applicationCounts.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Applied</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{applicationCounts.applied}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Interviewing</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{applicationCounts.interview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Offers</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{applicationCounts.offer}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Application Pipeline</CardTitle>
          <CardDescription>Visual representation of your application statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-8 rounded-lg bg-muted overflow-hidden flex">
              <div
                className="h-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${(applicationCounts.applied / applicationCounts.total) * 100}%` }}
              >
                {applicationCounts.applied > 0 && `${applicationCounts.applied}`}
              </div>
              <div
                className="h-full bg-yellow-500 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${(applicationCounts.interview / applicationCounts.total) * 100}%` }}
              >
                {applicationCounts.interview > 0 && `${applicationCounts.interview}`}
              </div>
              <div
                className="h-full bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${(applicationCounts.offer / applicationCounts.total) * 100}%` }}
              >
                {applicationCounts.offer > 0 && `${applicationCounts.offer}`}
              </div>
              <div
                className="h-full bg-red-500 flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${(applicationCounts.rejected / applicationCounts.total) * 100}%` }}
              >
                {applicationCounts.rejected > 0 && `${applicationCounts.rejected}`}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span>Applied</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span>Interviewing</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Offers</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span>Rejected</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Applications</CardTitle>
              <CardDescription>All your job applications in one place</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search applications..." className="pl-9" />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
                <TabsTrigger value="interview">Interviewing</TabsTrigger>
                <TabsTrigger value="offer">Offers</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <ApplicationsTable applications={jobApplicationsData} />
              </TabsContent>

              <TabsContent value="applied">
                <ApplicationsTable applications={jobApplicationsData.filter((app) => app.status === "applied")} />
              </TabsContent>

              <TabsContent value="interview">
                <ApplicationsTable applications={jobApplicationsData.filter((app) => app.status === "interview")} />
              </TabsContent>

              <TabsContent value="offer">
                <ApplicationsTable applications={jobApplicationsData.filter((app) => app.status === "offer")} />
              </TabsContent>

              <TabsContent value="rejected">
                <ApplicationsTable applications={jobApplicationsData.filter((app) => app.status === "rejected")} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

function ApplicationsTable({ applications }: { applications: typeof jobApplicationsData }) {
  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Briefcase className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="font-medium">No applications found</h3>
        <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3 font-medium">Company</th>
              <th className="text-left p-3 font-medium">Role</th>
              <th className="text-left p-3 font-medium">Location</th>
              <th className="text-left p-3 font-medium">Salary</th>
              <th className="text-left p-3 font-medium">Date Applied</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-center p-3 font-medium w-10"></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const date = new Date(app.date)
              const formattedDate = date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })

              return (
                <tr key={app.id} className="border-t">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                        <img
                          src={app.logo || "/placeholder.svg"}
                          alt={app.company}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium">{app.company}</div>
                    </div>
                  </td>
                  <td className="p-3">{app.role}</td>
                  <td className="p-3">{app.location}</td>
                  <td className="p-3">{app.salary}</td>
                  <td className="p-3">{formattedDate}</td>
                  <td className="p-3">
                    <StatusBadge status={app.status as any} />
                  </td>
                  <td className="p-3 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Update status</DropdownMenuItem>
                        <DropdownMenuItem>Add notes</DropdownMenuItem>
                        <DropdownMenuItem>Schedule follow-up</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

