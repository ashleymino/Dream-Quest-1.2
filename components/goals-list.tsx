"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Edit, MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for goals
const initialGoals = [
  {
    id: 1,
    title: "Learn Spanish",
    progress: 65,
    dueDate: "Dec 31, 2023",
    category: "Learning",
  },
  {
    id: 2,
    title: "Run a Marathon",
    progress: 30,
    dueDate: "Jun 15, 2023",
    category: "Fitness",
  },
  {
    id: 3,
    title: "Read 24 Books",
    progress: 42,
    dueDate: "Dec 31, 2023",
    category: "Personal",
  },
]

export default function GoalsList() {
  const [goals, setGoals] = useState(initialGoals)

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Learning":
        return "bg-blue-500"
      case "Fitness":
        return "bg-green-500"
      case "Personal":
        return "bg-purple-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle>My Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 rounded-lg border bg-white dark:bg-slate-800">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{goal.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={getCategoryColor(goal.category)}>
                      {goal.category}
                    </Badge>
                    <span className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {goal.dueDate}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{goal.progress}% complete</span>
                  {goal.progress === 100 && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            </div>
          ))}

          <Button className="w-full" variant="outline">
            View All Goals
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
