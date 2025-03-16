import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ResponsiveTable } from "@/components/ui/responsive-table"
import { Filter, Plus, Search } from "lucide-react"
import { followUpsData } from "@/data/job-search"

export default function FollowUpPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Follow-up Manager"
        description="Track and manage follow-ups with recruiters"
        actions={
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add Follow-up
          </Button>
        }
      />

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
                  {followUpsData
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
                  {followUpsData
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
                  {followUpsData.map((followUp) => (
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
    </DashboardLayout>
  )
}

