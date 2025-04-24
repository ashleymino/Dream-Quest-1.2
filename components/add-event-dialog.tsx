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

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate?: Date
  onAddEvent: (event: any) => void
}

export default function AddEventDialog({ open, onOpenChange, selectedDate, onAddEvent }: AddEventDialogProps) {
  const [eventData, setEventData] = useState({
    title: "",
    startTime: "09:00",
    endTime: "10:00",
    category: "",
  })

  const handleSubmit = () => {
    if (!eventData.title || !eventData.category) {
      return // Don't submit if required fields are missing
    }

    // Create a new event object
    const newEvent = {
      id: Date.now(), // Use timestamp as a simple unique ID
      title: eventData.title,
      time: `${eventData.startTime} - ${eventData.endTime}`,
      category: eventData.category,
      date: selectedDate || new Date(),
    }

    // Call the parent component's handler to add the event
    onAddEvent(newEvent)

    // Reset form and close dialog
    setEventData({
      title: "",
      startTime: "09:00",
      endTime: "10:00",
      category: "",
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>Create a new event for {selectedDate?.toLocaleDateString()}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              placeholder="Enter event title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={eventData.startTime}
                onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={eventData.endTime}
                onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={eventData.category}
              onValueChange={(value) => setEventData({ ...eventData, category: value })}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
