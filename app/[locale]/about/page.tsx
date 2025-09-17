import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('aboutPage')

  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 text-center">
      <h1 className="text-3xl font-bold mb-5">{t('title')}</h1>
      <p className="text-sm">{t('description')}</p>
    </div>
  )
}
