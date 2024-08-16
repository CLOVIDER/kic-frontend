'use client'

import { useState, ReactNode } from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from './Drawer'
import Navigator from './Navigator'

export default function Sidebar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent
        onClick={() => setIsOpen(false)}
        className="w-330 h-full pt-250"
      >
        <Navigator />
      </DrawerContent>
    </Drawer>
  )
}
