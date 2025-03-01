"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface UserInfoProps {
  user: {
    name: string
    email: string
    role?: string
    image?: string
  }
  className?: string
}

export function UserInfo({ user, className }: UserInfoProps) {
  return (
    <div className={cn("flex items-center gap-4 p-4 bg-background", className)}>
      <Avatar className="h-16 w-16 border-2 border-border">
        {user.image ? (
          <AvatarImage 
            src={user.image} 
            alt={user.name}
            className="object-cover"
          />
        ) : (
          <AvatarFallback 
            className="bg-primary/10 text-primary font-semibold text-xl"
            delayMs={600}
          >
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="space-y-1.5">
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
        {user.role && (
          <Badge variant="secondary" className="mt-0.5">
            {user.role}
          </Badge>
        )}
      </div>
    </div>
  )
}