"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"
import type { ThemeProviderProps } from "next-themes"

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
  )
}

