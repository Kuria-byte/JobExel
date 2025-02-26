import type React from "react"
import "../globals.css"  // Changed from "./global.css"
// import { Inter } from "next/font/google"
// import { Providers } from "@/components/providers"
import { JobProvider } from "@/context/job-context"
// import { cn } from "@/lib/utils"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <JobProvider>{children}</JobProvider>
    </div>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
