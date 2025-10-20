'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-fiverr-green">
              Fiverr
            </span>
            <span className="hidden sm:inline text-gray-600">
              Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-fiverr-green transition-colors"
            >
              Home
            </Link>
            <Link
              href="/articles"
              className="text-sm font-medium text-gray-700 hover:text-fiverr-green transition-colors"
            >
              Articles
            </Link>
            <Link
              href="https://www.fiverr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-fiverr-green transition-colors"
            >
              Visit Fiverr
            </Link>
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                Admin
              </Button>
            </Link>
            <Link href="https://www.fiverr.com" target="_blank" rel="noopener noreferrer">
              <Button variant="fiverr" size="sm">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-fiverr-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/articles"
                className="text-sm font-medium text-gray-700 hover:text-fiverr-green transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="https://www.fiverr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-700 hover:text-fiverr-green transition-colors"
              >
                Visit Fiverr
              </Link>
              <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Admin
                </Button>
              </Link>
              <Link href="https://www.fiverr.com" target="_blank" rel="noopener noreferrer">
                <Button variant="fiverr" size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

