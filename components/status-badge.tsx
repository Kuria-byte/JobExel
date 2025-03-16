import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusType =
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "pending"
  | "completed"
  | "overdue"
  | "in-progress"
  | "not-started"
  | "confirmed"
  | "conditional"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig: Record<StatusType, { label: string; className: string }> = {
    applied: {
      label: "Applied",
      className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    },
    interview: {
      label: "Interviewing",
      className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    },
    offer: {
      label: "Offer",
      className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    },
    pending: {
      label: "Pending",
      className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    },
    completed: {
      label: "Completed",
      className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    },
    overdue: {
      label: "Overdue",
      className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    },
    "in-progress": {
      label: "In Progress",
      className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    },
    "not-started": {
      label: "Not Started",
      className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    },
    conditional: {
      label: "Conditional",
      className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    },
  }

  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={cn("font-normal", config.className, className)}>
      {config.label}
    </Badge>
  )
}

