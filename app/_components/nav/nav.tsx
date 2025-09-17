import { LangSwitcherSelect } from '@/app/_components/lang-switcher-select/lang-switcher-select'
import { LangSwitcherList } from '@/app/_components/lang-switcher-list/lang-switcher-list'
import { NavLink } from '@/app/_components/nav/nav-link'
import { useTranslations } from 'next-intl'

export const Nav = () => {
  const t = useTranslations('navbarLinks')

  return (
    <div className="flex items-center p-4">
      <nav className="flex gap-4">
        <NavLink href="/">{t('home')}</NavLink>
        <NavLink href="/about">{t('about')}</NavLink>
        <NavLink href="/profile">{t('profile')}</NavLink>
      </nav>

      <div className="ml-auto flex items-baseline gap-4">
        <LangSwitcherList />

        <span className="text-xs">🟡</span>

        <LangSwitcherSelect />
      </div>
    </div>
  )
}
