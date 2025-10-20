import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fiverr Hub - Professional Freelance Services',
  description: 'Explore top-tier freelance services on Fiverr. From design to development, marketing to writing, find the perfect professional for your project.',
  keywords: 'Fiverr, freelance, outsourcing, design, development, marketing, writing',
  openGraph: {
    title: 'Fiverr Hub - Professional Freelance Services',
    description: 'Explore top-tier freelance services on Fiverr',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

