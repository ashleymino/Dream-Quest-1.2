"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar, Home, LayoutDashboard, Menu, Trophy, Users } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Progress",
      path: "/progress",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      name: "Social",
      path: "/social",
      icon: <Users className="h-5 w-5" />,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 dark:bg-slate-950/70 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-6 py-4">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  <span className="text-xl font-bold">Dream Quest</span>
                </div>
                <nav className="flex flex-col gap-2">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                        pathname === route.path
                          ? "bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-50"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {route.icon}
                      {route.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <span className="text-xl font-bold hidden md:inline-block">Dream Quest</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === route.path
                  ? "bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-50"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <ModeToggle />
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
