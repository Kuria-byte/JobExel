import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ResponsiveTable({ children, className, ...props }: ResponsiveTableProps) {
  return (
    <div className={cn("rounded-lg border overflow-hidden", className)} {...props}>
      <div className="overflow-x-auto">{children}</div>
    </div>
  )
}

