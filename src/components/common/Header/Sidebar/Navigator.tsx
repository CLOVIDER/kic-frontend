'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/util'
import { Boxes, Home, Lightning, Person, Talk } from '@/components/common/Icons'

export default function Navigator() {
  const pathname = usePathname()

  const routes = useMemo(() => {
    return [
      {
        label: '어린이집 정보',
        isActive: pathname === '/',
        href: '/',
        icon: <Home fill={pathname === '/' ? '#FFFFFF' : '#717579'} />,
      },
      {
        label: '신청하기',
        isActive: pathname === '/',
        href: '/',
        icon: <Lightning fill={pathname === '/' ? '#FFFFFF' : '#717579'} />,
      },
      {
        label: '신청내역',
        isActive: pathname === '/',
        href: '/',
        icon: <Person fill={pathname === '/' ? '#FFFFFF' : '#717579'} />,
      },
      {
        label: '공지사항',
        isActive: pathname === '/',
        href: '/',
        icon: <Boxes fill={pathname === '/' ? '#FFFFFF' : '#717579'} />,
      },
      {
        label: '1:1 문의',
        isActive: pathname === '/',
        href: '/',
        icon: <Talk fill={pathname === '/' ? '#FFFFFF' : '#717579'} />,
      },
    ]
  }, [pathname])
  return (
    <section className="flex flex-col p-4">
      {routes.map(({ label, href, isActive, icon }) => {
        return (
          <Link
            key={label}
            href={href}
            className={cn(
              'flex flex-row text-18 text-[#717579] px-25 py-14 ml-25 mr-50 gap-30 rounded-60 mb-20 hover:bg-[#FFF4CC]',
              isActive && 'bg-[#FFEDAE] font-semibold text-[#333333]',
            )}
          >
            {icon}
            {label}
          </Link>
        )
      })}
    </section>
  )
}
