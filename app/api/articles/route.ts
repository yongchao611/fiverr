import { NextRequest, NextResponse } from 'next/server'
import { getDB } from '@/lib/db'
import { slugify } from '@/lib/utils'

// GET /api/articles - Get all articles
export async function GET(request: NextRequest) {
  try {
    const db = getDB()
    
    const searchParams = request.nextUrl.searchParams
    const publishedOnly = searchParams.get('published') === 'true'
    
    let query = 'SELECT * FROM articles'
    if (publishedOnly) {
      query += ' WHERE published = 1'
    }
    query += ' ORDER BY createdAt DESC'
    
    const articles = db.prepare(query).all() as any[]
    
    // Convert published from number to boolean for better compatibility
    const formattedArticles = articles.map(article => ({
      ...article,
      published: article.published === 1,
    }))
    
    return NextResponse.json(formattedArticles)
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

// POST /api/articles - Create a new article
export async function POST(request: NextRequest) {
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
        `INSERT INTO articles (title, slug, excerpt, content, coverImage, published, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        title,
        slug,
        excerpt,
        content,
        coverImage || null,
        published ? 1 : 0,
        now,
        now
      )
    
    const article = db
      .prepare('SELECT * FROM articles WHERE id = ?')
      .get(result.lastInsertRowid) as any
    
    // Convert published from number to boolean
    const formattedArticle = {
      ...article,
      published: article.published === 1,
    }
    
    return NextResponse.json(formattedArticle, { status: 201 })
  } catch (error) {
    console.error('Failed to create article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}

