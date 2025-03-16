import { Download, Filter, Globe, PlusCircle, Search, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { onlinePresenceData } from "@/data/brand"

export default function OnlinePresencePage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Online Presence"
        description="Manage your digital footprint across platforms"
        backHref="/brand"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Add Platform
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(
                onlinePresenceData.platforms.reduce((acc, platform) => acc + platform.strength, 0) /
                  onlinePresenceData.platforms.length,
              )}
              %
            </div>
            <Progress
              value={Math.round(
                onlinePresenceData.platforms.reduce((acc, platform) => acc + platform.strength, 0) /
                  onlinePresenceData.platforms.length,
              )}
              className="h-2 mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Followers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {onlinePresenceData.platforms.reduce((acc, platform) => acc + (platform.followers || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Across all platforms</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(
                onlinePresenceData.platforms.reduce((acc, platform) => acc + platform.engagement, 0) /
                  onlinePresenceData.platforms.length,
              )}
              %
            </div>
            <div className="text-sm text-muted-foreground">Across all platforms</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recent Mentions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{onlinePresenceData.recentMentions.length}</div>
            <div className="text-sm text-muted-foreground">In the last 30 days</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                Platform Overview
              </CardTitle>
              <CardDescription>Manage your presence across different platforms</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search platforms..." className="pl-9" />
              </div>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Platforms</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-4">
                  {onlinePresenceData.platforms.map((platform) => (
                    <Card key={platform.name} className="border shadow-sm">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{platform.name}</CardTitle>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Settings className="h-4 w-4" />
                            <span className="sr-only">Settings</span>
                          </Button>
                        </div>
                        <CardDescription>
                          <a
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {platform.url}
                          </a>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Profile Strength</span>
                              <span>{platform.strength}%</span>
                            </div>
                            <Progress value={platform.strength} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border p-3">
                              <div className="text-sm text-muted-foreground">Followers</div>
                              <div className="text-xl font-bold">{platform.followers}</div>
                            </div>
                            <div className="rounded-lg border p-3">
                              <div className="text-sm text-muted-foreground">Engagement</div>
                              <div className="text-xl font-bold">{platform.engagement}%</div>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium mb-2">Recommendations</div>
                            <ul className="space-y-1">
                              {platform.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                  </div>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="social">
                <div className="space-y-4">
                  {onlinePresenceData.platforms
                    .filter((p) => p.name === "Twitter" || p.name === "LinkedIn")
                    .map((platform) => (
                      <Card key={platform.name} className="border shadow-sm">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{platform.name}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Settings</span>
                            </Button>
                          </div>
                          <CardDescription>
                            <a
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {platform.url}
                            </a>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Profile Strength</span>
                                <span>{platform.strength}%</span>
                              </div>
                              <Progress value={platform.strength} className="h-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-lg border p-3">
                                <div className="text-sm text-muted-foreground">Followers</div>
                                <div className="text-xl font-bold">{platform.followers}</div>
                              </div>
                              <div className="rounded-lg border p-3">
                                <div className="text-sm text-muted-foreground">Engagement</div>
                                <div className="text-xl font-bold">{platform.engagement}%</div>
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-medium mb-2">Recommendations</div>
                              <ul className="space-y-1">
                                {platform.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm">
                                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    </div>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="professional">
                <div className="space-y-4">
                  {onlinePresenceData.platforms
                    .filter((p) => p.name === "LinkedIn" || p.name === "GitHub")
                    .map((platform) => (
                      <Card key={platform.name} className="border shadow-sm">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{platform.name}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Settings</span>
                            </Button>
                          </div>
                          <CardDescription>
                            <a
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {platform.url}
                            </a>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Profile Strength</span>
                                <span>{platform.strength}%</span>
                              </div>
                              <Progress value={platform.strength} className="h-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-lg border p-3">
                                <div className="text-sm text-muted-foreground">Followers</div>
                                <div className="text-xl font-bold">{platform.followers}</div>
                              </div>
                              <div className="rounded-lg border p-3">
                                <div className="text-sm text-muted-foreground">Engagement</div>
                                <div className="text-xl font-bold">{platform.engagement}%</div>
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-medium mb-2">Recommendations</div>
                              <ul className="space-y-1">
                                {platform.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm">
                                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    </div>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="personal">
                <div className="space-y-4">
                  {onlinePresenceData.platforms
                    .filter((p) => p.name === "Personal Website")
                    .map((platform) => (
                      <Card key={platform.name} className="border shadow-sm">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{platform.name}</CardTitle>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Settings</span>
                            </Button>
                          </div>
                          <CardDescription>
                            <a
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {platform.url}
                            </a>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Profile Strength</span>
                                <span>{platform.strength}%</span>
                              </div>
                              <Progress value={platform.strength} className="h-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-lg border p-3">
                                <div className="text-sm text-muted-foreground">Monthly Visitors</div>
                                <div className="text-xl font-bold">{platform.followers}</div>
                              </div>
                              <div className="rounded-lg border p-3">
                                <div className="text-sm text-muted-foreground">Engagement</div>
                                <div className="text-xl font-bold">{platform.engagement}%</div>
                              </div>
                            </div>

                            <div>
                              <div className="text-sm font-medium mb-2">Recommendations</div>
                              <ul className="space-y-1">
                                {platform.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm">
                                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    </div>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-primary" />
            Recent Mentions
          </CardTitle>
          <CardDescription>Track mentions of you across the web</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {onlinePresenceData.recentMentions.map((mention, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{mention.platform}</div>
                  <div className="text-xs text-muted-foreground">{mention.date}</div>
                </div>
                <div className="mt-2 text-sm">{mention.content}</div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <div
                    className={`px-2 py-0.5 rounded-full ${
                      mention.sentiment === "positive"
                        ? "bg-green-500/10 text-green-500"
                        : mention.sentiment === "negative"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {mention.sentiment.charAt(0).toUpperCase() + mention.sentiment.slice(1)} sentiment
                  </div>
                  <div>
                    <span className="font-medium">{mention.engagement}</span> engagements
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

