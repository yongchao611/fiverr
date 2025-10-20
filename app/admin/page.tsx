import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, PlusCircle, BarChart, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Manage your Fiverr promotion website.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Articles
            </CardTitle>
            <FileText className="h-5 w-5 text-fiverr-green" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">
              No published articles yet
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Draft Articles
            </CardTitle>
            <FileText className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pending drafts
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Views
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">
              Article views
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg hover-lift">
          <CardHeader>
            <CardTitle>Article Management</CardTitle>
            <CardDescription>
              Manage all published and draft articles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/articles/new">
              <Button className="w-full" variant="fiverr" size="lg">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create New Article
              </Button>
            </Link>
            <Link href="/admin/articles">
              <Button className="w-full" variant="outline" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                View All Articles
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover-lift">
          <CardHeader>
            <CardTitle>Website Settings</CardTitle>
            <CardDescription>
              Configure website and Fiverr promotion settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              More features coming soon...
            </p>
            <Link href="/">
              <Button className="w-full" variant="outline" size="lg">
                Visit Website
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
