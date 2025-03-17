"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signInWithProvider } from "@/lib/auth-service"
import type { OnboardingState } from "@/types/auth"
import BasicInfoStep from "./components/basic-info-step"
import CareerProfileStep from "./components/career-profile-step"
import ResumeUploadStep from "./components/resume-upload-step"
import JobPreferencesStep from "./components/job-preferences-step"
import CompletionStep from "./components/completion-step"

const initialState: OnboardingState = {
  step: 1,
  userData: {
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  },
  careerProfile: {
    careerStage: "active-job-seeker",
    industries: [],
    roles: [],
    locationPreference: "flexible",
  },
  resumeUploaded: false,
}

export default function SignUpPage() {
  const router = useRouter()
  const [state, setState] = useState<OnboardingState>(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateState = (updates: Partial<OnboardingState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    updateState({ step: state.step + 1 })
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    if (state.step > 1) {
      updateState({ step: state.step - 1 })
      window.scrollTo(0, 0)
    }
  }

  const handleProviderSignIn = async (provider: "google" | "linkedin" | "apple") => {
    setIsLoading(true)
    setError(null)

    const result = await signInWithProvider(provider)

    setIsLoading(false)

    if (result.success) {
      // Skip to career profile step
      updateState({ step: 2 })
    } else {
      setError(result.message || `Failed to sign in with ${provider}`)
    }
  }

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <BasicInfoStep
            userData={state.userData}
            updateUserData={(userData) => updateState({ userData })}
            onNext={nextStep}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )
      case 2:
        return (
          <CareerProfileStep
            careerProfile={state.careerProfile}
            updateCareerProfile={(careerProfile) => updateState({ careerProfile })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 3:
        return (
          <ResumeUploadStep
            resumeUploaded={state.resumeUploaded}
            updateResumeUploaded={(resumeUploaded) => updateState({ resumeUploaded })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 4:
        return (
          <JobPreferencesStep
            careerProfile={state.careerProfile}
            updateCareerProfile={(careerProfile) => updateState({ careerProfile })}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 5:
        return <CompletionStep userData={state.userData} onComplete={() => router.push("/dashboard")} />
      default:
        return null
    }
  }

  return (
    // Changed from flex min-h-screen to grid grid-cols-1 md:grid-cols-2 min-h-screen
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left side - Sign up form */}
      {/* Changed from flex w-full flex-col justify-center px-4 py-12 md:w-1/2 md:px-12 lg:px-20 */}
      <div className="flex flex-col justify-center px-4 py-12 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="font-bold text-primary-foreground">JE</span>
            </div>

            {state.step === 1 && (
              <>
                <h2 className="mt-6 text-3xl font-bold tracking-tight">Create your account</h2>
                <p className="mt-2 text-sm text-muted-foreground">Join JobExel to accelerate your career journey</p>

                {error && <div className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

                <div className="mt-6 space-y-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full flex gap-2"
                    onClick={() => handleProviderSignIn("linkedin")}
                    disabled={isLoading}
                  >
                    <Linkedin className="h-4 w-4" />
                    Continue with LinkedIn
                  </Button>

                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => handleProviderSignIn("google")}
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </Button>

                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={() => handleProviderSignIn("apple")}
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"
                        fill="currentColor"
                      />
                    </svg>
                    Continue with Apple
                  </Button>
                </div>

                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Progress indicator */}
          {state.step > 1 && state.step < 5 && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Step {state.step} of 4</div>
                <div className="text-sm text-muted-foreground">
                  {state.step === 2 && "Career Profile"}
                  {state.step === 3 && "Resume Upload"}
                  {state.step === 4 && "Job Preferences"}
                </div>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
                  style={{ width: `${(state.step - 1) * 25}%` }}
                />
              </div>
            </div>
          )}

          {renderStep()}

          {state.step === 1 && (
            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Feature showcase */}
      {/* Changed from hidden bg-gradient-to-br from-primary-dark to-primary md:block md:w-1/2 */}
      <div className="hidden md:block bg-gradient-to-br from-primary-dark to-primary">
        <div className="flex h-full flex-col items-center justify-center px-8 text-white">
          <div className="max-w-md">
            {state.step === 1 && (
              <>
                <h2 className="text-3xl font-bold">Accelerate your career journey</h2>
                <p className="mt-4 text-lg text-white/90">
                  JobExel helps you optimize your job search, track applications, and develop your career with
                  AI-powered insights.
                </p>

                <div className="mt-8 rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/20"></div>
                    <div>
                      <p className="text-lg font-medium">Sarah Johnson</p>
                      <p className="text-sm text-white/80">Product Manager at Airbnb</p>
                    </div>
                  </div>
                  <p className="mt-4 text-white/90">
                    "JobExel helped me organize my job search and land my dream role. The AI-powered resume optimization
                    made a huge difference in my callback rate."
                  </p>
                </div>
              </>
            )}

            {state.step === 2 && (
              <>
                <h2 className="text-3xl font-bold">Tell us about your career</h2>
                <p className="mt-4 text-lg text-white/90">
                  We'll personalize your experience based on your career stage and goals.
                </p>

                <div className="mt-8">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Career profile illustration"
                    className="rounded-lg"
                  />
                </div>
              </>
            )}

            {state.step === 3 && (
              <>
                <h2 className="text-3xl font-bold">Optimize your resume</h2>
                <p className="mt-4 text-lg text-white/90">
                  Our AI will analyze your resume and provide personalized recommendations to improve your chances of
                  landing interviews.
                </p>

                <div className="mt-8">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Resume analysis illustration"
                    className="rounded-lg"
                  />
                </div>
              </>
            )}

            {state.step === 4 && (
              <>
                <h2 className="text-3xl font-bold">Find your perfect match</h2>
                <p className="mt-4 text-lg text-white/90">
                  Tell us your preferences and we'll help you find jobs that align with your career goals.
                </p>

                <div className="mt-8">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Job preferences illustration"
                    className="rounded-lg"
                  />
                </div>
              </>
            )}

            {state.step === 5 && (
              <>
                <h2 className="text-3xl font-bold">Welcome to JobExel!</h2>
                <p className="mt-4 text-lg text-white/90">
                  You're all set to start your career journey with JobExel. Explore your personalized dashboard to get
                  started.
                </p>

                <div className="mt-8">
                  <img src="/placeholder.svg?height=300&width=400" alt="Dashboard preview" className="rounded-lg" />
                </div>
              </>
            )}

            <div className="mt-8">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${state.step === 1 ? "bg-white" : "bg-white/50"}`}></div>
                <div className={`h-2 w-2 rounded-full ${state.step === 2 ? "bg-white" : "bg-white/50"}`}></div>
                <div className={`h-2 w-2 rounded-full ${state.step === 3 ? "bg-white" : "bg-white/50"}`}></div>
                <div className={`h-2 w-2 rounded-full ${state.step === 4 ? "bg-white" : "bg-white/50"}`}></div>
                <div className={`h-2 w-2 rounded-full ${state.step === 5 ? "bg-white" : "bg-white/50"}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}