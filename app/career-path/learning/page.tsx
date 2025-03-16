import { ExternalLink, Filter, Lightbulb, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { careerPathData } from "@/data/career-path"

export default function LearningRecommendationsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Learning Recommendations"
        description="Personalized learning resources to help you reach your career goals"
        backHref="/career-path"
        actions={
          <Button size="sm">
            <Lightbulb className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        }
      />

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search resources..." className="pl-9" />
          </div>
          <Button variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Learning Resources</CardTitle>
            <CardDescription>Curated resources to help you develop your skills</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="leadership">Leadership</TabsTrigger>
                <TabsTrigger value="high-relevance">High Relevance</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {careerPathData.learningResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="technical">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {careerPathData.learningResources
                    .filter((resource) =>
                      resource.skills.some((skill) =>
                        ["React", "TypeScript", "JavaScript", "System Design", "Architecture"].includes(skill),
                      ),
                    )
                    .map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="leadership">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {careerPathData.learningResources
                    .filter((resource) =>
                      resource.skills.some((skill) => ["Leadership", "Communication", "Mentorship"].includes(skill)),
                    )
                    .map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="high-relevance">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {careerPathData.learningResources
                    .filter((resource) => resource.relevance === "High")
                    .map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Path</CardTitle>
          <CardDescription>Suggested sequence of learning resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />
            <div className="space-y-6">
              {careerPathData.learningResources.slice(0, 3).map((resource, index) => (
                <div key={resource.id} className="relative flex gap-4">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center bg-background border-2 border-primary z-10">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg font-medium">{resource.title}</h3>
                    <p className="text-muted-foreground">{resource.provider}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resource.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="gap-1" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Start Learning
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

function ResourceCard({ resource }: { resource: (typeof careerPathData.learningResources)[0] }) {
  return (
    <Card className="border shadow-sm">
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
  )
}

