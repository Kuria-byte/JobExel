"use client"

import { LayoutGrid, List, Kanban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

type ViewType = "grid" | "list" | "kanban"

interface ViewSwitcherProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentView === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => onViewChange("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Grid view</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentView === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => onViewChange("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>List view</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={currentView === "kanban" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => onViewChange("kanban")}
            >
              <Kanban className="h-4 w-4" />
              <span className="sr-only">Kanban view</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Kanban view</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

