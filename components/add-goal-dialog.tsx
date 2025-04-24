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
import { Textarea } from "@/components/ui/textarea"

interface AddGoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddGoal: (goal: any) => void
}

export default function AddGoalDialog({ open, onOpenChange, onAddGoal }: AddGoalDialogProps) {
  const [goalData, setGoalData] = useState({
    title: "",
    category: "",
    dueDate: "",
    description: "",
  })

  const handleSubmit = () => {
    if (!goalData.title || !goalData.category) {
      return // Don't submit if required fields are missing
    }

    // Create a new goal object
    const newGoal = {
      id: Date.now(), // Use timestamp as a simple unique ID
      title: goalData.title,
      progress: 0,
      dueDate: goalData.dueDate ? new Date(goalData.dueDate).toLocaleDateString() : "Not set",
      category: goalData.category,
      description: goalData.description,
    }

    // Call the parent component's handler to add the goal
    onAddGoal(newGoal)

    // Reset form and close dialog
    setGoalData({
      title: "",
      category: "",
      dueDate: "",
      description: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
          <DialogDescription>Create a new long-term goal to track your progress</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={goalData.title}
              onChange={(e) => setGoalData({ ...goalData, title: e.target.value })}
              placeholder="Enter goal title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={goalData.category}
                onValueChange={(value) => setGoalData({ ...goalData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Learning">Learning</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Career">Career</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Target Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={goalData.dueDate}
                onChange={(e) => setGoalData({ ...goalData, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={goalData.description}
              onChange={(e) => setGoalData({ ...goalData, description: e.target.value })}
              placeholder="Describe your goal and what you want to achieve"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
