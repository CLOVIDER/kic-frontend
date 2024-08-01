'use client'

import { useState, ReactNode } from 'react'
import { Setting } from '@/components/common/Icons/'
import Link from 'next/link'
import { Drawer, DrawerContent, DrawerTrigger } from './Drawer'
import Navigator from './Navigator'

export default function Sidebar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="w-330 h-full pt-90">
        <p className="py-50 px-55 text-20 text-[#D7D7D7]">menu</p>
        <Navigator />
        <div className="flex flex-row items-center gap-5 mt-220 ml-200">
          <Setting width="20" />
          <Link key="pwd" href="/" className="text-14 text-[#717579]">
            비밀번호 변경
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
