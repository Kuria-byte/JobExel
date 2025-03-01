import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface MenuItem {
  id: string
  label: string
  icon: LucideIcon
  onClick?: () => void
}

interface MenuItemsProps {
  items: MenuItem[]
  isHovered: string | null
  onHoverChange: (id: string | null) => void
  onViewProfile?: () => void
}

export function MenuItems({ 
  items, 
  isHovered, 
  onHoverChange,
  onViewProfile 
}: MenuItemsProps) {
  return (
    <div className="py-2">
      {items.map((item) => (
        <DropdownMenuItem
          key={item.id}
          onMouseEnter={() => onHoverChange(item.id)}
          onMouseLeave={() => onHoverChange(null)}
          onClick={item.onClick || onViewProfile || (() => {})} // Provide fallback
          className="flex items-center gap-2 px-4 py-2"
        >
          <motion.div
            animate={{
              scale: isHovered === item.id ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <item.icon className={cn(
              "h-4 w-4",
              isHovered === item.id && "text-primary"
            )} />
          </motion.div>
          <span className="text-sm">{item.label}</span>
        </DropdownMenuItem>
      ))}
    </div>
  )
}