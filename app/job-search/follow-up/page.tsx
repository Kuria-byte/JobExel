import { Bell, Calendar, Check, Clock, Mail, MoreHorizontal, PlusCircle, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { followUpsData } from "@/data/job-search"

export default function FollowUpManagerPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Follow-up Manager"
        description="Track and manage your follow-ups with recruiters and hiring managers"
        backHref="/job-search"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Follow-up
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{followUpsData.filter((f) => f.status === "pending").length}</div>
            <div className="text-sm text-muted-foreground">Follow-ups to send</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1">
              <Bell className="h-4 w-4 text-red-500" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {followUpsData.filter((f) => f.status === "overdue").length}
            </div>
            <div className="text-sm text-muted-foreground">Past due date</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1">
              <Check className="h-4 w-4 text-green-500" />
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {followUpsData.filter((f) => f.status === "completed").length}
            </div>
            <div className="text-sm text-muted-foreground">Successfully sent</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Follow-ups</CardTitle>
              <CardDescription>Track and manage your follow-ups</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" />
              Calendar View
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search follow-ups..." className="pl-9" />
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <FollowUpsTable followUps={followUpsData} />
              </TabsContent>

              <TabsContent value="pending">
                <FollowUpsTable followUps={followUpsData.filter((f) => f.status === "pending")} />
              </TabsContent>

              <TabsContent value="overdue">
                <FollowUpsTable followUps={followUpsData.filter((f) => f.status === "overdue")} />
              </TabsContent>

              <TabsContent value="completed">
                <FollowUpsTable followUps={followUpsData.filter((f) => f.status === "completed")} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

function FollowUpsTable({ followUps }: { followUps: typeof followUpsData }) {
  if (followUps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Mail className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="font-medium">No follow-ups found</h3>
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
              <th className="text-left p-3 font-medium">Contact</th>
              <th className="text-left p-3 font-medium">Last Contact</th>
              <th className="text-left p-3 font-medium">Next Follow-up</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-center p-3 font-medium w-10"></th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((followUp) => {
              const lastDate = new Date(followUp.lastContact)
              const nextDate = new Date(followUp.nextFollowUp)

              const formattedLastDate = lastDate.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })

              const formattedNextDate = nextDate.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })

              return (
                <tr key={followUp.id} className="border-t">
                  <td className="p-3 font-medium">{followUp.company}</td>
                  <td className="p-3">{followUp.role}</td>
                  <td className="p-3">
                    <div>
                      <div>{followUp.contact}</div>
                      <div className="text-sm text-muted-foreground">{followUp.email}</div>
                    </div>
                  </td>
                  <td className="p-3">{formattedLastDate}</td>
                  <td className="p-3">{formattedNextDate}</td>
                  <td className="p-3">
                    <StatusBadge status={followUp.status as any} />
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
                        <DropdownMenuItem>Mark as completed</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Send email</DropdownMenuItem>
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

