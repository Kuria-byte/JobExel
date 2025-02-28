"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence, PanInfo } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign, ThumbsUp, ThumbsDown, List, CreditCard } from "lucide-react"
import { SuccessFeedback } from "@/components/success-feedback"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Sample job listings
const jobListings = [
  {
    id: "job-1",
    company: "Netflix",
    title: "Senior Frontend Developer",
    location: "Remote",
    salary: "180000-250000",
    description:
      "Join our team to build the future of streaming entertainment. We're looking for a senior frontend developer with experience in React and modern JavaScript.",
    requirements: ["5+ years of experience", "React expertise", "Performance optimization"],
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "job-2",
    company: "Spotify",
    title: "UI/UX Designer",
    location: "Stockholm, Sweden",
    salary: "120000-160000",
    description:
      "Design beautiful and intuitive interfaces for our music streaming platform. Work with a talented team of designers and engineers.",
    requirements: ["3+ years of experience", "Figma proficiency", "Portfolio of work"],
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "job-3",
    company: "Airbnb",
    title: "Full Stack Engineer",
    location: "San Francisco, CA",
    salary: "200000-280000",
    description: "Build and maintain features across our entire stack. Work on challenging problems at scale.",
    requirements: ["4+ years of experience", "Node.js and React", "Database design"],
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "job-4",
    company: "Uber",
    title: "Mobile Developer",
    location: "New York, NY",
    salary: "170000-230000",
    description: "Develop and improve our mobile applications. Focus on performance, reliability, and user experience.",
    requirements: ["3+ years of experience", "iOS or Android", "CI/CD experience"],
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "job-5",
    company: "Slack",
    title: "Product Manager",
    location: "Remote",
    salary: "150000-200000",
    description:
      "Lead product development for our communication platform. Work closely with design, engineering, and marketing teams.",
    requirements: ["5+ years of experience", "Technical background", "Excellent communication"],
    logo: "/placeholder.svg?height=80&width=80",
  },
]

// First, add this interface at the top of your file
interface SuccessConfig {
  title: string;
  description: string;
  tip?: {
    text: string;
    action: string;
    onClick: () => void;
  };
}

export default function BrowseJobsPage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<"list" | "card">("card")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [successConfig, setSuccessConfig] = useState<SuccessConfig>({
    title: "",
    description: "",
    tip: {
      text: "",
      action: "",
      onClick: () => {},
    }
  })

  // For swipe functionality
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 0, 200], [-30, 0, 30])
  const cardOpacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])
  const dragConstraintsRef = useRef(null)

  const handleSwipe = (jobId: string, direction: "left" | "right") => {
    if (direction === "right") {
      // Save job
      setSavedJobs([...savedJobs, jobId])
      setSuccessConfig({
        title: "Job Saved",
        description: "This job has been added to your tracking list",
        tip: {
          text: "Update your CV to increase your chances of getting this job",
          action: "Update CV",
          onClick: () => router.push("/"),
        },
      })
      setShowSuccess(true)
    }

    // Move to next card
    if (currentIndex < jobListings.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // No more jobs
      setSuccessConfig({
        title: "All Done!",
        description: "You've reviewed all available jobs",
        tip: {
          text: "Check your saved jobs or browse more categories",
          action: "View Saved Jobs",
          onClick: () => router.push("/"),
        },
      })
      setShowSuccess(true)
    }
  }

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      handleSwipe(jobListings[currentIndex].id, "right")
    } else if (info.offset.x < -threshold) {
      handleSwipe(jobListings[currentIndex].id, "left")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Browse Jobs</h1>
            <p className="text-muted-foreground">Find and save jobs that match your skills and interests</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={currentView === "list" ? "secondary" : "outline"}
              size="icon"
              onClick={() => setCurrentView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={currentView === "card" ? "secondary" : "outline"}
              size="icon"
              onClick={() => setCurrentView("card")}
            >
              <CreditCard className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {currentView === "list" ? (
          <div className="space-y-4">
            {jobListings.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={job.logo || "/placeholder.svg"}
                      alt={job.company}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover"
                      priority={currentIndex === 0}
                    />
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-muted-foreground">{job.company}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          New
                        </Badge>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          {job.salary}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                    </div>
                    <p className="text-sm">{job.description}</p>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      onClick={() => handleSwipe(job.id, "left")}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20"
                      onClick={() => handleSwipe(job.id, "right")}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[60vh]" ref={dragConstraintsRef}>
            <AnimatePresence>
              {currentIndex < jobListings.length && (
                <motion.div
                  key={jobListings[currentIndex].id}
                  className="absolute w-full max-w-md"
                  style={{ x, rotate, opacity: cardOpacity }}
                  drag="x"
                  dragConstraints={dragConstraintsRef}
                  onDragEnd={handleDragEnd}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden shadow-lg">
                    <div className="relative h-40 bg-gradient-to-r from-blue-500 to-cyan-500">
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                        <h3 className="text-xl font-bold">{jobListings[currentIndex].title}</h3>
                        <p>{jobListings[currentIndex].company}</p>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{jobListings[currentIndex].company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{jobListings[currentIndex].location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">{jobListings[currentIndex].salary}</span>
                      </div>
                      <p className="text-sm">{jobListings[currentIndex].description}</p>
                      <div>
                        <p className="text-sm font-medium mb-2">Requirements:</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {jobListings[currentIndex].requirements.map((req) => (
                            <li key={req}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20"
                onClick={() => handleSwipe(jobListings[currentIndex]?.id || "", "left")}
              >
                <ThumbsDown className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20"
                onClick={() => handleSwipe(jobListings[currentIndex]?.id || "", "right")}
              >
                <ThumbsUp className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
      </main>
      <SuccessFeedback show={showSuccess} onClose={() => setShowSuccess(false)} {...successConfig} />
    </div>
  )
}

