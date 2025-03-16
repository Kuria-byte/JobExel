import { ArrowRight, Filter, PlusCircle, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { pivotOptions } from "@/data/resilience"

export default function PivotPlannerPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Pivot Planner"
        description="Explore alternative career paths and transitions"
        backHref="/resilience"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Career Interest
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Software Engineer</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Career Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pivotOptions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Best Match</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pivotOptions.sort((a, b) => b.skillsMatch - a.skillsMatch)[0].title}
            </div>
            <div className="text-sm text-muted-foreground">
              {pivotOptions.sort((a, b) => b.skillsMatch - a.skillsMatch)[0].skillsMatch}% skills match
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Skills Transferability</CardTitle>
          <CardDescription>How your current skills transfer to different roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pivotOptions.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{option.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Match: <span className="font-medium text-foreground">{option.skillsMatch}%</span>
                  </div>
                </div>
                <Progress value={option.skillsMatch} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Career Pivot Options</CardTitle>
              <CardDescription>Detailed analysis of potential career transitions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search career options..." className="pl-9" />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Options</TabsTrigger>
                <TabsTrigger value="high-match">High Match</TabsTrigger>
                <TabsTrigger value="quick-transition">Quick Transition</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-6">
                  {pivotOptions.map((option) => (
                    <Card key={option.id} className="border shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{option.title}</CardTitle>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            {option.skillsMatch}% Match
                          </Badge>
                        </div>
                        <CardDescription>{option.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Required Skills</h4>
                            <div className="flex flex-wrap gap-1">
                              {option.requiredSkills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">Transition Timeline</h4>
                            <div className="text-sm">{option.timeEstimate}</div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">Recommended Resources</h4>
                            <div className="space-y-2">
                              {option.resources.map((resource, index) => (
                                <div key={index} className="rounded-lg border p-2">
                                  <div className="flex items-center justify-between">
                                    <div className="font-medium text-sm">{resource.title}</div>
                                    <div className="text-xs text-muted-foreground">{resource.duration}</div>
                                  </div>
                                  <div className="text-xs text-muted-foreground">{resource.provider}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button className="w-full gap-1">
                          Explore This Path
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="high-match">
                <div className="space-y-6">
                  {pivotOptions
                    .filter((option) => option.skillsMatch >= 70)
                    .map((option) => (
                      <Card key={option.id} className="border shadow-sm">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{option.title}</CardTitle>
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {option.skillsMatch}% Match
                            </Badge>
                          </div>
                          <CardDescription>{option.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-1">Required Skills</h4>
                              <div className="flex flex-wrap gap-1">
                                {option.requiredSkills.map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-1">Transition Timeline</h4>
                              <div className="text-sm">{option.timeEstimate}</div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-1">Recommended Resources</h4>
                              <div className="space-y-2">
                                {option.resources.map((resource, index) => (
                                  <div key={index} className="rounded-lg border p-2">
                                    <div className="flex items-center justify-between">
                                      <div className="font-medium text-sm">{resource.title}</div>
                                      <div className="text-xs text-muted-foreground">{resource.duration}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{resource.provider}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full gap-1">
                            Explore This Path
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="quick-transition">
                <div className="space-y-6">
                  {pivotOptions
                    .filter((option) => option.timeEstimate.includes("4-6"))
                    .map((option) => (
                      <Card key={option.id} className="border shadow-sm">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{option.title}</CardTitle>
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {option.skillsMatch}% Match
                            </Badge>
                          </div>
                          <CardDescription>{option.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-1">Required Skills</h4>
                              <div className="flex flex-wrap gap-1">
                                {option.requiredSkills.map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-1">Transition Timeline</h4>
                              <div className="text-sm">{option.timeEstimate}</div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-1">Recommended Resources</h4>
                              <div className="space-y-2">
                                {option.resources.map((resource, index) => (
                                  <div key={index} className="rounded-lg border p-2">
                                    <div className="flex items-center justify-between">
                                      <div className="font-medium text-sm">{resource.title}</div>
                                      <div className="text-xs text-muted-foreground">{resource.duration}</div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{resource.provider}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button className="w-full gap-1">
                            Explore This Path
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

