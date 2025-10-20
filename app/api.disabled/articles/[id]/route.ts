import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'
import { slugify } from '@/lib/utils'

// GET /api/articles/[id] - Get a single article
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDB()
    const article = db
      .prepare('SELECT * FROM articles WHERE id = ?')
      .get(params.id) as any
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    
    // Convert published from number to boolean
    const formattedArticle = {
      ...article,
      published: article.published === 1,
    }
    
    return NextResponse.json(formattedArticle)
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}

// PUT /api/articles/[id] - Update an article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, excerpt, content, coverImage, published } = body
    
    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, excerpt, and content are required' },
        { status: 400 }
      )
    }
    
    const db = getDB()
    const slug = slugify(title)
    const now = new Date().toISOString()
    
    const result = db
      .prepare(
        `UPDATE articles
         SET title = ?, slug = ?, excerpt = ?, content = ?, coverImage = ?, published = ?, updatedAt = ?
         WHERE id = ?`
      )
      .run(
        title,
        slug,
        excerpt,
        content,
        coverImage || null,
        published ? 1 : 0,
        now,
        params.id
      )
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    
    const article = db
      .prepare('SELECT * FROM articles WHERE id = ?')
      .get(params.id) as any
    
    // Convert published from number to boolean
    const formattedArticle = {
      ...article,
      published: article.published === 1,
    }
    
    return NextResponse.json(formattedArticle)
  } catch (error) {
    console.error('Failed to update article:', error)
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    )
  }
}

// DELETE /api/articles/[id] - Delete an article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDB()
    const result = db
      .prepare('DELETE FROM articles WHERE id = ?')
      .run(params.id)
    
    if (result.changes === 0) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete article:', error)
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}

