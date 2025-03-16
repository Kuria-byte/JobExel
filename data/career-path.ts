import { describe } from "node:test"

export const careerPathData = {
  currentRole: "Software Engineer",
  targetRole: "Senior Software Engineer",
  company: "TechCorp",
  timeframe: "12-18 months",
  progressPercentage: 60,
  milestones: [
    {
      id: 1,
      company: "Vodafone",
      role: "Software Engineer",
      timeframe: "0-6 months",
      title: "Technical Leadership",
      description: "Lead a medium-sized project from conception to deployment",
      status: "in-progress",
      progress: 45,
    },
    {
      id: 2,
      company: "Wapishi Kenya",
      role: "Software Engineer",
      timeframe: "6-12 months",
      title: "System Design Skills",
      description: "Develop expertise in designing scalable systems",
      status: "in-progress",
      progress: 60,
    },
    {
      id: 3,
      company: "Bolt Kenya",
      role: "Senior Software Engineer",
      timeframe: "12-18 months",
      title: "Mentorship",
      description: "Mentor junior developers and provide technical guidance",
      status: "not-started",
      progress: 0,
    },
    {
      id: 4,
      company: "Andela",
      role: "Senior Software Engineer",
      timeframe: "18-24 months",
      title: "Technical Writing",
      description: "Publish technical articles or documentation",
      status: "completed",
      progress: 100,
    },
  ],
  skills: [
    {
      name: "React",
      current: 85,
      target: 90,
      gap: 5,
      category: "technical",
    },
    {
      name: "Node.js",
      current: 78,
      target: 85,
      gap: 7,
      category: "technical",
    },
    {
      name: "TypeScript",
      current: 82,
      target: 90,
      gap: 8,
      category: "technical",
    },
    {
      name: "System Design",
      current: 65,
      target: 85,
      gap: 20,
      category: "technical",
    },
    {
      name: "Project Management",
      current: 70,
      target: 80,
      gap: 10,
      category: "leadership",
    },
  ],
  learningResources: [
    {
      id: 1,
      title: "System Design Interview Course",
      description: "Prepare for system design interviews with this comprehensive course",
      type:"Course",
      priority: "High",
      provider: "Educative.io",
      duration: "20 hours",
      difficulty: "Advanced",
      relevance: "High",
      url: "#",
      skills: ["System Design", "Architecture"],
    },
    {
      id: 2,
      title: "Advanced TypeScript Patterns",
      description: "Learn advanced TypeScript techniques and best practices",
      priority: "Medium",
      type:"Course",
      provider: "Frontend Masters",
      duration: "6 hours",
      difficulty: "Intermediate",
      relevance: "Medium",
      url: "#",
      skills: ["TypeScript", "JavaScript"],
    },
    {
      id: 3,
      title: "Leadership in Software Engineering",
      description: "Learn key leadership skills for software engineers",
      priority: "High",
      type:"Course",
      provider: "Coursera",
      duration: "15 hours",
      difficulty: "Intermediate",
      relevance: "High",
      url: "#",
      skills: ["Leadership", "Communication"],
    },
    {
      id: 4,
      title: "Advanced React Patterns",
      description: "Learn advanced React patterns and performance optimization techniques",
      priority: "Medium",
      type:"Course",
      provider: "Epic React",
      duration: "10 hours",
      difficulty: "Advanced",
      relevance: "Medium",
      url: "#",
      skills: ["React", "JavaScript"],
    },
  ],
}

export interface SkillGap {
  id: number
  name: string
  currentLevel: number
  targetLevel: number
  gap: string
  priority: "High" | "Medium" | "Low"
  category: string
}

export const skillGaps: SkillGap[] = [
  {
    id: 1,
    name: "React Advanced Patterns",
    currentLevel: 7,
    targetLevel: 10,
    gap: "3",
    priority: "High",
    category: "Frontend",
  },
  {
    id: 2,
    name: "System Design",
    currentLevel: 6,
    targetLevel: 10,
    gap: "4",
    priority: "Medium",
    category: "Architecture",
  },
  {
    id: 3,
    name: "TypeScript",
    currentLevel: 8,
    targetLevel: 10,
    gap: "2",
    priority: "Medium",
    category: "Frontend",
  },
]

export interface CareerPath {
  currentRole: string
  currentCompany: string
  yearsOfExperience: number
  targetRole: string
  targetCompany?: string
  skills: {
    technical: string[]
    soft: string[]
  }
}

export const careerPath: CareerPath = {
  currentRole: "Senior Frontend Developer",
  currentCompany: "TechCorp",
  yearsOfExperience: 5,
  targetRole: "Lead Frontend Engineer",
  skills: {
    technical: ["React", "TypeScript", "Next.js", "System Design"],
    soft: ["Leadership", "Communication", "Project Management"]
  }
}

