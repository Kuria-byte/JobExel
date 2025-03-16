export const rejectionData = [
  {
    id: 1,
    company: "Microsoft",
    role: "Full Stack Developer",
    date: "2023-05-20",
    stage: "Technical Interview",
    feedback: "Needs more experience with large-scale applications and system design.",
    learnings: "Focus on improving system design skills and studying distributed systems.",
    status: "processed",
  },
  {
    id: 2,
    company: "Amazon",
    role: "Senior Software Engineer",
    date: "2023-04-15",
    stage: "Final Round",
    feedback: "Strong technical skills but needs improvement in leadership scenarios.",
    learnings: "Practice behavioral questions focused on leadership and team management.",
    status: "processed",
  },
  {
    id: 3,
    company: "Google",
    role: "Frontend Engineer",
    date: "2023-03-10",
    stage: "Phone Screen",
    feedback: "Insufficient knowledge of advanced JavaScript concepts.",
    learnings: "Deep dive into JavaScript internals, closures, and async patterns.",
    status: "processed",
  },
]

export const pivotOptions = [
  {
    id: 1,
    title: "Data Science",
    description: "Leverage your programming skills to transition into data science and machine learning.",
    skillsMatch: 65,
    requiredSkills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
    timeEstimate: "6-9 months",
    resources: [
      {
        title: "Data Science Specialization",
        provider: "Coursera",
        duration: "3 months",
        url: "#",
      },
      {
        title: "Machine Learning A-Z",
        provider: "Udemy",
        duration: "2 months",
        url: "#",
      },
    ],
  },
  {
    id: 2,
    title: "DevOps Engineer",
    description: "Transition to infrastructure and automation with your existing development background.",
    skillsMatch: 72,
    requiredSkills: ["Docker", "Kubernetes", "CI/CD", "Cloud Platforms", "Infrastructure as Code"],
    timeEstimate: "4-6 months",
    resources: [
      {
        title: "DevOps Engineering Course",
        provider: "A Cloud Guru",
        duration: "2 months",
        url: "#",
      },
      {
        title: "Kubernetes for Developers",
        provider: "Linux Foundation",
        duration: "1 month",
        url: "#",
      },
    ],
  },
  {
    id: 3,
    title: "Product Management",
    description: "Use your technical knowledge to bridge the gap between business and engineering.",
    skillsMatch: 58,
    requiredSkills: ["User Research", "Roadmapping", "Agile Methodologies", "Analytics", "Stakeholder Management"],
    timeEstimate: "6-12 months",
    resources: [
      {
        title: "Product Management Certification",
        provider: "Product School",
        duration: "2 months",
        url: "#",
      },
      {
        title: "Agile Product Management",
        provider: "Scrum.org",
        duration: "1 month",
        url: "#",
      },
    ],
  },
]

export const burnoutAssessment = {
  lastAssessment: "2023-06-01",
  score: 42,
  maxScore: 100,
  risk: "Moderate",
  factors: [
    {
      name: "Workload",
      score: 7,
      maxScore: 10,
      risk: "High",
      recommendations: [
        "Set clearer boundaries between work and personal time",
        "Delegate tasks when possible",
        "Practice saying no to additional responsibilities",
      ],
    },
    {
      name: "Control",
      score: 6,
      maxScore: 10,
      risk: "Moderate",
      recommendations: [
        "Identify aspects of work you can control and focus on those",
        "Have a conversation with your manager about decision-making autonomy",
      ],
    },
    {
      name: "Reward",
      score: 5,
      maxScore: 10,
      risk: "Moderate",
      recommendations: [
        "Acknowledge personal achievements, even small ones",
        "Discuss career progression with your manager",
      ],
    },
    {
      name: "Community",
      score: 8,
      maxScore: 10,
      risk: "Low",
      recommendations: [
        "Continue nurturing positive workplace relationships",
        "Consider mentoring others to strengthen community bonds",
      ],
    },
    {
      name: "Fairness",
      score: 7,
      maxScore: 10,
      risk: "Moderate",
      recommendations: [
        "Address concerns about fairness directly with management",
        "Focus on your own path rather than comparing to others",
      ],
    },
    {
      name: "Values",
      score: 9,
      maxScore: 10,
      risk: "Low",
      recommendations: [
        "Continue aligning work with personal values",
        "Seek projects that provide meaning and purpose",
      ],
    },
  ],
  preventionPlan: [
    {
      title: "Daily Mindfulness Practice",
      description: "10 minutes of meditation each morning",
      completed: true,
    },
    {
      title: "Weekly Exercise",
      description: "At least 3 sessions of 30 minutes each",
      completed: true,
    },
    {
      title: "Work Boundaries",
      description: "No emails or work after 7pm",
      completed: false,
    },
    {
      title: "Regular Breaks",
      description: "5-minute break every hour during work",
      completed: false,
    },
    {
      title: "Hobby Time",
      description: "Dedicate 2 hours per week to a non-work hobby",
      completed: true,
    },
  ],
}

