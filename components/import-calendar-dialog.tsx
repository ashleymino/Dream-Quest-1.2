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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Check, Download, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ImportCalendarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImportComplete: (events: any[]) => void
}

// Mock data for imported events
const mockGoogleEvents = [
  {
    id: 101,
    title: "Team Standup",
    time: "09:00 AM - 09:30 AM",
    category: "Work",
    date: new Date(),
  },
  {
    id: 102,
    title: "Lunch with Marketing",
    time: "12:00 PM - 01:00 PM",
    category: "Work",
    date: new Date(Date.now() + 86400000), // Tomorrow
  },
  {
    id: 103,
    title: "Dentist Appointment",
    time: "03:00 PM - 04:00 PM",
    category: "Health",
    date: new Date(Date.now() + 172800000), // Day after tomorrow
  },
]

const mockCanvasEvents = [
  {
    id: 201,
    title: "Project Submission",
    time: "11:59 PM",
    category: "Education",
    date: new Date(Date.now() + 259200000), // 3 days from now
  },
  {
    id: 202,
    title: "Group Discussion",
    time: "02:00 PM - 03:30 PM",
    category: "Education",
    date: new Date(Date.now() + 345600000), // 4 days from now
  },
  {
    id: 203,
    title: "Quiz: Module 3",
    time: "10:00 AM - 11:00 AM",
    category: "Education",
    date: new Date(Date.now() + 432000000), // 5 days from now
  },
]

export default function ImportCalendarDialog({ open, onOpenChange, onImportComplete }: ImportCalendarDialogProps) {
  const [importSource, setImportSource] = useState<string>("google")
  const [importStep, setImportStep] = useState<"select" | "connect" | "preview" | "importing" | "complete">("select")
  const [progress, setProgress] = useState(0)
  const [selectedEvents, setSelectedEvents] = useState<any[]>([])

  const handleConnect = () => {
    setImportStep("connect")
    // Simulate connection process
    setTimeout(() => {
      setImportStep("preview")
      setSelectedEvents(importSource === "google" ? mockGoogleEvents : mockCanvasEvents)
    }, 1500)
  }

  const handleImport = () => {
    setImportStep("importing")

    // Simulate import process with progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 20
      setProgress(currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
        setImportStep("complete")
      }
    }, 500)
  }

  const handleComplete = () => {
    onImportComplete(selectedEvents)
    resetDialog()
  }

  const resetDialog = () => {
    setImportStep("select")
    setProgress(0)
    setSelectedEvents([])
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) resetDialog()
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Import Calendar Events</DialogTitle>
          <DialogDescription>
            Import events and assignments from external platforms to your Dream Quest calendar.
          </DialogDescription>
        </DialogHeader>

        {importStep === "select" && (
          <div className="py-4">
            <Tabs defaultValue="platforms" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
                <TabsTrigger value="file">File Upload</TabsTrigger>
              </TabsList>

              <TabsContent value="platforms" className="mt-4">
                <div className="space-y-4">
                  <Label>Select Platform</Label>
                  <RadioGroup value={importSource} onValueChange={setImportSource} className="space-y-3">
                    <div className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                      <RadioGroupItem value="google" id="google" />
                      <Label htmlFor="google" className="flex items-center gap-2 font-normal cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                          G
                        </div>
                        Google Calendar
                        <Badge className="ml-auto">Connected</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                      <RadioGroupItem value="canvas" id="canvas" />
                      <Label htmlFor="canvas" className="flex items-center gap-2 font-normal cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                          C
                        </div>
                        Canvas Learning
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0 border rounded-md p-4 opacity-50">
                      <RadioGroupItem value="outlook" id="outlook" disabled />
                      <Label htmlFor="outlook" className="flex items-center gap-2 font-normal cursor-not-allowed">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          O
                        </div>
                        Microsoft Outlook
                        <Badge variant="outline" className="ml-auto">
                          Coming Soon
                        </Badge>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="file" className="mt-4">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-md p-8 flex flex-col items-center justify-center">
                  <Calendar className="h-10 w-10 text-slate-400 mb-2" />
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Drag & drop .ics file</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 mb-4">Or click to browse</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Select .ics File
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {importStep === "connect" && (
          <div className="py-8 flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Connecting to {importSource === "google" ? "Google Calendar" : "Canvas Learning"}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Please wait while we establish a connection to your account.
            </p>
          </div>
        )}

        {importStep === "preview" && (
          <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Preview Events ({selectedEvents.length})</h3>
            <div className="border rounded-md overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 text-sm font-medium">Events to Import</div>
              <div className="max-h-[240px] overflow-y-auto p-2 space-y-2">
                {selectedEvents.map((event) => (
                  <div key={event.id} className="flex items-center p-2 border rounded-md">
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {event.date.toLocaleDateString()} • {event.time}
                      </div>
                    </div>
                    <Badge>{event.category}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {importStep === "importing" && (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs mb-4">
              <Progress value={progress} className="h-2" />
            </div>
            <h3 className="text-lg font-medium mb-2">Importing Events</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Importing {selectedEvents.length} events from{" "}
              {importSource === "google" ? "Google Calendar" : "Canvas Learning"}
            </p>
          </div>
        )}

        {importStep === "complete" && (
          <div className="py-8 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Import Complete!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Successfully imported {selectedEvents.length} events to your calendar.
            </p>
          </div>
        )}

        <DialogFooter>
          {importStep === "select" && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleConnect}>Connect</Button>
            </>
          )}

          {importStep === "connect" && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          )}

          {importStep === "preview" && (
            <>
              <Button variant="outline" onClick={() => setImportStep("select")}>
                Back
              </Button>
              <Button onClick={handleImport}>Import Events</Button>
            </>
          )}

          {importStep === "importing" && (
            <Button variant="outline" disabled>
              Importing...
            </Button>
          )}

          {importStep === "complete" && <Button onClick={handleComplete}>Done</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
