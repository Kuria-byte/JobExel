"use client"

import { BookOpen, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample skills data
const skills = [
  {
    name: "React",
    current: 85,
    target: 90,
    gap: 5,
    category: "technical",
  },
  {
    name: "Node.js",
    current: 78,
    target: 85,
    gap: 7,
    category: "technical",
  },
  {
    name: "TypeScript",
    current: 82,
    target: 90,
    gap: 8,
    category: "technical",
  },
  {
    name: "System Design",
    current: 65,
    target: 85,
    gap: 20,
    category: "technical",
  },
  {
    name: "Project Management",
    current: 70,
    target: 80,
    gap: 10,
    category: "leadership",
  },
]

// Sample recommendations
const recommendations = [
  {
    skill: "System Design",
    resource: "System Design Interview Course",
    provider: "Educative.io",
    duration: "20 hours",
    url: "#",
  },
  {
    skill: "TypeScript",
    resource: "Advanced TypeScript Patterns",
    provider: "Frontend Masters",
    duration: "6 hours",
    url: "#",
  },
]

export function SkillsGapCard({ className }: { className?: string }) {
  // Sort skills by gap size (descending)
  const sortedSkills = [...skills].sort((a, b) => b.gap - a.gap)

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-primary" />
              Skills Gap Analysis
            </CardTitle>
            <CardDescription className="text-xs">Identify and close skill gaps for desired roles</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs defaultValue="gaps">
          <TabsList className="h-8 w-full">
            <TabsTrigger value="gaps" className="flex-1 text-xs">
              Skill Gaps
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex-1 text-xs">
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gaps" className="mt-3 space-y-3">
            <div className="text-xs font-medium">Target Role: Senior Software Engineer</div>

            <div className="space-y-3">
              {sortedSkills.slice(0, 3).map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Current: {skill.current}% | Target: {skill.target}%
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="h-1.5 rounded bg-muted overflow-hidden">
                      <div className="h-full rounded bg-primary" style={{ width: `${skill.current}%` }} />
                    </div>
                    <div className="absolute top-1 h-1.5 w-0.5 bg-accent" style={{ left: `${skill.target}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border p-2 bg-muted/20">
              <div className="text-xs font-medium mb-1">Gap Analysis</div>
              <div className="text-xs text-muted-foreground">
                Your largest skill gaps are in <span className="font-medium text-foreground">System Design</span> (20%)
                and <span className="font-medium text-foreground">Project Management</span> (10%). Focus on these areas
                to increase your competitiveness for Senior roles.
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-3">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted/50 px-2 py-1.5 text-xs font-medium">Learning Recommendations</div>
              <div className="divide-y">
                {recommendations.map((rec) => (
                  <div key={rec.skill} className="p-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium">{rec.resource}</div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <span>{rec.provider}</span>
                          <span>•</span>
                          <span>{rec.duration}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span className="sr-only">View resource</span>
                      </Button>
                    </div>
                    <Badge variant="outline" className="mt-1.5 bg-background text-[10px] font-normal px-1 py-0 h-4">
                      For {rec.skill}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full text-xs h-7">
          View complete skills analysis
        </Button>
      </CardFooter>
    </Card>
  )
}

