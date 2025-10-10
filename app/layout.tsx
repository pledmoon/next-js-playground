import type { Metadata } from 'next'
import { Header } from '@/app/_components/header'
import '@/app/_styles/globals.css'
import { type ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s / The  Wild Oasis',
    default: 'Welcome / The Wild Oasis',
  },
  description:
    'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surronded by beautiful mountains and dark forests',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-primary-950 min-h-screen text-primary-100 antialiased">
        <Header />

        <main>{children}</main>

        <footer>&copy; Copyright</footer>
      </body>
    </html>
  )
}
