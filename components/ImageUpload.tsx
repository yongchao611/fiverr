'use client'

import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Upload, X, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label = 'Cover Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection and convert to base64
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setUploading(true)

    try {
      // Convert to base64
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64String = event.target?.result as string
        onChange(base64String)
        setUploading(false)
      }
      reader.onerror = () => {
        alert('Failed to read file')
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload image')
      setUploading(false)
    }
  }

  function handleUrlSubmit() {
    if (urlInput) {
      onChange(urlInput)
      setShowUrlInput(false)
    }
  }

  function handleRemove() {
    onChange('')
    setUrlInput('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {/* Preview */}
      {value && (
        <div className="relative h-48 rounded-lg overflow-hidden border-2 border-gray-200 group">
          <img
            src={value}
            alt="Preview"
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBFcnJvcjwvdGV4dD48L3N2Zz4='
            }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      )}

      {/* Upload Options */}
      {!value && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* File Upload */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full h-24 flex-col"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload className="h-8 w-8 mb-2 text-fiverr-green" />
                <span className="text-sm font-medium">
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </span>
                <span className="text-xs text-gray-500 mt-1">Max 2MB</span>
              </Button>
            </div>

            {/* URL Input */}
            <Button
              type="button"
              variant="outline"
              className="h-24 flex-col"
              onClick={() => setShowUrlInput(!showUrlInput)}
            >
              <LinkIcon className="h-8 w-8 mb-2 text-blue-500" />
              <span className="text-sm font-medium">Image URL</span>
              <span className="text-xs text-gray-500 mt-1">From web</span>
            </Button>
          </div>

          {/* URL Input Field */}
          {showUrlInput && (
            <div className="flex gap-2 p-4 border rounded-lg bg-gray-50">
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleUrlSubmit}
                disabled={!urlInput}
              >
                Add
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Helper Text */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>💡 Tips:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Upload your own image (JPG, PNG, WebP)</li>
          <li>Or use free stock photos from <a href="https://unsplash.com" target="_blank" className="text-fiverr-green hover:underline">Unsplash</a></li>
          <li>Recommended size: 1200x630px</li>
        </ul>
      </div>
    </div>
  )
}


