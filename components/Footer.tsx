import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              About Us
            </h3>
            <p className="text-sm leading-relaxed">
              A dedicated platform for promoting Fiverr services. We help you find the best freelancers and services for your projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-fiverr-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-sm hover:text-fiverr-green transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm hover:text-fiverr-green transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Fiverr Resources */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Fiverr Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.fiverr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-fiverr-green transition-colors"
                >
                  Visit Fiverr
                </a>
              </li>
              <li>
                <a
                  href="https://www.fiverr.com/categories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-fiverr-green transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="https://www.fiverr.com/start_selling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-fiverr-green transition-colors"
                >
                  Become a Seller
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-fiverr-green transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-fiverr-green transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-fiverr-green transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            © {currentYear} Fiverr Hub. This website is not officially affiliated with Fiverr.com.
          </p>
        </div>
      </div>
    </footer>
  )
}

