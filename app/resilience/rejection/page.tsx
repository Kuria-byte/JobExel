import { Download, Filter, Lightbulb, MoreHorizontal, PlusCircle, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { rejectionData } from "@/data/resilience"

export default function RejectionRecoveryPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Rejection Recovery"
        description="Learn and grow from job rejections"
        backHref="/resilience"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Log Rejection
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Rejections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{rejectionData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {rejectionData.filter((r) => r.status === "processed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Insights Generated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{rejectionData.length * 2}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Rejection Patterns</CardTitle>
          <CardDescription>Analysis of rejection trends and common feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Common Feedback Themes</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>System Design Skills</span>
                    <span>2 occurrences</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "66%" }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Leadership Experience</span>
                    <span>1 occurrence</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "33%" }} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>JavaScript Knowledge</span>
                    <span>1 occurrence</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "33%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Rejection Stages</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-lg border p-2">
                  <div className="text-lg font-bold text-yellow-500">1</div>
                  <div className="text-xs text-muted-foreground">Phone Screen</div>
                </div>
                <div className="rounded-lg border p-2">
                  <div className="text-lg font-bold text-yellow-500">1</div>
                  <div className="text-xs text-muted-foreground">Technical Interview</div>
                </div>
                <div className="rounded-lg border p-2">
                  <div className="text-lg font-bold text-yellow-500">1</div>
                  <div className="text-xs text-muted-foreground">Final Round</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Rejection Log</CardTitle>
              <CardDescription>Record and analyze job rejections</CardDescription>
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
                <Input placeholder="Search rejections..." className="pl-9" />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Rejections</TabsTrigger>
                <TabsTrigger value="processed">Processed</TabsTrigger>
                <TabsTrigger value="unprocessed">Unprocessed</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Company</th>
                          <th className="text-left p-3 font-medium">Role</th>
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-left p-3 font-medium">Stage</th>
                          <th className="text-left p-3 font-medium">Feedback</th>
                          <th className="text-center p-3 font-medium w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {rejectionData.map((rejection) => (
                          <tr key={rejection.id} className="border-t">
                            <td className="p-3 font-medium">{rejection.company}</td>
                            <td className="p-3">{rejection.role}</td>
                            <td className="p-3">{rejection.date}</td>
                            <td className="p-3">{rejection.stage}</td>
                            <td className="p-3 max-w-xs truncate">{rejection.feedback}</td>
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
                                  <DropdownMenuItem>Edit feedback</DropdownMenuItem>
                                  <DropdownMenuItem>Generate insights</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="processed">
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Company</th>
                          <th className="text-left p-3 font-medium">Role</th>
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-left p-3 font-medium">Stage</th>
                          <th className="text-left p-3 font-medium">Feedback</th>
                          <th className="text-center p-3 font-medium w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {rejectionData
                          .filter((r) => r.status === "processed")
                          .map((rejection) => (
                            <tr key={rejection.id} className="border-t">
                              <td className="p-3 font-medium">{rejection.company}</td>
                              <td className="p-3">{rejection.role}</td>
                              <td className="p-3">{rejection.date}</td>
                              <td className="p-3">{rejection.stage}</td>
                              <td className="p-3 max-w-xs truncate">{rejection.feedback}</td>
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
                                    <DropdownMenuItem>Edit feedback</DropdownMenuItem>
                                    <DropdownMenuItem>Generate insights</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="unprocessed">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Lightbulb className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No unprocessed rejections</h3>
                  <p className="text-sm text-muted-foreground">All rejections have been processed</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

