import { Filter, MoreHorizontal, PlusCircle, Search, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { referencesData } from "@/data/documentation"

export default function ReferencesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="References"
        description="Manage your professional references"
        backHref="/documentation"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Reference
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total References</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{referencesData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">
              {referencesData.filter((r) => r.status === "Confirmed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">
              {referencesData.filter((r) => r.status === "Pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>References</CardTitle>
              <CardDescription>Your professional references</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search references..." className="pl-9" />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="conditional">Conditional</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <ReferencesTable references={referencesData} />
              </TabsContent>

              <TabsContent value="confirmed">
                <ReferencesTable references={referencesData.filter((r) => r.status === "Confirmed")} />
              </TabsContent>

              <TabsContent value="pending">
                <ReferencesTable references={referencesData.filter((r) => r.status === "Pending")} />
              </TabsContent>

              <TabsContent value="conditional">
                <ReferencesTable references={referencesData.filter((r) => r.status === "Conditional")} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

function ReferencesTable({ references }: { references: typeof referencesData }) {
  if (references.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Users className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="font-medium">No references found</h3>
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
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Title & Company</th>
              <th className="text-left p-3 font-medium">Relationship</th>
              <th className="text-left p-3 font-medium">Contact</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-center p-3 font-medium w-10"></th>
            </tr>
          </thead>
          <tbody>
            {references.map((reference) => (
              <tr key={reference.id} className="border-t">
                <td className="p-3 font-medium">{reference.name}</td>
                <td className="p-3">
                  <div>{reference.title}</div>
                  <div className="text-sm text-muted-foreground">{reference.company}</div>
                </td>
                <td className="p-3">{reference.relationship}</td>
                <td className="p-3">
                  <div>{reference.email}</div>
                  <div className="text-sm text-muted-foreground">{reference.phone}</div>
                </td>
                <td className="p-3">
                  <div
                    className={`text-xs px-2 py-0.5 rounded-full inline-block
                    ${
                      reference.status === "Confirmed"
                        ? "bg-green-500/10 text-green-500"
                        : reference.status === "Pending"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-blue-500/10 text-blue-500"
                    }`}
                  >
                    {reference.status}
                  </div>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Send reminder</DropdownMenuItem>
                      <DropdownMenuItem>Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

