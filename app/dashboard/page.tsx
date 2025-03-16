import type React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { BarChart3, BookOpen, ChevronRight, FileText, FileUp, Lightbulb, PlusCircle, Search, User2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardLayout } from "@/components/dashboard/layout"
import { cn } from "@/lib/utils"
import { ResumeOptimizationCard } from "@/components/dashboard/resume-optimization-card"
import { ApplicationTrackerCard } from "@/components/dashboard/application-tracker-card"
import { SkillsGapCard } from "@/components/dashboard/skills-gap-card"
import { InterviewPrepCard } from "@/components/dashboard/interview-prep-card"
import { ActivityFeedCard } from "@/components/dashboard/activity-feed-card"
import { UpcomingTasksCard } from "@/components/dashboard/upcoming-tasks-card"
import { AddJobDialog } from "@/components/dashboard/add-job-dialog"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome back, Ian</h1>
            <p className="text-muted-foreground">Here's an overview of your job search and career development.</p>
          </div>
          <div className="flex gap-2 self-stretch sm:self-auto">
            <AddJobDialog>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Job
              </Button>
            </AddJobDialog>
            <Button size="sm" variant="outline" className="gap-1" asChild>
              <Link href="/job-search/opportunities">
                <Search className="h-4 w-4" />
                Find Jobs
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* The four priority stats for Ian's job search */}
          <StatsCard
            title="Applications Submitted"
            value="24"
            description="8 active, 16 closed"
            icon={<FileUp className="h-5 w-5" />}
            trend={{ value: "+3", timeframe: "this week" }}
            className="border-l-4 border-l-primary"
          />
          <StatsCard
            title="Interviews"
            value="6"
            description="3 completed, 3 upcoming"
            icon={<User2 className="h-5 w-5" />}
            trend={{ value: "+2", timeframe: "this week" }}
            className="border-l-4 border-l-secondary"
          />
          <StatsCard
            title="Skills Improved"
            value="7"
            description="3 technical, 4 soft skills"
            icon={<BookOpen className="h-5 w-5" />}
            trend={{ value: "+2", timeframe: "this month" }}
            className="border-l-4 border-l-accent"
          />
        </div>

        {/* Primary feature cards - these are Ian's priority features */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Suspense fallback={<Skeleton className="h-[250px] w-full rounded-xl" />}>
            <ResumeOptimizationCard className="h-full" />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-[250px] w-full rounded-xl" />}>
            <ApplicationTrackerCard className="h-full" />
          </Suspense>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Suspense fallback={<Skeleton className="h-[250px] w-full rounded-xl" />}>
            <SkillsGapCard className="h-full" />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-[250px] w-full rounded-xl" />}>
            <InterviewPrepCard className="h-full" />
          </Suspense>
        </div>

        {/* Secondary content row */}
        <div className="grid gap-5 lg:grid-cols-3">
          <Suspense fallback={<Skeleton className="h-[350px] w-full rounded-xl" />}>
            <ActivityFeedCard className="lg:col-span-2" />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-[350px] w-full rounded-xl" />}>
            <UpcomingTasksCard />
          </Suspense>
        </div>

        {/* Career insights section */}
        <div className="mt-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Career Insights</h2>
            <Button variant="outline" size="sm" className="gap-1">
              <BarChart3 className="h-4 w-4" />
              View all insights
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <InsightCard
              title="Resume Performance"
              description="Your resume is performing well for Product Engineer roles, but could use improvements for Engineering Manager positions."
              icon={<FileText className="h-5 w-5 text-primary" />}
              action="Optimize Resume"
              href="/documentation/resume"
            />
            <InsightCard
              title="Interview Success Rate"
              description="You're performing above average in technical interviews, but could strengthen your behavioral responses."
              icon={<User2 className="h-5 w-5 text-secondary" />}
              action="Practice Interviews"
              href="/job-search/interviews"
            />
            <InsightCard
              title="Emerging Skills"
              description="Consider developing skills in AI integration and leadership to enhance your profile for senior roles."
              icon={<Lightbulb className="h-5 w-5 text-accent" />}
              action="Explore Courses"
              href="/career-path/learning"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

// Stats Card Component
function StatsCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend?: { value: string; timeframe: string }
  className?: string
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
      {trend && (
        <CardFooter className="pb-2 pt-0">
          <div className="flex items-center text-xs text-success">
            <span>{trend.value}</span>
            <span className="ml-1 text-muted-foreground">{trend.timeframe}</span>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}

// Insight Card Component
function InsightCard({
  title,
  description,
  icon,
  action,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  action: string
  href: string
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="gap-1" asChild>
          <a href={href}>
            {action}
            <ChevronRight className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

