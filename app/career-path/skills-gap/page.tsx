import { BookOpen, ExternalLink, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { careerPathData } from "@/data/career-path"

export default function SkillsGapPage() {
  // Sort skills by gap size (descending)
  const sortedSkills = [...careerPathData.skills].sort((a, b) => b.gap - a.gap)

  return (
    <DashboardLayout>
      <PageHeader
        title="Skills Gap Analysis"
        description="Identify and close skill gaps for your target role"
        backHref="/career-path"
        actions={
          <Button size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        }
      />

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search skills..." className="pl-9" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Skills Analysis
            </CardTitle>
            <CardDescription>
              Your current skills compared to requirements for {careerPathData.targetRole}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Skills</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="leadership">Leadership</TabsTrigger>
                <TabsTrigger value="largest-gaps">Largest Gaps</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {sortedSkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{skill.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Gap: <span className="font-medium text-foreground">{skill.gap}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>Current: {skill.current}%</div>
                      <div>Target: {skill.target}%</div>
                    </div>
                    <div className="relative pt-1">
                      <div className="h-2 rounded bg-muted overflow-hidden">
                        <div className="h-full rounded bg-primary" style={{ width: `${skill.current}%` }} />
                      </div>
                      <div className="absolute top-1 h-2 w-0.5 bg-accent" style={{ left: `${skill.target}%` }} />
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="technical" className="space-y-6">
                {sortedSkills
                  .filter((skill) => skill.category === "technical")
                  .map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{skill.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Gap: <span className="font-medium text-foreground">{skill.gap}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>Current: {skill.current}%</div>
                        <div>Target: {skill.target}%</div>
                      </div>
                      <div className="relative pt-1">
                        <div className="h-2 rounded bg-muted overflow-hidden">
                          <div className="h-full rounded bg-primary" style={{ width: `${skill.current}%` }} />
                        </div>
                        <div className="absolute top-1 h-2 w-0.5 bg-accent" style={{ left: `${skill.target}%` }} />
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="leadership" className="space-y-6">
                {sortedSkills
                  .filter((skill) => skill.category === "leadership")
                  .map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{skill.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Gap: <span className="font-medium text-foreground">{skill.gap}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>Current: {skill.current}%</div>
                        <div>Target: {skill.target}%</div>
                      </div>
                      <div className="relative pt-1">
                        <div className="h-2 rounded bg-muted overflow-hidden">
                          <div className="h-full rounded bg-primary" style={{ width: `${skill.current}%` }} />
                        </div>
                        <div className="absolute top-1 h-2 w-0.5 bg-accent" style={{ left: `${skill.target}%` }} />
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="largest-gaps" className="space-y-6">
                {sortedSkills
                  .filter((skill) => skill.gap > 10)
                  .map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{skill.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Gap: <span className="font-medium text-foreground">{skill.gap}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>Current: {skill.current}%</div>
                        <div>Target: {skill.target}%</div>
                      </div>
                      <div className="relative pt-1">
                        <div className="h-2 rounded bg-muted overflow-hidden">
                          <div className="h-full rounded bg-primary" style={{ width: `${skill.current}%` }} />
                        </div>
                        <div className="absolute top-1 h-2 w-0.5 bg-accent" style={{ left: `${skill.target}%` }} />
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Learning Resources</CardTitle>
          <CardDescription>Resources to help you close your skill gaps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {careerPathData.learningResources.map((resource) => (
              <Card key={resource.id} className="border shadow-none">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">{resource.title}</CardTitle>
                  <CardDescription>{resource.provider}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 pb-2">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div>Duration: {resource.duration}</div>
                    <div>Difficulty: {resource.difficulty}</div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {resource.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm">
                    Relevance: <span className="font-medium">{resource.relevance}</span>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      View Course
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

