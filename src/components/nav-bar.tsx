import { AnimatedLogo } from "@/components/animated-logo"
import { NavItems } from "@/components/nav-items"
import { MobileNav } from "@/components/mobile-nav/mobile-nav" 
import { ProfileDropdown } from "@/components/profile-dropdown"

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Logo */}
          <div className="flex items-center gap-2 md:gap-6">
            <AnimatedLogo className="w-auto h-8" />
          </div>

          {/* Center section - Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            <NavItems />
          </div>

          {/* Right section - User nav and mobile menu */}
          <div className="flex items-center gap-2 md:gap-4">
            <ProfileDropdown
              user={{
                name: "Ian Kuria",
                email: "mwitumi21@gmail.com",
                role: "Developer"
              }}
              className="hidden md:flex items-center"
              onSignOut={() => {/* handle sign out */}}
              onViewProfile={() => {/* handle profile view */}}
              onOpenSettings={() => {/* handle settings */}}
            />
            <div className="md:hidden">
              <MobileNav user={{
                name: "Ian kuria",
                email: "ianmwitumi@gmail.cpm",
                // avatar: undefined,
                role: undefined
              }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

