import { LucideIcon } from 'lucide-react'

export interface MenuItem {
  id: string
  label: string
  icon: LucideIcon
  highlight?: boolean
  badge?: number
  description?: string
  onClick?: () => void
}

export interface MenuSection {
  id: string
  title?: string
  items: MenuItem[]
}

