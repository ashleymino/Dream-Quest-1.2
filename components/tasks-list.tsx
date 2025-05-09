"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for tasks
const allTasks = [
  {
    id: 1,
    title: "Prepare presentation",
    completed: false,
    priority: "High",
    date: new Date(2023, 5, 15),
  },
  {
    id: 2,
    title: "Review project proposal",
    completed: true,
    priority: "Medium",
    date: new Date(2023, 5, 15),
  },
  {
    id: 3,
    title: "Send follow-up emails",
    completed: false,
    priority: "Low",
    date: new Date(2023, 5, 15),
  },
  {
    id: 4,
    title: "Schedule team meeting",
    completed: false,
    priority: "Medium",
    date: new Date(2023, 5, 16),
  },
  {
    id: 5,
    title: "Update documentation",
    completed: false,
    priority: "High",
    date: new Date(2023, 5, 16),
  },
]

interface TasksListProps {
  date?: Date
  tasks?: any[]
  onToggleTask?: (id: number) => void
  onDeleteTask?: (id: number) => void
  onDragStart?: (task: any) => void
}

export default function TasksList({ date, tasks = allTasks, onToggleTask, onDeleteTask, onDragStart }: TasksListProps) {
  // Filter tasks for the selected date if date is provided
  const filteredTasks = date
    ? tasks.filter(
        (task) =>
          task.date.getDate() === date.getDate() &&
          task.date.getMonth() === date.getMonth() &&
          task.date.getFullYear() === date.getFullYear(),
      )
    : tasks

  const handleToggleTask = (id: number) => {
    if (onToggleTask) {
      onToggleTask(id)
    }
  }

  const handleDeleteTask = (id: number) => {
    if (onDeleteTask) {
      onDeleteTask(id)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-orange-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="space-y-4">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border bg-white dark:bg-slate-800 ${task.completed ? "opacity-70" : ""} cursor-move`}
            draggable
            onDragStart={(e) => {
              if (onDragStart) {
                e.dataTransfer.setData(
                  "text/plain",
                  JSON.stringify({
                    id: task.id,
                    type: "task",
                  }),
                )
                onDragStart(task)
              }
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                  className="mt-1"
                  onClick={(e) => e.stopPropagation()} // Prevent drag when clicking checkbox
                />
                <div>
                  <h3
                    className={`font-semibold ${task.completed ? "line-through text-slate-500 dark:text-slate-400" : ""}`}
                  >
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => e.stopPropagation()} // Prevent drag when clicking menu
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteTask(task.id)}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">No tasks for this day</p>
        </div>
      )}
    </div>
  )
}
