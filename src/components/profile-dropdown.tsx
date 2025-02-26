"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, FileText, Zap, Settings, Moon, Sun, LogOut, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"

interface ProfileDropdownProps {
  user: {
    name: string
    email: string
    avatar?: string
  }
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const { theme, setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const menuItems = [
    { id: "profile", label: "View Profile", icon: User },
    { id: "cv", label: "My CV", icon: FileText },
    { id: "pro", label: "Upgrade to Pro", icon: Zap, highlight: true },
  ]

  const proFeatures = [
    { id: "cover", label: "AI Cover Letter", icon: FileText },
    { id: "generate", label: "Generate CV", icon: FileText },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          {user.avatar ? (
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="text-lg font-semibold">{user.name.charAt(0)}</span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <div className="flex items-center gap-4 p-4">
            {user.avatar ? (
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl font-semibold">{user.name.charAt(0)}</span>
              </div>
            )}
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className="flex items-center gap-2 p-3"
              onMouseEnter={() => setIsHovered(item.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <motion.div
                animate={{
                  scale: isHovered === item.id ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <item.icon className={`h-4 w-4 ${item.highlight ? "text-primary" : "text-muted-foreground"}`} />
              </motion.div>
              <span className={item.highlight ? "text-primary font-medium" : ""}>{item.label}</span>
              {item.highlight && (
                <motion.div
                  className="ml-auto"
                  animate={{
                    x: isHovered === item.id ? 5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="px-3 text-xs font-medium text-muted-foreground">PRO FEATURES</DropdownMenuLabel>
          {proFeatures.map((item) => (
            <DropdownMenuItem key={item.id} className="flex items-center gap-2 p-3" disabled>
              <item.icon className="h-4 w-4 text-muted-foreground" />
              {item.label}
              <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary">
                PRO
              </Badge>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 p-3"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            Switch to {theme === "dark" ? "Light" : "Dark"} Theme
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 p-3">
            <Settings className="h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 p-3 text-red-500 focus:text-red-500">
            <LogOut className="h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

