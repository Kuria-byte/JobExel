export interface Platform {
  name: string
  strength: number
  lastUpdated: string
}

export const onlinePresenceData = {
  platforms: [
    {
      name: "LinkedIn",
      strength: 85,
      lastUpdated: "2025-03-15",
    },
    {
      name: "GitHub",
      strength: 75,
      lastUpdated: "2025-03-14",
    },
    {
      name: "Portfolio",
      strength: 70,
      lastUpdated: "2025-03-13",
    },
    {
      name: "Twitter",
      strength: 65,
      lastUpdated: "2025-03-12",
    },
  ],
  recentMentions: [
    {
      platform: "Twitter",
      date: "2023-06-08",
      content: "Great insights from @iankuria on modern React architecture patterns!",
      engagement: 45,
      sentiment: "positive",
    },
    {
      platform: "LinkedIn",
      date: "2023-06-02",
      content: "Thanks to Ian Kuria for the excellent presentation on microservices at our meetup.",
      engagement: 78,
      sentiment: "positive",
    },
    {
      platform: "Dev.to",
      date: "2023-05-25",
      content: "Interesting perspective from Ian on state management in React applications.",
      engagement: 32,
      sentiment: "neutral",
    },
  ],
}

export const contentStrategyData = {
  contentCalendar: [
    {
      id: 1,
      title: "React Performance Optimization Techniques",
      platform: "LinkedIn",
      type: "Article",
      status: "published",
      publishDate: "2023-06-05",
      engagement: 85,
    },
    {
      id: 2,
      title: "Building Scalable Microservices with Node.js",
      platform: "Personal Blog",
      type: "Tutorial",
      status: "draft",
      dueDate: "2023-06-20",
    },
    {
      id: 3,
      title: "My Journey into Tech Leadership",
      platform: "Medium",
      type: "Story",
      status: "planned",
      dueDate: "2023-06-25",
    },
    {
      id: 4,
      title: "Code Review Best Practices",
      platform: "Twitter Thread",
      type: "Tips",
      status: "draft",
      dueDate: "2023-06-15",
    },
  ],
  contentIdeas: [
    {
      id: 1,
      title: "TypeScript Advanced Types Explained",
      platform: "LinkedIn",
      type: "Article",
      priority: "high",
    },
    {
      id: 2,
      title: "From Junior to Senior: Lessons Learned",
      platform: "Personal Blog",
      type: "Story",
      priority: "medium",
    },
    {
      id: 3,
      title: "Setting Up a Modern React Project in 2023",
      platform: "YouTube",
      type: "Tutorial",
      priority: "high",
    },
    {
      id: 4,
      title: "Debugging Strategies for Complex Applications",
      platform: "Dev.to",
      type: "Article",
      priority: "medium",
    },
  ],
  contentPerformance: [
    {
      title: "React Performance Optimization Techniques",
      platform: "LinkedIn",
      views: 1250,
      engagement: 85,
      leads: 3,
    },
    {
      title: "Building a Career in Software Engineering",
      platform: "Personal Blog",
      views: 850,
      engagement: 72,
      leads: 2,
    },
    {
      title: "Modern JavaScript Features You Should Know",
      platform: "Twitter Thread",
      views: 2300,
      engagement: 65,
      leads: 1,
    },
  ],
}

export const personalBrandData = {
  brandStatement:
    "Innovative software engineer specializing in scalable web applications with a focus on user experience and performance optimization.",
  keyAttributes: [
    {
      name: "Technical Excellence",
      strength: 85,
      description: "Deep expertise in modern JavaScript frameworks and architecture patterns.",
    },
    {
      name: "Problem Solving",
      strength: 90,
      description: "Analytical approach to complex technical challenges with creative solutions.",
    },
    {
      name: "Communication",
      strength: 75,
      description: "Clear and concise communication of technical concepts to diverse audiences.",
    },
    {
      name: "Leadership",
      strength: 70,
      description: "Emerging leadership skills with experience mentoring junior developers.",
    },
  ],
  targetAudience: [
    {
      name: "Tech Startups",
      relevance: "high",
      description: "Companies looking for versatile engineers who can work across the stack.",
    },
    {
      name: "Enterprise Software Teams",
      relevance: "medium",
      description: "Teams building complex, scalable applications requiring deep technical expertise.",
    },
    {
      name: "Tech Recruiters",
      relevance: "high",
      description: "Professionals seeking senior engineering talent for innovative companies.",
    },
  ],
  brandPerception: {
    lastSurvey: "2023-05-15",
    respondents: 12,
    attributes: [
      {
        name: "Technical Knowledge",
        score: 4.5,
        maxScore: 5,
      },
      {
        name: "Reliability",
        score: 4.2,
        maxScore: 5,
      },
      {
        name: "Innovation",
        score: 3.8,
        maxScore: 5,
      },
      {
        name: "Communication",
        score: 4.0,
        maxScore: 5,
      },
      {
        name: "Leadership",
        score: 3.5,
        maxScore: 5,
      },
    ],
    testimonials: [
      {
        quote: "Ian is an exceptional engineer who consistently delivers high-quality solutions to complex problems.",
        author: "Sarah Johnson, Engineering Manager",
      },
      {
        quote:
          "Working with Ian has been a great experience. His technical skills and attention to detail are impressive.",
        author: "Michael Chen, Senior Developer",
      },
    ],
  },
}

