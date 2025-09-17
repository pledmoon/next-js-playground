'use client'

import { useRouter, usePathname } from '@/app/_i18n/navigation'
import { useLocale } from 'next-intl'

interface ILangSwitcherSelectProps {
  className?: string
}

export const LangSwitcherSelect = ({ className = '' }: ILangSwitcherSelectProps) => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale })
      router.refresh()
    }
  }

  return (
    <div className={`${className}`}>
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
      </select>
    </div>
  )
}
