import type { ReactNode } from 'react'

interface FooterProps {
  children: ReactNode
}

export const Footer = ({ children }: FooterProps) => {
  return <footer className="footer">{children}</footer>
}
