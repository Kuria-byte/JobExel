"use client"

import { useState } from "react"
import { CheckCircle2, Clock, FileText, MessageSquare, User2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample activity data
const activities = [
  {
    id: 1,
    type: "resume",
    title: "Resume optimized for Senior Software Engineer role",
    time: "2 hours ago",
    icon: FileText,
    iconColor: "text-blue-500 bg-blue-500/10",
  },
  {
    id: 2,
    type: "interview",
    title: "Mock interview session completed",
    description: "React Technical Interview - Score: 85/100",
    time: "Yesterday at 4:30 PM",
    icon: User2,
    iconColor: "text-purple-500 bg-purple-500/10",
  },
  {
    id: 3,
    type: "application",
    title: "Application submitted to Stripe",
    description: "Senior Software Engineer",
    time: "Yesterday at 2:15 PM",
    icon: CheckCircle2,
    iconColor: "text-green-500 bg-green-500/10",
  },
  {
    id: 4,
    type: "learning",
    title: "Completed System Design course",
    description: "Added to your achievement record",
    time: "2 days ago",
    icon: MessageSquare,
    iconColor: "text-orange-500 bg-orange-500/10",
  },
  {
    id: 5,
    type: "reminder",
    title: "Follow-up reminder set",
    description: "Microsoft application - Follow up next Tuesday",
    time: "2 days ago",
    icon: Clock,
    iconColor: "text-red-500 bg-red-500/10",
  },
]

export function ActivityFeedCard({ className }: { className?: string }) {
  const [filter, setFilter] = useState("all")

  const filteredActivities = activities.filter((activity) => {
    if (filter === "all") return true
    return activity.type === filter
  })

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs h-7">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
          <TabsList className="h-7 w-full mb-3">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="resume" className="text-xs">
              Resume
            </TabsTrigger>
            <TabsTrigger value="application" className="text-xs">
              Applications
            </TabsTrigger>
            <TabsTrigger value="interview" className="text-xs">
              Interviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="mt-0">
            <div className="space-y-4">
              {filteredActivities.map((activity) => {
                const Icon = activity.icon

                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div
                      className={`relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.iconColor}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 grid gap-0.5">
                      <div className="text-sm font-medium">{activity.title}</div>
                      {activity.description && (
                        <div className="text-xs text-muted-foreground">{activity.description}</div>
                      )}
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                )
              })}

              {filteredActivities.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">No activities found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

