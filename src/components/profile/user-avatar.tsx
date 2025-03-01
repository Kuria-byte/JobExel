import Image from "next/image"
import { cn } from "@/lib/utils"
import type { User } from "@/types/profile"

interface UserAvatarProps {
  user: User
  size?: number
}

export function UserAvatar({ user, size = 40 }: UserAvatarProps) {
  return Boolean(user?.avatar) ? (
    <Image
      src={user.avatar || "/placeholder.svg"}
      alt={user.name}
      width={size}
      height={size}
      className="rounded-full object-cover"
      priority={size === 40}
    />
  ) : (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-gradient-to-br from-primary/80 to-primary",
      size === 40 ? "h-10 w-10" : "h-16 w-16"
    )}>
      <span className={cn(
        "font-semibold text-primary-foreground",
        size === 40 ? "text-lg" : "text-2xl"
      )}>
        {user.name.charAt(0)}
      </span>
    </div>
  )
}