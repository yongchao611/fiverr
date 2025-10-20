import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FiverrCTA from '@/components/FiverrCTA'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { autoFormatContent } from '@/lib/formatContent'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Fetch article from API
async function getArticle(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
      cache: 'no-store', // Always fetch fresh data
    })
    
    if (!response.ok) {
      return null
    }
    
    const article = await response.json()
    return article
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title + ' - Fiverr Hub',
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id)

  if (!article) {
    notFound()
  }

  return (
    <>
      <Header />
      
      <main className="bg-gray-50">
        {/* Cover Image */}
        {article.coverImage && (
          <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
            <img
              src={article.coverImage}
              alt={article.title}
              className="object-cover w-full h-full opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Back Button Overlay */}
            <div className="absolute top-8 left-0 right-0 z-10">
              <div className="container mx-auto px-4">
                <Link href="/articles">
                  <Button variant="secondary" size="sm" className="shadow-lg">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className={article.coverImage ? "-mt-32 relative z-10" : "py-12"}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button (if no cover image) */}
              {!article.coverImage && (
                <Link href="/articles">
                  <Button variant="ghost" size="sm" className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Articles
                  </Button>
                </Link>
              )}

              {/* Article Header Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge variant={article.published ? 'success' : 'secondary'} className="text-sm">
                    {article.published ? 'Published' : 'Draft'}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(article.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>5 min read</span>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Article Title */}
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                  {article.title}
                </h1>

                {/* Article Excerpt */}
                <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-fiverr-green pl-6 py-2">
                  {article.excerpt}
                </p>
              </div>

              {/* Article Body */}
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
                <div
                  className="article-content prose prose-lg max-w-none
                    prose-headings:text-gray-900 prose-headings:font-bold
                    prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-fiverr-green prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:text-gray-700 prose-li:mb-2
                    prose-blockquote:border-l-4 prose-blockquote:border-fiverr-green prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-6
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                    prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded"
                  dangerouslySetInnerHTML={{ __html: autoFormatContent(article.content) }}
                />
              </div>

              {/* Author/Share Section */}
              <div className="bg-gradient-to-r from-fiverr-green/10 to-green-500/10 rounded-2xl p-8 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Found this article helpful?
                    </h3>
                    <p className="text-gray-600">
                      Share it with your network or explore more Fiverr services
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="lg">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Link href="https://www.fiverr.com" target="_blank">
                      <Button variant="fiverr" size="lg">
                        Visit Fiverr
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Back to Articles */}
              <div className="text-center">
                <Link href="/articles">
                  <Button variant="outline" size="lg" className="font-semibold">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to All Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <FiverrCTA />
      </main>

      <Footer />
    </>
  )
}
