import { ArrowRight, CheckCircle, Clock, Compass, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { careerPathData } from "@/data/career-path"

export default function TrajectoryPlannerPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Trajectory Planner"
        description="Plan and visualize your career progression path"
        backHref="/career-path"
        actions={
          <Button size="sm">
            <Target className="mr-2 h-4 w-4" />
            Update Goals
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{careerPathData.currentRole}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Target Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{careerPathData.targetRole}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Timeframe</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{careerPathData.timeframe}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Compass className="mr-2 h-5 w-5 text-primary" />
            Career Progression Path
          </CardTitle>
          <CardDescription>Your journey from current to target role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />
            <div className="space-y-8">
              {careerPathData.milestones.map((milestone, index) => {
                const StatusIcon =
                  milestone.status === "completed"
                    ? CheckCircle
                    : milestone.status === "in-progress"
                      ? Clock
                      : ArrowRight

                const iconColor =
                  milestone.status === "completed"
                    ? "text-green-500"
                    : milestone.status === "in-progress"
                      ? "text-yellow-500"
                      : "text-muted-foreground"

                return (
                  <div key={milestone.id} className="relative flex gap-4">
                    <div
                      className={`h-12 w-12 rounded-full flex items-center justify-center bg-background border-2 z-10 ${
                        milestone.status === "completed"
                          ? "border-green-500"
                          : milestone.status === "in-progress"
                            ? "border-yellow-500"
                            : "border-muted"
                      }`}
                    >
                      <StatusIcon className={`h-5 w-5 ${iconColor}`} />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">{milestone.title}</h3>
                        <StatusBadge status={milestone.status as any} />
                      </div>
                      <p className="text-muted-foreground mt-1">{milestone.description}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Milestone Details</CardTitle>
          <CardDescription>Detailed information about each career milestone</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="1">
            <TabsList className="mb-4">
              {careerPathData.milestones.map((milestone) => (
                <TabsTrigger key={milestone.id} value={milestone.id.toString()}>
                  {milestone.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {careerPathData.milestones.map((milestone) => (
              <TabsContent key={milestone.id} value={milestone.id.toString()}>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border shadow-none">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Key Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Lead a medium-sized project from start to finish</li>
                          <li>Document technical decisions and architecture</li>
                          <li>Present project outcomes to stakeholders</li>
                          <li>Mentor junior team members during implementation</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border shadow-none">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">Success Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Project delivered on time and within scope</li>
                          <li>Positive feedback from team members</li>
                          <li>Clear documentation that others can follow</li>
                          <li>Demonstrated technical leadership skills</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Timeline</h4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Start: Q3 2023</span>
                        <span>Target Completion: Q1 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

