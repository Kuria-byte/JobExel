import Link from "next/link"
import { AnimatedLogo } from "@/components/animated-logo"
import { NavItems } from "@/components/nav-items"
import { ProfileDropdown } from "@/components/profile-dropdown"

export function NavBar() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <AnimatedLogo />
        </Link>
        <nav className="ml-auto flex items-center gap-4 md:gap-6">
          <NavItems />
          <ProfileDropdown
            user={{
              name: "Ian Kuria",
              email: "mwitumi21@gmail.com",
            }}
          />
        </nav>
      </div>
    </header>
  )
}

