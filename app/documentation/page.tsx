import Link from "next/link"
import { Award, FileText, PlusCircle, Star, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { resumeData, achievementsData, referencesData } from "@/data/documentation"

export default function DocumentationPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Documentation"
        description="Manage your professional documents and achievements"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Document
          </Button>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{achievementsData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">References</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{referencesData.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Resume Lab
            </CardTitle>
            <CardDescription>Manage and optimize your resume versions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Best Performing Resume</span>
                    <span>{Math.max(...resumeData.versions.map((v) => v.matchScore))}% match</span>
                  </div>
                  <Progress value={Math.max(...resumeData.versions.map((v) => v.matchScore))} className="h-2" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recent Versions</h3>
                <div className="space-y-2">
                  {resumeData.versions.slice(0, 3).map((version) => (
                    <div key={version.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <div className="font-medium">{version.name}</div>
                        <div className="text-xs text-muted-foreground">Last updated: {version.lastUpdated}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{version.matchScore}%</div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/documentation/resume">Go to Resume Lab</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>Track your professional accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg border p-2">
                  <div className="text-2xl font-bold text-primary">
                    {achievementsData.filter((a) => a.category === "Technical").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Technical</div>
                </div>
                <div className="rounded-lg border p-2">
                  <div className="text-2xl font-bold text-secondary">
                    {achievementsData.filter((a) => a.category === "Leadership").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Leadership</div>
                </div>
                <div className="rounded-lg border p-2">
                  <div className="text-2xl font-bold text-accent">
                    {achievementsData.filter((a) => a.category === "DevOps").length}
                  </div>
                  <div className="text-xs text-muted-foreground">DevOps</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recent Achievements</h3>
                <div className="space-y-2">
                  {achievementsData.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-xs bg-muted px-2 py-0.5 rounded-full">{achievement.category}</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {achievement.date} • Impact: {achievement.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/documentation/achievements">View All Achievements</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-primary" />
            References
          </CardTitle>
          <CardDescription>Manage your professional references</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card className="border shadow-none">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Confirmed</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold text-green-500">
                    {referencesData.filter((r) => r.status === "Confirmed").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Ready to use</div>
                </CardContent>
              </Card>
              <Card className="border shadow-none">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Pending</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold text-yellow-500">
                    {referencesData.filter((r) => r.status === "Pending").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Awaiting confirmation</div>
                </CardContent>
              </Card>
              <Card className="border shadow-none">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Conditional</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold text-blue-500">
                    {referencesData.filter((r) => r.status === "Conditional").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Limited availability</div>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 font-medium">Recent References</div>
              <div className="divide-y">
                {referencesData.slice(0, 3).map((reference) => (
                  <div key={reference.id} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{reference.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {reference.title} at {reference.company}
                      </div>
                      <div className="text-sm mt-1">Relationship: {reference.relationship}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </div>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href="/documentation/references">Manage References</Link>
          </Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  )
}

