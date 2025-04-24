"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventsList from "@/components/events-list"
import TasksList from "@/components/tasks-list"
import GoalsList from "@/components/goals-list"
import AddEventDialog from "@/components/add-event-dialog"
import AddTaskDialog from "@/components/add-task-dialog"
import AddGoalDialog from "@/components/add-goal-dialog"
import ImportCalendarDialog from "@/components/import-calendar-dialog"
import { Button } from "@/components/ui/button"
import { Download, PlusCircle } from "lucide-react"
import CustomCalendar from "@/components/custom-calendar"
import { toast } from "@/components/ui/use-toast"

// Mock data for events
const initialEvents = [
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

// Mock data for tasks
const initialTasks = [
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

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [isImportOpen, setIsImportOpen] = useState(false)
  const [events, setEvents] = useState(initialEvents)
  const [tasks, setTasks] = useState(initialTasks)
  const [goals, setGoals] = useState(initialGoals)
  const [activeTab, setActiveTab] = useState("events")
  const [draggedItem, setDraggedItem] = useState<any>(null)

  // Handle adding a new event
  const handleAddEvent = (newEvent: any) => {
    setEvents([...events, newEvent])
    toast({
      title: "Event Added",
      description: `${newEvent.title} has been added to your calendar.`,
    })
  }

  // Handle adding a new task
  const handleAddTask = (newTask: any) => {
    setTasks([...tasks, newTask])
    toast({
      title: "Task Added",
      description: `${newTask.title} has been added to your tasks.`,
    })
  }

  // Handle adding a new goal
  const handleAddGoal = (newGoal: any) => {
    setGoals([...goals, newGoal])
    toast({
      title: "Goal Added",
      description: `${newGoal.title} has been added to your goals.`,
    })
  }

  // Handle deleting an event
  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
    toast({
      title: "Event Deleted",
      description: "The event has been removed from your calendar.",
    })
  }

  // Handle deleting a task
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
    toast({
      title: "Task Deleted",
      description: "The task has been removed from your list.",
    })
  }

  // Handle toggling a task's completion status
  const handleToggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  // Handle drag start for events and tasks
  const handleDragStart = (item: any) => {
    setDraggedItem(item)
  }

  // Handle dropping an item on a date
  const handleDropOnDate = (targetDate: Date, data: any) => {
    if (!draggedItem) return

    if (data.type === "event") {
      // Update the event's date
      setEvents(events.map((event) => (event.id === data.id ? { ...event, date: new Date(targetDate) } : event)))
      toast({
        title: "Event Moved",
        description: `Event moved to ${targetDate.toLocaleDateString()}.`,
      })
    } else if (data.type === "task") {
      // Update the task's date
      setTasks(tasks.map((task) => (task.id === data.id ? { ...task, date: new Date(targetDate) } : task)))
      toast({
        title: "Task Moved",
        description: `Task moved to ${targetDate.toLocaleDateString()}.`,
      })
    }

    setDraggedItem(null)
  }

  // Handle import completion
  const handleImportComplete = (importedEvents: any[]) => {
    // Add imported events to the events list
    const newEvents = importedEvents.map((event) => ({
      ...event,
      id: Date.now() + Math.floor(Math.random() * 1000), // Ensure unique IDs
    }))

    setEvents([...events, ...newEvents])

    toast({
      title: "Import Complete",
      description: `${importedEvents.length} events have been imported to your calendar.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-4 md:mb-0">Calendar</h1>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsImportOpen(true)} className="bg-white/50 dark:bg-slate-800/50">
            <Download className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>View and manage your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomCalendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              onDropOnDate={handleDropOnDate}
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="events" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList className="bg-white/50 dark:bg-slate-800/50">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (activeTab === "events") setIsAddEventOpen(true)
                    if (activeTab === "tasks") setIsAddTaskOpen(true)
                    if (activeTab === "goals") setIsAddGoalOpen(true)
                  }}
                  className="bg-white/50 dark:bg-slate-800/50"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
            </div>

            <TabsContent value="events" className="mt-0">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Events for {date?.toLocaleDateString()}</CardTitle>
                  <CardDescription>Manage your events</CardDescription>
                </CardHeader>
                <CardContent>
                  <EventsList
                    date={date}
                    events={events}
                    onDeleteEvent={handleDeleteEvent}
                    onDragStart={handleDragStart}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="mt-0">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Tasks for {date?.toLocaleDateString()}</CardTitle>
                  <CardDescription>Manage your tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <TasksList
                    date={date}
                    tasks={tasks}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                    onDragStart={handleDragStart}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="mt-0">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Goals</CardTitle>
                  <CardDescription>Track your long-term goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <GoalsList goals={goals} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddEventDialog
        open={isAddEventOpen}
        onOpenChange={setIsAddEventOpen}
        selectedDate={date}
        onAddEvent={handleAddEvent}
      />
      <AddTaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        selectedDate={date}
        onAddTask={handleAddTask}
      />
      <AddGoalDialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen} onAddGoal={handleAddGoal} />
      <ImportCalendarDialog
        open={isImportOpen}
        onOpenChange={setIsImportOpen}
        onImportComplete={handleImportComplete}
      />
    </div>
  )
}
