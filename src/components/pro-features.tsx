import { LucideIcon, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

import { 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'

interface ProFeature {
  id: string
  label: string
  icon: LucideIcon
  description?: string
}

interface ProFeaturesProps {
  items: ProFeature[]
}

export function ProFeatures({ items }: ProFeaturesProps) {
  return (
    <>
      <DropdownMenuSeparator />
      <div className="p-2">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Pro Features</span>
        </div>
        {items.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="flex items-start gap-2 px-4 py-2"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-sm">{item.label}</span>
              {item.description && (
                <span className="text-xs text-muted-foreground">
                  {item.description}
                </span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </div>
    </>
  )
}