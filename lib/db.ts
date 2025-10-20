import Database from 'better-sqlite3'
import path from 'path'

let db: Database.Database | null = null

export function getDB() {
  if (!db) {
    // For local development, use SQLite file
    // For Cloudflare Pages, this will be replaced with D1 binding
    const dbPath = process.env.NODE_ENV === 'production'
      ? ':memory:'
      : path.join(process.cwd(), 'articles.db')
    
    db = new Database(dbPath)
    
    // Initialize database schema if needed
    initializeDatabase(db)
  }
  
  return db
}

function initializeDatabase(database: Database.Database) {
  // Check if tables exist
  const tableExists = database
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='articles'")
    .get()
  
  if (!tableExists) {
    // Create tables if they don't exist
    database.exec(`
      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        coverImage TEXT,
        published INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
      CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
      CREATE INDEX IF NOT EXISTS idx_articles_created ON articles(createdAt DESC);
    `)
  }
}

// For Cloudflare D1 compatibility
export function getCloudflareDB(env: any) {
  if (env.DB) {
    return env.DB
  }
  return getDB()
}

export default getDB



