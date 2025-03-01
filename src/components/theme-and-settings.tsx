import { Settings, LogOut, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'

interface ThemeAndSettingsProps {
  onOpenSettings: () => void
  onSignOut: () => void
}

export function ThemeAndSettings({
  onOpenSettings,
  onSignOut,
}: ThemeAndSettingsProps) {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <DropdownMenuSeparator />
      <div className="p-2">
        <DropdownMenuItem 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-2"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="text-sm">
            {theme === "dark" ? "Light" : "Dark"} mode
          </span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={onOpenSettings}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          <span className="text-sm">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={onSignOut}
          className="flex items-center gap-2 text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign out</span>
        </DropdownMenuItem>
      </div>
    </>
  )
}