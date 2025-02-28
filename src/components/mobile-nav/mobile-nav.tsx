"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Menu, LogOut, Sun, Moon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { MenuItem } from "./menu-item"
import { UserProfile } from "./user-profile"
import { MenuSection } from "@/types/nav"
import { menuSections } from "./menu-config"


interface MobileNavProps {
  user: {
    name: string
    email: string
    role?: string
  }
  notifications?: number
  onSignOut?: () => void
}

export function MobileNav({ user, notifications = 0, onSignOut }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="w-full sm:w-[400px] p-0"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col h-full"
        >
          <UserProfile {...user} />

          <div className="flex-1 overflow-auto py-4">
            {menuSections.map((section: MenuSection) => (
              <div key={section.id} className="px-2">
                {section.title && (
                  <h3 className="px-4 py-2 text-sm font-medium text-muted-foreground">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      isActive={activeSection === item.id}
                      onClick={() => {
                        setActiveSection(item.id)
                        item.onClick?.()
                      }}
                    />
                  ))}
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </div>

          <div className="p-4 border-t space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              {theme === "dark" ? "Light" : "Dark"} mode
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={onSignOut}
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </Button>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}