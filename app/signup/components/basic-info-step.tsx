"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { signUp } from "@/lib/auth-service"
import type { SignUpData } from "@/types/auth"

interface BasicInfoStepProps {
  userData: SignUpData
  updateUserData: (data: SignUpData) => void
  onNext: () => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export default function BasicInfoStep({
  userData,
  updateUserData,
  onNext,
  isLoading,
  setIsLoading,
}: BasicInfoStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    updateUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    })
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userData.agreeToTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    setIsLoading(true)
    setError(null)

    const result = await signUp(userData)

    setIsLoading(false)

    if (result.success) {
      onNext()
    } else {
      setError(result.message || "Failed to create account")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <div className="grid gap-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          placeholder="John Doe"
          value={userData.fullName}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="name@example.com"
          value={userData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="Create a secure password"
            value={userData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">Password must be at least 8 characters long</div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          name="agreeToTerms"
          checked={userData.agreeToTerms}
          onCheckedChange={(checked) => updateUserData({ ...userData, agreeToTerms: checked as boolean })}
          disabled={isLoading}
        />
        <label
          htmlFor="terms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}

