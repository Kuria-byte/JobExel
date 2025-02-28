import { Badge } from "@/components/ui/badge"

interface UserProfileProps {
  name: string
  email: string
  role?: string
}

export function UserProfile({ name, email, role }: UserProfileProps) {
  return (
    <div className="p-6 bg-primary/5">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
          <span className="text-2xl font-semibold text-primary-foreground">
            {name.charAt(0)}
          </span>
        </div>
        <div className="space-y-1">
          <h2 className="font-semibold">{name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
          {role && (
            <Badge variant="secondary" className="mt-1">
              {role}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}