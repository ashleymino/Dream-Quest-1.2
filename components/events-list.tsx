"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Edit, MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for events
const allEvents = [
  {
    id: 1,
    title: "Team Meeting",
    time: "10:00 AM - 11:30 AM",
    category: "Work",
    date: new Date(2023, 5, 15),
  },
  {
    id: 2,
    title: "Lunch with Alex",
    time: "12:30 PM - 1:30 PM",
    category: "Personal",
    date: new Date(2023, 5, 15),
  },
  {
    id: 3,
    title: "Gym Session",
    time: "6:00 PM - 7:30 PM",
    category: "Fitness",
    date: new Date(2023, 5, 15),
  },
  {
    id: 4,
    title: "Doctor's Appointment",
    time: "9:00 AM - 10:00 AM",
    category: "Health",
    date: new Date(2023, 5, 16),
  },
  {
    id: 5,
    title: "Movie Night",
    time: "8:00 PM - 10:30 PM",
    category: "Social",
    date: new Date(2023, 5, 16),
  },
]

interface EventsListProps {
  date?: Date
}

export default function EventsList({ date }: EventsListProps) {
  const [events, setEvents] = useState(allEvents)

  // Filter events for the selected date
  const filteredEvents = date
    ? events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear(),
      )
    : events

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "bg-blue-500"
      case "Personal":
        return "bg-purple-500"
      case "Fitness":
        return "bg-green-500"
      case "Health":
        return "bg-red-500"
      case "Social":
        return "bg-orange-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="space-y-4">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <div key={event.id} className="p-4 rounded-lg border bg-white dark:bg-slate-800">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                  <span className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.time}
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
                  <DropdownMenuItem onClick={() => handleDeleteEvent(event.id)}>
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
          <p className="text-slate-500 dark:text-slate-400">No events scheduled for this day</p>
          <Button variant="outline" className="mt-4">
            Add Event
          </Button>
        </div>
      )}
    </div>
  )
}
