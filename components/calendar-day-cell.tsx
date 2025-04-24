"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CalendarDayCellProps {
  date: Date
  isSelected: boolean
  onSelect: (date: Date) => void
  onDrop: (date: Date, data: any) => void
}

export default function CalendarDayCell({ date, isSelected, onSelect, onDrop }: CalendarDayCellProps) {
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleDragLeave = () => {
    setIsOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsOver(false)

    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"))
      onDrop(date, data)
    } catch (error) {
      console.error("Error parsing dropped data:", error)
    }
  }

  return (
    <div
      className={cn(
        "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        isSelected ? "bg-primary text-primary-foreground" : "text-muted-foreground",
        isOver ? "bg-blue-100 dark:bg-blue-900/30" : "",
        "rounded-md flex items-center justify-center hover:bg-muted hover:text-foreground cursor-pointer",
      )}
      onClick={() => onSelect(date)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {date.getDate()}
    </div>
  )
}
