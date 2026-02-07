'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ISideNavigationItemProps {
  link: {
    name: string
    href: string
    icon: ReactNode
  }
}

/**
 * На сервере мы не можем узнать pathname, поэтому клиентский компонент делаем,
 * но если мы на уровне выше используем usePathname, то весь ul станет клиентским, а так только его item
 */
export const SideNavigationItem = ({ link }: ISideNavigationItemProps) => {
  const pathname = usePathname()

  return (
    <li key={link.name}>
      <Link
        className={`
          py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 
          ${pathname === link.href ? 'bg-primary-900 cursor-default pointer-events-none' : ''}
        `}
        href={link.href}
      >
        {link.icon}
        <span>{link.name}</span>
      </Link>
    </li>
  )
}
