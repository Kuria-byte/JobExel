"use client"

import { Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface JobFiltersProps {
  selectedStatus: string
  onStatusChange: (status: string) => void
}

export function JobFilters({ selectedStatus, onStatusChange }: JobFiltersProps) {
  const statuses = ["All", "Not Started", "Applied", "Interviewing", "Offered", "Rejected"]

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem className="text-xs text-muted-foreground" disabled>
            Filter by date
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem checked>Last 7 days</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Last 30 days</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Last 3 months</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs text-muted-foreground" disabled>
            Filter by salary
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem>{"< $50k"}</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>$50k - $100k</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>{"> $100k"}</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            {selectedStatus}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {statuses.map((status) => (
            <DropdownMenuItem
              key={status}
              onSelect={() => onStatusChange(status)}
              className={selectedStatus === status ? "bg-primary/10" : ""}
            >
              {status}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

