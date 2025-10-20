import { Button } from './ui/button'
import { ArrowRight, Star } from 'lucide-react'

export default function FiverrCTA() {
  return (
    <section className="py-20 gradient-bg text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Freelancer?
          </h2>
          
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            On Fiverr, you'll discover a wide range of professional services - from design and development to marketing and writing. 
            Over 5 million global sellers are waiting to help you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.fiverr.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="xl"
                variant="secondary"
                className="bg-white text-fiverr-green hover:bg-gray-100 font-bold shadow-xl"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            
            <a
              href="https://www.fiverr.com/categories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="xl"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold"
              >
                Browse Categories
              </Button>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">5M+</div>
              <div className="text-white/80 text-sm uppercase tracking-wide">Professional Sellers</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">700+</div>
              <div className="text-white/80 text-sm uppercase tracking-wide">Service Categories</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-white/80 text-sm uppercase tracking-wide">Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
