"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, BookOpen, Users2, Sparkles, FileText, GraduationCap, Briefcase, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { CVBuilderDialog } from "./cv-builder/cv-builder-dialog"

export function NavItems() {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [notifications] = useState(3)
  const [showCVBuilder, setShowCVBuilder] = useState(false)

  const navItems = [
    {
      id: "cv-builder",
      label: "CV Builder",
      icon: FileText,
      onClick: () => setShowCVBuilder(true),
      isActive: true,
    },
    {
      id: "resources",
      label: "Resources",
      icon: BookOpen,
      items: [
        { icon: GraduationCap, label: "Interview Guides" },
        { icon: FileText, label: "Resume Templates" },
        { icon: Briefcase, label: "Career Advice" },
        { icon: PenLine, label: "Salary Calculator" },
      ],
    },
    {
      id: "network",
      label: "Network",
      icon: Users2,
      items: [
        { icon: Users2, label: "Find Connections" },
        { icon: Users2, label: "My Network" },
        { icon: Sparkles, label: "Events" },
        { icon: Users2, label: "Groups" },
      ],
    },
  ]

  return (
    <>
      <div className="flex items-center gap-2">
        {navItems.map((item) =>
          item.items ? (
            <DropdownMenu key={item.id}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={activeItem === item.id ? "secondary" : "ghost"}
                  className="relative gap-2"
                  onMouseEnter={() => setActiveItem(item.id)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <motion.div
                    animate={{
                      scale: activeItem === item.id ? 1.1 : 1,
                      rotate: activeItem === item.id ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className="h-4 w-4" />
                  </motion.div>
                  {item.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <AnimatePresence>
                  {item.items.map((subItem, index) => (
                    <motion.div
                      key={subItem.label}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <DropdownMenuItem className="flex items-center gap-2">
                        <subItem.icon className="h-4 w-4" />
                        {subItem.label}
                      </DropdownMenuItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              key={item.id}
              variant={item.isActive ? "secondary" : "ghost"}
              className="gap-2"
              onClick={item.onClick}
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <motion.div
                animate={{
                  scale: activeItem === item.id ? 1.1 : 1,
                  rotate: activeItem === item.id ? [0, -10, 10, 0] : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="h-4 w-4" />
              </motion.div>
              {item.label}
            </Button>
          ),
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative"
              onMouseEnter={() => setActiveItem("notifications")}
              onMouseLeave={() => setActiveItem(null)}
            >
              <motion.div
                animate={{
                  scale: activeItem === "notifications" ? 1.1 : 1,
                  rotate: activeItem === "notifications" ? [0, -10, 10, 0] : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <Bell className="h-4 w-4" />
              </motion.div>
              {notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-4">
              <h4 className="font-medium">Notifications</h4>
              <Badge variant="secondary" className="font-normal">
                {notifications} new
              </Badge>
            </div>
            <AnimatePresence>
              {["Your job application was viewed", "New job match found", "Interview scheduled for tomorrow"].map(
                (notification, index) => (
                  <motion.div
                    key={notification}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <DropdownMenuItem className="flex items-start gap-4 p-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <div className="space-y-1">
                        <p className="text-sm">{notification}</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </DropdownMenuItem>
                  </motion.div>
                ),
              )}
            </AnimatePresence>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CVBuilderDialog open={showCVBuilder} onOpenChange={setShowCVBuilder} />
    </>
  )
}

