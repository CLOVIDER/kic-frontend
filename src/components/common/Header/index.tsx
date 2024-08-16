'use client'

import { usePathname } from 'next/navigation'
import { StrictPropsWithChildren } from '@/type'
import Sidebar from './Sidebar'
import { HamburgerMenu } from '../Icons'
import Logo from './Logo'

export default function Header({ children }: StrictPropsWithChildren) {
  const pathname = usePathname()

  return (
    <div className="relative">
      <header className="absolute top-0 w-full z-20 bg-transparent">
        <div className="w-full flex flex-row items-center p-15 pl-20 gap-30">
          <Sidebar>
            <HamburgerMenu className={pathname === '/' ? 'hidden' : ''} />
          </Sidebar>
          <Logo />
        </div>
      </header>
      {children}
    </div>
  )
}
