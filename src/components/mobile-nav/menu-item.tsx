import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import type { MenuItem } from "@/types/nav"
import { cn } from "@/lib/utils"

interface MenuItemProps {
  item: MenuItem
  isActive: boolean
  onClick: () => void
}

export function MenuItem({ item, isActive, onClick }: MenuItemProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg",
        "hover:bg-accent/80 transition-colors",
        isActive && "bg-accent"
      )}
    >
      <item.icon 
        className={cn(
          "h-4 w-4",
          isActive && "text-primary",
          item.highlight && "text-primary"
        )}
      />
      <span className={cn(
        "flex-1 text-sm",
        item.highlight && "text-primary font-medium"
      )}>
        {item.label}
      </span>
      {item.badge ? (
        <Badge variant="secondary">{item.badge}</Badge>
      ) : item.highlight ? (
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      ) : null}
    </motion.button>
  )
}