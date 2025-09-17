'use client'

import type { ReactNode } from 'react'
import { Link, usePathname } from '@/app/_i18n/navigation'

interface INavLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export const NavLink = ({ href, children, className = '' }: INavLinkProps) => {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? 'text-cyan-700' : ''}`}
    >
      {children}
    </Link>
  )
}
