import { ArrowUpDown, Download, FileText, PlusCircle, Search, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { resumeData } from "@/data/documentation"

export default function ResumePage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Resume Lab"
        description="Manage and optimize your resume versions"
        backHref="/documentation"
        actions={
          <div className="flex gap-2">
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-4 w-4" />
              Create Version
            </Button>
            <Button size="sm" variant="outline" className="gap-1">
              <Upload className="h-4 w-4" />
              Upload Resume
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resume Versions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{resumeData.versions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Best Match Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{Math.max(...resumeData.versions.map((v) => v.matchScore))}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {
                resumeData.versions.sort(
                  (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
                )[0].lastUpdated
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
      <Card className="mb-6 ">
        <CardHeader>
          <CardTitle>Resume Performance</CardTitle>
          <CardDescription>How your resumes are performing against job requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resumeData.versions.map((version) => (
              <div key={version.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{version.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Match Score: <span className="font-medium text-foreground">{version.matchScore}%</span>
                  </div>
                </div>
                <Progress value={version.matchScore} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resume Feedback</CardTitle>
          <CardDescription>Feedback and suggestions for improvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resumeData.feedback.map((feedback) => (
              <Card key={feedback.id} className="border shadow-none">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{feedback.source}</CardTitle>
                    <div className="text-sm">
                      Score: <span className="font-medium">{feedback.score}%</span>
                    </div>
                  </div>
                  <CardDescription>{feedback.date}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Strengths</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {feedback.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Areas for Improvement</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {feedback.improvements.map((improvement, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Resume Versions</CardTitle>
              <CardDescription>Manage your different resume versions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search versions..." className="pl-9" />
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Versions</TabsTrigger>
                <TabsTrigger value="recent">Recently Updated</TabsTrigger>
                <TabsTrigger value="best">Best Performing</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Name</th>
                          <th className="text-left p-3 font-medium">Last Updated</th>
                          <th className="text-left p-3 font-medium">Match Score</th>
                          <th className="text-center p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resumeData.versions.map((version) => (
                          <tr key={version.id} className="border-t">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <div className="font-medium">{version.name}</div>
                              </div>
                            </td>
                            <td className="p-3">{version.lastUpdated}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Progress value={version.matchScore} className="h-2 w-24" />
                                <span>{version.matchScore}%</span>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                  <Download className="h-4 w-4" />
                                  Download
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recent">
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Name</th>
                          <th className="text-left p-3 font-medium">Last Updated</th>
                          <th className="text-left p-3 font-medium">Match Score</th>
                          <th className="text-center p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resumeData.versions
                          .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                          .map((version) => (
                            <tr key={version.id} className="border-t">
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-5 w-5 text-muted-foreground" />
                                  <div className="font-medium">{version.name}</div>
                                </div>
                              </td>
                              <td className="p-3">{version.lastUpdated}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Progress value={version.matchScore} className="h-2 w-24" />
                                  <span>{version.matchScore}%</span>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <Button variant="outline" size="sm">
                                    Edit
                                  </Button>
                                  <Button variant="outline" size="sm" className="gap-1">
                                    <Download className="h-4 w-4" />
                                    Download
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="best">
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Name</th>
                          <th className="text-left p-3 font-medium">Last Updated</th>
                          <th className="text-left p-3 font-medium">Match Score</th>
                          <th className="text-center p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resumeData.versions
                          .sort((a, b) => b.matchScore - a.matchScore)
                          .map((version) => (
                            <tr key={version.id} className="border-t">
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-5 w-5 text-muted-foreground" />
                                  <div className="font-medium">{version.name}</div>
                                </div>
                              </td>
                              <td className="p-3">{version.lastUpdated}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Progress value={version.matchScore} className="h-2 w-24" />
                                  <span>{version.matchScore}%</span>
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <Button variant="outline" size="sm">
                                    Edit
                                  </Button>
                                  <Button variant="outline" size="sm" className="gap-1">
                                    <Download className="h-4 w-4" />
                                    Download
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      </div>
    </DashboardLayout>
  )
}

