import Link from "next/link"
import { ArrowLeft, Briefcase, Filter, Grid3X3, List, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard/layout"

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Stripe",
    location: "Remote",
    salary: "$140K - $180K",
    posted: "2 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Full-time", "Remote", "Senior"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Microsoft",
    location: "Seattle, WA",
    salary: "$130K - $160K",
    posted: "3 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Full-time", "On-site", "Mid-level"],
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Vercel",
    location: "Remote",
    salary: "$120K - $150K",
    posted: "1 week ago",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Full-time", "Remote", "Mid-level"],
  },
  {
    id: 4,
    title: "React Developer",
    company: "Airbnb",
    location: "San Francisco, CA",
    salary: "$135K - $165K",
    posted: "2 weeks ago",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Full-time", "Hybrid", "Senior"],
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "Netflix",
    location: "Los Angeles, CA",
    salary: "$145K - $175K",
    posted: "3 days ago",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Full-time", "On-site", "Senior"],
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Amazon",
    location: "Remote",
    salary: "$130K - $160K",
    posted: "1 week ago",
    logo: "/placeholder.svg?height=40&width=40",
    tags: ["Full-time", "Remote", "Mid-level"],
  },
]

export default function JobOpportunitiesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Job Opportunities</h1>
          </div>
          <Button size="sm" className="gap-1">
            <Briefcase className="h-4 w-4" />
            Saved Jobs
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search jobs, companies, or keywords..." className="pl-9" />
          </div>
          <Button variant="outline" size="sm" className="gap-1 md:w-auto">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <Tabs defaultValue="grid">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">42</span> jobs matching your profile
            </div>
            <TabsList>
              <TabsTrigger value="grid">
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                          <img
                            src={job.logo || "/placeholder.svg"}
                            alt={job.company}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{job.title}</CardTitle>
                          <CardDescription>{job.company}</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>

                      <div className="flex items-center gap-1 text-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5 text-muted-foreground"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{job.posted}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5 text-muted-foreground"
                        >
                          <line x1="12" y1="1" x2="12" y2="23" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex flex-wrap gap-1">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-4">
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <div className="p-4 flex items-start gap-4">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                      <img
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-base font-medium">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        </Button>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5 text-muted-foreground"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>{job.posted}</span>
                        </div>
                        <div className="flex items-center gap-1 font-medium">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3.5 w-3.5 text-muted-foreground"
                          >
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

