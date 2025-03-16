"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Define search result types
type SearchResult = {
  id: string
  title: string
  description: string
  url: string
  category: string
}

// Mock search data - in a real app, this would come from an API
const searchData: SearchResult[] = [
  {
    id: "1",
    title: "Resume Builder",
    description: "Create and optimize your resume",
    url: "/documentation/resume",
    category: "Documentation",
  },
  {
    id: "2",
    title: "Job Applications",
    description: "Track your job applications",
    url: "/job-search/applications",
    category: "Job Search",
  },
  {
    id: "3",
    title: "Skills Gap Analysis",
    description: "Identify and close your skills gaps",
    url: "/career-path/skills-gap",
    category: "Career Path",
  },
  {
    id: "4",
    title: "Interview Preparation",
    description: "Prepare for upcoming interviews",
    url: "/job-search/interviews",
    category: "Job Search",
  },
  {
    id: "5",
    title: "Rejection Recovery",
    description: "Strategies for handling rejection",
    url: "/resilience/rejection",
    category: "Resilience",
  },
  {
    id: "6",
    title: "Online Presence",
    description: "Manage your online professional presence",
    url: "/brand/online",
    category: "Brand & Presence",
  },
]

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const router = useRouter()

  // Filter results based on query
  const filterResults = useCallback((searchQuery: string) => {
    if (!searchQuery) return []

    const lowerCaseQuery = searchQuery.toLowerCase()
    return searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery) ||
        item.category.toLowerCase().includes(lowerCaseQuery),
    )
  }, [])

  // Update results when query changes
  useEffect(() => {
    setResults(filterResults(query))
  }, [query, filterResults])

  // Handle keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Handle selecting a result
  const handleSelect = (result: SearchResult) => {
    setOpen(false)
    router.push(result.url)
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="hidden md:flex items-center gap-2 w-[240px] justify-between"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
          <SearchIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-muted-foreground text-sm">Search...</span>
        </div>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
        <SearchIcon className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 max-w-2xl">
          <div className="flex items-center border-b px-3 py-2">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Search across your career tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-none"
              autoFocus
            />
            {query && (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setQuery("")}>
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <div className="max-h-[300px] overflow-y-auto p-2">
            {results.length > 0 ? (
              <div className="space-y-1">
                <div className="text-xs font-medium py-1.5 px-2">Results</div>
                {results.map((result) => (
                  <Button
                    key={result.id}
                    variant="ghost"
                    className="w-full justify-start text-left px-2 py-1.5"
                    onClick={() => handleSelect(result)}
                  >
                    <div className="flex flex-col">
                      <div className="flex w-full justify-between">
                        <span className="font-medium">{result.title}</span>
                        <span className="text-xs text-muted-foreground">{result.category}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{result.description}</span>
                    </div>
                  </Button>
                ))}
              </div>
            ) : query ? (
              <div className="py-6 text-center text-sm">No results found.</div>
            ) : (
              <div className="space-y-1">
                <div className="text-xs font-medium py-1.5 px-2">Recent Searches</div>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left px-2 py-1.5"
                  onClick={() => handleSelect(searchData[0])}
                >
                  Resume optimization for product roles
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left px-2 py-1.5"
                  onClick={() => handleSelect(searchData[2])}
                >
                  Software engineer skills gap
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left px-2 py-1.5"
                  onClick={() => handleSelect(searchData[3])}
                >
                  Interview prep for React
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

