"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "./profile/user-avatar"
import { menuItems, proFeatures } from "@/config/menu-items"
import type { User } from "@/types/profile"
import { UserInfo } from "./user-info"
import { MenuItems } from "./menu-items"
import { ProFeatures } from "./pro-features"
import { ThemeAndSettings } from "./theme-and-settings"



interface ProfileDropdownProps {
  user: User
  className?: string
  onSignOut: () => void
  onViewProfile?: () => void  // Make it optional
  onOpenSettings: () => void
}

export function ProfileDropdown({ 
  user, 
  className,
  onSignOut,
  onViewProfile,
  onOpenSettings 
}: ProfileDropdownProps) {
  
  const [isHovered, setIsHovered] = useState<string | null>(null)

  return (
    <div className={cn("relative", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="relative h-10 w-10 rounded-full"
            aria-label="Open user menu"
          >
            <UserAvatar user={user} />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-80" 
          align="end"
          sideOffset={8}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <UserInfo user={user} />
            <MenuItems 
              items={menuItems} 
              isHovered={isHovered}
              onHoverChange={setIsHovered}
              onViewProfile={onViewProfile}
            />
            <ProFeatures items={proFeatures} />
            <ThemeAndSettings 
              onOpenSettings={onOpenSettings}
              onSignOut={onSignOut}
            />
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

