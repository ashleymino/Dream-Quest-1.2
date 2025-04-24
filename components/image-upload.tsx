"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon, X } from "lucide-react"

interface ImageUploadProps {
  onChange: (imageUrl: string | null) => void
  value: string | null
  className?: string
}

export default function ImageUpload({ onChange, value, className }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(value)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string
      setPreview(imageUrl)
      onChange(imageUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="image-upload">Upload Image</Label>

      {preview ? (
        <div className="relative rounded-md overflow-hidden h-40 w-full">
          <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-md h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-10 w-10 text-slate-400 mb-2" />
          <span className="text-slate-500 dark:text-slate-400 font-medium">Click to upload image</span>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">JPG, PNG, GIF up to 5MB</span>
        </div>
      )}

      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  )
}
