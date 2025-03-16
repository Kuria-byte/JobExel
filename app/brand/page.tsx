import Link from "next/link"
import { Globe, Lightbulb, PlusCircle, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PageHeader } from "@/components/page-header"
import { onlinePresenceData, contentStrategyData, personalBrandData } from "@/data/brand"

export default function BrandPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Brand & Presence"
        description="Build and manage your professional brand"
        actions={
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Create Content
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Online Presence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(
                onlinePresenceData.platforms.reduce((acc, platform) => acc + platform.strength, 0) /
                  onlinePresenceData.platforms.length,
              )}
              %
            </div>
            <div className="text-sm text-muted-foreground">Overall strength</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Content Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {
                contentStrategyData.contentCalendar.filter(
                  (item) => item.status === "planned" || item.status === "draft",
                ).length
              }
            </div>
            <div className="text-sm text-muted-foreground">Upcoming content pieces</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Brand Perception</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {(
                personalBrandData.brandPerception.attributes.reduce((acc, attr) => acc + attr.score, 0) /
                personalBrandData.brandPerception.attributes.length
              ).toFixed(1)}
              /5
            </div>
            <div className="text-sm text-muted-foreground">Average rating</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              Online Presence
            </CardTitle>
            <CardDescription>Manage your digital footprint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {onlinePresenceData.platforms.map((platform) => (
                <div key={platform.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Strength: <span className="font-medium text-foreground">{platform.strength}%</span>
                    </div>
                  </div>
                  <Progress value={platform.strength} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>Last updated: {platform.lastUpdated}</div>
                    <div>
                      {platform.followers ? `${platform.followers} followers` : `${platform.visitors} monthly visitors`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/brand/online">Manage Online Presence</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-primary" />
              Content Strategy
            </CardTitle>
            <CardDescription>Plan and track your professional content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Upcoming Content</h3>
                <div className="space-y-2">
                  {contentStrategyData.contentCalendar
                    .filter((item) => item.status === "planned" || item.status === "draft")
                    .slice(0, 3)
                    .map((item) => (
                      <div key={item.id} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{item.title}</div>
                          <div
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              item.status === "published"
                                ? "bg-green-500/10 text-green-500"
                                : item.status === "draft"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-blue-500/10 text-blue-500"
                            }`}
                          >
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                          <div>
                            {item.platform} • {item.type}
                          </div>
                          <div>{item.dueDate || item.publishDate}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Content Performance</h3>
                <div className="space-y-2">
                  {contentStrategyData.contentPerformance.slice(0, 2).map((item, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.platform}</div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-medium">{item.views}</span> views
                        </div>
                        <div>
                          <span className="font-medium">{item.engagement}%</span> engagement
                        </div>
                        <div>
                          <span className="font-medium">{item.leads}</span> leads
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
              <Link href="/brand/content">Manage Content</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5 text-primary" />
            Personal Brand
          </CardTitle>
          <CardDescription>Define and refine your professional identity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Brand Statement</h3>
              <p className="text-sm italic">"{personalBrandData.brandStatement}"</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Key Attributes</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {personalBrandData.keyAttributes.map((attribute) => (
                  <div key={attribute.name} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{attribute.name}</div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{attribute.strength}%</span>
                      </div>
                    </div>
                    <Progress value={attribute.strength} className="h-2 mt-2 mb-2" />
                    <div className="text-xs text-muted-foreground">{attribute.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Target Audience</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {personalBrandData.targetAudience.map((audience) => (
                  <div key={audience.name} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{audience.name}</div>
                      <div
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          audience.relevance === "high"
                            ? "bg-green-500/10 text-green-500"
                            : audience.relevance === "medium"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {audience.relevance.charAt(0).toUpperCase() + audience.relevance.slice(1)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">{audience.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href="/brand/personal">Manage Personal Brand</Link>
          </Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  )
}

