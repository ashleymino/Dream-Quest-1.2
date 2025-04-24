"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventsList from "@/components/events-list"
import TasksList from "@/components/tasks-list"
import GoalsList from "@/components/goals-list"
import AddEventDialog from "@/components/add-event-dialog"
import AddTaskDialog from "@/components/add-task-dialog"
import AddGoalDialog from "@/components/add-goal-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-8">Calendar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>View and manage your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="events" className="w-full">
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
                    if (isAddEventOpen) setIsAddEventOpen(false)
                    if (isAddTaskOpen) setIsAddTaskOpen(false)
                    if (isAddGoalOpen) setIsAddGoalOpen(false)

                    const activeTab = document.querySelector('[data-state="active"]')?.getAttribute("value")
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
                  <EventsList date={date} />
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
                  <TasksList date={date} />
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
                  <GoalsList />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddEventDialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen} selectedDate={date} />
      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} selectedDate={date} />
      <AddGoalDialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen} />
    </div>
  )
}
