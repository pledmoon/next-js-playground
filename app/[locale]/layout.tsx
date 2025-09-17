import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { routing } from '@/app/_i18n/routing'
import { setRequestLocale } from 'next-intl/server'
import { Nav } from '@/app/_components/nav/nav'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Playground',
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface IRootLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: IRootLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Nav />

          <hr />

          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
