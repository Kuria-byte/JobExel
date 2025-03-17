export interface UserCredentials {
  email: string
  password: string
}

export interface SignUpData extends UserCredentials {
  fullName: string
  agreeToTerms: boolean
}

export interface CareerProfile {
  careerStage: "active-job-seeker" | "career-developer" | "career-changer" | "recent-graduate"
  industries: string[]
  roles: string[]
  locationPreference: "remote" | "hybrid" | "on-site" | "flexible"
  salaryRange?: {
    min: number
    max: number
  }
}

export interface OnboardingState {
  step: number
  userData: SignUpData
  careerProfile: CareerProfile
  resumeUploaded: boolean
}

