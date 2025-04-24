"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, X } from "lucide-react"
import ImageUpload from "./image-upload"

// Mock data for vision board items
const initialItems = [
  {
    id: 1,
    title: "Travel to Japan",
    description: "Visit Tokyo, Kyoto, and Mount Fuji",
    image: "/placeholder.svg?height=200&width=300",
    color: "bg-gradient-to-br from-blue-500 to-purple-500",
    customImage: null,
  },
  {
    id: 2,
    title: "Learn Spanish",
    description: "Become conversational in Spanish by the end of the year",
    image: "/placeholder.svg?height=200&width=300",
    color: "bg-gradient-to-br from-orange-500 to-pink-500",
    customImage: null,
  },
  {
    id: 3,
    title: "Run a Marathon",
    description: "Complete a full marathon in under 4 hours",
    image: "/placeholder.svg?height=200&width=300",
    color: "bg-gradient-to-br from-green-500 to-teal-500",
    customImage: null,
  },
  {
    id: 4,
    title: "Write a Book",
    description: "Finish my novel and get it published",
    image: "/placeholder.svg?height=200&width=300",
    color: "bg-gradient-to-br from-red-500 to-yellow-500",
    customImage: null,
  },
]

export default function VisionBoard() {
  const [items, setItems] = useState(initialItems)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    image: "/placeholder.svg?height=200&width=300",
    color: "bg-gradient-to-br from-blue-500 to-purple-500",
    customImage: null as string | null,
  })

  const handleAddItem = () => {
    if (newItem.title) {
      setItems([...items, { ...newItem, id: Date.now() }])
      setNewItem({
        title: "",
        description: "",
        image: "/placeholder.svg?height=200&width=300",
        color: "bg-gradient-to-br from-blue-500 to-purple-500",
        customImage: null,
      })
      setIsAddOpen(false)
    }
  }

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const colorOptions = [
    "bg-gradient-to-br from-blue-500 to-purple-500",
    "bg-gradient-to-br from-orange-500 to-pink-500",
    "bg-gradient-to-br from-green-500 to-teal-500",
    "bg-gradient-to-br from-red-500 to-yellow-500",
    "bg-gradient-to-br from-yellow-500 to-green-500",
    "bg-gradient-to-br from-pink-500 to-blue-500",
  ]

  return (
    <div>
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`relative rounded-lg overflow-hidden h-48 flex flex-col justify-end shadow-lg hover:shadow-xl transition-shadow`}
                style={{
                  backgroundImage: item.customImage ? `url(${item.customImage})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className={`absolute inset-0 ${!item.customImage ? item.color : ""} ${item.customImage ? "bg-black/20" : ""}`}
                ></div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 z-10"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="p-4 bg-gradient-to-t from-black/70 to-transparent relative z-10">
                  <h3 className="font-bold text-lg text-white">{item.title}</h3>
                  <p className="text-sm text-white/90">{item.description}</p>
                </div>
              </div>
            ))}

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                  <PlusCircle className="h-10 w-10 text-slate-400 mb-2" />
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Add to Vision Board</span>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add to Vision Board</DialogTitle>
                  <DialogDescription>
                    Create a new item for your vision board. Add a title, description, and choose a color theme or
                    upload an image.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="Enter a title for your vision"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="Describe your vision or goal"
                    />
                  </div>

                  <ImageUpload
                    value={newItem.customImage}
                    onChange={(imageUrl) => setNewItem({ ...newItem, customImage: imageUrl })}
                  />

                  <div className="grid gap-2">
                    <Label>Color Theme {newItem.customImage && "(Used if no image is uploaded)"}</Label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map((color, index) => (
                        <div
                          key={index}
                          className={`w-8 h-8 rounded-full cursor-pointer ${color} ${newItem.color === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""}`}
                          onClick={() => setNewItem({ ...newItem, color })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>Add to Board</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
