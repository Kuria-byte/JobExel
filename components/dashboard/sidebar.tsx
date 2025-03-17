"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Compass,
  FileText,
  Grid3X3,
  Layers,
  LifeBuoy,
  Settings,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

// Define menu structure
const menuItems = [
  {
    title: "Dashboard",
    icon: Grid3X3,
    path: "/dashboard",
  },
  {
    title: "Career Path",
    icon: Compass,
    path: "/career-path",
    submenu: [
      { title: "Trajectory Planner", path: "/career-path/trajectory" },
      { title: "Skills Gap Analysis", path: "/career-path/skills-gap" },
      { title: "Learning Recommendations", path: "/career-path/learning" },
    ],
  },
  {
    title: "Job Search",
    icon: Briefcase,
    path: "/job-search",
    submenu: [
      { title: "Application Tracker", path: "/job-search/applications" },
      { title: "Interview Prep", path: "/job-search/interviews" },
      { title: "Follow-up Manager", path: "/job-search/follow-up" },
    ],
  },
  {
    title: "Documentation",
    icon: FileText,
    path: "/documentation",
    submenu: [
      { title: "Resume Lab", path: "/documentation/resume" },
      { title: "Achievements", path: "/documentation/achievements" },
      { title: "References", path: "/documentation/references" },
    ],
  },
  {
    title: "Resilience",
    icon: LifeBuoy,
    path: "/resilience",
    submenu: [
      { title: "Rejection Recovery", path: "/resilience/rejection" },
      { title: "Pivot Planner", path: "/resilience/pivot" },
      { title: "Burnout Prevention", path: "/resilience/burnout" },
    ],
  },
  {
    title: "Brand & Presence",
    icon: Layers,
    path: "/brand",
    submenu: [
      { title: "Online Presence", path: "/brand/online" },
      { title: "Content Strategy", path: "/brand/content" },
      { title: "Personal Brand", path: "/brand/personal" },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-bold text-primary-foreground">JE</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Job Exel</span>
            <span className="text-xs text-muted-foreground">Career Intelligence</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((item) => (
          <SidebarGroup key={item.path}>
            {item.submenu ? (
              <Collapsible defaultOpen={pathname.startsWith(item.path)}>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.submenu.map((subItem) => (
                        <SidebarMenuItem key={subItem.path}>
                          <SidebarMenuButton asChild isActive={pathname === subItem.path} tooltip={subItem.title}>
                            <Link href={subItem.path}>
                              <ChevronRight className="h-3.5 w-3.5" />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === item.path} tooltip={item.title}>
                      <Link href={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

