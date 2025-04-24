import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dream Quest",
  description: "Track your goals, visualize your dreams, and celebrate progress",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-dreamy-gradient bg-size-200 animate-dreamy-bg dark:from-indigo-950 dark:via-blue-950 dark:to-purple-950">
            <div className="dreamy-clouds"></div>
            <Navigation />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
