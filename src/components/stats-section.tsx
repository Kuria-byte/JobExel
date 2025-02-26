"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Clock, FileText, Users, Award, Target, Calendar, Briefcase, TrendingUp, Building2, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

export function StatsSection() {
  const [showAll, setShowAll] = useState(false)

  const allStats = [
    {
      title: "Active Applications",
      value: "1",
      icon: Clock,
      tooltip: {
        title: "Active Applications",
        description: "Track applications that are currently in progress.",
        action: "View Active Applications",
      },
    },
    {
      title: "Total Applications",
      value: "1",
      icon: FileText,
      tooltip: {
        title: "Application History",
        description: "View all your past and present job applications.",
        action: "View All Applications",
      },
    },
    {
      title: "Interview Rate",
      value: "0%",
      icon: Users,
      tooltip: {
        title: "Interview Success Rate",
        description: "Analyze your interview performance and get AI tips to improve.",
        action: "View Interview Analytics",
      },
    },
    {
      title: "Offer Rate",
      value: "0%",
      icon: Award,
      tooltip: {
        title: "Job Offer Success",
        description: "Review your offer statistics and negotiation history.",
        action: "View Offer Analytics",
      },
    },
    {
      title: "Average Response",
      value: "3d",
      icon: Calendar,
      tooltip: {
        title: "Response Time Analytics",
        description: "Track average employer response times.",
        action: "View Response Analytics",
      },
    },
    {
      title: "Top Skills",
      value: "5",
      icon: Target,
      tooltip: {
        title: "Most Requested Skills",
        description: "View the most in-demand skills for your field.",
        action: "View Skill Analysis",
      },
    },
    {
      title: "Top Companies",
      value: "3",
      icon: Building2,
      tooltip: {
        title: "Most Applied Companies",
        description: "View companies you frequently apply to.",
        action: "View Company Insights",
      },
    },
    {
      title: "Salary Range",
      value: "150k",
      icon: TrendingUp,
      tooltip: {
        title: "Salary Analytics",
        description: "Track salary trends and ranges.",
        action: "View Salary Insights",
      },
    },
    {
      title: "Top Locations",
      value: "4",
      icon: MapPin,
      tooltip: {
        title: "Location Analysis",
        description: "View popular job locations and trends.",
        action: "View Location Insights",
      },
    },
    {
      title: "Job Types",
      value: "2",
      icon: Briefcase,
      tooltip: {
        title: "Job Type Analysis",
        description: "View distribution of full-time, contract, and other job types.",
        action: "View Job Type Insights",
      },
    },
  ]

  const visibleStats = showAll ? allStats : allStats.slice(0, window.innerWidth >= 1024 ? 6 : 4)

  return (
    <div className="space-y-4">
      <TooltipProvider>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {visibleStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent className="w-80">
                    <div className="space-y-2">
                      <p className="font-medium">{stat.tooltip.title}</p>
                      <p className="text-sm text-muted-foreground">{stat.tooltip.description}</p>
                      <Button size="sm" className="w-full">
                        {stat.tooltip.action}
                      </Button>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </TooltipProvider>

      {allStats.length > (window.innerWidth >= 1024 ? 6 : 4) && (
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => setShowAll(!showAll)}>
            {showAll ? (
              <>
                Show Less
                <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.2 }}>
                  <ChevronUp className="h-4 w-4" />
                </motion.div>
              </>
            ) : (
              <>
                Show More
                <motion.div animate={{ y: [0, 3, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

