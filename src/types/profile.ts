import { LucideIcon } from "lucide-react"

export interface User {
  name: string
  email: string
  avatar?: string
  role?: string
}

export interface MenuItem {
  id: string
  label: string
  icon: LucideIcon
  highlight?: boolean
  onClick?: () => void
}