"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function SearchForm() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <Popover open={searchOpen} onOpenChange={setSearchOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 w-full justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">Search...</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <div className="flex items-center border-b px-3 py-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder="Search across your career tools..."
            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-none"
            autoFocus
          />
        </div>
        <div className="p-2">
          <div className="text-xs font-medium py-1.5 px-2">Recent Searches</div>
          <div className="grid gap-1">
            <Button variant="ghost" size="sm" className="justify-start font-normal">
              Resume optimization for product roles
            </Button>
            <Button variant="ghost" size="sm" className="justify-start font-normal">
              Software engineer skills gap
            </Button>
            <Button variant="ghost" size="sm" className="justify-start font-normal">
              Interview prep for React
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

