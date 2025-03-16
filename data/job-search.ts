export interface Application {
  id: number
  company: string
  role: string
  status: "applied" | "interview" | "offer" | "rejected"
  dateApplied: string
  location: string
}

export interface Interview {
  id: number
  company: string
  role: string
  type: string
  date: string
  time: string
  preparationStatus: number
}

export const applications: Application[] = [
  {
    id: 1,
    company: "TechCorp",
    role: "Senior Frontend Developer",
    status: "applied",
    dateApplied: "2025-03-16",
    location: "Remote",
  },
  {
    id: 2,
    company: "InnovateTech",
    role: "Full Stack Engineer",
    status: "interview",
    dateApplied: "2025-03-15",
    location: "New York, NY",
  },
  {
    id: 3,
    company: "DevCo",
    role: "React Developer",
    status: "applied",
    dateApplied: "2025-03-14",
    location: "San Francisco, CA",
  },
]

export const interviews: Interview[] = [
  {
    id: 1,
    company: "TechCorp",
    role: "Senior Frontend Developer",
    type: "Technical",
    date: "2025-03-17",
    time: "2:00 PM",
    preparationStatus: 75,
  },
  {
    id: 2,
    company: "InnovateTech",
    role: "Full Stack Engineer",
    type: "Cultural",
    date: "2025-03-18",
    time: "11:00 AM",
    preparationStatus: 60,
  },
  {
    id: 3,
    company: "DevCo",
    role: "React Developer",
    type: "Technical",
    date: "2025-03-19",
    time: "3:30 PM",
    preparationStatus: 45,
  },
]

export const jobApplicationsData = [
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
    notes: "Applied through referral from David. Initial screening call scheduled for next week.",
    contacts: [
      {
        name: "Sarah Johnson",
        role: "Recruiter",
        email: "sarah@example.com",
      },
    ],
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
    notes: "Completed first technical interview. Waiting for feedback.",
    contacts: [
      {
        name: "Michael Chen",
        role: "Hiring Manager",
        email: "michael@example.com",
      },
    ],
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
    notes: "Applied online. No response yet.",
    contacts: [],
  },
  {
    id: 4,
    company: "Airbnb",
    role: "React Developer",
    location: "San Francisco, CA",
    salary: "$135K - $165K",
    status: "rejected",
    date: "2023-05-20",
    logo: "/placeholder.svg?height=32&width=32",
    followUp: false,
    notes: "Rejected after technical interview. Feedback: Need more experience with large-scale applications.",
    contacts: [
      {
        name: "Jessica Lee",
        role: "Recruiter",
        email: "jessica@example.com",
      },
    ],
  },
  {
    id: 5,
    company: "Netflix",
    role: "Backend Engineer",
    location: "Los Angeles, CA",
    salary: "$145K - $175K",
    status: "offer",
    date: "2023-05-15",
    logo: "/placeholder.svg?height=32&width=32",
    followUp: false,
    notes: "Received offer. Base salary: $150K, Bonus: 15%, Stock options: $50K/year.",
    contacts: [
      {
        name: "Robert Smith",
        role: "Hiring Manager",
        email: "robert@example.com",
      },
      {
        name: "Amanda White",
        role: "HR",
        email: "amanda@example.com",
      },
    ],
  },
]

export const interviewsData = [
  {
    id: 1,
    company: "Stripe",
    role: "Senior Software Engineer",
    type: "Technical Interview",
    date: "2023-06-20T14:00:00",
    duration: 60,
    interviewers: ["John Smith", "Emily Johnson"],
    prepared: 65,
    notes: "Focus on system design and React performance optimization",
    questions: [
      "Design a scalable notification system",
      "Explain React's reconciliation algorithm",
      "How would you optimize a slow React component?",
    ],
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Full Stack Developer",
    type: "Behavioral Interview",
    date: "2023-06-25T10:00:00",
    duration: 45,
    interviewers: ["Michael Chen"],
    prepared: 80,
    notes: "Prepare STAR method responses for leadership and conflict resolution",
    questions: [
      "Tell me about a time you led a project",
      "How do you handle disagreements with team members?",
      "Describe a challenging problem you solved",
    ],
  },
]

export const followUpsData = [
  {
    id: 1,
    company: "Stripe",
    role: "Senior Software Engineer",
    contact: "Sarah Johnson",
    email: "sarah@example.com",
    lastContact: "2023-06-16",
    nextFollowUp: "2023-06-23",
    status: "pending",
    notes: "Send thank you email after initial screening call",
  },
  {
    id: 2,
    company: "Vercel",
    role: "Frontend Engineer",
    contact: "Recruiter",
    email: "recruiting@example.com",
    lastContact: "2023-06-05",
    nextFollowUp: "2023-06-19",
    status: "overdue",
    notes: "Follow up on application status",
  },
  {
    id: 3,
    company: "Netflix",
    role: "Backend Engineer",
    contact: "Amanda White",
    email: "amanda@example.com",
    lastContact: "2023-06-10",
    nextFollowUp: "2023-06-20",
    status: "completed",
    notes: "Sent thank you email after offer. Waiting for final paperwork.",
  },
]

