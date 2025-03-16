import Link from "next/link"
import { PlusCircle, RefreshCcw, Shield, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { rejectionData, pivotOptions, burnoutAssessment } from "@/data/resilience"

export default function ResiliencePage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Resilience"
        description="Build mental strength and adaptability for your career journey"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Log Experience
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resilience Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78/100</div>
            <div className="text-sm text-muted-foreground">+5 points this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Burnout Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{burnoutAssessment.risk}</div>
            <div className="text-sm text-muted-foreground">Last assessed: {burnoutAssessment.lastAssessment}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejections Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{rejectionData.length}</div>
            <div className="text-sm text-muted-foreground">All rejections analyzed</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <XCircle className="mr-2 h-5 w-5 text-primary" />
              Rejection Recovery
            </CardTitle>
            <CardDescription>Learn and grow from job rejections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Rejection Processing</span>
                    <span>
                      {rejectionData.filter((r) => r.status === "processed").length}/{rejectionData.length} processed
                    </span>
                  </div>
                  <Progress
                    value={(rejectionData.filter((r) => r.status === "processed").length / rejectionData.length) * 100}
                    className="h-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recent Rejections</h3>
                <div className="space-y-2">
                  {rejectionData.slice(0, 3).map((rejection) => (
                    <div key={rejection.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{rejection.company}</div>
                        <div className="text-xs text-muted-foreground">{rejection.date}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {rejection.role} - {rejection.stage}
                      </div>
                      <div className="mt-2">
                        <div className="text-xs font-medium">Key Learnings:</div>
                        <div className="text-xs text-muted-foreground">{rejection.learnings}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/resilience/rejection">View All Rejections</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RefreshCcw className="mr-2 h-5 w-5 text-primary" />
              Pivot Planner
            </CardTitle>
            <CardDescription>Explore alternative career paths</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Potential Career Pivots</h3>
                <div className="space-y-2">
                  {pivotOptions.slice(0, 2).map((option) => (
                    <div key={option.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{option.title}</div>
                        <div className="text-xs bg-muted px-2 py-0.5 rounded-full">{option.skillsMatch}% match</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                      <div className="mt-2">
                        <div className="text-xs font-medium">Required Skills:</div>
                        <div className="text-xs text-muted-foreground">{option.requiredSkills.join(", ")}</div>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs font-medium">Estimated Transition Time:</div>
                        <div className="text-xs text-muted-foreground">{option.timeEstimate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/resilience/pivot">Explore Career Pivots</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            Burnout Prevention
          </CardTitle>
          <CardDescription>Monitor and manage your well-being</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Burnout Risk Assessment</h3>
                <div className="text-sm">
                  Score:{" "}
                  <span className="font-medium">
                    {burnoutAssessment.score}/{burnoutAssessment.maxScore}
                  </span>
                </div>
              </div>
              <Progress value={(burnoutAssessment.score / burnoutAssessment.maxScore) * 100} className="h-2" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {burnoutAssessment.factors.slice(0, 3).map((factor) => (
                <Card key={factor.name} className="border shadow-none">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{factor.name}</CardTitle>
                      <div
                        className={`text-xs px-2 py-0.5 rounded-full
                        ${
                          factor.risk === "Low"
                            ? "bg-green-500/10 text-green-500"
                            : factor.risk === "Moderate"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {factor.risk} Risk
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Score</span>
                        <span>
                          {factor.score}/{factor.maxScore}
                        </span>
                      </div>
                      <Progress value={(factor.score / factor.maxScore) * 100} className="h-1.5" />
                      <div className="text-xs text-muted-foreground mt-2">
                        <div className="font-medium mb-1">Recommendations:</div>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {factor.recommendations.slice(0, 2).map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Prevention Plan Progress</h3>
              <div className="space-y-2">
                {burnoutAssessment.preventionPlan.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div
                      className={`mt-0.5 h-4 w-4 rounded-sm border flex items-center justify-center ${
                        item.completed ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"
                      }`}
                    >
                      {item.completed && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href="/resilience/burnout">View Detailed Assessment</Link>
          </Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  )
}

