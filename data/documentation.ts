export const resumeData = {
  versions: [
    {
      id: 1,
      name: "Software Engineer - General",
      lastUpdated: "2023-06-10",
      matchScore: 85,
      file: "resume_general.pdf",
    },
    {
      id: 2,
      name: "Frontend Developer",
      lastUpdated: "2023-06-15",
      matchScore: 92,
      file: "resume_frontend.pdf",
    },
    {
      id: 3,
      name: "Full Stack Engineer",
      lastUpdated: "2023-05-28",
      matchScore: 78,
      file: "resume_fullstack.pdf",
    },
  ],
  feedback: [
    {
      id: 1,
      source: "ATS Scan",
      date: "2023-06-12",
      score: 88,
      strengths: ["Good keyword matching", "Clear structure"],
      improvements: ["Add more quantifiable achievements", "Expand on leadership experience"],
    },
    {
      id: 2,
      source: "Peer Review",
      date: "2023-06-05",
      score: 75,
      strengths: ["Strong technical skills section", "Good project descriptions"],
      improvements: ["Make accomplishments more specific", "Reduce length to 1 page"],
    },
  ],
}

export const achievementsData = [
  {
    id: 1,
    title: "Reduced API response time by 40%",
    date: "2023-04",
    category: "Technical",
    description: "Optimized database queries and implemented caching to significantly improve API performance",
    skills: ["SQL", "Redis", "Performance Optimization"],
    impact: "High",
    verified: true,
  },
  {
    id: 2,
    title: "Led migration to microservices architecture",
    date: "2023-02",
    category: "Leadership",
    description: "Planned and executed the migration of a monolithic application to a microservices architecture",
    skills: ["System Design", "Docker", "Kubernetes", "Team Leadership"],
    impact: "High",
    verified: true,
  },
  {
    id: 3,
    title: "Implemented CI/CD pipeline",
    date: "2022-11",
    category: "DevOps",
    description: "Set up automated testing and deployment pipeline, reducing deployment time from hours to minutes",
    skills: ["GitHub Actions", "Jest", "AWS"],
    impact: "Medium",
    verified: true,
  },
  {
    id: 4,
    title: "Mentored 3 junior developers",
    date: "2022-09",
    category: "Leadership",
    description: "Provided technical guidance and career mentorship to junior team members",
    skills: ["Mentorship", "Communication", "Technical Leadership"],
    impact: "Medium",
    verified: false,
  },
]

export const referencesData = [
  {
    id: 1,
    name: "Jennifer Martinez",
    title: "Engineering Manager",
    company: "Previous Company Inc.",
    relationship: "Direct Manager",
    email: "jennifer@example.com",
    phone: "+1 (555) 123-4567",
    notes: "Worked together for 3 years. Strong advocate for my promotion to Senior Developer.",
    status: "Confirmed",
    lastContacted: "2023-05-15",
  },
  {
    id: 2,
    name: "David Wilson",
    title: "CTO",
    company: "Tech Startup LLC",
    relationship: "Project Collaborator",
    email: "david@example.com",
    phone: "+1 (555) 987-6543",
    notes: "Collaborated on the enterprise client project. Can speak to my system design skills.",
    status: "Pending",
    lastContacted: "2023-06-01",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    title: "Senior Software Engineer",
    company: "Current Company Inc.",
    relationship: "Team Lead",
    email: "sarah@example.com",
    phone: "+1 (555) 456-7890",
    notes: "Current team lead. Has agreed to be a reference for specific companies.",
    status: "Conditional",
    lastContacted: "2023-06-10",
  },
]

export interface Resume {
  id: number
  name: string
  matchScore: number
  lastUpdated: string
  feedback: string[]
}

export const resumes: Resume[] = [
  {
    id: 1,
    name: "Frontend Developer Resume",
    matchScore: 85,
    lastUpdated: "2025-03-15",
    feedback: ["Add more quantifiable achievements", "Include recent projects"],
  },
  {
    id: 2,
    name: "Full Stack Resume",
    matchScore: 78,
    lastUpdated: "2025-03-14",
    feedback: ["Highlight backend skills", "Add system design experience"],
  },
  {
    id: 3,
    name: "Tech Lead Resume",
    matchScore: 72,
    lastUpdated: "2025-03-13",
    feedback: ["Emphasize leadership experience", "Add team size managed"],
  },
]

