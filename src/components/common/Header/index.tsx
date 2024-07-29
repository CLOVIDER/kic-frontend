'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import { HamburgerMenu } from '../Icons'
import Logo from './Logo'

export default function Header() {
  const pathname = usePathname()

  return (
    <div className="absolute top-0 w-full">
      <div className="flex justify-between items-center p-15">
        <Sidebar>
          <HamburgerMenu className={pathname === '/' ? 'hidden' : ''} />
        </Sidebar>
        <Logo />
      </div>
    </div>
  )
}
