import type { Metadata } from 'next'
import { Header } from '@/app/_components/header'
import '@/app/_styles/globals.css'
import { type ReactNode } from 'react'
import { Josefin_Sans } from 'next/font/google'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  //weight: ['400', '700'],
  //variable: '--font-josefin',
})

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
      <body
        className={`${josefin.className} min-h-screen bg-primary-950 text-primary-100 flex-col flex antialiased`}
      >
        <Header />

        <main className="flex-1 px-8 py-12 grid">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </body>
    </html>
  )
}
