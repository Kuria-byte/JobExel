import { User, FileText, Zap } from "lucide-react"
import type { MenuItem } from "@/types/profile"

export const menuItems: MenuItem[] = [
  { 
    id: "profile", 
    label: "View Profile", 
    icon: User
  },
  { 
    id: "cv", 
    label: "My CV", 
    icon: FileText 
  },
  { 
    id: "pro", 
    label: "Upgrade to Pro", 
    icon: Zap, 
    highlight: true 
  }
]

export const proFeatures = [
  { id: "cover", label: "AI Cover Letter", icon: FileText },
  { id: "generate", label: "Generate CV", icon: FileText }
]