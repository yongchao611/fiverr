'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Wand2 } from 'lucide-react'
import type { ArticleFormData } from '@/lib/types'
import ImageUpload from '@/components/ImageUpload'
import InlineImageUpload from '@/components/InlineImageUpload'
import { autoFormatContent } from '@/lib/formatContent'

export default function NewArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    published: false,
  })

  function handleAutoFormat() {
    if (formData.content) {
      const formatted = autoFormatContent(formData.content)
      setFormData({ ...formData, content: formatted })
    }
  }

  function handleInsertImage(html: string) {
    // Insert image HTML at the end of content
    const updatedContent = formData.content + '\n\n' + html + '\n\n'
    setFormData({ ...formData, content: updatedContent })
  }

  async function handleSubmit(e: React.FormEvent, publish: boolean) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          published: publish,
        }),
      })

      if (response.ok) {
        router.push('/admin/articles')
      } else {
        alert('Failed to save article')
      }
    } catch (error) {
      console.error('Failed to create article:', error)
      alert('Failed to save article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/articles">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">Create New Article</h1>
        <p className="text-gray-600">
          Fill in the form below to create a new article
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, true)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Article Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                    placeholder="Enter article title"
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                    placeholder="Enter a brief description (shown in article list)"
                    rows={3}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Keep it concise - 1-2 sentences work best
                  </p>
                </div>

                <ImageUpload
                  value={formData.coverImage || ''}
                  onChange={(url) => setFormData({ ...formData, coverImage: url })}
                  label="Cover Image"
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="content">Content *</Label>
                    <Button
                  type="button"
                  variant="outline"
                  size="sm"
                      onClick={handleAutoFormat}
                      disabled={!formData.content}
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      Auto Format
                    </Button>
                  </div>
                  <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                    placeholder="Enter article content (plain text or HTML)&#10;&#10;You can write plain text with line breaks, then click 'Auto Format' to convert to HTML.&#10;&#10;Or use HTML tags directly:&#10;<h2>Heading</h2>&#10;<p>Paragraph text...</p>"
                    rows={20}
                    required
                    className="font-mono text-sm"
                  />
                  <div className="flex items-start gap-2 text-sm">
                    <div className="flex-1 text-gray-600">
                      <p className="font-medium mb-2">💡 Two ways to format:</p>
                      <ol className="list-decimal list-inside space-y-1 ml-2">
                        <li><strong>Plain text:</strong> Write normally, then click "Auto Format"</li>
                        <li><strong>HTML:</strong> Use tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t">
                  <Link href="/admin/articles">
                    <Button type="button" variant="outline" disabled={loading}>
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={(e) => handleSubmit(e, false)}
                    disabled={loading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save as Draft
                  </Button>
                  <Button type="submit" variant="fiverr" disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? 'Publishing...' : 'Publish Article'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Side (1/3) */}
          <div className="space-y-6">
            <InlineImageUpload onInsert={handleInsertImage} />
          </div>
        </div>
      </form>
    </div>
  )
}
