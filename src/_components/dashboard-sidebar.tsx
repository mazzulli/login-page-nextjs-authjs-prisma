"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Settings, Menu, LayoutDashboard, MapPin, UsersRoundIcon, UserRoundCogIcon,  } from "lucide-react"
import { cn } from "@/_lib/utils"
import { Button } from "@/_components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/_components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/users",
    icon: UsersRoundIcon,
  },
  {
    title: "Collaborators",
    href: "/collaborators",
    icon: UserRoundCogIcon,
  },
  {
    title: "Venues",
    href: "/venues",
    icon: MapPin,
  },
  {
    title: "Exam Application",
    href: "/exam-application",
    icon: FileText,
  },
  {
    title: "Exam Configurations",
    href: "/exam-configurations",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden absolute left-4 top-3 z-10">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col border-r bg-white dark:bg-zinc-950">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <nav className="flex-1 overflow-auto p-2">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-64 flex-col border-r bg-white dark:bg-zinc-950">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <nav className="flex-1 overflow-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

