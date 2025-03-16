"use client"

import type React from "react"

import { useState } from "react"
import { CalendarDays, FileUp, MoreHorizontal, User2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample tasks data
const tasks = [
  {
    id: 1,
    title: "Follow up on Microsoft application",
    dueDate: "Today",
    priority: "high",
    completed: false,
    type: "application",
  },
  {
    id: 2,
    title: "Practice system design interview questions",
    dueDate: "Today",
    priority: "medium",
    completed: false,
    type: "interview",
  },
  {
    id: 3,
    title: "Update LinkedIn profile with latest achievements",
    dueDate: "Tomorrow",
    priority: "medium",
    completed: false,
    type: "profile",
  },
  {
    id: 4,
    title: "Review feedback from mock interview",
    dueDate: "Tomorrow",
    priority: "high",
    completed: false,
    type: "interview",
  },
]

// Type icons mapping
const typeIcons: Record<string, React.ReactNode> = {
  application: <FileUp className="h-3.5 w-3.5 text-blue-500" />,
  interview: <User2 className="h-3.5 w-3.5 text-purple-500" />,
  profile: <User2 className="h-3.5 w-3.5 text-green-500" />,
  learning: <CalendarDays className="h-3.5 w-3.5 text-amber-500" />,
}

export function UpcomingTasksCard({ className }: { className?: string }) {
  const [completedTasks, setCompletedTasks] = useState<number[]>([])

  const toggleTaskCompletion = (taskId: number) => {
    setCompletedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Upcoming Tasks</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs h-7">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-2 rounded-md p-2 hover:bg-muted text-sm group ${
                completedTasks.includes(task.id) ? "opacity-60" : ""
              }`}
            >
              <Checkbox
                id={`task-${task.id}`}
                className="mt-0.5"
                checked={completedTasks.includes(task.id)}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
              />
              <div className="grid gap-1 flex-1">
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-xs font-medium cursor-pointer ${
                    completedTasks.includes(task.id) ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </label>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  {typeIcons[task.type]}
                  <span>{task.dueDate}</span>
                  <span>•</span>
                  <span className={task.priority === "high" ? "text-red-500" : "text-amber-500"}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-xs">Reschedule</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Set reminder</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Mark as done</DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

