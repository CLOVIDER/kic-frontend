'use client'

import { HamburgerMenu } from '../Icons'
import Logo from './Logo'
import { Sidebar } from './Sidebar'

export default function Header() {
  return (
    <div className="flex justify-between items-center p-15">
      <Sidebar>
        <HamburgerMenu />
      </Sidebar>
      <Logo />
    </div>
  )
}
