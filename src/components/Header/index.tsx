'use client'

import { Sidebar } from './Sidebar'
import { HamburgerMenu } from '../common/Icons'
import Logo from './Logo'

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
