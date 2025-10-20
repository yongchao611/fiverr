import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, FileText, Settings } from 'lucide-react'

export const metadata = {
  title: 'Admin Dashboard - Fiverr Hub',
  description: 'Manage articles and website content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-xl font-bold text-fiverr-green">
                Admin Dashboard
              </Link>
              <nav className="hidden md:flex items-center space-x-4">
                <Link href="/admin/articles">
                  <Button variant="ghost" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Articles
                  </Button>
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-2">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  View Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

