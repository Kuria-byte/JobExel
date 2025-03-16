import Link from "next/link"
import { BarChart3, BookOpen, ChevronRight, PlusCircle, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { AddSkillDialog } from "@/components/modals/add-skill-dialog"
import { careerPathData, skillGaps } from "@/data/career-path"

export default function CareerPathPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Career Path"
        description="Plan and track your professional growth"
        actions={
          <AddSkillDialog
            trigger={
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Skill
              </Button>
            }
          />
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{careerPathData.currentRole}</div>
            <div className="text-sm text-muted-foreground">{careerPathData.company}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Target Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{careerPathData.targetRole}</div>
            <div className="text-sm text-muted-foreground">Est. timeline: {careerPathData.timeframe}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Skills Gap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{skillGaps.length}</div>
            <div className="text-sm text-muted-foreground">Skills to develop</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Trajectory Planner
            </CardTitle>
            <CardDescription>Visualize your career progression path</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Career Milestones</h3>
                <div className="relative pl-6 border-l">
                  {careerPathData.milestones.map((milestone, index) => (
                    <div key={index} className="mb-6 relative">
                      <div className="absolute -left-[25px] flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                        <div className={`h-3 w-3 rounded-full ${milestone.status =="completed" ? "bg-primary" : "bg-muted"}`} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{milestone.role}</div>
                          {milestone.status=="completed" && (
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{milestone.company}</div>
                        <div className="text-xs text-muted-foreground">{milestone.timeframe}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Progress to Target Role</h3>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{careerPathData.progressPercentage}%</span>
                  </div>
                  <Progress value={careerPathData.progressPercentage} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/career-path/trajectory">View Detailed Plan</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Skills Gap Analysis
            </CardTitle>
            <CardDescription>Identify and close skill gaps for your target role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillGaps.slice(0, 4).map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Gap: <span className="font-medium text-foreground">{skill.gap}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground w-10">Current</div>
                    <Progress value={(skill.currentLevel / skill.targetLevel) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground w-10 text-right">Target</div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>Priority: {skill.priority}</div>
                    <div>Category: {skill.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/career-path/skills">View All Skills</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Learning Recommendations
          </CardTitle>
          <CardDescription>Personalized resources to help you grow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {careerPathData.learningResources.slice(0, 6).map((resource) => (
              <Card key={resource.id} className="border shadow-none">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="mb-2">
                      {resource.type}
                    </Badge>
                    <Badge variant={resource.priority === "High" ? "destructive" : "outline"}>
                      {resource.priority} Priority
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-muted-foreground">Provider:</div>
                      <div>{resource.provider}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-muted-foreground">Duration:</div>
                      <div>{resource.duration}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-muted-foreground">Skills:</div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {resource.skills.slice(0, 2).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {resource.skills.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{resource.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      View Resource
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href="/career-path/learning">View All Resources</Link>
          </Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  )
}

