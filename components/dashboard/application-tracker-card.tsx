"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Clock, ExternalLink, FilePlus, MapPin, MoreHorizontal, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample application data
const applications = [
  {
    id: 1,
    company: "Stripe",
    role: "Senior Software Engineer",
    location: "Remote",
    salary: "$140K - $180K",
    status: "applied",
    date: "2023-06-15",
    logo: "/placeholder.svg?height=32&width=32",
    followUp: true,
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Full Stack Developer",
    location: "Seattle, WA",
    salary: "$130K - $160K",
    status: "interview",
    date: "2023-06-10",
    logo: "/placeholder.svg?height=32&width=32",
    followUp: false,
  },
  {
    id: 3,
    company: "Vercel",
    role: "Frontend Engineer",
    location: "Remote",
    salary: "$120K - $150K",
    status: "applied",
    date: "2023-06-05",
    logo: "/placeholder.svg?height=32&width=32",
    followUp: true,
  },
]

// Status mapping
const statuses: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  applied: {
    label: "Applied",
    icon: Clock,
    color: "text-blue-500 bg-blue-500/10",
  },
  interview: {
    label: "Interviewing",
    icon: AlertCircle,
    color: "text-yellow-500 bg-yellow-500/10",
  },
  offer: {
    label: "Offer",
    icon: CheckCircle2,
    color: "text-green-500 bg-green-500/10",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-500 bg-red-500/10",
  },
}

export function ApplicationTrackerCard({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState("all")

  const filteredApplications = applications.filter((app) => {
    if (activeTab === "all") return true
    if (activeTab === "followup") return app.followUp
    return app.status === activeTab
  })

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <FilePlus className="h-4 w-4 text-primary" />
              Application Tracker
            </CardTitle>
            <CardDescription className="text-xs">Monitor and manage your job applications</CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-normal">
            Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList className="h-8">
              <TabsTrigger value="all" className="text-xs px-2.5">
                All
              </TabsTrigger>
              <TabsTrigger value="applied" className="text-xs px-2.5">
                Applied
              </TabsTrigger>
              <TabsTrigger value="interview" className="text-xs px-2.5">
                Interviews
              </TabsTrigger>
              <TabsTrigger value="followup" className="text-xs px-2.5">
                Follow-up
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="gap-1 text-xs h-7 px-2">
              <FilePlus className="h-3 w-3" />
              Add New
            </Button>
          </div>

          <TabsContent value={activeTab} className="mt-3">
            <div className="rounded-lg border overflow-hidden">
              <div className="overflow-auto max-h-[150px]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-xs font-medium text-left p-1.5 pl-2">Company</th>
                      <th className="text-xs font-medium text-left p-1.5">Role</th>
                      <th className="text-xs font-medium text-left p-1.5">Status</th>
                      <th className="text-xs font-medium text-center p-1.5 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => {
                      const status = statuses[app.status]
                      const StatusIcon = status.icon

                      return (
                        <tr key={app.id} className="border-t">
                          <td className="p-1.5 pl-2">
                            <div className="flex items-center gap-1.5">
                              <div className="h-6 w-6 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                                <img
                                  src={app.logo || "/placeholder.svg"}
                                  alt={app.company}
                                  width={24}
                                  height={24}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="font-medium text-xs">{app.company}</div>
                            </div>
                          </td>
                          <td className="p-1.5">
                            <div className="text-xs">{app.role}</div>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                              <div className="flex items-center gap-0.5">
                                <MapPin className="h-2.5 w-2.5" />
                                {app.location}
                              </div>
                            </div>
                          </td>
                          <td className="p-1.5">
                            <div
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${status.color}`}
                            >
                              <StatusIcon className="h-2.5 w-2.5" />
                              {status.label}
                            </div>
                          </td>
                          <td className="p-1.5 text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <MoreHorizontal className="h-3.5 w-3.5" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-xs">View details</DropdownMenuItem>
                                <DropdownMenuItem className="text-xs">Update status</DropdownMenuItem>
                                <DropdownMenuItem className="text-xs">Add notes</DropdownMenuItem>
                                <DropdownMenuItem className="text-xs">
                                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                                  Open job posting
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full text-xs h-7">
          View all applications
        </Button>
      </CardFooter>
    </Card>
  )
}

