import { Award, Filter, MoreHorizontal, PlusCircle, Search, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { achievementsData } from "@/data/documentation"

export default function AchievementsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Achievements"
        description="Track and showcase your professional accomplishments"
        backHref="/documentation"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Achievement
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{achievementsData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{achievementsData.filter((a) => a.impact === "High").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{achievementsData.filter((a) => a.verified).length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Achievement Categories</CardTitle>
          <CardDescription>Distribution of your achievements by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <Card className="border shadow-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  Technical
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {achievementsData.filter((a) => a.category === "Technical").length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(
                    (achievementsData.filter((a) => a.category === "Technical").length / achievementsData.length) * 100,
                  )}
                  % of total
                </div>
              </CardContent>
            </Card>
            <Card className="border shadow-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-secondary" />
                  Leadership
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {achievementsData.filter((a) => a.category === "Leadership").length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(
                    (achievementsData.filter((a) => a.category === "Leadership").length / achievementsData.length) *
                      100,
                  )}
                  % of total
                </div>
              </CardContent>
            </Card>
            <Card className="border shadow-none">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                  DevOps
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {achievementsData.filter((a) => a.category === "DevOps").length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(
                    (achievementsData.filter((a) => a.category === "DevOps").length / achievementsData.length) * 100,
                  )}
                  % of total
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your professional accomplishments</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search achievements..." className="pl-9" />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="leadership">Leadership</TabsTrigger>
                <TabsTrigger value="devops">DevOps</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <AchievementsList achievements={achievementsData} />
              </TabsContent>

              <TabsContent value="technical">
                <AchievementsList achievements={achievementsData.filter((a) => a.category === "Technical")} />
              </TabsContent>

              <TabsContent value="leadership">
                <AchievementsList achievements={achievementsData.filter((a) => a.category === "Leadership")} />
              </TabsContent>

              <TabsContent value="devops">
                <AchievementsList achievements={achievementsData.filter((a) => a.category === "DevOps")} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

function AchievementsList({ achievements }: { achievements: typeof achievementsData }) {
  if (achievements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Award className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="font-medium">No achievements found</h3>
        <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <Card key={achievement.id} className="border shadow-sm">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{achievement.title}</CardTitle>
                {achievement.verified && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Add to resume</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>
              {achievement.date} • {achievement.category}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {achievement.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Impact: {achievement.impact}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

