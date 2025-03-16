import { BarChart3, Calendar, Download, Filter, LineChart, PieChart, Search, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Analytics"
        description="Track your career progress and job search metrics"
        actions={
          <Button size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">+12% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">+33% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">33%</div>
            <div className="text-sm text-muted-foreground">+5% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Skills Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+7</div>
            <div className="text-sm text-muted-foreground">New skills this quarter</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Application Trends
            </CardTitle>
            <CardDescription>Track your job application activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
              <LineChart className="h-16 w-16 text-muted-foreground" />
              <span className="sr-only">Application trend chart</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-primary" />
              Application Outcomes
            </CardTitle>
            <CardDescription>Breakdown of your application results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
              <PieChart className="h-16 w-16 text-muted-foreground" />
              <span className="sr-only">Application outcomes chart</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Detailed Metrics</CardTitle>
              <CardDescription>Comprehensive analysis of your career data</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
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
                <Input placeholder="Search metrics..." className="pl-9" />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="job-search">
              <TabsList className="mb-4">
                <TabsTrigger value="job-search">Job Search</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="networking">Networking</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
              </TabsList>

              <TabsContent value="job-search">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border shadow-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Application Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                        <BarChart3 className="h-12 w-12 text-muted-foreground" />
                        <span className="sr-only">Application sources chart</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border shadow-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                        <LineChart className="h-12 w-12 text-muted-foreground" />
                        <span className="sr-only">Response time chart</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border shadow-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Interview Conversion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                        <BarChart3 className="h-12 w-12 text-muted-foreground" />
                        <span className="sr-only">Interview conversion chart</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border shadow-none">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Salary Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
                        <LineChart className="h-12 w-12 text-muted-foreground" />
                        <span className="sr-only">Salary trends chart</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="skills">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <BarChart3 className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium">Skills analytics coming soon</h3>
                  <p className="text-sm text-muted-foreground">We're working on comprehensive skills tracking</p>
                </div>
              </TabsContent>

              <TabsContent value="networking">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <BarChart3 className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium">Networking analytics coming soon</h3>
                  <p className="text-sm text-muted-foreground">Track your networking effectiveness</p>
                </div>
              </TabsContent>

              <TabsContent value="content">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <BarChart3 className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium">Content analytics coming soon</h3>
                  <p className="text-sm text-muted-foreground">Measure the impact of your professional content</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

