import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { Search, FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Fetch articles from API
async function getArticles() {
  try {
    const response = await fetch('http://localhost:3000/api/articles?published=true', {
      cache: 'no-store', // Always fetch fresh data
    })
    
    if (!response.ok) {
      return []
    }
    
    const articles = await response.json()
    return articles
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return []
  }
}

export const metadata = {
  title: 'Articles - Fiverr Services Hub',
  description: 'Browse our latest articles and guides about Fiverr services',
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-fiverr-green via-green-500 to-green-600 text-white py-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Article Hub
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Explore in-depth articles and guides about Fiverr services
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-12 h-14 text-lg bg-white shadow-xl border-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {articles.length > 0 ? (
              <>
                <div className="mb-8">
                  <p className="text-gray-600 text-sm">
                    Found <span className="font-semibold text-fiverr-green">{articles.length}</span> article{articles.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.map((article: any) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-4">
                    <FileText className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  No Articles Yet
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  There are no published articles at the moment. Check back later or create your first article!
                </p>
                <Link href="/admin/articles/new">
                  <Button variant="fiverr" size="lg" className="font-semibold shadow-lg">
                    Create First Article
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
