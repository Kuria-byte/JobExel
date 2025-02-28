import { 
  Briefcase, Users2, BookOpen, 
  Bell, User, FileText, 
  GraduationCap, Zap 
} from "lucide-react"
import type { MenuSection } from "@/types/nav"

export const menuSections: MenuSection[] = [
  {
    id: "main",
    items: [
      { id: "jobs", label: "Browse Jobs", icon: Briefcase },
      { id: "network", label: "Network", icon: Users2 },
      { id: "resources", label: "Resources", icon: BookOpen },
      { id: "notifications", label: "Notifications", icon: Bell },
    ]
  },
  {
    id: "profile",
    title: "Profile",
    items: [
      { id: "view-profile", label: "View Profile", icon: User },
      { id: "cv", label: "My CV", icon: FileText },
      { id: "education", label: "Education", icon: GraduationCap },
    ]
  },
  {
    id: "pro",
    title: "Pro Features",
    items: [
      { 
        id: "upgrade", 
        label: "Upgrade to Pro", 
        icon: Zap,
        highlight: true,
        description: "Access premium features"
      }
    ]
  }
]