import { Link } from '@/app/_i18n/navigation'

interface ILangSwitcherListProps {
  className?: string
}

export const LangSwitcherList = ({ className = '' }: ILangSwitcherListProps) => {
  return (
    <div className={`${className}`}>
      <ul className="flex gap-4">
        <li>
          <Link
            href="/"
            locale="en"
          >
            EN
          </Link>
        </li>
        <li>
          <Link
            href="/"
            locale="fr"
          >
            FR
          </Link>
        </li>
      </ul>
    </div>
  )
}
