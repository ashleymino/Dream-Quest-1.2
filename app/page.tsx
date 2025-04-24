import VisionBoard from "@/components/vision-board"
import GoalsList from "@/components/goals-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import CloudCharacter from "@/components/cloud-character"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300">My Dream Board</h1>
          <CloudCharacter className="ml-2 transform -translate-y-1" />
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button
            asChild
            variant="outline"
            className="bg-white/50 dark:bg-slate-800/50 border-purple-200 dark:border-slate-700"
          >
            <Link href="/calendar">View Calendar</Link>
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Goal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VisionBoard />
        </div>
        <div>
          <GoalsList />
        </div>
      </div>
    </div>
  )
}
