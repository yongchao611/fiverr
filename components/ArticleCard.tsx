import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/lib/types'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.id}`}>
      <Card className="h-full hover-lift cursor-pointer overflow-hidden group border-0 shadow-lg">
        {/* Cover Image with Overlay */}
        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {article.coverImage ? (
            <>
              <img
                src={article.coverImage}
                alt={article.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Eye className="h-16 w-16 text-gray-300" />
            </div>
          )}
          
          {/* Badge Overlay */}
          <div className="absolute top-4 right-4">
            <Badge 
              variant={article.published ? 'success' : 'secondary'}
              className="shadow-lg"
            >
              {article.published ? 'Published' : 'Draft'}
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>5 min read</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-fiverr-green transition-colors leading-tight">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-4">
          <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
            {article.excerpt}
          </p>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex items-center text-fiverr-green font-semibold text-sm group">
            <span>Read More</span>
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
