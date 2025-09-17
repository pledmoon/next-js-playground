import { use } from 'react'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

interface IHomeProps {
  params: Promise<{ locale: string }>
}

export default function Home({ params }: IHomeProps) {
  const { locale } = use(params)

  setRequestLocale(locale)

  const t = useTranslations('homePage')

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 text-center">
      <h1 className="text-3xl font-bold mb-5">{t('title')}</h1>
      <p className="text-sm">{t('description')}</p>
    </div>
  )
}
