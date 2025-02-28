"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  User, FileText, Zap, Settings, 
  Moon, Sun, LogOut, ChevronRight, 
  LucideIcon
} from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  name: string
  email: string
  avatar?: string
  role?: string
}

interface ProfileDropdownProps {
  user: User
  className?: string
  onSignOut?: () => void
  onViewProfile?: () => void
  onOpenSettings?: () => void
}

export function ProfileDropdown({ 
  user, 
  className,
  onSignOut,
  onViewProfile,
  onOpenSettings 
}: ProfileDropdownProps) {
  const { theme = 'light', setTheme } = useTheme()
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const menuItems = [
    { 
      id: "profile", 
      label: "View Profile", 
      icon: User,
      onClick: onViewProfile
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
    },
  ]

  const proFeatures = [
    { id: "cover", label: "AI Cover Letter", icon: FileText },
    { id: "generate", label: "Generate CV", icon: FileText },
  ]

  const UserAvatar = ({ size = 40 }: { size?: number }) => (
    Boolean(user?.avatar) ? (
      <Image
        src={user.avatar || "/placeholder.svg"}
        alt={user.name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        priority={size === 40}
      />
    ) : (
      <div 
        className={cn(
          "flex items-center justify-center rounded-full bg-primary/10",
          size === 40 ? "h-10 w-10" : "h-16 w-16"
        )}
      >
        <span className={cn(
          "font-semibold",
          size === 40 ? "text-lg" : "text-2xl"
        )}>
          {user.name.charAt(0)}
        </span>
      </div>
    )
  )

  return (
    <div className={cn("relative", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="relative h-10 w-10 rounded-full"
            aria-label="Open user menu"
          >
            <UserAvatar />
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
            {/* User Info */}
            <div className="flex items-center gap-4 p-4">
              <UserAvatar size={64} />
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.role && (
                  <Badge variant="secondary" className="mt-1">
                    {user.role}
                  </Badge>
                )}
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Menu Items */}
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className="flex items-center gap-2 p-3"
                onMouseEnter={() => setIsHovered(item.id)}
                onMouseLeave={() => setIsHovered(null)}
                onClick={item.onClick}
              >
                <MenuIcon 
                  icon={item.icon} 
                  isHovered={isHovered === item.id}
                  highlight={item.highlight}
                />
                <span className={item.highlight ? "text-primary font-medium" : ""}>
                  {item.label}
                </span>
                {item.highlight && <ChevronRightIcon isHovered={isHovered === item.id} />}
              </DropdownMenuItem>
            ))}

            {/* Pro Features */}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="px-3 text-xs font-medium text-muted-foreground">
              PRO FEATURES
            </DropdownMenuLabel>
            {proFeatures.map((item) => (
              <ProFeatureItem key={item.id} item={item} />
            ))}

            {/* Settings & Theme */}
            <DropdownMenuSeparator />
            <ThemeToggleItem 
              theme={theme || 'light'} // Provide fallback
              setTheme={setTheme} 
            />
            <SettingsItem onClick={onOpenSettings} />

            {/* Sign Out */}
            <DropdownMenuSeparator />
            <SignOutItem onClick={onSignOut} />
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// Extracted Components
const MenuIcon = ({ 
  icon: Icon, 
  isHovered, 
  highlight 
}: { 
  icon: LucideIcon, 
  isHovered: boolean, 
  highlight?: boolean 
}) => (
  <motion.div
    animate={{ scale: isHovered ? 1.1 : 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <Icon className={cn(
      "h-4 w-4",
      highlight ? "text-primary" : "text-muted-foreground"
    )} />
  </motion.div>
)

const ChevronRightIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div
    className="ml-auto"
    animate={{ x: isHovered ? 5 : 0 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <ChevronRight className="h-4 w-4" />
  </motion.div>
)

const ProFeatureItem = ({ item }: { item: { id: string, label: string, icon: LucideIcon } }) => (
  <DropdownMenuItem className="flex items-center gap-2 p-3" disabled>
    <item.icon className="h-4 w-4 text-muted-foreground" />
    {item.label}
    <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary">
      PRO
    </Badge>
  </DropdownMenuItem>
)

interface ThemeToggleItemProps {
  theme: string;  // or use specific theme types if available
  setTheme: (theme: string) => void;
}

const ThemeToggleItem = ({ theme, setTheme }: ThemeToggleItemProps) => {
  return (
    <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <MenuIcon icon={theme === 'dark' ? Sun : Moon} isHovered={false} />
      <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
    </DropdownMenuItem>
  );
};

const SettingsItem = ({ onClick }: { onClick?: () => void }) => (
  <DropdownMenuItem className="flex items-center gap-2 p-3" onClick={onClick}>
    <Settings className="h-4 w-4" />
    Settings
  </DropdownMenuItem>
)

const SignOutItem = ({ onClick }: { onClick?: () => void }) => (
  <DropdownMenuItem 
    className="flex items-center gap-2 p-3 text-red-500 focus:text-red-500"
    onClick={onClick}
  >
    <LogOut className="h-4 w-4" />
    Sign Out
  </DropdownMenuItem>
)

