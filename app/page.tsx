import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FiverrCTA from '@/components/FiverrCTA'
import {
  Palette,
  Code,
  TrendingUp,
  FileText,
  Video,
  Music,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

export default function HomePage() {
  const categories = [
    {
      icon: Palette,
      title: 'Design & Creative',
      description: 'Logo design, branding, UI/UX design and more',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Code,
      title: 'Programming & Tech',
      description: 'Web development, mobile apps, data analysis',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'SEO, social media, content marketing',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: FileText,
      title: 'Writing & Translation',
      description: 'Copywriting, content creation, translation',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Video,
      title: 'Video & Animation',
      description: 'Video editing, animation, visual effects',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      icon: Music,
      title: 'Music & Audio',
      description: 'Music production, voice-over, audio editing',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
    },
  ]

  const benefits = [
    'Top global freelancers',
    'Fixed prices, no hidden fees',
    '24/7 customer support',
    'Secure payment protection',
    'Fast delivery',
    'Satisfaction guarantee',
  ]

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="gradient-bg text-white py-20 md:py-32 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Find the Perfect Freelancer
                <br />
                <span className="text-yellow-300">For Every Project</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                From Logo Design to AI Services - Everything You Need on Fiverr
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="https://www.fiverr.com" target="_blank" rel="noopener noreferrer">
                  <Button size="xl" variant="secondary" className="bg-white text-fiverr-green hover:bg-gray-100 font-bold shadow-xl">
                    Start Exploring
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/articles">
                  <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold">
                    Browse Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Popular Service Categories
              </h2>
              <p className="text-xl text-gray-600">
                Explore the most sought-after categories on Fiverr
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <Card key={index} className="hover-lift cursor-pointer border-0 shadow-lg group">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-8 w-8 ${category.color}`} />
                      </div>
                      <CardTitle className="group-hover:text-fiverr-green transition-colors">
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{category.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="text-center mt-12">
              <Link href="https://www.fiverr.com/categories" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="font-semibold">
                  View All Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Choose Fiverr?
                </h2>
                <p className="text-xl text-gray-600">
                  Fiverr makes freelance services simple, secure, and efficient
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <CheckCircle className="h-6 w-6 text-fiverr-green flex-shrink-0 mt-1" />
                    <span className="text-lg font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <FiverrCTA />

        {/* Latest Articles Preview */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Latest Articles
              </h2>
              <p className="text-xl text-gray-600">
                Learn how to make the most of Fiverr services
              </p>
            </div>

            <div className="text-center">
              <Link href="/articles">
                <Button size="lg" variant="fiverr" className="font-bold shadow-lg">
                  Browse All Articles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
