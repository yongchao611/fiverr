'use client'

import { useState, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Upload, Link as LinkIcon, X, Copy, Check } from 'lucide-react'

interface InlineImageUploadProps {
  onInsert: (html: string) => void
}

export default function InlineImageUpload({ onInsert }: InlineImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setUploading(true)

    try {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64String = event.target?.result as string
        setImageUrl(base64String)
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
      setImageUrl(urlInput)
    }
  }

  function generateHtml() {
    if (!imageUrl) return ''
    return `<img src="${imageUrl}" alt="Article image" class="rounded-xl shadow-lg my-6" />`
  }

  function handleCopy() {
    const html = generateHtml()
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleInsert() {
    const html = generateHtml()
    if (html) {
      onInsert(html)
      // Reset
      setImageUrl('')
      setUrlInput('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  function handleClear() {
    setImageUrl('')
    setUrlInput('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="border-fiverr-green/20">
      <CardHeader>
        <CardTitle className="text-lg">Insert Image into Content</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Options */}
        {!imageUrl && (
          <div className="grid grid-cols-2 gap-3">
            {/* File Upload */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="inline-file-upload"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full h-20 flex-col"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload className="h-6 w-6 mb-2 text-fiverr-green" />
                <span className="text-sm">
                  {uploading ? 'Uploading...' : 'Upload'}
                </span>
              </Button>
            </div>

            {/* URL Input */}
            <Button
              type="button"
              variant="outline"
              className="h-20 flex-col"
              onClick={() => {
                const url = prompt('Enter image URL:')
                if (url) {
                  setUrlInput(url)
                  setImageUrl(url)
                }
              }}
            >
              <LinkIcon className="h-6 w-6 mb-2 text-blue-500" />
              <span className="text-sm">Image URL</span>
            </Button>
          </div>
        )}

        {/* Preview and Actions */}
        {imageUrl && (
          <div className="space-y-3">
            {/* Preview */}
            <div className="relative rounded-lg overflow-hidden border-2 border-fiverr-green">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-auto max-h-48 object-contain bg-gray-50"
                onError={() => {
                  alert('Failed to load image')
                  setImageUrl('')
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* HTML Code */}
            <div className="bg-gray-50 p-3 rounded border">
              <Label className="text-xs text-gray-500 mb-1 block">HTML Code:</Label>
              <code className="text-xs break-all">{generateHtml()}</code>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex-1"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy HTML
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="fiverr"
                size="sm"
                onClick={handleInsert}
                className="flex-1"
              >
                Insert to Content
              </Button>
            </div>

            <p className="text-xs text-gray-500">
              💡 Tip: Click "Insert to Content" to add at the end, or copy the HTML and paste it anywhere in your content.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


