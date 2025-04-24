"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate?: Date
  onAddTask: (task: any) => void
}

export default function AddTaskDialog({ open, onOpenChange, selectedDate, onAddTask }: AddTaskDialogProps) {
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
  })

  const handleSubmit = () => {
    if (!taskData.title || !taskData.priority) {
      return // Don't submit if required fields are missing
    }

    // Create a new task object
    const newTask = {
      id: Date.now(), // Use timestamp as a simple unique ID
      title: taskData.title,
      completed: false,
      priority: taskData.priority,
      date: selectedDate || new Date(),
    }

    // Call the parent component's handler to add the task
    onAddTask(newTask)

    // Reset form and close dialog
    setTaskData({
      title: "",
      priority: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Create a new task for {selectedDate?.toLocaleDateString()}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              placeholder="Enter task title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={taskData.priority} onValueChange={(value) => setTaskData({ ...taskData, priority: value })}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
